import { Buffer } from 'node:buffer';
import { createTool } from '@mastra/core/tools';
import { z } from 'zod';
import { getDefaultBucket, readObjectText } from '~/mastra/storage';

const DEFAULT_MAX_BYTES = 512_000; // 500 KB cap keeps responses manageable

const InputSchema = z.object({
  key: z.string().min(1).describe('Object key (path) in the configured S3 bucket'),
  bucket: z.string().min(1).optional().describe('Override bucket name if different'),
  maxBytes: z
    .number()
    .int()
    .positive()
    .max(2_000_000)
    .optional()
    .describe('Maximum bytes of text to return (defaults to 500KB).'),
});

export const getFileFromObjectStore = createTool({
  id: 'get-file-from-object-store',
  description: 'Fetch UTF-8 text content from the configured S3/MinIO bucket.',
  inputSchema: InputSchema,
  outputSchema: z.object({
    key: z.string(),
    bucket: z.string(),
    bytes: z.number().int().nonnegative(),
    content: z.string().describe('Possibly truncated file contents'),
    truncated: z.boolean().optional(),
  }),
  execute: async ({ context }) => {
    const { key, bucket: bucketOverride, maxBytes } = InputSchema.parse(context);
    const bucket = bucketOverride ?? getDefaultBucket();

    if (!bucket) {
      throw new Error('S3 bucket is not configured');
    }

    const raw = await readObjectText(key);
    const limit = maxBytes ?? DEFAULT_MAX_BYTES;
    const capped = raw.length > limit ? raw.slice(0, limit) : raw;

    return {
      key,
      bucket,
      bytes: Buffer.byteLength(capped, 'utf8'),
      content: capped,
      truncated: capped.length < raw.length ? true : undefined,
    };
  },
});
