/**
 * CryptoVista X Enterprise - Node.js Workstation Server
 * Serves the JavaScript application shell in-memory without any static HTML files.
 * Reverse proxies /api/* requests to the Java 21 REST backend on localhost:8080.
 */

import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PUBLIC_DIR = path.join(__dirname, 'public');

const PORT = 3000;
const JAVA_BACKEND_PORT = 8080;

/**
 * Generates the application document shell completely in JavaScript.
 * Strictly zero .html files saved on disk.
 */
function generateAppShell() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CryptoVista X Enterprise — Authenticated Workstation</title>
  <link rel="stylesheet" href="/css/tokens.css">
  <link rel="stylesheet" href="/css/app.css">
  <style>
    /* Global Clean Typography & Modern Base */
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background-color: var(--cv-bg-page, #F8F9FA);
      color: var(--cv-text-primary, #1E293B);
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      overflow-x: hidden;
    }
  </style>
</head>
<body>
  <div id="app-root"></div>
  <script type="module" src="/js/app.js"></script>
</body>
</html>`;
}

const MIME_TYPES = {
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml'
};

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = url.pathname;

  // 1. API Reverse Proxy to Java 21 REST backend
  if (pathname.startsWith('/api/')) {
    const options = {
      hostname: 'localhost',
      port: JAVA_BACKEND_PORT,
      path: req.url,
      method: req.method,
      headers: {
        ...req.headers,
        host: `localhost:${JAVA_BACKEND_PORT}`
      }
    };

    const proxyReq = http.request(options, (proxyRes) => {
      res.writeHead(proxyRes.statusCode, proxyRes.headers);
      proxyRes.pipe(res, { end: true });
    });

    proxyReq.on('error', (err) => {
      console.warn(`[Proxy Warning] Java backend unavailable on :${JAVA_BACKEND_PORT}. Returning fallback.`, err.message);
      res.writeHead(503, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Backend service unreachable', fallback: true }));
    });

    req.pipe(proxyReq, { end: true });
    return;
  }

  // 2. Static CSS / JS File Serving from public/
  if (pathname.startsWith('/css/') || pathname.startsWith('/js/')) {
    const filePath = path.join(PUBLIC_DIR, pathname);
    fs.stat(filePath, (err, stats) => {
      if (err || !stats.isFile()) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
        return;
      }

      const ext = path.extname(filePath).toLowerCase();
      const contentType = MIME_TYPES[ext] || 'application/octet-stream';

      res.writeHead(200, {
        'Content-Type': contentType,
        'Cache-Control': 'no-cache',
        'Content-Length': stats.size
      });

      fs.createReadStream(filePath).pipe(res);
    });
    return;
  }

  // 3. Dynamic App Shell in JavaScript (Zero HTML files)
  res.writeHead(200, {
    'Content-Type': 'text/html; charset=utf-8',
    'Cache-Control': 'no-cache'
  });
  res.end(generateAppShell());
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`=======================================================`);
  console.log(`CryptoVista X Enterprise Node.js Frontend Online`);
  console.log(`Workstation Address : http://localhost:${PORT}/`);
  console.log(`Java REST Backend   : http://localhost:${JAVA_BACKEND_PORT}/`);
  console.log(`HTML Files In Repo  : 0 (Pure Node.js & JavaScript)`);
  console.log(`=======================================================`);
});
