-- Waitlist signups. Run once against your Neon/Vercel Postgres database:
--   npm run db:init
-- or paste this into the Neon SQL editor.

CREATE TABLE IF NOT EXISTS waitlist_signups (
  id          BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  email       TEXT        NOT NULL UNIQUE,
  source      TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS waitlist_signups_created_at_idx
  ON waitlist_signups (created_at DESC);
