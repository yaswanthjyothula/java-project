/**
 * CryptoVista X Enterprise - Module 13: Analytics and Reporting (Pages 104 – 112)
 * Executive KPI dashboards, CRM funnel metrics, trading turnover, and compliance exports
 */

import { store } from '../state.js';

export function renderAnalyticsPage(subRoute = 'dashboard') {
  return `
    <div class="content-header">
      <div>
        <h1 class="page-title">Executive Analytics & Business Reporting</h1>
        <p class="page-subtitle">Real-time consolidated telemetry across digital asset simulation, CRM, and support operations.</p>
      </div>
      <div style="display:flex; gap:10px;">
        <button class="btn btn-outline" onclick="alert('Generated quarterly compliance export package (CSV + SHA-256 digest).');" style="font-size:12px;">Export Audit CSV</button>
      </div>
    </div>

    <!-- Analytics KPI Grid -->
    <div class="kpi-grid" style="grid-template-columns:repeat(4, 1fr); margin-bottom:20px;">
      <div class="kpi-card">
        <div class="kpi-label">TOTAL SIMULATED TURNOVER</div>
        <div class="kpi-value">₹8.42 Cr</div>
        <div class="kpi-delta kpi-delta-up">+14.2% MoM Volume</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">SIMULATED FEES ACCRUED</div>
        <div class="kpi-value">₹84,200.00</div>
        <div class="kpi-delta">0.10% Virtual Platform Fee</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">LEAD CONVERSION RATE</div>
        <div class="kpi-value">33.3%</div>
        <div class="kpi-delta kpi-delta-up">Exceeding 25% Baseline</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">SLA RESOLUTION INDEX</div>
        <div class="kpi-value">99.4%</div>
        <div class="kpi-delta kpi-delta-up">Within 4h Target</div>
      </div>
    </div>

    <!-- Sub-navigation tabs -->
    <div style="display:flex; gap:16px; border-bottom:1px solid var(--cv-border); margin-bottom:20px; font-size:13px; font-weight:600;">
      <a href="#/app/analytics" class="tab-link ${subRoute === 'dashboard' ? 'active-tab' : ''}" style="padding:8px 12px; text-decoration:none; color:${subRoute === 'dashboard' ? 'var(--cv-brand-green)' : 'var(--cv-text-secondary)'}; border-bottom:${subRoute === 'dashboard' ? '2px solid var(--cv-brand-green)' : 'none'};">Overview</a>
      <a href="#/app/analytics/trading" class="tab-link ${subRoute === 'trading' ? 'active-tab' : ''}" style="padding:8px 12px; text-decoration:none; color:${subRoute === 'trading' ? 'var(--cv-brand-green)' : 'var(--cv-text-secondary)'}; border-bottom:${subRoute === 'trading' ? '2px solid var(--cv-brand-green)' : 'none'};">Trading Telemetry</a>
      <a href="#/app/analytics/crm" class="tab-link ${subRoute === 'crm' ? 'active-tab' : ''}" style="padding:8px 12px; text-decoration:none; color:${subRoute === 'crm' ? 'var(--cv-brand-green)' : 'var(--cv-text-secondary)'}; border-bottom:${subRoute === 'crm' ? '2px solid var(--cv-brand-green)' : 'none'};">CRM Cohorts</a>
    </div>

    ${subRoute === 'trading' ? `
      <!-- Trading Telemetry -->
      <div class="panel">
        <div class="panel-header">
          <span class="panel-title">Asset Turnover Breakdown (30-Day Simulated Run)</span>
          <span class="badge badge-positive">Double-Entry Verified</span>
        </div>
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>Ticker</th>
                <th>Simulated Trades</th>
                <th>Gross Turnover (INR)</th>
                <th>Avg Slippage</th>
                <th>Accrued Virtual Fees</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>BTC</strong></td>
                <td>148</td>
                <td>₹5,20,40,000.00</td>
                <td>0.018%</td>
                <td>₹52,040.00</td>
              </tr>
              <tr>
                <td><strong>ETH</strong></td>
                <td>92</td>
                <td>₹2,14,20,000.00</td>
                <td>0.021%</td>
                <td>₹21,420.00</td>
              </tr>
              <tr>
                <td><strong>SOL</strong></td>
                <td>64</td>
                <td>₹1,07,40,000.00</td>
                <td>0.022%</td>
                <td>₹10,740.00</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    ` : `
      <!-- Executive Overview -->
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:20px;">
        <div class="panel">
          <h4 style="font-size:16px; font-weight:700; margin-bottom:12px;">Customer Health Distribution</h4>
          <p style="font-size:12.5px; color:var(--cv-text-secondary); margin-bottom:16px;">
            Weighted calculation across system login activity, trade execution volume, and open support tickets.
          </p>
          <div style="display:flex; flex-direction:column; gap:10px;">
            <div>
              <div style="display:flex; justify-content:space-between; font-size:12px; margin-bottom:4px;">
                <span>Healthy (Score &gt; 80%)</span>
                <strong>67% of Clients</strong>
              </div>
              <div style="height:6px; background:var(--cv-bg-page); border-radius:3px; overflow:hidden;">
                <div style="width:67%; height:100%; background:var(--cv-brand-green);"></div>
              </div>
            </div>
            <div>
              <div style="display:flex; justify-content:space-between; font-size:12px; margin-bottom:4px;">
                <span>Moderate Attention (60% - 80%)</span>
                <strong>33% of Clients</strong>
              </div>
              <div style="height:6px; background:var(--cv-bg-page); border-radius:3px; overflow:hidden;">
                <div style="width:33%; height:100%; background:#F59E0B;"></div>
              </div>
            </div>
          </div>
        </div>

        <div class="panel">
          <h4 style="font-size:16px; font-weight:700; margin-bottom:12px;">SLA Priority Resolution Velocity</h4>
          <p style="font-size:12.5px; color:var(--cv-text-secondary); margin-bottom:16px;">
            Mean Time to Resolve (MTTR) by incident criticality tier against contracted enterprise SLA guidelines.
          </p>
          <div style="display:flex; flex-direction:column; gap:10px; font-size:12.5px;">
            <div style="display:flex; justify-content:space-between; border-bottom:1px solid var(--cv-border-subtle); padding-bottom:6px;">
              <span>P1 / Critical (4h SLA):</span>
              <strong style="color:var(--cv-brand-green);">1h 42m MTTR</strong>
            </div>
            <div style="display:flex; justify-content:space-between; border-bottom:1px solid var(--cv-border-subtle); padding-bottom:6px;">
              <span>P2 / High (8h SLA):</span>
              <strong style="color:var(--cv-brand-green);">3h 15m MTTR</strong>
            </div>
            <div style="display:flex; justify-content:space-between; padding-bottom:2px;">
              <span>P3 / Medium (24h SLA):</span>
              <strong style="color:var(--cv-brand-green);">7h 30m MTTR</strong>
            </div>
          </div>
        </div>
      </div>
    `}
  `;
}

