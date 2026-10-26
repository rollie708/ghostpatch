# GHOSTPATCH Early Access

A responsive, single-page landing site for an early-stage security research project. Planned capabilities are described as areas of exploration, not as live product features. No analytics, wallets, tokens, or fake signup success are included.

## Run locally

Requires Node.js 20.19+ or 22.12+.

```sh
npm install
npm run dev
```

The page can be previewed without credentials. The signup form will clearly say that the list is unavailable until a backend has been activated. Production output is built with `npm run build` and can be served from the generated `dist/` directory on any static host (including Vercel or Netlify).

## Activate persistent signups (free Supabase tier)

1. Create a Supabase project and run `supabase.sql` in its SQL Editor. The table only accepts inserts through the anon role; row-level security prevents public reads.
2. Copy `.env.example` to `.env.local` and set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` from the project's API settings. The anon/publishable key is intended for browser use; never put a service-role key in this frontend.
3. Set the same two environment variables in the static host's build settings, then rebuild/redeploy. Verify a signup appears in the Supabase `early_access` table before announcing the list as open.

The browser posts directly to Supabase REST. Duplicate email submissions receive a helpful already-registered message. Do not expose the table's select permission to `anon`.

## Brand assets

The supplied images were not present as workspace files. `public/ghostpatch-mark.svg` and `public/ghostpatch-social.svg` are original temporary brand assets and can be replaced with the supplied logo art when available.
