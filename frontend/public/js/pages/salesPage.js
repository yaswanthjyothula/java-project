/**
 * CryptoVista X Enterprise - Module 7: Sales and Opportunities (Pages 49 – 56)
 * Kanban Pipeline, Institutional ARR Forecasts, and Deal Progression
 */

import { store } from '../state.js';

let localOpportunities = [
  { id: 'OPP-101', name: 'Bharat Digital Custody — Enterprise Desk', customer: 'Bharat Digital Custody Pvt Ltd', stage: 'PROPOSAL', valueInr: 2400000, probability: 75, rep: 'Anand Verma', closeDate: '2026-11-30' },
  { id: 'OPP-102', name: 'Deccan Algorithmic Fund — Terminal Expansion', customer: 'Deccan Algorithmic Fund LLP', stage: 'QUALIFICATION', valueInr: 1650000, probability: 50, rep: 'Neha Sharma', closeDate: '2026-12-15' },
  { id: 'OPP-103', name: 'Zenith Family Office — Wealth Simulator License', customer: 'Zenith Family Office Advisors', stage: 'WON', valueInr: 1200000, probability: 100, rep: 'Vikram Malhotra', closeDate: '2026-10-31' },
  { id: 'OPP-104', name: 'Equitas Treasury — Full Suite Pilot', customer: 'Equitas Treasury Advisory', stage: 'PROSPECTING', valueInr: 1800000, probability: 25, rep: 'Anand Verma', closeDate: '2027-01-20' }
];

export function renderSalesPage(subRoute = 'pipeline') {
  const totalPipelineVal = localOpportunities.reduce((sum, o) => sum + (o.stage !== 'LOST' ? o.valueInr : 0), 0);
  const weightedPipelineVal = localOpportunities.reduce((sum, o) => sum + (o.stage !== 'LOST' ? (o.valueInr * o.probability / 100) : 0), 0);
  const wonVal = localOpportunities.filter(o => o.stage === 'WON').reduce((sum, o) => sum + o.valueInr, 0);

  const stages = [
    { key: 'PROSPECTING', label: '1. Prospecting' },
    { key: 'QUALIFICATION', label: '2. Qualification' },
    { key: 'PROPOSAL', label: '3. Proposal / Review' },
    { key: 'WON', label: '4. Closed Won' }
  ];

  return `
    <div class="content-header">
      <div>
        <h1 class="page-title">Sales Pipeline & Institutional Opportunities</h1>
        <p class="page-subtitle">Multi-tier opportunity management for enterprise software licensing and subscriptions.</p>
      </div>
      <div style="display:flex; gap:10px;">
        <button class="btn btn-primary" id="btn-create-opp">+ New Opportunity</button>
      </div>
    </div>

    <!-- Sales Metrics Grid -->
    <div class="kpi-grid" style="grid-template-columns:repeat(4, 1fr); margin-bottom:20px;">
      <div class="kpi-card">
        <div class="kpi-label">TOTAL PIPELINE ARR</div>
        <div class="kpi-value">₹${(totalPipelineVal / 100000).toFixed(2)} Lakh</div>
        <div class="kpi-delta">${localOpportunities.length} Active Deals</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">WEIGHTED FORECAST</div>
        <div class="kpi-value" style="color:var(--cv-brand-green);">₹${(weightedPipelineVal / 100000).toFixed(2)} Lakh</div>
        <div class="kpi-delta">Probability Adjusted</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">CLOSED WON (YTD)</div>
        <div class="kpi-value">₹${(wonVal / 100000).toFixed(2)} Lakh</div>
        <div class="kpi-delta kpi-delta-up">100% Retainer Collected</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">AVG WIN RATE</div>
        <div class="kpi-value">68.5%</div>
        <div class="kpi-delta kpi-delta-up">+4.2% QoQ</div>
      </div>
    </div>

    <!-- Sub-navigation tabs -->
    <div style="display:flex; gap:16px; border-bottom:1px solid var(--cv-border); margin-bottom:20px; font-size:13px; font-weight:600;">
      <a href="#/app/crm/opportunities/pipeline" class="tab-link ${subRoute === 'pipeline' ? 'active-tab' : ''}" style="padding:8px 12px; text-decoration:none; color:${subRoute === 'pipeline' ? 'var(--cv-brand-green)' : 'var(--cv-text-secondary)'}; border-bottom:${subRoute === 'pipeline' ? '2px solid var(--cv-brand-green)' : 'none'};">Kanban Pipeline</a>
      <a href="#/app/crm/opportunities" class="tab-link ${subRoute === 'list' ? 'active-tab' : ''}" style="padding:8px 12px; text-decoration:none; color:${subRoute === 'list' ? 'var(--cv-brand-green)' : 'var(--cv-text-secondary)'}; border-bottom:${subRoute === 'list' ? '2px solid var(--cv-brand-green)' : 'none'};">Deal Roster</a>
      <a href="#/app/crm/sales/forecast" class="tab-link ${subRoute === 'forecast' ? 'active-tab' : ''}" style="padding:8px 12px; text-decoration:none; color:${subRoute === 'forecast' ? 'var(--cv-brand-green)' : 'var(--cv-text-secondary)'}; border-bottom:${subRoute === 'forecast' ? '2px solid var(--cv-brand-green)' : 'none'};">Quarterly Forecast</a>
    </div>

    ${subRoute === 'list' ? `
      <!-- Table View -->
      <div class="panel">
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>Deal ID</th>
                <th>Opportunity Name</th>
                <th>Client Account</th>
                <th>Stage</th>
                <th>Contract Value</th>
                <th>Win Probability</th>
                <th>Assigned Rep</th>
                <th>Target Close</th>
              </tr>
            </thead>
            <tbody>
              ${localOpportunities.map(o => `
                <tr>
                  <td style="font-family:monospace; font-weight:600;">${o.id}</td>
                  <td><strong>${o.name}</strong></td>
                  <td style="color:var(--cv-text-secondary);">${o.customer}</td>
                  <td><span class="badge ${o.stage === 'WON' ? 'badge-positive' : 'badge-neutral'}">${o.stage}</span></td>
                  <td style="font-weight:700;">₹${o.valueInr.toLocaleString('en-IN')}</td>
                  <td>${o.probability}%</td>
                  <td style="font-size:12px;">${o.rep}</td>
                  <td style="font-size:12px; color:var(--cv-text-muted);">${o.closeDate}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    ` : subRoute === 'forecast' ? `
      <!-- Forecast View -->
      <div class="panel">
        <div class="panel-header">
          <span class="panel-title">Q4 Enterprise Software ARR Forecast</span>
          <span class="badge badge-positive">PROJECTION MODEL ACTIVE</span>
        </div>
        <p style="font-size:13px; color:var(--cv-text-secondary); margin-bottom:16px;">
          Calculated using historical conversion velocity, stage weighted probabilities, and contracted recurring license tiers.
        </p>
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>Territory / Desk</th>
                <th>Committed Deals</th>
                <th>Pipeline Best Case</th>
                <th>Weighted Expectation</th>
                <th>Quota Target</th>
                <th>Attainment</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Institutional Wealth (Mumbai)</strong></td>
                <td>₹24,00,000.00</td>
                <td>₹42,00,000.00</td>
                <td>₹31,50,000.00</td>
                <td>₹30,00,000.00</td>
                <td><span class="badge badge-positive">105.0%</span></td>
              </tr>
              <tr>
                <td><strong>Hedge Fund Desk (Bengaluru)</strong></td>
                <td>₹16,50,000.00</td>
                <td>₹28,50,000.00</td>
                <td>₹21,20,000.00</td>
                <td>₹25,00,000.00</td>
                <td><span class="badge badge-neutral">84.8%</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    ` : `
      <!-- Kanban Board View -->
      <div style="display:grid; grid-template-columns:repeat(4, 1fr); gap:16px;">
        ${stages.map(st => {
          const opps = localOpportunities.filter(o => o.stage === st.key);
          const colSum = opps.reduce((sum, o) => sum + o.valueInr, 0);
          return `
            <div style="background:var(--cv-bg-page); border:1px solid var(--cv-border); border-radius:4px; padding:12px; display:flex; flex-direction:column; min-height:420px;">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
                <span style="font-size:12px; font-weight:700; color:var(--cv-text-primary);">${st.label}</span>
                <span class="badge badge-neutral">${opps.length}</span>
              </div>
              <div style="font-size:11.5px; font-weight:700; color:var(--cv-brand-green); margin-bottom:12px;">
                ₹${(colSum / 100000).toFixed(1)}L
              </div>

              <div style="display:flex; flex-direction:column; gap:10px; flex:1;">
                ${opps.map(o => `
                  <div class="card" style="margin-bottom:0; padding:12px; background:#FFFFFF; border:1px solid var(--cv-border); cursor:pointer;">
                    <div style="font-size:11px; font-weight:700; color:var(--cv-text-muted);">${o.id}</div>
                    <div style="font-size:13px; font-weight:700; color:var(--cv-text-primary); margin:4px 0;">${o.name}</div>
                    <div style="font-size:11.5px; color:var(--cv-text-secondary); margin-bottom:8px;">${o.customer}</div>
                    <div style="display:flex; justify-content:space-between; align-items:center; border-top:1px solid var(--cv-border-subtle); padding-top:6px; font-size:12px;">
                      <strong>₹${(o.valueInr / 100000).toFixed(1)}L</strong>
                      <span style="color:var(--cv-text-muted); font-size:11px;">${o.probability}% prob</span>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `}
  `;
}

export function initSalesListeners() {
  const btnCreate = document.getElementById('btn-create-opp');
  if (btnCreate) {
    btnCreate.onclick = () => {
      const name = prompt('Enter Opportunity Name:');
      if (!name) return;
      const customer = prompt('Client Entity Name:', 'Apex Capital Client') || 'Apex Capital Client';
      const valStr = prompt('Expected Contract Value (INR):', '1500000') || '1500000';
      const newOpp = {
        id: 'OPP-' + (localOpportunities.length + 101),
        name,
        customer,
        stage: 'PROSPECTING',
        valueInr: parseFloat(valStr),
        probability: 30,
        rep: store.getState().currentUser.fullName,
        closeDate: '2027-01-31'
      };
      localOpportunities.unshift(newOpp);
      window.dispatchEvent(new Event('hashchange'));
    };
  }
}

