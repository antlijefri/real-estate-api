import dotenv from 'dotenv';

dotenv.config();

export const app = {
  name: getEnv('APP_NAME'),
  port: getEnv('APP_PORT'),
  prefix: getEnv('API_PREFIX'),
};

export const dbconfig = {
  host: getEnv('HOST'),
  port: +getEnv('PORT'),
  username: getEnv('USER_NAME'),
  password: getEnv('PASSWORD'),
  database: getEnv('DATABASE'),
  synchronize: getEnv('DATABASE') === 'true' ? true : false,
  logging: getEnv('LOGGING') === 'true' ? true : false,
};

export const credential = {
  jwtSecret: getEnv('JWT_SECRET'),
  adminEmail: getEnv('ADMIN_EMAIL'),
  adminPassword: getEnv('ADMIN_PASS'),
};

export const mediaConfig = {
  allowedImageType: getEnv('IMAGE_TYPE').split(','),
  allowedVideoType: getEnv('VIDEO_TYPE').split(','),
  allowedDocType: getEnv('DOC_TYPE').split(','),
};

function getEnv(key: string): string {
  const envExist = process.env[key];

  if (!envExist) {
    throw new Error(`ENVIRONMENT VARIABLE MISSING - ${key}`);
  }

  return envExist;
};
