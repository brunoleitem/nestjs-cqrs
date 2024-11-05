import { Config, configSchema } from './config-schema';

export const factory = (): Config => {
  const result = configSchema.safeParse({
    port: process.env.PORT,
    db_host: process.env.DB_HOST,
    db_name: process.env.DB_NAME,
    jwt_secret: process.env.JWT_SECRET,
  });

  if (result.success) {
    return result.data;
  }

  throw new Error(`Invalid application configuration: ${result.error.message}`);
};
