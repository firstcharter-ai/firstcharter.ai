# firstcharter.ai

Website for First Charter AI: tailored AI guidance, training, setup, implementation, and continuing support for individuals, independent professionals, and small teams. Based in Richmond, preparing to serve local and remote clients. Initial consultations will be complimentary at launch. Public pricing is intentionally omitted.

**Live site:** https://firstcharter.ai

## Structure

- `public/` — responsive static HTML/CSS/JS; no build step
- `public/demos/` — three interactive guided examples with fictional data; no live AI calls or connected accounts
- `public/credits.html` — photography provenance and commercial-use licenses
- `src/index.js` — existing contact Worker: Turnstile verification and email notification
- `wrangler.jsonc` — static assets, email binding, and custom domains
- `scripts/check-demo-models.mjs` — deterministic proposal and financial model checks

## Development and checks

Run `npm ci`, then `npm run dev` for the Worker and assets at http://localhost:8787. The production Turnstile key is domain-restricted; localhost cannot validate that widget. Do not send test email to verify visual changes.

Run `npm test` for demo calculations and `npm run deploy -- --dry-run` for packaging validation. Check desktop and mobile layouts and interactive source dialogs, proposal choices, calendar actions, and financial scenario controls before deployment.

## Deployment

The existing `main` branch is configured for Cloudflare Workers Builds. Manual deployment uses `npm run deploy` and requires Workers deployment permissions. Wrangler is pinned locally in `package.json` and the lockfile. See [DEPLOY.md](DEPLOY.md) for infrastructure context.

Only this nested website repository is public. Its parent company repository is local-only and must never be pushed or included in a deployment.
