/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly MODE: string;
  readonly VERCEL?: string;
  // Add other env variables here as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
