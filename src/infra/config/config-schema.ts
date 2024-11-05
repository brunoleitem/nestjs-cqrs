import { z } from 'zod';

export const configSchema = z.object({
  port: z.coerce.number().optional().default(3333),
  db_host: z.string().optional().default('localhost'),
  db_name: z.string().optional().default('dbname'),
  jwt_secret: z.string().optional().default('secret'),
});

export type Config = z.infer<typeof configSchema>;
