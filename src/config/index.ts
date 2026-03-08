export const config = {
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'https://freefakeapi.com ',
  APP_NAME: import.meta.env.VITE_APP_NAME || 'E-Commerce',
  APP_ENV: import.meta.env.MODE || 'development',
} as const;
