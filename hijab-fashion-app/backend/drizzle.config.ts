import type { Config } from 'drizzle-kit';

export default {
  schema: './api/src/db/schema.ts',
  out: './drizzle',
  dialect: 'sqlite',
  dbCredentials: {
    url: './api/db.sqlite',
  },
} satisfies Config;