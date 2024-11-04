import { z } from 'zod';

export const configSchema = z.object({
  port: z.coerce.number().optional().default(3333),
  db_host: z.string().optional().default('localhost'),
  db_name: z.string().optional().default('dbname'),
});

export type Config = z.infer<typeof configSchema>;
