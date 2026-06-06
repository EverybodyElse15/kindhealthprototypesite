const securityHeaders = {
  "Content-Security-Policy": "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self' data:;",
  "X-Content-Type-Options": "nosniff",
};

function withHeaders(response) {
  const headers = new Headers(response.headers);
  for (const [key, value] of Object.entries(securityHeaders)) {
    headers.set(key, value);
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const assetRequest =
      url.pathname === "/"
        ? new Request(new URL("/index.html", request.url), request)
        : request;

    const response = await env.ASSETS.fetch(assetRequest);
    if (response.status === 404) {
      return withHeaders(await env.ASSETS.fetch(new Request(new URL("/index.html", request.url), request)));
    }
    return withHeaders(response);
  },
};
