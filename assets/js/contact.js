(function(){
  'use strict';

  // Use a Cloudflare Turnstile challenge to unlock the Submit button
  window.turnstileInit = () => {
    console.log('turnstile init called');
    turnstile.render('#turnstileChallenge', {
      sitekey: '0x4AAAAAAADB0gL0cX6XVDTz',
      theme: 'light',
      callback: (token) => {
        console.log('turnstile success');
        document.getElementById('submit').disabled = false;
      },
    });
  };

  // Submission handler
  const emailHandler = async (e) => {
    e.preventDefault();

    const cfEl = document.querySelector('input[name="cf-turnstile-response"]');
    const formWrapper = document.querySelector('.form-wrapper');

    if (!cfEl) {
      // @TODO: Fallback? This element won't exist if Turnstile didn't init
      return false;
    }

    var message = {
      from: document.getElementById("from").value,
      replyto: document.getElementById("replyto").value,
      message: document.getElementById("message").value,
      turnstile: (cfEl) ? cfEl.value : false,
    };

    await fetch(form.getAttribute('action'), {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(message),
    }).then((response) => {
      if (response.status === 200) {
        formWrapper.innerHTML =
          '<h2>Thank you!</h2><p>Your email has been sent, I\'ll get back to you as soon as I can.</p>';
      }
      else {
        formWrapper.innerHTML =
          '<h2>Sorry.</h2><p>An error occurred sending this email. Would you mind trying one of the social media links instead?</p>';
      }
    }).catch((error) => {
      console.log(error);

      formWrapper.innerHTML =
        '<h2>Sorry.</h2><p>An error occurred sending this email. Would you mind trying one of the social media links instead?</p>';
    });
  }

  var form = document.getElementById("contact-form");

  if (form) {
    form.addEventListener("submit", emailHandler);
  }

})();
