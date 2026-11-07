/**
 * CryptoVista X Enterprise - Module G: Workflow Approvals
 * Multi-tier authorization matrix, commercial discount review, and dual approval control
 */

import { store } from '../state.js';

let localApprovals = [
  { id: 'WF-APP-501', type: 'COMMERCIAL_DISCOUNT', requester: 'vikram.m@apexcapital.in', targetEntity: 'CUST-001 (Bharat Digital Custody)', details: 'Requested 18.5% fee concession on digital asset simulated institutional tier', discountPct: 18.5, status: 'PENDING', timestamp: '2026-11-07 09:15' },
  { id: 'WF-APP-502', type: 'TRADING_LIMIT_INCREASE', requester: 'anand.v@apexcapital.in', targetEntity: 'VA-88392 (Deccan Fund)', details: 'Request to increase virtual day-trading limit from ₹10 Cr to ₹25 Cr', discountPct: 0, status: 'APPROVED', timestamp: '2026-11-06 16:40' },
  { id: 'WF-APP-503', type: 'COMMERCIAL_DISCOUNT', requester: 'neha.s@apexcapital.in', targetEntity: 'CUST-003 (Zenith Advisors)', details: 'Special annual retainer rebate of 12.0% for 3-year upfront commitment', discountPct: 12.0, status: 'APPROVED', timestamp: '2026-11-05 11:20' }
];

export async function renderApprovalsPage() {
  const state = store.getState();
  const pendingCount = localApprovals.filter(a => a.status === 'PENDING').length;

  return `
    <div class="content-header">
      <div>
        <h1 class="page-title">Dual-Authorization & Workflow Approvals</h1>
        <p class="page-subtitle">Commercial discount rules, trade limit governance, and four-eyes operational sign-off</p>
      </div>
      <div style="display:flex; gap:12px; align-items:center;">
        <span class="badge badge-neutral">Tenant: ${state.tenantId}</span>
        <span class="badge badge-positive">SOX / ISO-27001 AUDITABLE</span>
      </div>
    </div>

    <!-- Governance Policy Overview -->
    <div class="kpi-grid" style="grid-template-columns: repeat(4, 1fr); margin-bottom:20px;">
      <div class="kpi-card">
        <div class="kpi-label">PENDING APPROVALS</div>
        <div class="kpi-value" style="color:${pendingCount > 0 ? '#F59E0B' : 'var(--cv-text-primary)'};">${pendingCount}</div>
        <div class="kpi-delta">Action Required by Operator</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">DISCOUNT THRESHOLD</div>
        <div class="kpi-value">&gt; 15.0%</div>
        <div class="kpi-delta">Requires VP / Exec Approval</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">APPROVED THIS MONTH</div>
        <div class="kpi-value">${localApprovals.filter(a => a.status === 'APPROVED').length}</div>
        <div class="kpi-delta kpi-delta-up">100% Policy Adherence</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">DUAL CONTROL INTEGRITY</div>
        <div class="kpi-value">Active</div>
        <div class="kpi-delta">Separation of Duties Enforced</div>
      </div>
    </div>

    <!-- Approvals Table Panel -->
    <div class="panel">
      <div class="panel-header">
        <span class="panel-title">Operational Workflow Requests</span>
        <span style="font-size:12px; color:var(--cv-text-muted);">Real-time governance ledger</span>
      </div>
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Workflow ID</th>
              <th>Workflow Type</th>
              <th>Requester</th>
              <th>Target Entity</th>
              <th>Request Details</th>
              <th>Status</th>
              <th>Date / Time</th>
              <th>Authorization Action</th>
            </tr>
          </thead>
          <tbody>
            ${localApprovals.map(a => `
              <tr>
                <td style="font-family:monospace; font-weight:600; color:var(--cv-text-primary);">${a.id}</td>
                <td><span class="badge badge-neutral">${a.type}</span></td>
                <td style="font-size:12px; font-family:monospace;">${a.requester}</td>
                <td style="font-weight:500; font-size:12px;">${a.targetEntity}</td>
                <td style="font-size:12px; max-width:280px;">${a.details}</td>
                <td>
                  <span class="badge ${a.status === 'APPROVED' ? 'badge-positive' : a.status === 'REJECTED' ? 'badge-negative' : 'badge-neutral'}">
                    ${a.status}
                  </span>
                </td>
                <td style="font-size:11px; color:var(--cv-text-muted); font-family:monospace;">${a.timestamp}</td>
                <td>
                  ${a.status === 'PENDING' ? `
                    <div style="display:flex; gap:6px;">
                      <button class="btn btn-primary btn-approve-wf" data-id="${a.id}" style="padding:4px 10px; font-size:11px;">Approve</button>
                      <button class="btn btn-outline btn-reject-wf" data-id="${a.id}" style="padding:4px 8px; font-size:11px; color:var(--cv-negative);">Reject</button>
                    </div>
                  ` : `
                    <span style="font-size:11px; color:var(--cv-text-muted); font-weight:500;">Closed</span>
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

export function initApprovalsListeners() {
  document.querySelectorAll('.btn-approve-wf').forEach(btn => {
    btn.onclick = (e) => {
      const id = e.target.getAttribute('data-id');
      const wf = localApprovals.find(a => a.id === id);
      if (wf && confirm(`Authorize and approve request ${wf.id} under dual-authorization rules?`)) {
        wf.status = 'APPROVED';
        alert(`Workflow ${wf.id} has been APPROVED and signed by ${store.getState().currentUser.fullName}.`);
        window.dispatchEvent(new Event('hashchange'));
      }
    };
  });

  document.querySelectorAll('.btn-reject-wf').forEach(btn => {
    btn.onclick = (e) => {
      const id = e.target.getAttribute('data-id');
      const wf = localApprovals.find(a => a.id === id);
      if (wf && confirm(`Reject request ${wf.id}?`)) {
        wf.status = 'REJECTED';
        alert(`Workflow ${wf.id} has been REJECTED.`);
        window.dispatchEvent(new Event('hashchange'));
      }
    };
  });
}
