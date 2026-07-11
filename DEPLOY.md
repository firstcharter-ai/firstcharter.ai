# Deploying firstcharter.ai

Infrastructure runbook. Current state and how to reproduce it.

## Architecture

- **Cloudflare Worker** `firstcharter-ai` (account `98725060af1f1ce1d84b3137648c453a`) serves static assets from `public/` and handles `POST /api/contact`
- **Custom domains** on the Worker: `firstcharter.ai` and `www.firstcharter.ai` (DNS + TLS managed by Cloudflare automatically)
- **GitHub** repo `first-charter-ai/firstcharter.ai` is the source of truth; Cloudflare Workers Builds deploys on push to `main`
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

## Remaining manual steps

1. **Verify email destination**: click the Cloudflare verification link sent to shea.conaway@gmail.com (required before forwarding and contact form emails work).
2. **Turnstile widget** (Dashboard → Turnstile → Add widget): hostname `firstcharter.ai`, Managed mode. Then:
   - Put the **site key** in `public/index.html` (replace `TURNSTILE_SITE_KEY` in the `data-sitekey` attribute)
   - Store the **secret key**: `npx wrangler secret put TURNSTILE_SECRET_KEY`
3. **GitHub org**: create `first-charter-ai` at https://github.com/account/organizations/new (free plan), then push this repo there.
4. **Workers Builds**: Dashboard → Workers & Pages → firstcharter-ai → Settings → Build → Connect repository (`first-charter-ai/firstcharter.ai`, branch `main`, deploy command `npx wrangler deploy`).
5. **firstcharterai.com redirect** (Dashboard → firstcharterai.com zone):
   - DNS: add A record, name `@`, value `192.0.2.1`, proxied (orange cloud); same for `www`
   - Rules → Redirect Rules → Create: "Redirect from Root and WWW" template, target `https://firstcharter.ai`, 301, preserve path

Steps 2 and 5 can alternatively be automated with a scoped API token (Account: Turnstile Edit; Zone: DNS Edit + Dynamic Redirect Edit on firstcharterai.com).

## Updating the site

Edit files, commit, push to `main`. Workers Builds deploys automatically. Manual deploy: `npx wrangler deploy`.

## Local development

`npx wrangler dev` — serves site + contact endpoint at http://localhost:8787. For real email sends in dev, temporarily add `"remote": true` to the `send_email` binding.
