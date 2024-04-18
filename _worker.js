addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url);
  const path = url.pathname.replace(/^\/+/, '');

  const githubURL = `https://raw.githubusercontent.com/fuckdcma/${path}`;
  const token = ''; 
  const allowedDomain = 'https://video.p4k.me'; 

  const headers = new Headers(request.headers);
  headers.set('Authorization', `token ${token}`);
  headers.set('Cache-Control', 'max-age=60');
  headers.set('Range', request.headers.get('Range'));

  const newRequest = new Request(githubURL, {
    method: request.method,
    headers: headers
  });

  const response = await fetch(newRequest);

  if (!response.ok) {
    return new Response('CNF.', { status: response.status });
  }

  const modifiedResponse = new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers
  });

  
  modifiedResponse.headers.delete('X-Cache');
  modifiedResponse.headers.delete('X-Cache-Hits');
  modifiedResponse.headers.delete('X-Content-Type-Options');
  modifiedResponse.headers.delete('X-Fastly-Request-Id');
  modifiedResponse.headers.delete('X-Frame-Options');
  modifiedResponse.headers.delete('X-Github-Request-Id');
  modifiedResponse.headers.delete('X-Served-By');
  modifiedResponse.headers.delete('X-Timer');
  modifiedResponse.headers.delete('X-Xss-Protection');
  modifiedResponse.headers.delete('Source-Age');
  modifiedResponse.headers.delete('Strict-Transport-Security');
  modifiedResponse.headers.delete('Date');
  modifiedResponse.headers.delete('Etag');
  modifiedResponse.headers.delete('Expires');
  modifiedResponse.headers.delete('Nel');
  modifiedResponse.headers.delete('Report-To');
  modifiedResponse.headers.set('Access-Control-Allow-Origin', allowedDomain);
  modifiedResponse.headers.set('Origin', allowedDomain);

  return modifiedResponse;
    }
