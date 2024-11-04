import { Config, configSchema } from './config-schema';

export const factory = (): Config => {
  const result = configSchema.safeParse({
    port: process.env.PORT,
    db_host: process.env.DB_HOST,
    db_name: process.env.DB_NAME,
  });

  if (result.success) {
    return result.data;
  }

  throw new Error(`Invalid application configuration: ${result.error.message}`);
};
