/**
 * CryptoVista X Enterprise - Module 11: Enterprise Management (Pages 85 – 97)
 * Employees, Teams, Vendors, Subscriptions, Invoices, and Documents
 */

import { store } from '../state.js';

let localEmployees = [
  { id: 'EMP-01', name: 'Anand Verma', email: 'anand.v@apexcapital.in', department: 'Enterprise Sales', role: 'Vice President', status: 'ACTIVE' },
  { id: 'EMP-02', name: 'Neha Sharma', email: 'neha.s@apexcapital.in', department: 'Trading Operations', role: 'Senior Trader', status: 'ACTIVE' },
  { id: 'EMP-03', name: 'Vikram Malhotra', email: 'vikram.m@apexcapital.in', department: 'Wealth Desk', role: 'Director', status: 'ACTIVE' },
  { id: 'EMP-04', name: 'Operator Apex', email: 'operator@apexcapital.in', department: 'System Administration', role: 'Platform Operator', status: 'ACTIVE' }
];

let localInvoices = [
  { id: 'INV-2026-081', customer: 'Bharat Digital Custody Pvt Ltd', amountInr: 2400000, status: 'PAID', dueDate: '2026-11-15' },
  { id: 'INV-2026-082', customer: 'Deccan Algorithmic Fund LLP', amountInr: 1650000, status: 'PENDING', dueDate: '2026-11-30' },
  { id: 'INV-2026-083', customer: 'Zenith Family Office Advisors', amountInr: 1200000, status: 'PAID', dueDate: '2026-10-31' }
];

export function renderEnterprisePage(subRoute = 'employees') {
  return `
    <div class="content-header">
      <div>
        <h1 class="page-title">Enterprise Business Operations & Governance</h1>
        <p class="page-subtitle">Internal staff roster, department assignments, vendor contracts, and recurring software invoicing.</p>
      </div>
      <div style="display:flex; gap:10px;">
        <span class="badge badge-neutral">Tenant: ${store.getState().tenantId}</span>
        <span class="badge badge-positive">ACTIVE LICENSING</span>
      </div>
    </div>

    <!-- KPI Grid -->
    <div class="kpi-grid" style="grid-template-columns:repeat(4, 1fr); margin-bottom:20px;">
      <div class="kpi-card">
        <div class="kpi-label">HEADCOUNT</div>
        <div class="kpi-value">${localEmployees.length}</div>
        <div class="kpi-delta">Enterprise Personnel</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">ACTIVE CONTRACT ARR</div>
        <div class="kpi-value">₹52.5 Lakh</div>
        <div class="kpi-delta kpi-delta-up">Software Subscriptions</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">COLLECTED INVOICES</div>
        <div class="kpi-value">₹36.0 Lakh</div>
        <div class="kpi-delta kpi-delta-up">Zero Delinquency</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">APPROVED VENDORS</div>
        <div class="kpi-value">4</div>
        <div class="kpi-delta">SOC-2 Certified</div>
      </div>
    </div>

    <!-- Sub-navigation tabs -->
    <div style="display:flex; gap:16px; border-bottom:1px solid var(--cv-border); margin-bottom:20px; font-size:13px; font-weight:600;">
      <a href="#/app/enterprise/employees" class="tab-link ${subRoute === 'employees' ? 'active-tab' : ''}" style="padding:8px 12px; text-decoration:none; color:${subRoute === 'employees' ? 'var(--cv-brand-green)' : 'var(--cv-text-secondary)'}; border-bottom:${subRoute === 'employees' ? '2px solid var(--cv-brand-green)' : 'none'};">Staff Roster</a>
      <a href="#/app/enterprise/invoices" class="tab-link ${subRoute === 'invoices' ? 'active-tab' : ''}" style="padding:8px 12px; text-decoration:none; color:${subRoute === 'invoices' ? 'var(--cv-brand-green)' : 'var(--cv-text-secondary)'}; border-bottom:${subRoute === 'invoices' ? '2px solid var(--cv-brand-green)' : 'none'};">Invoices Ledger</a>
      <a href="#/app/enterprise/vendors" class="tab-link ${subRoute === 'vendors' ? 'active-tab' : ''}" style="padding:8px 12px; text-decoration:none; color:${subRoute === 'vendors' ? 'var(--cv-brand-green)' : 'var(--cv-text-secondary)'}; border-bottom:${subRoute === 'vendors' ? '2px solid var(--cv-brand-green)' : 'none'};">Vendors & IT</a>
    </div>

    ${subRoute === 'invoices' ? `
      <!-- Invoices View -->
      <div class="panel">
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>Invoice Number</th>
                <th>Client Legal Entity</th>
                <th>Billed Amount (INR)</th>
                <th>Payment Status</th>
                <th>Settlement Due Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              ${localInvoices.map(inv => `
                <tr>
                  <td style="font-family:monospace; font-weight:600;">${inv.id}</td>
                  <td><strong>${inv.customer}</strong></td>
                  <td style="font-weight:700;">₹${inv.amountInr.toLocaleString('en-IN')}</td>
                  <td><span class="badge ${inv.status === 'PAID' ? 'badge-positive' : 'badge-neutral'}">${inv.status}</span></td>
                  <td style="font-size:12px; color:var(--cv-text-muted);">${inv.dueDate}</td>
                  <td>
                    <button class="btn btn-outline" onclick="alert('Generated PDF tax invoice voucher for ${inv.id}.');" style="padding:4px 8px; font-size:11px;">View Voucher</button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    ` : subRoute === 'vendors' ? `
      <!-- Vendors View -->
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:20px;">
        <div class="panel">
          <span class="badge badge-positive" style="margin-bottom:8px;">MARKET DATA PROVIDER</span>
          <h4 style="font-size:16px; font-weight:700; margin-bottom:6px;">Groww Reference Benchmark Stream</h4>
          <p style="font-size:12.5px; color:var(--cv-text-secondary); margin-bottom:12px;">Low-latency digital asset reference benchmark quote adapter.</p>
          <div style="font-size:12px; color:var(--cv-text-muted);">SLA: 99.99% &bull; Security Level: High</div>
        </div>

        <div class="panel">
          <span class="badge badge-neutral" style="margin-bottom:8px;">CLOUD INFRASTRUCTURE</span>
          <h4 style="font-size:16px; font-weight:700; margin-bottom:6px;">Multi-Tenant MySQL Database Cluster</h4>
          <p style="font-size:12.5px; color:var(--cv-text-secondary); margin-bottom:12px;">3NF relational enterprise persistence with automated daily snapshots.</p>
          <div style="font-size:12px; color:var(--cv-text-muted);">SLA: 99.95% &bull; ISO-27001 Verified</div>
        </div>
      </div>
    ` : `
      <!-- Staff View -->
      <div class="panel">
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>Employee ID</th>
                <th>Full Name</th>
                <th>Email Address</th>
                <th>Department</th>
                <th>Designated Role</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${localEmployees.map(e => `
                <tr>
                  <td style="font-family:monospace; font-weight:600;">${e.id}</td>
                  <td><strong>${e.name}</strong></td>
                  <td style="font-family:monospace; font-size:12px;">${e.email}</td>
                  <td>${e.department}</td>
                  <td><span class="badge badge-neutral">${e.role}</span></td>
                  <td><span class="badge badge-positive">${e.status}</span></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `}
  `;
}
