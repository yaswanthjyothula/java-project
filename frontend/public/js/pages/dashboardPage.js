/**
 * CryptoVista X Enterprise - Module 1: Enterprise Dashboard (Page 14)
 * Consolidated Financial Navigation Hub
 */

import { renderBreadcrumbs, renderPageHeader, renderStatusBadge } from '../components/designSystem.js';

export function renderDashboard(state, quotes, customers, tickets) {
  const currencyFmt = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' });
  const totalNav = state.availableCashInr + state.holdings.reduce((sum, h) => {
    const q = quotes.find(quote => quote.symbol === h.symbol);
    return sum + (h.quantity * (q ? q.priceInr : h.avgCost));
  }, 0);

  return `
    <div>
      ${renderPageHeader(
    'Enterprise Financial Dashboard',
    'Consolidated market intelligence, virtual portfolio accounting, and operational CRM',
    [
      { label: 'Overview' },
      { label: 'Dashboard' }
    ],
    [
      { label: 'Simulate Trade &rarr;', variant: 'btn-primary', onclick: `location.hash='#/app/trading';` },
      { label: 'Customer 360 &rarr;', variant: 'btn-outline', onclick: `location.hash='#/app/crm/customers';` }
    ]
  )}

      <!-- Primary KPI Grid -->
      <div class="kpi-grid">
        <div class="kpi-card" style="cursor:pointer;" onclick="location.hash='#/app/portfolio';">
          <div class="kpi-label">SIMULATED PORTFOLIO NAV</div>
          <div class="kpi-value tabular-nums">${currencyFmt.format(totalNav)}</div>
          <div class="kpi-delta kpi-delta-up">+4.12% Unrealized P&L &bull; View Portfolio &rarr;</div>
        </div>
        <div class="kpi-card" style="cursor:pointer;" onclick="location.hash='#/app/crm/sales';">
          <div class="kpi-label">ACTIVE SALES PIPELINE</div>
          <div class="kpi-value tabular-nums">₹52,50,000.00</div>
          <div class="kpi-delta">Across 4 qualified opportunities &rarr;</div>
        </div>
        <div class="kpi-card" style="cursor:pointer;" onclick="location.hash='#/app/crm/customers';">
          <div class="kpi-label">INSTITUTIONAL CLIENTS</div>
          <div class="kpi-value">${customers.length}</div>
          <div class="kpi-delta kpi-delta-up">Average Health Score: 86 / 100 &rarr;</div>
        </div>
        <div class="kpi-card" style="cursor:pointer;" onclick="location.hash='#/app/customer-operations/support';">
          <div class="kpi-label">ACTIVE SUPPORT INCIDENTS</div>
          <div class="kpi-value" style="color:var(--cv-warning);">${tickets.length}</div>
          <div class="kpi-delta">99.4% SLA Compliance &bull; View Queue &rarr;</div>
        </div>
      </div>

      <!-- Quick Market Benchmark Cards (Connected directly to Asset Details) -->
      <div class="panel" style="margin-bottom:20px;">
        <div class="panel-header">
          <div>
            <span class="panel-title">Live Digital Asset Telemetry & Benchmarks</span>
            <div style="font-size:12px; color:var(--cv-text-muted); margin-top:2px;">Click any asset card to open comprehensive telemetry & historical charts</div>
          </div>
          <a href="#/app/markets" class="btn btn-outline" style="font-size:12px; padding:4px 10px;">Market Overview &rarr;</a>
        </div>
        <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:16px;">
          ${quotes.slice(0, 3).map(q => `
            <div style="background:var(--cv-bg-page); border:1px solid var(--cv-border); border-radius:3px; padding:14px; cursor:pointer; transition:transform 0.15s ease;"
                 onclick="location.hash='#/app/markets/assets/${q.symbol}';"
                 onmouseover="this.style.borderColor='var(--cv-brand-green)';"
                 onmouseout="this.style.borderColor='var(--cv-border)';">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
                <strong style="font-size:15px; color:var(--cv-text-primary);">${q.symbol} &bull; ${q.name}</strong>
                <span class="badge ${q.change24hPct >= 0 ? 'badge-positive' : 'badge-negative'}">
                  ${q.change24hPct >= 0 ? '+' : ''}${q.change24hPct.toFixed(2)}%
                </span>
              </div>
              <div style="font-size:19px; font-weight:800; font-family:monospace; margin-bottom:4px;">
                ${currencyFmt.format(q.priceInr)}
              </div>
              <div style="display:flex; justify-content:space-between; font-size:11px; color:var(--cv-text-secondary);">
                <span>${renderStatusBadge(q.isMock ? 'DETERMINISTIC MOCK' : 'GROWW REFERENCE')}</span>
                <span style="color:var(--cv-brand-green); font-weight:600;">View Telemetry &rarr;</span>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Connected Workstation Feeds Grid -->
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:20px;">
        <!-- Connected Customer Roster Panel -->
        <div class="panel" style="margin-bottom:0;">
          <div class="panel-header">
            <span class="panel-title">Institutional Client Directory</span>
            <a href="#/app/crm/customers" style="font-size:12px; color:var(--cv-brand-green); font-weight:600;">View All &rarr;</a>
          </div>
          <div class="table-container">
            <table>
              <thead>
                <tr>
                  <th>Account Code</th>
                  <th>Legal Entity Name</th>
                  <th>Health</th>
                  <th>Customer 360</th>
                </tr>
              </thead>
              <tbody>
                ${customers.map(c => `
                  <tr>
                    <td><code>${c.customerNumber}</code></td>
                    <td><strong>${c.name}</strong></td>
                    <td><span class="badge badge-positive">${c.healthScore || 88} / 100</span></td>
                    <td>
                      <a href="#/app/crm/customers/${c.id}" class="btn btn-outline" style="padding:3px 8px; font-size:11px;">
                        Customer 360 &rarr;
                      </a>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <!-- Connected SLA Incident Queue Panel -->
        <div class="panel" style="margin-bottom:0;">
          <div class="panel-header">
            <span class="panel-title">SLA Priority Support Incidents</span>
            <a href="#/app/customer-operations/support/tickets" style="font-size:12px; color:var(--cv-brand-green); font-weight:600;">View Queue &rarr;</a>
          </div>
          <div class="table-container">
            <table>
              <thead>
                <tr>
                  <th>Ticket</th>
                  <th>Incident Subject</th>
                  <th>Priority</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                ${tickets.map(t => `
                  <tr>
                    <td><code>${t.ticketNumber}</code></td>
                    <td style="max-width:200px; text-overflow:ellipsis; overflow:hidden; white-space:nowrap;">${t.subject}</td>
                    <td>${renderStatusBadge(t.priority)}</td>
                    <td>
                      <a href="#/app/customer-operations/support/tickets/${t.id}" class="btn btn-outline" style="padding:3px 8px; font-size:11px;">
                        Triage &rarr;
                      </a>
                    </td>
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
