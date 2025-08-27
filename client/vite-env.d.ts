/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GA4_MEASUREMENT_ID: string;
  readonly VITE_ENABLE_ANALYTICS: string;
  readonly VITE_BRAND: string;
  readonly VITE_API_BASE_URL: string;
  readonly VITE_ENABLE_TICKER: string;
  readonly VITE_ENABLE_VIDEO_AUTOPLAY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
