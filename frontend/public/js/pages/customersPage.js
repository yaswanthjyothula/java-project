/**
 * CryptoVista X Enterprise - Module E: Customer 360
 * Enterprise customer relationship records, account tiers, and lifecycle management
 */

import { fetchCustomers } from '../api.js';
import { store } from '../state.js';

let localCustomers = null;

export async function renderCustomersPage() {
  const state = store.getState();
  if (!localCustomers) {
    localCustomers = await fetchCustomers();
  }

  return `
    <div class="content-header">
      <div>
        <h1 class="page-title">Customer 360 Directory</h1>
        <p class="page-subtitle">Institutional and wealth client relationship management for ${state.tenantId}</p>
      </div>
      <div style="display:flex; gap:12px;">
        <button class="btn btn-primary" id="btn-create-customer">+ New Enterprise Client</button>
      </div>
    </div>

    <!-- KPI Summary -->
    <div class="kpi-grid" style="grid-template-columns: repeat(4, 1fr); margin-bottom:20px;">
      <div class="kpi-card">
        <div class="kpi-label">TOTAL CLIENTS</div>
        <div class="kpi-value">${localCustomers.length}</div>
        <div class="kpi-delta kpi-delta-up">Active Tenant Base</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">INSTITUTIONAL TIER</div>
        <div class="kpi-value">${localCustomers.filter(c => c.type === 'INSTITUTIONAL').length}</div>
        <div class="kpi-delta">Enterprise SLAs</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">AVG HEALTH SCORE</div>
        <div class="kpi-value">${Math.round(localCustomers.reduce((acc, c) => acc + (c.healthScore || 85), 0) / (localCustomers.length || 1))} / 100</div>
        <div class="kpi-delta kpi-delta-up">Healthy Retention</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">ACTIVE CONTRACT VALUE</div>
        <div class="kpi-value">₹4.85 Cr</div>
        <div class="kpi-delta">Annualized Run Rate</div>
      </div>
    </div>

    <!-- Customers Table Panel -->
    <div class="panel">
      <div class="panel-header">
        <div style="display:flex; gap:12px; align-items:center;">
          <span class="panel-title">Enterprise Accounts</span>
          <input type="text" id="customer-search-input" placeholder="Search by name, ID or type..." 
                 style="padding:6px 12px; border:1px solid var(--cv-border); border-radius:var(--cv-radius-xs); font-size:12px; width:260px;">
        </div>
        <span style="font-size:12px; color:var(--cv-text-muted);">Strict Tenant-Level Isolation</span>
      </div>
      <div class="table-container">
        <table id="customers-table">
          <thead>
            <tr>
              <th>Account Code</th>
              <th>Organization / Entity Name</th>
              <th>Customer Type</th>
              <th>Lifecycle Stage</th>
              <th>Relationship Health</th>
              <th>Assigned Manager</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            ${localCustomers.map(c => `
              <tr data-customer-id="${c.id}">
                <td style="font-family:monospace; font-weight:600; color:var(--cv-text-primary);">${c.customerNumber || c.id}</td>
                <td>
                  <div style="font-weight:600; color:var(--cv-text-primary);">${c.name}</div>
                  <div style="font-size:11px; color:var(--cv-text-muted);">Primary Contact: Finance & Treasury Ops</div>
                </td>
                <td>
                  <span class="badge ${c.type === 'INSTITUTIONAL' ? 'badge-neutral' : 'badge-positive'}">${c.type}</span>
                </td>
                <td>
                  <span class="badge badge-positive">${c.lifecycleStage}</span>
                </td>
                <td>
                  <div style="display:flex; align-items:center; gap:8px;">
                    <div style="flex:1; height:6px; background:var(--cv-bg); border-radius:3px; width:70px; overflow:hidden;">
                      <div style="width:${c.healthScore || 85}%; height:100%; background:${(c.healthScore || 85) > 80 ? 'var(--cv-primary)' : '#F59E0B'};"></div>
                    </div>
                    <span style="font-size:12px; font-weight:600;">${c.healthScore || 85}%</span>
                  </div>
                </td>
                <td style="font-size:12px; color:var(--cv-text-secondary);">Anand Verma (VP)</td>
                <td>
                  <button class="btn btn-outline btn-view-profile" data-id="${c.id}" style="padding:4px 10px; font-size:11px;">View 360</button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

export function initCustomersListeners() {
  const btnCreate = document.getElementById('btn-create-customer');
  if (btnCreate) {
    btnCreate.onclick = () => {
      const name = prompt('Enter Enterprise Client Name:');
      if (!name) return;
      const type = prompt('Customer Type (INSTITUTIONAL or WEALTH):', 'INSTITUTIONAL') || 'INSTITUTIONAL';
      const newCust = {
        id: 'CUST-00' + (localCustomers.length + 1),
        customerNumber: 'CUST-80' + (20 + localCustomers.length + 1),
        name,
        type: type.toUpperCase(),
        lifecycleStage: 'ONBOARDING',
        healthScore: 90
      };
      localCustomers.unshift(newCust);
      window.dispatchEvent(new Event('hashchange'));
    };
  }

  const searchInput = document.getElementById('customer-search-input');
  if (searchInput) {
    searchInput.oninput = (e) => {
      const q = e.target.value.toLowerCase();
      const rows = document.querySelectorAll('#customers-table tbody tr');
      rows.forEach(r => {
        const text = r.innerText.toLowerCase();
        r.style.display = text.includes(q) ? '' : 'none';
      });
    };
  }
}

