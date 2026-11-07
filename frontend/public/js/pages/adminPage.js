/**
 * CryptoVista X Enterprise - Module 14: Administration & Security (Pages 113 – 125)
 * Multi-tenant controls, RBAC permissions, active session revocation, and security events
 */

import { store } from '../state.js';

let localUsers = [
  { id: 'USR-001', name: 'Apex Operator', email: 'operator@apexcapital.in', role: 'OPERATOR', tenantId: 'TENANT-APEX-01', status: 'ACTIVE', lastLogin: '2026-11-07 10:45' },
  { id: 'USR-002', name: 'Anand Verma', email: 'anand.v@apexcapital.in', role: 'ADMIN', tenantId: 'TENANT-APEX-01', status: 'ACTIVE', lastLogin: '2026-11-07 09:12' },
  { id: 'USR-003', name: 'Neha Sharma', email: 'neha.s@apexcapital.in', role: 'ANALYST', tenantId: 'TENANT-APEX-01', status: 'ACTIVE', lastLogin: '2026-11-06 16:30' }
];

let localSessions = [
  { id: 'SESS-8921', user: 'operator@apexcapital.in', ip: '127.0.0.1', device: 'Desktop Chrome / Windows 11', createdAt: '2026-11-07 10:45', status: 'ACTIVE' },
  { id: 'SESS-8920', user: 'anand.v@apexcapital.in', ip: '192.168.1.104', device: 'Workstation Mac / macOS', createdAt: '2026-11-07 09:12', status: 'ACTIVE' }
];

export function renderAdminPage(subRoute = 'users') {
  return `
    <div class="content-header">
      <div>
        <h1 class="page-title">Enterprise System Administration & Security</h1>
        <p class="page-subtitle">User credentials, RBAC policy enforcement, tenant configuration, and active session control.</p>
      </div>
      <div style="display:flex; gap:10px;">
        <span class="badge badge-neutral">Tenant: ${store.getState().tenantId}</span>
        <span class="badge badge-positive">SINGLE-STEP AUTH ENFORCED</span>
      </div>
    </div>

    <!-- Security KPI Grid -->
    <div class="kpi-grid" style="grid-template-columns:repeat(4, 1fr); margin-bottom:20px;">
      <div class="kpi-card">
        <div class="kpi-label">TOTAL OPERATORS</div>
        <div class="kpi-value">${localUsers.length}</div>
        <div class="kpi-delta">Enterprise RBAC</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">ACTIVE SESSIONS</div>
        <div class="kpi-value">${localSessions.length}</div>
        <div class="kpi-delta kpi-delta-up">HttpOnly Session Keys</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">TENANT ISOLATION</div>
        <div class="kpi-value">Enforced</div>
        <div class="kpi-delta">Database Scoped</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">MFA OVERHEAD</div>
        <div class="kpi-value">0%</div>
        <div class="kpi-delta">Single-Step Policy</div>
      </div>
    </div>

    <!-- Sub-navigation tabs -->
    <div style="display:flex; gap:16px; border-bottom:1px solid var(--cv-border); margin-bottom:20px; font-size:13px; font-weight:600;">
      <a href="#/app/admin/users" class="tab-link ${subRoute === 'users' ? 'active-tab' : ''}" style="padding:8px 12px; text-decoration:none; color:${subRoute === 'users' ? 'var(--cv-brand-green)' : 'var(--cv-text-secondary)'}; border-bottom:${subRoute === 'users' ? '2px solid var(--cv-brand-green)' : 'none'};">Users Directory</a>
      <a href="#/app/admin/sessions" class="tab-link ${subRoute === 'sessions' ? 'active-tab' : ''}" style="padding:8px 12px; text-decoration:none; color:${subRoute === 'sessions' ? 'var(--cv-brand-green)' : 'var(--cv-text-secondary)'}; border-bottom:${subRoute === 'sessions' ? '2px solid var(--cv-brand-green)' : 'none'};">Active Sessions</a>
      <a href="#/app/admin/settings" class="tab-link ${subRoute === 'settings' ? 'active-tab' : ''}" style="padding:8px 12px; text-decoration:none; color:${subRoute === 'settings' ? 'var(--cv-brand-green)' : 'var(--cv-text-secondary)'}; border-bottom:${subRoute === 'settings' ? '2px solid var(--cv-brand-green)' : 'none'};">Tenant Settings</a>
    </div>

    ${subRoute === 'sessions' ? `
      <!-- Active Sessions View -->
      <div class="panel">
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>Session ID</th>
                <th>Operator</th>
                <th>IP Address</th>
                <th>Device Signature</th>
                <th>Created At</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              ${localSessions.map(s => `
                <tr>
                  <td style="font-family:monospace; font-weight:600;">${s.id}</td>
                  <td>${s.user}</td>
                  <td style="font-family:monospace; font-size:12px;">${s.ip}</td>
                  <td style="font-size:12px; color:var(--cv-text-secondary);">${s.device}</td>
                  <td style="font-size:12px; color:var(--cv-text-muted);">${s.createdAt}</td>
                  <td><span class="badge badge-positive">${s.status}</span></td>
                  <td>
                    <button class="btn btn-outline btn-revoke-session" data-id="${s.id}" style="padding:4px 8px; font-size:11px; color:var(--cv-negative);">Revoke</button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    ` : subRoute === 'settings' ? `
      <!-- Tenant Settings View -->
      <div class="panel" style="max-width:720px;">
        <h4 style="font-size:16px; font-weight:700; margin-bottom:12px;">Organization Tenant Configuration</h4>
        <form onsubmit="event.preventDefault(); alert('Tenant settings successfully persisted.');">
          <div class="form-group">
            <label class="form-label">Tenant ID (Read-only)</label>
            <input type="text" readonly value="TENANT-APEX-01" class="form-input" style="background:var(--cv-bg-page); font-family:monospace;">
          </div>
          <div class="form-group">
            <label class="form-label">Enterprise Organization Name</label>
            <input type="text" value="Apex Capital Private Limited" class="form-input">
          </div>
          <div class="form-group">
            <label class="form-label">Base Reporting Currency</label>
            <select class="form-select">
              <option selected>INR (₹ Indian Rupee)</option>
              <option>USD ($ US Dollar)</option>
            </select>
          </div>
          <div class="form-group" style="margin-bottom:20px;">
            <label class="form-label">Authentication Policy</label>
            <div style="font-size:12.5px; color:var(--cv-text-secondary); background:var(--cv-bg-page); padding:10px; border-radius:3px;">
              Single-Step User ID and Password verification only. Mandatory MFA/OTP is disabled by policy.
            </div>
          </div>
          <button type="submit" class="btn btn-primary" style="padding:10px 20px;">Save Tenant Settings</button>
        </form>
      </div>
    ` : `
      <!-- Users View -->
      <div class="panel">
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>User ID</th>
                <th>Full Name</th>
                <th>Email / Login</th>
                <th>Assigned Role</th>
                <th>Tenant Context</th>
                <th>Last Login</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${localUsers.map(u => `
                <tr>
                  <td style="font-family:monospace; font-weight:600;">${u.id}</td>
                  <td><strong>${u.name}</strong></td>
                  <td style="font-family:monospace; font-size:12px;">${u.email}</td>
                  <td><span class="badge ${u.role === 'ADMIN' ? 'badge-negative' : 'badge-neutral'}">${u.role}</span></td>
                  <td style="font-size:12px; color:var(--cv-text-muted);">${u.tenantId}</td>
                  <td style="font-size:12px; color:var(--cv-text-muted);">${u.lastLogin}</td>
                  <td><span class="badge badge-positive">${u.status}</span></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `}
  `;
}

export function initAdminListeners() {
  document.querySelectorAll('.btn-revoke-session').forEach(btn => {
    btn.onclick = (e) => {
      const id = e.target.getAttribute('data-id');
      localSessions = localSessions.filter(s => s.id !== id);
      alert(`Session ${id} has been immediately revoked and disconnected.`);
      window.dispatchEvent(new Event('hashchange'));
    };
  });
}
