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
    // ask for plaintext unencoded.
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
          'content-encoding': payload.headers.get('content-encoding'),
        }
      }
    );

    return response;
  }

  return new Response(
    `Error: ${payload.status} - ${payload.statusText}`, {
      status: 500
    }
  );
}
