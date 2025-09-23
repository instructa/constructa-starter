import { fileEnv } from '~/conf/file';
import { S3StaticFileImpl } from '~/server/s3/s3';

let cachedFileService: S3StaticFileImpl | null = null;

function getFileService() {
  if (!cachedFileService) {
    cachedFileService = new S3StaticFileImpl();
  }

  return cachedFileService;
}

export async function readObjectText(key: string) {
  if (!key?.trim()) {
    throw new Error('Missing object key');
  }

  const service = getFileService();
  return service.getFileContent(key);
}

export function getDefaultBucket() {
  return fileEnv.S3_BUCKET;
}
