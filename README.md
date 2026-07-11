# firstcharter.ai

Website for First Charter AI, an AI consulting practice for small businesses in Richmond, Virginia.

**Live site:** https://firstcharter.ai

## Structure

- `public/` — static site (plain HTML/CSS/JS, no build step)
- `src/index.js` — Cloudflare Worker serving `POST /api/contact` (Turnstile verification + email notification)
- `wrangler.jsonc` — Worker config: static assets from `public/`, `send_email` binding, custom domain

## Local development

```
npx wrangler dev
```

Serves the site and the contact endpoint at http://localhost:8787.

## Deployment

Pushing to `main` deploys automatically via Cloudflare Workers Builds. Manual deploy:

```
npx wrangler deploy
```

See [DEPLOY.md](DEPLOY.md) for the full infrastructure runbook (DNS, redirects, Email Routing, Turnstile).
