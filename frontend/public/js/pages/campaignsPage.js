/**
 * CryptoVista X Enterprise - Module 10: Campaigns and Communications (Pages 79 – 84)
 * Outreach campaigns, consent tracking, delivery audit history, and message templates
 */

import { store } from '../state.js';

let localCampaigns = [
  { id: 'CMP-201', title: 'Q4 Institutional Algorithmic API Release', segment: 'Institutional Funds & Desks', status: 'SENT', recipients: 42, openRate: 88.1, ctr: 45.2, date: '2026-11-01' },
  { id: 'CMP-202', title: 'Simulated Multi-Asset Ledger V2 Upgrade Brief', segment: 'All Enterprise Clients', status: 'ACTIVE', recipients: 128, openRate: 74.5, ctr: 32.0, date: '2026-11-05' },
  { id: 'CMP-203', title: 'Annual Retainer License Renewal Window', segment: 'Wealth Advisory Partners', status: 'SCHEDULED', recipients: 18, openRate: 0, ctr: 0, date: '2026-11-15' }
];

export function renderCampaignsPage(subRoute = 'list') {
  const totalSent = localCampaigns.reduce((sum, c) => sum + c.recipients, 0);

  return `
    <div class="content-header">
      <div>
        <h1 class="page-title">Enterprise Communications & Campaigns</h1>
        <p class="page-subtitle">Product announcements, compliance dispatches, and institutional outreach templates.</p>
      </div>
      <div style="display:flex; gap:10px;">
        <button class="btn btn-primary" id="btn-create-campaign">+ Create Campaign</button>
      </div>
    </div>

    <!-- KPI Grid -->
    <div class="kpi-grid" style="grid-template-columns:repeat(4, 1fr); margin-bottom:20px;">
      <div class="kpi-card">
        <div class="kpi-label">TOTAL CAMPAIGNS</div>
        <div class="kpi-value">${localCampaigns.length}</div>
        <div class="kpi-delta">Enterprise Tenant Scoped</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">RECIPIENTS REACHED</div>
        <div class="kpi-value">${totalSent}</div>
        <div class="kpi-delta kpi-delta-up">100% Consent Verified</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">AVG OPEN RATE</div>
        <div class="kpi-value">81.3%</div>
        <div class="kpi-delta kpi-delta-up">Institutional High Benchmark</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">DELIVERY STATUS</div>
        <div class="kpi-value">Simulated</div>
        <div class="kpi-delta">Sandbox Notification Bus</div>
      </div>
    </div>

    <!-- Sub-navigation tabs -->
    <div style="display:flex; gap:16px; border-bottom:1px solid var(--cv-border); margin-bottom:20px; font-size:13px; font-weight:600;">
      <a href="#/app/communications/campaigns/list" class="tab-link ${subRoute === 'list' ? 'active-tab' : ''}" style="padding:8px 12px; text-decoration:none; color:${subRoute === 'list' ? 'var(--cv-brand-green)' : 'var(--cv-text-secondary)'}; border-bottom:${subRoute === 'list' ? '2px solid var(--cv-brand-green)' : 'none'};">Campaign List</a>
      <a href="#/app/communications/templates" class="tab-link ${subRoute === 'templates' ? 'active-tab' : ''}" style="padding:8px 12px; text-decoration:none; color:${subRoute === 'templates' ? 'var(--cv-brand-green)' : 'var(--cv-text-secondary)'}; border-bottom:${subRoute === 'templates' ? '2px solid var(--cv-brand-green)' : 'none'};">Templates</a>
      <a href="#/app/communications/history" class="tab-link ${subRoute === 'history' ? 'active-tab' : ''}" style="padding:8px 12px; text-decoration:none; color:${subRoute === 'history' ? 'var(--cv-brand-green)' : 'var(--cv-text-secondary)'}; border-bottom:${subRoute === 'history' ? '2px solid var(--cv-brand-green)' : 'none'};">Delivery Audit</a>
    </div>

    ${subRoute === 'templates' ? `
      <!-- Templates View -->
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:20px;">
        <div class="panel">
          <span class="badge badge-neutral" style="margin-bottom:8px;">TEMPLATE 1</span>
          <h4 style="font-size:16px; font-weight:700; margin-bottom:6px;">Trading API Key Provisioning Notification</h4>
          <p style="font-size:12.5px; color:var(--cv-text-secondary); margin-bottom:12px;">Dispatched automatically upon completion of customer onboarding technical gate.</p>
          <div style="background:var(--cv-bg-page); padding:10px; border-radius:3px; font-family:monospace; font-size:11px; color:#4B5563;">
            Dear {{customer_name}}, your scoped simulated algorithmic API endpoint has been authorized under tenant {{tenant_id}}.
          </div>
        </div>

        <div class="panel">
          <span class="badge badge-neutral" style="margin-bottom:8px;">TEMPLATE 2</span>
          <h4 style="font-size:16px; font-weight:700; margin-bottom:6px;">Annual Retainer Invoice Notification</h4>
          <p style="font-size:12.5px; color:var(--cv-text-secondary); margin-bottom:12px;">Dispatched 30 days prior to enterprise software subscription term expiration.</p>
          <div style="background:var(--cv-bg-page); padding:10px; border-radius:3px; font-family:monospace; font-size:11px; color:#4B5563;">
            Invoice {{invoice_number}} has been generated for software subscription renewal covering {{license_period}}.
          </div>
        </div>
      </div>
    ` : `
      <!-- Campaign Table -->
      <div class="panel">
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>Campaign ID</th>
                <th>Subject / Title</th>
                <th>Target Audience</th>
                <th>Status</th>
                <th>Recipients</th>
                <th>Open Rate</th>
                <th>CTR</th>
                <th>Dispatch Date</th>
              </tr>
            </thead>
            <tbody>
              ${localCampaigns.map(c => `
                <tr>
                  <td style="font-family:monospace; font-weight:600;">${c.id}</td>
                  <td><strong>${c.title}</strong></td>
                  <td style="color:var(--cv-text-secondary);">${c.segment}</td>
                  <td><span class="badge ${c.status === 'SENT' ? 'badge-positive' : 'badge-neutral'}">${c.status}</span></td>
                  <td>${c.recipients}</td>
                  <td style="font-weight:600;">${c.openRate}%</td>
                  <td>${c.ctr}%</td>
                  <td style="font-size:12px; color:var(--cv-text-muted);">${c.date}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `}
  `;
}

export function initCampaignsListeners() {
  const btnCreate = document.getElementById('btn-create-campaign');
  if (btnCreate) {
    btnCreate.onclick = () => {
      const title = prompt('Enter Campaign Title:');
      if (!title) return;
      const segment = prompt('Target Segment:', 'Institutional Funds') || 'Institutional Funds';

      localCampaigns.unshift({
        id: 'CMP-' + (localCampaigns.length + 201),
        title,
        segment,
        status: 'SCHEDULED',
        recipients: 50,
        openRate: 0,
        ctr: 0,
        date: new Date().toISOString().substring(0, 10)
      });
      window.dispatchEvent(new Event('hashchange'));
    };
  }
}
