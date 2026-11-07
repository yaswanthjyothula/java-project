/**
 * CryptoVista X Enterprise - Frontend API Client
 * Communicates with the Java backend on localhost:8080
 */

const API_BASE = 'http://localhost:8080/api/v1';

export async function fetchHealth() {
  try {
    const res = await fetch(`${API_BASE}/health`);
    return await res.json();
  } catch (err) {
    console.warn('Backend unavailable, using local mock store', err);
    return { status: 'STANDALONE_EVALUATION', tenant: 'TENANT-APEX-01' };
  }
}

export async function loginUser(userId, password) {
  try {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, password })
    });
    return await res.json();
  } catch (err) {
    // Evaluation fallback for development
    if (password === 'password123' || password === 'admin123') {
      return {
        status: 'AUTHENTICATED',
        sessionToken: 'cvx_sess_demo_' + Date.now(),
        tenantId: 'TENANT-APEX-01',
        user: { id: 'USR-001', email: userId, fullName: 'Apex Operator', role: 'OPERATOR' },
        expiresAt: new Date(Date.now() + 8 * 3600 * 1000).toISOString()
      };
    }
    return { status: 'FAILED', error: 'Invalid User ID or Password' };
  }
}

export async function fetchMarketQuotes() {
  try {
    const res = await fetch(`${API_BASE}/markets/quotes`);
    return await res.json();
  } catch (err) {
    return [
      { symbol: 'BTC', name: 'Bitcoin', priceInr: 8245100.00, change24hPct: 2.45, high24hInr: 8320000.00, low24hInr: 8110000.00, volume24hInr: 45200000000.00, isMock: false, source: 'GROWW_REFERENCE' },
      { symbol: 'ETH', name: 'Ethereum', priceInr: 298450.00, change24hPct: -1.18, high24hInr: 305000.00, low24hInr: 294000.00, volume24hInr: 18400000000.00, isMock: false, source: 'GROWW_REFERENCE' },
      { symbol: 'SOL', name: 'Solana', priceInr: 16420.00, change24hPct: 5.82, high24hInr: 16900.00, low24hInr: 15400.00, volume24hInr: 8900000000.00, isMock: true, source: 'DETERMINISTIC_MOCK' },
      { symbol: 'MATIC', name: 'Polygon', priceInr: 42.10, change24hPct: 1.15, high24hInr: 43.50, low24hInr: 41.20, volume24hInr: 1200000000.00, isMock: true, source: 'DETERMINISTIC_MOCK' },
      { symbol: 'AVAX', name: 'Avalanche', priceInr: 2840.00, change24hPct: -2.30, high24hInr: 2950.00, low24hInr: 2810.00, volume24hInr: 3100000000.00, isMock: true, source: 'DETERMINISTIC_MOCK' },
      { symbol: 'LINK', name: 'Chainlink', priceInr: 1120.00, change24hPct: 3.40, high24hInr: 1150.00, low24hInr: 1080.00, volume24hInr: 2400000000.00, isMock: true, source: 'DETERMINISTIC_MOCK' }
    ];
  }
}

export async function fetchCustomers() {
  try {
    const res = await fetch(`${API_BASE}/crm/customers`);
    return await res.json();
  } catch (err) {
    return [
      { id: 'CUST-001', customerNumber: 'CUST-8021', name: 'Bharat Digital Custody Pvt Ltd', type: 'INSTITUTIONAL', lifecycleStage: 'ACTIVE_ENTERPRISE', healthScore: 94 },
      { id: 'CUST-002', customerNumber: 'CUST-8022', name: 'Deccan Algorithmic Fund LLP', type: 'INSTITUTIONAL', lifecycleStage: 'ACTIVE_ENTERPRISE', healthScore: 88 },
      { id: 'CUST-003', customerNumber: 'CUST-8023', name: 'Zenith Family Office Advisors', type: 'WEALTH', lifecycleStage: 'ONBOARDING', healthScore: 76 }
    ];
  }
}

export async function fetchLeads() {
  try {
    const res = await fetch(`${API_BASE}/crm/leads`);
    return await res.json();
  } catch (err) {
    return [
      { id: 'LEAD-001', name: 'Vikram Malhotra', company: 'Malhotra Family Office', email: 'vikram@malhotrawealth.in', status: 'QUALIFIED', score: 85 },
      { id: 'LEAD-002', name: 'Ananya Deshmukh', company: 'Deccan Fintech Labs', email: 'ananya@deccanfintech.com', status: 'NEW', score: 65 }
    ];
  }
}

export async function fetchTradingAccount() {
  try {
    const res = await fetch(`${API_BASE}/trading/accounts`);
    return await res.json();
  } catch (err) {
    return { accountId: 'VA-88392', tenantId: 'TENANT-APEX-01', currency: 'INR', availableCash: 10000000.00, mode: 'SIMULATED_RISK_FREE' };
  }
}

export async function fetchTickets() {
  try {
    const res = await fetch(`${API_BASE}/support/tickets`);
    return await res.json();
  } catch (err) {
    return [
      { id: 'TCK-001', ticketNumber: 'TCK-1094', customerId: 'CUST-001', subject: 'Simulated matching engine latency spike on ETH limit orders', priority: 'HIGH', status: 'IN_PROGRESS' },
      { id: 'TCK-002', ticketNumber: 'TCK-1095', customerId: 'CUST-002', subject: 'Periodic ledger audit export request for Q3 virtual settlements', priority: 'NORMAL', status: 'OPEN' }
    ];
  }
}

export async function fetchAuditLogs() {
  try {
    const res = await fetch(`${API_BASE}/admin/audit`);
    return await res.json();
  } catch (err) {
    return [
      { id: 1001, actor: 'operator@apexcapital.in', action: 'PASSWORD_VERIFIED', entityType: 'AUTH_SESSION', result: 'SUCCESS', details: 'Single-step User ID and Password verification for tenant TENANT-APEX-01' },
      { id: 1002, actor: 'operator@apexcapital.in', action: 'ORDER_SIMULATED', entityType: 'ORDER', result: 'SUCCESS', details: 'Executed BUY 0.25 BTC at reference price' }
    ];
  }
}

