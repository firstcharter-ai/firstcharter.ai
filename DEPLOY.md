# Deploying firstcharter.ai

Infrastructure runbook. Current state and how to reproduce it.

## Architecture

- **Cloudflare Worker** `firstcharter-ai` (account `98725060af1f1ce1d84b3137648c453a`) serves static assets from `public/` and handles `POST /api/contact`
- **Custom domains** on the Worker: `firstcharter.ai` and `www.firstcharter.ai` (DNS + TLS managed by Cloudflare automatically)
- **GitHub** repo `firstcharter-ai/firstcharter.ai` is the source of truth; Cloudflare Workers Builds deploys on push to `main`
- **Email in**: Email Routing forwards `shea@firstcharter.ai` → `shea.conaway@gmail.com`
- **Email out**: Worker sends contact form notifications from `notifications@firstcharter.ai` via the `send_email` binding (Email Sending, SPF/DKIM/DMARC records auto-managed)
- **Bot protection**: Cloudflare Turnstile on the contact form; Worker verifies tokens server-side

## Completed setup (2026-07-10, via wrangler OAuth)

```bash
npx wrangler@latest email sending enable firstcharter.ai     # SPF/DKIM/DMARC auto-added
npx wrangler@latest email routing enable firstcharter.ai     # MX records auto-added
npx wrangler@latest email routing addresses create shea.conaway@gmail.com
npx wrangler@latest email routing rules create firstcharter.ai \
  --name "shea forward" --match-type literal --match-field to \
  --match-value shea@firstcharter.ai --action-type forward \
  --action-value shea.conaway@gmail.com
npx wrangler@latest deploy                                   # Worker + both custom domains
```

## Setup status (2026-07-10)

Done: email destination verified (pre-existing on account), Turnstile widget created (site key in `index.html`, secret stored as `TURNSTILE_SECRET_KEY`), GitHub org `firstcharter-ai` created and repo pushed, both test email paths confirmed delivered to gmail.

Remaining:

1. **Fix firstcharterai.com redirect target**: the redirect rule currently points to `https://fristcharter.ai` (typo). Dashboard → firstcharterai.com zone → Rules → edit the redirect rule → change target to `https://firstcharter.ai`.
2. **Workers Builds**: Dashboard → Workers & Pages → firstcharter-ai → Settings → Build → Connect repository (`firstcharter-ai/firstcharter.ai`, branch `main`, deploy command `npx wrangler deploy`).

## Updating the site

Edit files, commit, push to `main`. Workers Builds deploys automatically. Manual deploy: `npx wrangler deploy`.

## Local development

`npx wrangler dev` — serves site + contact endpoint at http://localhost:8787. For real email sends in dev, temporarily add `"remote": true` to the `send_email` binding.
