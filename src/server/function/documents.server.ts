import { createServerFn } from '@tanstack/react-start';
import { getWebRequest } from '@tanstack/react-start/server';
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
  const { headers } = getWebRequest();
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

const deleteDocumentsSchema = z.object({
  ids: z.array(z.string().min(1)).min(1),
});

export type InitDocumentUploadInput = z.infer<typeof initUploadSchema>;
export type CompleteDocumentUploadInput = z.infer<typeof completeUploadSchema>;
export type DirectDocumentUploadInput = z.infer<typeof directUploadSchema>;
export type DeleteDocumentsInput = z.infer<typeof deleteDocumentsSchema>;

const normalizeInput = <TSchema extends z.ZodTypeAny>(
  input: unknown,
  schema: TSchema,
): z.infer<TSchema> => {
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

  return schema.parse(payload);
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
  .validator((input) => normalizeInput(input, initUploadSchema))
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
  .validator((input) => normalizeInput(input, completeUploadSchema))
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
  .validator((input) => normalizeInput(input, directUploadSchema))
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

export const deleteDocuments = createServerFn({ method: 'POST' })
  .validator((input) => normalizeInput(input, deleteDocumentsSchema))
  .handler(async ({ ids }) => {
    const user = await requireUser();
    const uniqueIds = Array.from(new Set(ids));

    if (uniqueIds.length === 0) {
      return { deleted: 0 };
    }

    const existing = await db
      .select({ id: files.id, key: files.key })
      .from(files)
      .where(and(eq(files.clientId, user.id), inArray(files.id, uniqueIds)));

    if (existing.length === 0) {
      return { deleted: 0 };
    }

    const deleted = await db
      .delete(files)
      .where(inArray(files.id, existing.map((file) => file.id)))
      .returning({ id: files.id, key: files.key });

    const keys = Array.from(
      new Set(
        [...existing, ...deleted]
          .map((file) => file.key)
          .filter((key): key is string => Boolean(key)),
      ),
    );

    if (keys.length > 0) {
      await Promise.allSettled(keys.map((key) => fileService.deleteFile(key)));
    }

    return { deleted: deleted.length || existing.length };
  });
