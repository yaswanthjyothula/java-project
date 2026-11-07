/**
 * CryptoVista X Enterprise - Module 6: Lead Management (Pages 42 – 48)
 * Lead Funnel, Lead Scoring, Lead Details, and Transactional Customer Conversion
 */

import { renderBreadcrumbs, renderPageHeader, renderStatusBadge } from '../components/designSystem.js';
import { fetchLeads } from '../api.js';
import { store } from '../state.js';

let localLeads = null;

export async function renderLeadsPage(subRoute = 'list', paramId = null) {
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

  // Page 45: Lead Details View
  if (subRoute === 'details' && paramId) {
    const lead = localLeads.find(l => l.id === paramId) || localLeads[0] || {
      id: paramId, name: 'Vikram Malhotra', company: 'Malhotra Family Office', email: 'vikram@malhotrawealth.in', status: 'QUALIFIED', score: 85, estimatedValueInr: 2400000
    };

    return `
      <div>
        ${renderPageHeader(
          `${lead.name} — Lead Dossier`,
          `Institutional sales prospect &bull; Company: ${lead.company}`,
          [
            { label: 'CRM', href: '#/app/crm' },
            { label: 'Leads', href: '#/app/crm/leads' },
            { label: lead.name }
          ],
          [
            { label: 'Convert to Customer &rarr;', variant: 'btn-primary', id: 'btn-convert-lead-dossier', onclick: `convertLeadAction('${lead.id}')` }
          ]
        )}

        <div class="kpi-grid" style="grid-template-columns:repeat(4, 1fr); margin-bottom:20px;">
          <div class="kpi-card">
            <div class="kpi-label">LEAD STATUS</div>
            <div class="kpi-value" style="font-size:18px;">${renderStatusBadge(lead.status)}</div>
            <div class="kpi-delta">BANT Validated</div>
          </div>
          <div class="kpi-card">
            <div class="kpi-label">PROPRIETARY SCORE</div>
            <div class="kpi-value" style="color:var(--cv-brand-green);">${lead.score} / 100</div>
            <div class="kpi-delta kpi-delta-up">High Qualification</div>
          </div>
          <div class="kpi-card">
            <div class="kpi-label">ESTIMATED CONTRACT ARR</div>
            <div class="kpi-value">₹${((lead.estimatedValueInr || 1200000) / 100000).toFixed(1)} Lakh</div>
            <div class="kpi-delta">Institutional Software</div>
          </div>
          <div class="kpi-card">
            <div class="kpi-label">ASSIGNED REPRESENTATIVE</div>
            <div class="kpi-value" style="font-size:16px;">Anand Verma</div>
            <div class="kpi-delta">VP Enterprise Sales</div>
          </div>
        </div>

        <div class="panel">
          <div class="panel-header">
            <span class="panel-title">Prospect Background & Qualification Log</span>
            <span class="badge badge-positive">AUDITED ATTRIBUTION</span>
          </div>
          <div style="font-size:13px; line-height:1.7; color:var(--cv-text-secondary); margin-bottom:20px;">
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px;">
              <div>
                <strong>Primary Contact:</strong> ${lead.name}<br>
                <strong>Email Address:</strong> <code style="font-family:monospace;">${lead.email}</code><br>
                <strong>Company / Institution:</strong> ${lead.company}<br>
                <strong>Source:</strong> Organic Inbound Demo Request &bull; 2026-11-04
              </div>
              <div>
                <strong>Budget Authority:</strong> Verified Managing Director<br>
                <strong>Timeline:</strong> Q4 2026 Deployment<br>
                <strong>Target Desks:</strong> Digital Asset Simulation & Execution API
              </div>
            </div>
          </div>

          <div style="display:flex; gap:12px; border-top:1px solid var(--cv-border); padding-top:16px;">
            <a href="#/app/crm/leads" class="btn btn-outline" style="font-size:12px;">&larr; Back to Leads Roster</a>
            <button class="btn btn-primary" onclick="convertLeadAction('${lead.id}')" style="font-size:12px;">
              Convert to Customer & Open Customer 360 &rarr;
            </button>
          </div>
        </div>
      </div>
    `;
  }

  // Page 42 & 43: Lead Dashboard & List View
  const qualifiedCount = localLeads.filter(l => l.status === 'QUALIFIED').length;
  const totalPipelineVal = localLeads.reduce((acc, l) => acc + (l.estimatedValueInr || 1200000), 0);

  return `
    <div>
      ${renderPageHeader(
        'Enterprise Sales Pipeline & Leads',
        'Lead qualification, proprietary scoring, and institutional client conversion',
        [
          { label: 'CRM' },
          { label: 'Leads' }
        ],
        [
          { label: 'Customer Directory', variant: 'btn-outline', onclick: `location.hash='#/app/crm/customers';` },
          { label: '+ Capture Inbound Lead', variant: 'btn-primary', id: 'btn-create-lead' }
        ]
      )}

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
                    <a href="#/app/crm/leads/${l.id}" style="font-weight:700; color:var(--cv-brand-green); text-decoration:none;">
                      ${l.name}
                    </a>
                    <div style="font-size:11px; color:var(--cv-text-muted); font-family:monospace;">${l.email}</div>
                  </td>
                  <td style="font-weight:500;">${l.company}</td>
                  <td>${renderStatusBadge(l.status)}</td>
                  <td>
                    <div style="display:flex; align-items:center; gap:8px;">
                      <div style="flex:1; height:6px; background:var(--cv-bg-page); border-radius:3px; width:60px; overflow:hidden;">
                        <div style="width:${l.score}%; height:100%; background:${l.score >= 80 ? 'var(--cv-brand-green)' : l.score >= 60 ? '#2563EB' : '#F59E0B'};"></div>
                      </div>
                      <span style="font-size:12px; font-weight:600;">${l.score}</span>
                    </div>
                  </td>
                  <td style="font-weight:600;">₹${((l.estimatedValueInr || 1200000)).toLocaleString('en-IN')}</td>
                  <td>
                    ${l.status === 'CONVERTED' ? `
                      <a href="#/app/crm/customers" class="btn btn-outline" style="padding:4px 8px; font-size:11px;">Customer 360 &rarr;</a>
                    ` : `
                      <div style="display:flex; gap:6px;">
                        <a href="#/app/crm/leads/${l.id}" class="btn btn-outline" style="padding:4px 8px; font-size:11px;">Details</a>
                        <button class="btn btn-primary" onclick="convertLeadAction('${l.id}')" style="padding:4px 8px; font-size:11px;">Convert</button>
                      </div>
                    `}
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

// Global conversion hook
window.convertLeadAction = (id) => {
  if (localLeads) {
    const lead = localLeads.find(l => l.id === id);
    if (lead && confirm(`Transactionally convert prospect "${lead.name}" (${lead.company}) into an active Institutional Customer?`)) {
      lead.status = 'CONVERTED';
      alert(`Success: Lead ${lead.name} converted into an active Enterprise Customer.\nOpening Customer 360...`);
      location.hash = `#/app/crm/customers/CUST-001`;
    }
  }
};

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
}
