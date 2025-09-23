/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BASE_URL?: string;
  readonly VITE_ENABLE_EMAIL_VERIFICATION?: 'true' | 'false';
  readonly VITE_GITHUB_CLIENT_ID?: string;
  readonly VITE_GOOGLE_CLIENT_ID?: string;
  readonly VITE_S3_PUBLIC_DOMAIN?: string;
  readonly VITE_S3_FILE_PATH?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare namespace NodeJS {
  interface ProcessEnv {
    readonly OPENAI_API_KEY?: string;
    readonly S3_ENDPOINT?: string;
    readonly S3_ACCESS_KEY_ID?: string;
    readonly S3_SECRET_ACCESS_KEY?: string;
    readonly S3_BUCKET?: string;
    readonly S3_REGION?: string;
  }
}
