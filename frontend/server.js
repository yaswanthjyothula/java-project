/**
 * CryptoVista X Enterprise - Master Node.js Application & API Server
 * Complete Enterprise Runtime (Node.js Web Architecture)
 * Serves Public Website (Pages 1-13) & Authenticated Modules (Pages 14-130)
 * Strictly ZERO HTML files on disk. Pure JavaScript & CSS.
 */

import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PUBLIC_DIR = path.join(__dirname, 'public');

const PORT = 3000;

// In-Memory Multi-Tenant Persisted Data Store (3NF Schema Equivalent)
const db = {
  tenant: { id: 'TENANT-APEX-01', name: 'Apex Capital Advisors', currency: 'INR' },
  users: [
    { id: 'USR-001', email: 'operator@apexcapital.in', passwordHash: 'argon2id_mock_hash_password123', fullName: 'Apex Operator', role: 'OPERATOR' },
    { id: 'USR-002', email: 'anand.v@apexcapital.in', passwordHash: 'argon2id_mock_hash_admin123', fullName: 'Anand Verma', role: 'ADMIN' }
  ],
  sessions: new Map(),
  quotes: [
    { symbol: 'BTC', name: 'Bitcoin', priceInr: 8245100.00, change24hPct: 2.45, high24hInr: 8320000.00, low24hInr: 8110000.00, volume24hInr: 45200000000.00, isMock: false, source: 'GROWW_REFERENCE' },
    { symbol: 'ETH', name: 'Ethereum', priceInr: 298450.00, change24hPct: -1.18, high24hInr: 305000.00, low24hInr: 294000.00, volume24hInr: 18400000000.00, isMock: false, source: 'GROWW_REFERENCE' },
    { symbol: 'SOL', name: 'Solana', priceInr: 16420.00, change24hPct: 5.82, high24hInr: 16900.00, low24hInr: 15400.00, volume24hInr: 8900000000.00, isMock: true, source: 'DETERMINISTIC_MOCK' },
    { symbol: 'MATIC', name: 'Polygon', priceInr: 42.10, change24hPct: 1.15, high24hInr: 43.50, low24hInr: 41.20, volume24hInr: 1200000000.00, isMock: true, source: 'DETERMINISTIC_MOCK' },
    { symbol: 'AVAX', name: 'Avalanche', priceInr: 2840.00, change24hPct: -2.30, high24hInr: 2950.00, low24hInr: 2810.00, volume24hInr: 3100000000.00, isMock: true, source: 'DETERMINISTIC_MOCK' }
  ],
  customers: [
    { id: 'CUST-001', customerNumber: 'CUST-8021', name: 'Bharat Digital Custody Pvt Ltd', type: 'INSTITUTIONAL', lifecycleStage: 'ACTIVE_ENTERPRISE', healthScore: 94 },
    { id: 'CUST-002', customerNumber: 'CUST-8022', name: 'Deccan Algorithmic Fund LLP', type: 'INSTITUTIONAL', lifecycleStage: 'ACTIVE_ENTERPRISE', healthScore: 88 },
    { id: 'CUST-003', customerNumber: 'CUST-8023', name: 'Zenith Family Office Advisors', type: 'WEALTH', lifecycleStage: 'ONBOARDING', healthScore: 76 }
  ],
  leads: [
    { id: 'LEAD-001', name: 'Vikram Malhotra', company: 'Malhotra Family Office', email: 'vikram@malhotrawealth.in', status: 'QUALIFIED', score: 85, estimatedValueInr: 2400000 },
    { id: 'LEAD-002', name: 'Ananya Deshmukh', company: 'Deccan Fintech Labs', email: 'ananya@deccanfintech.com', status: 'NEW', score: 65, estimatedValueInr: 1650000 }
  ],
  tickets: [
    { id: 'TCK-001', ticketNumber: 'TCK-1094', customerId: 'CUST-001', subject: 'Simulated matching engine latency benchmark on ETH limit orders', priority: 'HIGH', status: 'IN_PROGRESS', slaMinutesRemaining: 180, internalNotes: 'Triage ongoing with algorithmic core.' },
    { id: 'TCK-002', ticketNumber: 'TCK-1095', customerId: 'CUST-002', subject: 'Quarterly ledger audit export request for Q3 virtual settlements', priority: 'NORMAL', status: 'OPEN', slaMinutesRemaining: 420, internalNotes: 'Requested SHA-256 batch ledger hash.' }
  ],
  audit: [
    { id: 1001, actor: 'operator@apexcapital.in', action: 'PASSWORD_VERIFIED', entityType: 'AUTH_SESSION', result: 'SUCCESS', details: 'Single-step User ID and Password verification for tenant TENANT-APEX-01' },
    { id: 1002, actor: 'operator@apexcapital.in', action: 'ORDER_SIMULATED', entityType: 'ORDER', result: 'SUCCESS', details: 'Executed BUY 0.25 BTC at reference quote' }
  ]
};

function generateAppShell() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CryptoVista X Enterprise — Institutional Digital Asset Workstation</title>
  <link rel="stylesheet" href="/css/tokens.css">
  <link rel="stylesheet" href="/css/app.css">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background-color: var(--cv-bg-page, #F7F8FA);
      color: var(--cv-text-primary, #171A21);
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

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = url.pathname;

  // CORS & Security Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // Helper for JSON responses
  const sendJson = (statusCode, data) => {
    res.writeHead(statusCode, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify(data));
  };

  // Helper for reading JSON body
  const readBody = () => new Promise((resolve) => {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try { resolve(JSON.parse(body || '{}')); } catch { resolve({}); }
    });
  });

  // ==========================================
  // NATIVE NODE.JS REST API (Zero Java Dependency)
  // ==========================================
  if (pathname.startsWith('/api/v1/')) {
    const apiPath = pathname.replace('/api/v1', '');

    if (apiPath === '/health') {
      return sendJson(200, {
        status: 'UP',
        runtime: 'Node.js Enterprise Web Architecture',
        version: '4.2.0',
        tenant: db.tenant.id,
        authMode: 'USER_ID_AND_PASSWORD_ONLY (Zero MFA)'
      });
    }

    if (apiPath === '/auth/login' && req.method === 'POST') {
      const { userId, password } = await readBody();
      if (!userId || !password) {
        return sendJson(400, { error: 'User ID and Password are required.' });
      }

      // Single-step validation: No MFA, No OTP, No TOTP
      if (password === 'password123' || password === 'admin123') {
        const token = 'cvx_sess_' + Math.random().toString(36).substring(2) + Date.now();
        const user = {
          id: userId.includes('anand') ? 'USR-002' : 'USR-001',
          email: userId,
          fullName: userId.includes('anand') ? 'Anand Verma' : 'Apex Operator',
          role: userId.includes('anand') ? 'ADMIN' : 'OPERATOR'
        };
        db.sessions.set(token, { user, tenantId: db.tenant.id, createdAt: new Date() });

        db.audit.unshift({
          id: db.audit.length + 1001,
          actor: userId,
          action: 'PASSWORD_VERIFIED',
          entityType: 'AUTH_SESSION',
          result: 'SUCCESS',
          details: 'Single-step User ID and Password verification for tenant ' + db.tenant.id
        });

        return sendJson(200, {
          status: 'AUTHENTICATED',
          sessionToken: token,
          tenantId: db.tenant.id,
          user,
          expiresAt: new Date(Date.now() + 8 * 3600 * 1000).toISOString()
        });
      }

      db.audit.unshift({
        id: db.audit.length + 1001,
        actor: userId,
        action: 'LOGIN_FAILED',
        entityType: 'AUTH_SESSION',
        result: 'FAILED',
        details: 'Invalid credentials supplied'
      });

      return sendJson(401, { error: 'Invalid User ID or Password.' });
    }

    if (apiPath === '/markets/quotes') {
      return sendJson(200, db.quotes);
    }

    if (apiPath === '/crm/customers') {
      return sendJson(200, db.customers);
    }

    if (apiPath === '/crm/leads') {
      return sendJson(200, db.leads);
    }

    if (apiPath === '/trading/accounts') {
      return sendJson(200, {
        accountId: 'VA-88392',
        tenantId: db.tenant.id,
        currency: 'INR',
        availableCash: 10000000.00,
        mode: 'SIMULATED_RISK_FREE'
      });
    }

    if (apiPath === '/support/tickets') {
      return sendJson(200, db.tickets);
    }

    if (apiPath === '/admin/audit') {
      return sendJson(200, db.audit);
    }

    return sendJson(404, { error: 'API route not found' });
  }

  // ==========================================
  // STATIC ASSET SERVING
  // ==========================================
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

  // ==========================================
  // DYNAMIC DOCUMENT SHELL (Zero HTML on Disk)
  // ==========================================
  res.writeHead(200, {
    'Content-Type': 'text/html; charset=utf-8',
    'Cache-Control': 'no-cache'
  });
  res.end(generateAppShell());
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`=======================================================`);
  console.log(`CryptoVista X Enterprise Node.js Master Server Active`);
  console.log(`Workstation Address : http://localhost:${PORT}/`);
  console.log(`130 Pages Routing   : http://localhost:${PORT}/#/landing`);
  console.log(`Native Node.js REST : http://localhost:${PORT}/api/v1/health`);
  console.log(`HTML Files In Repo  : 0 (Pure Node.js & JavaScript)`);
  console.log(`=======================================================`);
});
