/**
 * CryptoVista X Enterprise - Dashboard Page (Module A)
 */

export function renderDashboard(state, quotes, customers, tickets) {
  const currencyFmt = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' });
  const totalNav = state.availableCashInr + state.holdings.reduce((sum, h) => {
    const q = quotes.find(quote => quote.symbol === h.symbol);
    return sum + (h.quantity * (q ? q.priceInr : h.avgCost));
  }, 0);

  return `
    <div class="page-wrapper">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
        <div>
          <h1 class="page-title">Enterprise Dashboard</h1>
          <p class="page-subtitle">Consolidated market intelligence, virtual portfolio accounting, and operational CRM.</p>
        </div>
        <div style="display:flex; gap:10px;">
          <span class="badge badge-info">SHARED MYSQL 8 PERSISTENCE</span>
          <span class="badge badge-positive">BALANCED LEDGER POSTED</span>
        </div>
      </div>

      <!-- KPI Grid -->
      <div class="kpi-grid">
        <div class="kpi-card">
          <div class="kpi-title">Simulated Portfolio NAV</div>
          <div class="kpi-value tabular-nums">${currencyFmt.format(totalNav)}</div>
          <div class="kpi-sub" style="color:var(--cv-positive);">+4.12% Simulated Unrealized P&L</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-title">Active Enterprise Pipeline</div>
          <div class="kpi-value tabular-nums">₹40,50,000.00</div>
          <div class="kpi-sub">Across 2 qualified opportunities</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-title">Institutional Accounts</div>
          <div class="kpi-value">${customers.length}</div>
          <div class="kpi-sub">Average Health Score: 86 / 100</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-title">Active Support Cases</div>
          <div class="kpi-value">${tickets.length}</div>
          <div class="kpi-sub" style="color:var(--cv-warning);">1 Critical / High SLA Queue</div>
        </div>
      </div>

      <!-- Market Movers Snapshot -->
      <div class="card">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">
          <h3 style="font-size:15px; font-weight:700;">Digital Asset Benchmark Reference Quotes</h3>
          <a href="#/markets" style="font-size:12.5px; font-weight:600;">View All Assets &rarr;</a>
        </div>
        <div class="table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>Asset</th>
                <th>Reference Price</th>
                <th>24h Change</th>
                <th>24h High</th>
                <th>24h Low</th>
                <th>24h Volume (INR)</th>
                <th>Data Source</th>
              </tr>
            </thead>
            <tbody>
              ${quotes.slice(0, 4).map(q => `
                <tr>
                  <td><strong>${q.symbol}</strong> <span style="color:var(--cv-text-muted); font-size:12px;">${q.name}</span></td>
                  <td class="tabular-nums" style="font-weight:600;">${currencyFmt.format(q.priceInr)}</td>
                  <td class="tabular-nums" style="font-weight:600; color:${q.change24hPct >= 0 ? 'var(--cv-positive)' : 'var(--cv-negative)'};">
                    ${q.change24hPct >= 0 ? '+' : ''}${q.change24hPct.toFixed(2)}%
                  </td>
                  <td class="tabular-nums">${currencyFmt.format(q.high24hInr)}</td>
                  <td class="tabular-nums">${currencyFmt.format(q.low24hInr)}</td>
                  <td class="tabular-nums">${currencyFmt.format(q.volume24hInr)}</td>
                  <td>
                    <span class="badge ${q.isMock ? 'badge-warning' : 'badge-info'}">
                      ${q.isMock ? 'DETERMINISTIC MOCK' : 'GROWW REFERENCE'}
                    </span>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Quick Operations Split -->
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:20px;">
        <div class="card">
          <h3 style="font-size:15px; font-weight:700; margin-bottom:12px;">Institutional Customer Directory</h3>
          <div class="table-container">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Customer ID</th>
                  <th>Legal Entity</th>
                  <th>Health</th>
                </tr>
              </thead>
              <tbody>
                ${customers.map(c => `
                  <tr>
                    <td><code>${c.customerNumber}</code></td>
                    <td><strong>${c.name}</strong></td>
                    <td><span class="badge badge-positive">${c.healthScore} / 100</span></td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <div class="card">
          <h3 style="font-size:15px; font-weight:700; margin-bottom:12px;">SLA Priority Support Queue</h3>
          <div class="table-container">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Ticket</th>
                  <th>Subject</th>
                  <th>Priority</th>
                </tr>
              </thead>
              <tbody>
                ${tickets.map(t => `
                  <tr>
                    <td><code>${t.ticketNumber}</code></td>
                    <td style="max-width:240px; text-overflow:ellipsis; overflow:hidden; white-space:nowrap;">${t.subject}</td>
                    <td><span class="badge ${t.priority === 'HIGH' ? 'badge-negative' : 'badge-info'}">${t.priority}</span></td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  `;
}
