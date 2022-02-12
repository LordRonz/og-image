export const ORIGIN_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://lr-og.vercel.app'
    : 'http://localhost:3000';

export default ORIGIN_URL;
