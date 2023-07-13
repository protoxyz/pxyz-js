export const IS_PROTOCOL_DEV =
  process.env.NEXT_PUBLIC_PROTOCOL_ENV === 'development' ||
  process.env.PROTOCOL_ENV === 'development';
export const BACKEND_API_URL = IS_PROTOCOL_DEV
  ? 'http://127.0.0.1:4000'
  : 'https://api.pxyz.dev';
