const isProduction = process.env.NEXT_PUBLIC_APP_ENV === 'production';

export const AppConifg = {
  nextEnv:
    process.env.NEXT_PUBLIC_APP_ENV ??
    (isProduction ? 'production' : 'development'),
  apiUrl: process.env.NEXT_PUBLIC_API_URL,
  secureKey: process.env.NEXT_PUBLIC_SECURE_KEY,
};
