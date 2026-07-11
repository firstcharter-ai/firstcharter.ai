// First Charter AI — contact form endpoint.
// Static assets are served directly from public/ by the assets binding;
// only /api/* requests reach this Worker (run_worker_first).

const JSON_HEADERS = { 'Content-Type': 'application/json' };

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === '/api/contact') {
      if (request.method !== 'POST') {
        return new Response(JSON.stringify({ error: 'Method not allowed.' }), {
          status: 405,
          headers: { ...JSON_HEADERS, Allow: 'POST' },
        });
      }
      return handleContact(request, env);
    }

    return new Response(JSON.stringify({ error: 'Not found.' }), {
      status: 404,
      headers: JSON_HEADERS,
    });
  },
};

async function handleContact(request, env) {
  let body;
  try {
    body = await request.json();
  } catch {
    return jsonError(400, 'Invalid request body.');
  }

  const name = trimmed(body.name, 200);
  const email = trimmed(body.email, 200);
  const company = trimmed(body.company, 200);
  const message = trimmed(body.message, 5000);
  const honeypot = trimmed(body.website, 200);
  const token = typeof body.turnstileToken === 'string' ? body.turnstileToken : '';

  // Bots that fill the hidden field get a quiet "success".
  if (honeypot) {
    return new Response(JSON.stringify({ ok: true }), { status: 200, headers: JSON_HEADERS });
  }

  if (!name || !email || !message) {
    return jsonError(400, 'Name, email, and message are required.');
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return jsonError(400, 'That email address does not look right.');
  }
  if (!token) {
    return jsonError(403, 'Verification incomplete. Please try the checkbox again.');
  }

  const human = await verifyTurnstile(token, request, env);
  if (!human) {
    return jsonError(403, 'Verification failed. Please try the checkbox again.');
  }

  const submittedAt = new Date().toISOString();
  const lines = [
    `Name: ${name}`,
    `Email: ${email}`,
    company ? `Business: ${company}` : null,
    `Submitted: ${submittedAt}`,
    '',
    message,
  ].filter((line) => line !== null);

  try {
    await env.EMAIL.send({
      to: env.CONTACT_DESTINATION,
      from: { email: `notifications@${env.SITE_DOMAIN}`, name: 'First Charter AI Website' },
      replyTo: email,
      subject: `Website inquiry from ${name}${company ? ` (${company})` : ''}`,
      text: lines.join('\n'),
      html: `<pre style="font-family: inherit; white-space: pre-wrap;">${escapeHtml(lines.join('\n'))}</pre>`,
    });
  } catch (error) {
    console.error(`Contact email send failed: ${error.code ?? ''} ${error.message}`);
    return jsonError(502, 'Could not send your message. Please email info@firstcharter.ai instead.');
  }

  return new Response(JSON.stringify({ ok: true }), { status: 200, headers: JSON_HEADERS });
}

async function verifyTurnstile(token, request, env) {
  const result = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: JSON_HEADERS,
    body: JSON.stringify({
      secret: env.TURNSTILE_SECRET_KEY,
      response: token,
      remoteip: request.headers.get('CF-Connecting-IP') ?? undefined,
    }),
  });
  if (!result.ok) return false;
  const outcome = await result.json();
  return outcome.success === true;
}

function trimmed(value, maxLength) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : '';
}

function escapeHtml(text) {
  return text
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function jsonError(status, message) {
  return new Response(JSON.stringify({ error: message }), { status, headers: JSON_HEADERS });
}
