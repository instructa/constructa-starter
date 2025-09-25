import { createServerFn } from '@tanstack/react-start';
import { getRequest } from '@tanstack/react-start/server';
import { randomUUID } from 'node:crypto';
import { Buffer } from 'node:buffer';
import { z } from 'zod';

import { fileEnv } from '~/conf/file';
import { db } from '~/db/db-config';
import { files } from '~/db/schema/file.schema';
import { documents } from '~/db/schema/document.schema';
import { auth } from '~/server/auth.server';
import { S3StaticFileImpl } from '~/server/s3/s3';
import { and, desc, eq, inArray } from 'drizzle-orm';

const fileService = new S3StaticFileImpl();

const requireUser = async () => {
  const { headers } = getRequest();
  const session = await auth.api.getSession({ headers });

  if (!session?.user) {
    throw new Error('UNAUTHORIZED');
  }

  return session.user;
};

const sanitizeFileName = (name?: string | null) => {
  const fallback = `file-${Date.now()}`;
  const safeInput = name && name.length > 0 ? name : fallback;

  return safeInput
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9._-]/g, '_');
};

const buildObjectKey = (userId: string, originalName: string) => {
  const prefix = fileEnv.S3_PREFIX ? fileEnv.S3_PREFIX.replace(/\/*$/, '') + '/' : '';
  const safeName = sanitizeFileName(originalName);
  return `${prefix}${userId}/${Date.now()}-${randomUUID()}-${safeName}`;
};

const initUploadSchema = z.object({
  originalName: z.string().min(1),
  mimeType: z.string().optional(),
  size: z.number().int().nonnegative().optional(),
  title: z.string().optional(),
  content: z.string().optional(),
  addToKnowledgeBase: z.boolean().optional(),
});

const completeUploadSchema = z
  .object({
    id: z.string().min(1).optional(),
    key: z.string().min(1).optional(),
  })
  .refine((v) => Boolean(v.id) || Boolean(v.key), 'Either id or key is required');

const directUploadSchema = z.object({
  id: z.string().min(1).optional(),
  key: z.string().min(1).optional(),
  originalName: z.string().optional(),
  size: z.number().int().nonnegative().optional(),
  content: z.string().min(1),
  mimeType: z.string().optional(),
});

const deleteDocumentsSchema = z
  .object({
    ids: z.array(z.string().min(1)).optional(),
    items: z
      .array(
        z
          .object({
            id: z.string().min(1).optional(),
            key: z.string().min(1).optional(),
          })
          .refine((value) => Boolean(value.id) || Boolean(value.key), 'id or key is required'),
      )
      .optional(),
  })
  .refine(
    (value) => (value.ids && value.ids.length > 0) || (value.items && value.items.length > 0),
    'ids or items are required',
  );

const coerceStringArray = (input: unknown) => {
  if (Array.isArray(input)) {
    return input
      .map((value) => (typeof value === 'string' ? value : String(value ?? '')).trim())
      .filter((value) => value.length > 0);
  }

  if (input && typeof input === 'object' && '$values' in (input as Record<string, unknown>)) {
    const values = (input as { $values?: unknown }).$values;
    if (Array.isArray(values)) {
      return coerceStringArray(values);
    }
  }

  if (input && typeof input === 'object') {
    const values = Object.values(input as Record<string, unknown>);
    if (values.length > 0) {
      return coerceStringArray(values);
    }
  }

  if (typeof input === 'string') {
    try {
      const parsed = JSON.parse(input);
      return coerceStringArray(parsed);
    } catch (error) {
      console.warn('[deleteDocuments] failed to parse stringified ids payload', error);
    }
  }

  return [] as string[];
};

const coerceItemArray = (input: unknown): { id?: string; key?: string }[] => {
  if (Array.isArray(input)) {
    return input
      .filter((item): item is Record<string, unknown> => !!item && typeof item === 'object')
      .map((item) => {
        const id = typeof item.id === 'string' ? item.id.trim() : undefined;
        const key = typeof item.key === 'string' ? item.key.trim() : undefined;

        return {
          ...(id ? { id } : {}),
          ...(key ? { key } : {}),
        };
      })
      .filter((item) => item.id || item.key);
  }

  if (input && typeof input === 'object' && '$values' in (input as Record<string, unknown>)) {
    const values = (input as { $values?: unknown }).$values;
    if (Array.isArray(values)) {
      return coerceItemArray(values);
    }
  }

  if (input && typeof input === 'object') {
    const values = Object.values(input as Record<string, unknown>);
    if (values.length > 0) {
      return coerceItemArray(values);
    }
  }

  if (typeof input === 'string') {
    try {
      const parsed = JSON.parse(input);
      return coerceItemArray(parsed);
    } catch (error) {
      console.warn('[deleteDocuments] failed to parse stringified items payload', error);
    }
  }

  return [];
};

export type InitDocumentUploadInput = z.infer<typeof initUploadSchema>;
export type CompleteDocumentUploadInput = z.infer<typeof completeUploadSchema>;
export type DirectDocumentUploadInput = z.infer<typeof directUploadSchema>;
export type DeleteDocumentsInput = z.infer<typeof deleteDocumentsSchema>;

const normalizeInput = <TSchema extends z.ZodTypeAny>(
  input: unknown,
  schema: TSchema,
  preprocess?: (payload: unknown) => unknown,
): z.infer<TSchema> => {
  console.log('[normalizeInput] raw input', input);
  const rawCandidate =
    input instanceof FormData
      ? Object.fromEntries(input.entries())
      : typeof input === 'string'
        ? JSON.parse(input)
        : input ?? {};
  const candidate = Array.isArray(rawCandidate)
    ? rawCandidate[0] ?? {}
    : rawCandidate;

  let payload =
    candidate && typeof candidate === 'object'
      ? { ...(candidate as Record<string, unknown>) }
      : candidate;

  if (payload && typeof payload === 'object' && 'data' in (payload as Record<string, unknown>)) {
    payload = (payload as Record<string, unknown>).data ?? {};
  }

  if (payload && typeof payload === 'object') {
    const record = payload as Record<string, unknown>;
    if ('size' in record) {
      const sizeValue = record.size;
      record.size = typeof sizeValue === 'string' ? Number(sizeValue) : sizeValue;
    }
    if ('addToKnowledgeBase' in record) {
      const kbValue = record.addToKnowledgeBase;
      record.addToKnowledgeBase = kbValue === 'true' || kbValue === true;
    }
  }

  const processed = preprocess ? preprocess(payload) : payload;

  console.log('[normalizeInput] processed payload', processed);

  return schema.parse(processed);
};

export const listDocuments = createServerFn({ method: 'GET' }).handler(async () => {
  const user = await requireUser();

  const fileRows = await db
    .select()
    .from(files)
    .where(eq(files.clientId, user.id))
    .orderBy(desc(files.createdAt));

  return Promise.all(
    fileRows.map(async (file) => ({
      ...file,
      downloadUrl: await fileService.getFullFileUrl(file.key),
    })),
  );
});

export const initDocumentUpload = createServerFn({ method: 'POST' })
  .inputValidator((input) => normalizeInput(input, initUploadSchema))
  .handler(async (input) => {
    const user = await requireUser();

    const originalName = input.originalName?.trim() || `file-${Date.now()}`;
    const key = buildObjectKey(user.id, originalName);
    const mimeType = input.mimeType ?? 'application/octet-stream';
    const size = input.size ?? 0;

    const shouldCreateDocument =
      !!input.addToKnowledgeBase || Boolean(input.content?.trim().length);

    const fileRecord = await db.transaction(async (tx) => {
      const [createdFile] = await tx
        .insert(files)
        .values({
          key,
          clientId: user.id,
          fileType: mimeType,
          name: originalName,
          size,
          url: '',
          mimeType: input.mimeType ?? null,
        })
        .returning();

      if (!createdFile) {
        throw new Error('Failed to create file record');
      }

      if (shouldCreateDocument) {
        await tx.insert(documents).values({
          title: input.title?.trim() || originalName,
          content: input.content ?? '',
          fileType: mimeType,
          filename: originalName,
          totalCharCount: input.content?.length ?? null,
          totalLineCount: input.content ? input.content.split(/\r?\n/).length : null,
          sourceType: input.addToKnowledgeBase ? 'knowledge-base' : 'upload',
          source: key,
          fileId: createdFile.id,
          userId: user.id,
          clientId: user.id,
        });
      }

      return createdFile;
    });

    const uploadUrl = fileService.isPresignedEnabled()
      ? await fileService.createUploadPreSignedUrl(key)
      : null;

    return { id: fileRecord.id, key, uploadUrl };
  });

export const completeDocumentUpload = createServerFn({ method: 'POST' })
  .inputValidator((input) => normalizeInput(input, completeUploadSchema))
  .handler(async (payload) => {
    const data = (payload && typeof payload === 'object' && 'data' in (payload as Record<string, unknown>))
      ? ((payload as Record<string, unknown>).data as CompleteDocumentUploadInput)
      : (payload as CompleteDocumentUploadInput);

    const { id, key } = data;

    const user = await requireUser();

    let file = null;

    if (key) {
      const byKey = await db
        .select()
        .from(files)
        .where(and(eq(files.key, key), eq(files.clientId, user.id)))
        .limit(1);
      file = byKey[0] ?? null;
    }

    if (!file && id) {
      const byId = await db
        .select()
        .from(files)
        .where(eq(files.id, id))
        .limit(1);
      const candidate = byId[0];
      if (candidate && candidate.clientId === user.id) {
        file = candidate;
      }
    }

    if (!file || (file.clientId && file.clientId !== user.id)) {
      throw new Error('File not found');
    }

    const url = await fileService.getFullFileUrl(file.key);
    const now = new Date();

    await db
      .update(files)
      .set({
        url,
        updatedAt: now,
        accessedAt: now,
      })
      .where(eq(files.key, file.key));

    return { id: file.id, url };
  });

export const directDocumentUpload = createServerFn({ method: 'POST' })
  .inputValidator((input) => normalizeInput(input, directUploadSchema))
  .handler(async (payload) => {
    const data = (payload && typeof payload === 'object' && 'data' in (payload as Record<string, unknown>))
      ? ((payload as Record<string, unknown>).data as DirectDocumentUploadInput)
      : (payload as DirectDocumentUploadInput);

    const { id, key: inputKey, originalName, size, content, mimeType } = data;

    const user = await requireUser();
    const inferredName = originalName?.trim() || `file-${Date.now()}`;
    const inferredMime = mimeType ?? 'application/octet-stream';
    const inferredSize = size ?? 0;

    if (!content) {
      throw new Error('Missing upload content');
    }

    const byId = id
      ? await db
          .select()
          .from(files)
          .where(and(eq(files.id, id), eq(files.clientId, user.id)))
          .limit(1)
      : [];

    let fileRecord = byId[0] ?? null;

    if (!fileRecord && inputKey) {
      const byKey = await db
        .select()
        .from(files)
        .where(and(eq(files.key, inputKey), eq(files.clientId, user.id)))
        .limit(1);
      fileRecord = byKey[0] ?? null;
    }

    let resolvedKey = fileRecord?.key ?? inputKey ?? buildObjectKey(user.id, inferredName);

    if (!fileRecord) {
      const [created] = await db
        .insert(files)
        .values({
          ...(id ? { id } : {}),
          key: resolvedKey,
          clientId: user.id,
          fileType: inferredMime,
          name: inferredName,
          size: inferredSize,
          url: '',
          mimeType: mimeType ?? null,
        })
        .returning();

      if (!created) {
        throw new Error('Failed to create file record for upload');
      }

      fileRecord = created;
      resolvedKey = created.key;
    }

    if (fileRecord.clientId && fileRecord.clientId !== user.id) {
      throw new Error('File not found');
    }

    const buffer = Buffer.from(content, 'base64');
    await fileService.uploadContent(resolvedKey, buffer);

    const url = await fileService.getFullFileUrl(resolvedKey);
    const now = new Date();

    await db
      .update(files)
      .set({
        url,
        fileType: mimeType ?? fileRecord.fileType,
        mimeType: mimeType ?? fileRecord.mimeType,
        name: inferredName,
        size: inferredSize,
        updatedAt: now,
        accessedAt: now,
      })
      .where(eq(files.id, fileRecord.id));

    return { id: fileRecord.id, url };
  });

const preprocessDeletePayload = (payload: unknown) => {
  if (!payload || typeof payload !== 'object') return payload;

  const record = { ...(payload as Record<string, unknown>) };

  if ('items' in record) {
    const coercedItems = coerceItemArray(record.items);
    console.log('[preprocessDeletePayload] coerced items len', coercedItems.length);
    if (coercedItems.length > 0) {
      record.items = coercedItems;
    } else {
      delete record.items;
    }
  }

  if ('ids' in record) {
    const coercedIds = coerceStringArray(record.ids);
    console.log('[preprocessDeletePayload] coerced ids len', coercedIds.length);
    if (coercedIds.length > 0) {
      record.ids = coercedIds;
    } else {
      delete record.ids;
    }
  }

  return record;
};

export const deleteDocuments = createServerFn({ method: 'POST' })
  .handler(async (payload) => {
    const user = await requireUser();

    const { ids, items } = normalizeInput(payload, deleteDocumentsSchema, preprocessDeletePayload);

    console.log('[deleteDocuments] parsed ids', ids, 'parsed items length', items?.length);

    const normalizedItems = coerceItemArray(items);
    const normalizedIds = coerceStringArray(ids);

    console.log('[deleteDocuments] normalized items len', normalizedItems.length, 'normalized ids len', normalizedIds.length);

    const idSet = new Set(
      normalizedItems
        .map((item) => item.id?.trim())
        .filter((value): value is string => Boolean(value)),
    );
    const keySet = new Set(
      normalizedItems
        .map((item) => item.key?.trim())
        .filter((value): value is string => Boolean(value)),
    );

    normalizedIds.forEach((id) => {
      if (id) {
        idSet.add(id);
      }
    });

    if (idSet.size === 0 && keySet.size === 0) {
      return { deleted: 0 };
    }

    const conditions: Array<ReturnType<typeof inArray> | ReturnType<typeof eq>> = [
      eq(files.clientId, user.id),
    ];
    if (idSet.size > 0) {
      conditions.push(inArray(files.id, Array.from(idSet)));
    }
    if (keySet.size > 0) {
      conditions.push(inArray(files.key, Array.from(keySet)));
    }

    const existing = await db
      .select({ id: files.id, key: files.key })
      .from(files)
      .where(conditions.length === 1 ? conditions[0] : and(...conditions));

    if (existing.length === 0) {
      return { deleted: 0 };
    }

    await db.delete(files).where(inArray(files.id, existing.map((file) => file.id)));

    const keys = Array.from(
      new Set(existing.map((file) => file.key).filter((key): key is string => Boolean(key))),
    );

    if (keys.length > 0) {
      await Promise.allSettled(keys.map((key) => fileService.deleteFile(key)));
    }

    return { deleted: existing.length };
  });
