(function(){
  'use strict';

  var form = document.getElementById("contact-form");

  if (form) {
    form.addEventListener("submit", emailHandler);
  }

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

  function emailHandler(e) {
    e.preventDefault();

    const cfEl = document.querySelector('input[name="cf-turnstile-response"]');

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

    var xhr = new XMLHttpRequest();
    xhr.open('POST', form.getAttribute("action"));
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function() {
      if (xhr.status === 200) {
        document.querySelector('.form-wrapper').innerHTML =
          '<h2>Thank you!</h2><p>Your email has been sent, I\'ll get back to you as soon as I can.</p>';
      }
      else {
        document.querySelector('.form-wrapper').innerHTML =
          '<h2>Sorry.</h2><p>An error occurred sending this email. Would you mind trying one of the social media links instead?</p>';
      }
    };
    xhr.onerror = function() {
      document.querySelector('.form-wrapper').innerHTML =
        '<h2>Sorry.</h2><p>An error occurred sending this email. Would you mind trying one of the social media links instead?</p>';
    };
    xhr.send(JSON.stringify(message));
  }
})();
