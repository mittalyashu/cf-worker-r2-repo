import type { Env } from '../../index';

export async function uploadFile(
  request: Request,
  env: Env,
  _: ExecutionContext,
) {
  const responseHeaders = {
    'Access-Control-Allow-Origin':
      env.ENVIRONMENT === 'production'
        ? 'https://example.com'
        : 'http://localhost:3000',
    'Access-Control-Allow-Methods': 'POST',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  const key = 'CABE57CA-89D6-49E3-B88C-1028DC79F3CD.jpg';
  const file = await env.JS_VARIABLE.get(key);
  console.log('f', file);

  return new Response('success!', {
    headers: responseHeaders,
  });
}
