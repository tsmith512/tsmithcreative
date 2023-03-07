import { AwsClient } from 'aws4fetch';

const SES_ENDPOINT = 'https://email.us-east-2.amazonaws.com/v2/email/outbound-emails';
const TURNSTILE_ENDPOINT = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

const corsHeaders = new Headers({
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': '*',
});

export async function onRequest(context) {
  // Contents of context object
  const {
    request, // same as existing Worker API
    env, // same as existing Worker API
    params, // if filename includes [id] or [[path]]
    waitUntil, // same as ctx.waitUntil in existing Worker API
    passThroughOnException, // same as ctx.passThroughOnException in existing Worker API
    next, // used for middleware or to fetch assets
    data, // arbitrary space for passing data between middlewares
  } = context;

  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  if (request.method !== 'POST') {
    return new Response('Bad Request', {
      status: 400,
      headers: corsHeaders
    });
  }

  const aws = new AwsClient({
    accessKeyId: context.env.AWS_ACCESS_KEY,
    secretAccessKey: context.env.AWS_SECRET_KEY,
  });

  const {
    from = "",
    replyto = context.env.FROM_ADDRESS,
    message = "",
    turnstile = false,
  } = await request.json();

  // Cloudflare Turnstile Verification
  let tsVerified: any = false;

  if (turnstile) {
    let tsFormData = new FormData();
    tsFormData.append('secret', context.env.TURNSTILE_SERVER_KEY);
    tsFormData.append('response', turnstile);
    tsFormData.append('remoteip', request.headers.get('CF-Connecting-IP'));

    const tsResponse = await fetch(TURNSTILE_ENDPOINT, {
      method: 'POST',
      body: tsFormData,
    });

    tsVerified = await tsResponse.json();
  }

  const messagePayload = {
    "Destination": {
      "ToAddresses": [ context.env.FROM_ADDRESS ],
    },
    "FromEmailAddress": context.env.FROM_ADDRESS,
    "Source": context.env.FROM_ADDRESS,
    "ReplyToAddresses": [ replyto ],

    "Content": {
      "Simple": {
        "Subject": {
          "Charset": "UTF-8",
          "Data": `Website Referral Form from ${from}`,
        },
        "Body": {
          "Text": {
            "Charset": "UTF-8",
            "Data": message + "\n\n" + JSON.stringify(tsVerified),
          },
        },
      },
    },
  };

  // Build signed request with aws4fetch
  const signedRequest = await aws.sign(SES_ENDPOINT, {
    method: 'POST',
    body: JSON.stringify(messagePayload),
  });

  // Send the SES request
  const sesResponse = await fetch(signedRequest);

  // Return a simplified response to frontend
  const { ok, status } = sesResponse;

  if (ok) {
    return new Response(`SES responded okay ${status}`, {
      status: 200,
      headers: corsHeaders,
    });
  }
  else {
    console.log(`SES responded with ${status}: ${await sesResponse.text()}`);
    return new Response(`SES responded with error ${status}`, {
      status: 500,
      headers: corsHeaders,
    });
  }
}
