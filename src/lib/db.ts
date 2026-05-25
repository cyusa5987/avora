import { neon } from '@neondatabase/serverless'

// Vercel Postgres exposes POSTGRES_URL; plain Neon uses DATABASE_URL. Accept either.
const connectionString = process.env.DATABASE_URL ?? process.env.POSTGRES_URL

export const isDbConfigured = Boolean(connectionString)

// `sql` is null when no connection string is set, so callers can degrade gracefully
// instead of throwing at module load (which would break the whole route).
export const sql = connectionString ? neon(connectionString) : null
