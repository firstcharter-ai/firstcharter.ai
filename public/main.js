// Contact form: POST to same-origin Worker endpoint with Turnstile token.
(function () {
  var form = document.getElementById('contact-form');
  if (!form) return;

  var status = form.querySelector('.form-status');
  var button = form.querySelector('button[type="submit"]');

  function setStatus(message, kind) {
    status.textContent = message;
    status.className = 'form-status' + (kind ? ' ' + kind : '');
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    if (!form.reportValidity()) return;

    var data = new FormData(form);
    var token = data.get('cf-turnstile-response');
    if (!token) {
      setStatus('Please complete the verification checkbox before sending.', 'err');
      return;
    }

    button.disabled = true;
    setStatus('Sending…');

    fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: data.get('name'),
        email: data.get('email'),
        company: data.get('company'),
        message: data.get('message'),
        website: data.get('website'),
        turnstileToken: token
      })
    })
      .then(function (res) {
        if (res.ok) {
          form.reset();
          setStatus('Message sent. We will reply within one business day.', 'ok');
        } else {
          return res.json().catch(function () { return {}; }).then(function (body) {
            setStatus(body.error || 'Something went wrong. Please email hello@firstcharter.ai instead.', 'err');
          });
        }
      })
      .catch(function () {
        setStatus('Network error. Please try again, or email hello@firstcharter.ai.', 'err');
      })
      .finally(function () {
        button.disabled = false;
        if (window.turnstile) window.turnstile.reset();
      });
  });
})();
