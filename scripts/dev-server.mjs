import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
const dist = new URL('../dist/', import.meta.url);
// Load only the two credential names we support; never print their values.
try {
  const env = await readFile(new URL('.env.local', dist), 'utf8');
  for (const name of ['AI_GATEWAY_API_KEY', 'VERCEL_OIDC_TOKEN']) {
    const match = env.match(new RegExp(`^${name}=(.*)$`, 'm'));
    if (match && !process.env[name]) process.env[name] = match[1].trim().replace(/^"|"$/g, '').replace(/\\n/g, '\n');
  }
} catch (error) { if (error.code !== 'ENOENT') throw error; }
const { POST, GET } = await import(new URL('api/chat.mjs', dist));
const assets = { '/': ['index.html', 'text/html'], '/index.html': ['index.html', 'text/html'], '/style.css': ['style.css', 'text/css'], '/script.js': ['script.js', 'text/javascript'], '/photo.jpg': ['photo.jpg', 'image/jpeg'] };
createServer(async (req, res) => {
  try {
    const url = new URL(req.url, 'http://127.0.0.1:4182');
    if (url.pathname === '/api/chat') {
      const request = new Request(url, { method: req.method, headers: req.headers, ...(req.method !== 'GET' && req.method !== 'HEAD' ? { body: req, duplex: 'half' } : {}) });
      const response = await (req.method === 'POST' ? POST(request) : GET(request));
      res.writeHead(response.status, Object.fromEntries(response.headers));
      res.end(Buffer.from(await response.arrayBuffer()));
      return;
    }
    const asset = assets[url.pathname];
    if (!asset || !['GET', 'HEAD'].includes(req.method)) { res.writeHead(404); res.end('Not found'); return; }
    const data = await readFile(new URL(asset[0], dist));
    res.writeHead(200, { 'Content-Type': asset[1], 'Cache-Control': 'no-store' });
    res.end(req.method === 'HEAD' ? undefined : data);
  } catch { res.writeHead(500); res.end('Preview request failed'); }
}).listen(4182, '127.0.0.1', () => console.log(`Oslo Hack preview: http://127.0.0.1:4182/ (${fileURLToPath(dist)})`));
