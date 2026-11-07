/**
 * CryptoVista X Enterprise - Module E: Leads & Pipeline
 * Sales prospecting, qualification scoring, and transactional conversion
 */

import { fetchLeads } from '../api.js';
import { store } from '../state.js';

let localLeads = null;

export async function renderLeadsPage() {
  const state = store.getState();
  if (!localLeads) {
    localLeads = await fetchLeads();
    if (localLeads.length === 2) {
      localLeads.push(
        { id: 'LEAD-003', name: 'Rajesh Kothari', company: 'Equitas Treasury Advisory', email: 'rajesh@equitastreasury.com', status: 'CONTACTED', score: 72, estimatedValueInr: 1500000 },
        { id: 'LEAD-004', name: 'Meera Nambiar', company: 'Kerala Angel Syndicate', email: 'meera@keralastartups.org', status: 'NEW', score: 58, estimatedValueInr: 850000 }
      );
    }
  }

  const qualifiedCount = localLeads.filter(l => l.status === 'QUALIFIED').length;
  const totalPipelineVal = localLeads.reduce((acc, l) => acc + (l.estimatedValueInr || 1200000), 0);

  return `
    <div class="content-header">
      <div>
        <h1 class="page-title">Enterprise Sales Pipeline</h1>
        <p class="page-subtitle">Lead qualification, lead scoring, and institutional client conversion</p>
      </div>
      <div style="display:flex; gap:12px;">
        <button class="btn btn-primary" id="btn-create-lead">+ Capture Inbound Lead</button>
      </div>
    </div>

    <!-- Pipeline Funnel KPI Cards -->
    <div class="kpi-grid" style="grid-template-columns: repeat(4, 1fr); margin-bottom:20px;">
      <div class="kpi-card">
        <div class="kpi-label">TOTAL PIPELINE LEADS</div>
        <div class="kpi-value">${localLeads.length}</div>
        <div class="kpi-delta kpi-delta-up">Active Inbound Interest</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">QUALIFIED LEADS</div>
        <div class="kpi-value">${qualifiedCount}</div>
        <div class="kpi-delta">${Math.round((qualifiedCount / (localLeads.length || 1)) * 100)}% Conversion Ready</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">PIPELINE DEAL VALUE</div>
        <div class="kpi-value">₹${(totalPipelineVal / 10000000).toFixed(2)} Cr</div>
        <div class="kpi-delta">Simulated Institutional ARR</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">AVG LEAD SCORE</div>
        <div class="kpi-value">${Math.round(localLeads.reduce((acc, l) => acc + (l.score || 70), 0) / (localLeads.length || 1))} / 100</div>
        <div class="kpi-delta kpi-delta-up">BANT Compliant</div>
      </div>
    </div>

    <!-- Leads Table Panel -->
    <div class="panel">
      <div class="panel-header">
        <span class="panel-title">Prospect Roster & Deal Funnel</span>
        <span style="font-size:12px; color:var(--cv-text-muted);">Tenant: ${state.tenantId}</span>
      </div>
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Lead Name & Email</th>
              <th>Company / Institution</th>
              <th>Lead Status</th>
              <th>Proprietary Score</th>
              <th>Estimated Deal Size</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            ${localLeads.map(l => `
              <tr>
                <td>
                  <div style="font-weight:600; color:var(--cv-text-primary);">${l.name}</div>
                  <div style="font-size:11px; color:var(--cv-text-muted); font-family:monospace;">${l.email}</div>
                </td>
                <td style="font-weight:500;">${l.company}</td>
                <td>
                  <span class="badge ${l.status === 'CONVERTED' ? 'badge-positive' : l.status === 'QUALIFIED' ? 'badge-neutral' : 'badge-neutral'}">
                    ${l.status}
                  </span>
                </td>
                <td>
                  <div style="display:flex; align-items:center; gap:8px;">
                    <div style="flex:1; height:6px; background:var(--cv-bg); border-radius:3px; width:60px; overflow:hidden;">
                      <div style="width:${l.score}%; height:100%; background:${l.score >= 80 ? 'var(--cv-primary)' : l.score >= 60 ? '#2563EB' : '#F59E0B'};"></div>
                    </div>
                    <span style="font-size:12px; font-weight:600;">${l.score}</span>
                  </div>
                </td>
                <td style="font-weight:600;">₹${((l.estimatedValueInr || 1200000)).toLocaleString('en-IN')}</td>
                <td>
                  ${l.status === 'CONVERTED' ? `
                    <span style="font-size:11px; color:var(--cv-primary); font-weight:600;">Converted to Client</span>
                  ` : `
                    <button class="btn btn-primary btn-convert-lead" data-id="${l.id}" style="padding:4px 10px; font-size:11px;">Convert to Client</button>
                  `}
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

export function initLeadsListeners() {
  const btnCreate = document.getElementById('btn-create-lead');
  if (btnCreate) {
    btnCreate.onclick = () => {
      const name = prompt('Lead Contact Name:');
      if (!name) return;
      const company = prompt('Company / Institution:', 'New Enterprise Partner') || 'New Enterprise Partner';
      const email = prompt('Contact Email:', name.toLowerCase().replace(/\\s+/g, '.') + '@example.com');
      const newLead = {
        id: 'LEAD-00' + (localLeads.length + 1),
        name,
        company,
        email,
        status: 'NEW',
        score: Math.floor(55 + Math.random() * 35),
        estimatedValueInr: 1200000
      };
      localLeads.unshift(newLead);
      window.dispatchEvent(new Event('hashchange'));
    };
  }

  document.querySelectorAll('.btn-convert-lead').forEach(btn => {
    btn.onclick = (e) => {
      const id = e.target.getAttribute('data-id');
      const lead = localLeads.find(l => l.id === id);
      if (lead && confirm(`Convert lead "${lead.name}" (${lead.company}) to an enterprise institutional customer?`)) {
        lead.status = 'CONVERTED';
        alert(`Success: Lead ${lead.name} has been transactionally converted into an Enterprise Customer under tenant TENANT-APEX-01.`);
        window.dispatchEvent(new Event('hashchange'));
      }
    };
  });
}
