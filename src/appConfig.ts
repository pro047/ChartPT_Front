import dotenv from 'dotenv';
dotenv.config();

const isProduction = process.env.NEXT_PUBLIC_APP_ENV === 'production';

const requireString = (name: string): string => {
  const value = process.env[name];
  if (!value) throw new Error(`Missing env: ${name}`);
  return value;
};

export const AppConifg = {
  nextEnv:
    process.env.NEXT_PUBLIC_APP_ENV ??
    (isProduction ? 'production' : 'development'),
  apiUrl: requireString('NEXT_PUBLIC_API_URL'),
  secureKey: requireString('NEXT_PUBLIC_SECURE_KEY'),
};
