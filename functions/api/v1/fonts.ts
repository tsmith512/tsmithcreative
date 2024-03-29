const HFJ_BASE = 'https://cloud.typography.com/6795652/7424152/css/fonts.css';

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

  const outboundHeaders = {
    accept: 'text/css,*/*;q=0.1',
    // Could not figure out what to do with upstream encoded responses, so
    // ask for plaintext unencoded. Skip this header on the _output_ to allow
    // CF to apply gzip or brotli as accepted by the end-client.
    'accept-encoding': '',
    'cache-control': 'no-cache',
    host: 'cloud.typography.com',
    pragma: 'no-cache',
    referer: 'https://tsmith.com/',
    'user-agent': request.headers.get('user-agent'),
  };

  const payload = await fetch(HFJ_BASE, {
    headers: outboundHeaders,
  });

  // fetch() will follow the redirect code from typography.com and the payload
  // will contain the self-hosted, user-agent-dependent CSS response.

  if (payload.status == 200) {
    const response = new Response(
      await payload.text(),
      {
        status: 200,
        headers: {
          'content-type': payload.headers.get('content-type'),
          // Yes, vary on user-agent, because the payload is different depending
          // on browser support. I could probably bucket this, but I don't want
          // to have to maintain that.
          'vary': 'Accept-Encoding, User-Agent',
          // Allow a short-term cache within a user's own browser only
          'cache-control': 'private, max-age=604800',
        }
      }
    );

    // @TODO: This could be cached to be faster, but this is good for a 1.0.
    // Anecdotally, this went from 159ms total with two requests to ~118 with 1.
    return response;
  }

  return new Response(
    `Error: ${payload.status} - ${payload.statusText}`, {
      status: 500
    }
  );
}
