import { neon } from '@neondatabase/serverless';

export const sql = neon(`${process.env.NEON_DB_URL}`);


// See https://neon.tech/docs/serverless/serverless-driver
// for more information