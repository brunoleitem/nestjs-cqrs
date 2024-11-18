import { z } from 'zod';

export const configSchema = z.object({
  port: z.coerce.number().optional().default(3333),
  db_host: z.string().optional().default('localhost'),
  db_name: z.string().optional().default('dbname'),
  jwt_secret: z.string().optional().default('secret'),
  twilio_account_sid: z.string().optional().default('account_sid'),
  twilio_auth_token: z.string().optional().default('auth_token'),
});

export type Config = z.infer<typeof configSchema>;
