/**
 * CryptoVista X Enterprise - Module 5: CRM & Customers (Pages 34 – 41)
 * Customer Directory, Customer 360 Full Profile (15 Tabs), Accounts, and Contacts
 */

import { renderBreadcrumbs, renderPageHeader, renderStatusBadge } from '../components/designSystem.js';
import { fetchCustomers } from '../api.js';
import { store } from '../state.js';

let localCustomers = null;

export async function renderCustomersPage(subRoute = 'directory', paramId = null) {
  const state = store.getState();
  if (!localCustomers) {
    localCustomers = await fetchCustomers();
  }

  // Page 37: Customer 360 Comprehensive Profile View
  if (subRoute === 'details' && paramId) {
    const cust = localCustomers.find(c => c.id === paramId) || localCustomers[0] || {
      id: paramId, customerNumber: 'CUST-8021', name: 'Bharat Digital Custody Pvt Ltd', type: 'INSTITUTIONAL', lifecycleStage: 'ACTIVE_ENTERPRISE', healthScore: 94
    };

    return `
      <div>
        ${renderPageHeader(
          `${cust.name} — Customer 360`,
          `Multi-entity institutional relationship profile &bull; Account Code: ${cust.customerNumber || cust.id}`,
          [
            { label: 'CRM', href: '#/app/crm' },
            { label: 'Customers', href: '#/app/crm/customers' },
            { label: cust.name }
          ],
          [
            { label: '+ Log Activity', variant: 'btn-outline', onclick: `location.hash='#/app/activities';` },
            { label: '+ New Opportunity', variant: 'btn-primary', onclick: `location.hash='#/app/crm/opportunities';` }
          ]
        )}

        <!-- Customer 360 Header Cards -->
        <div class="kpi-grid" style="grid-template-columns:repeat(4, 1fr); margin-bottom:20px;">
          <div class="kpi-card">
            <div class="kpi-label">CLIENT CLASSIFICATION</div>
            <div class="kpi-value" style="font-size:18px;">${renderStatusBadge(cust.type)}</div>
            <div class="kpi-delta">Institutional Mandate</div>
          </div>
          <div class="kpi-card">
            <div class="kpi-label">RELATIONSHIP HEALTH</div>
            <div class="kpi-value" style="color:var(--cv-brand-green);">${cust.healthScore || 92}%</div>
            <div class="kpi-delta kpi-delta-up">Low Churn Risk</div>
          </div>
          <div class="kpi-card">
            <div class="kpi-label">CONTRACT VALUE (ARR)</div>
            <div class="kpi-value">₹24.0 Lakh</div>
            <div class="kpi-delta">Enterprise Software Tier</div>
          </div>
          <div class="kpi-card">
            <div class="kpi-label">OPEN SUPPORT CASES</div>
            <div class="kpi-value">1 Ticket</div>
            <div class="kpi-delta">High SLA Priority</div>
          </div>
        </div>

        <!-- 15-Tab Customer 360 Panel -->
        <div class="panel">
          <!-- Tab Navigation -->
          <div style="display:flex; gap:16px; border-bottom:1px solid var(--cv-border); margin-bottom:20px; font-size:12.5px; font-weight:600; overflow-x:auto;">
            <a href="#/app/crm/customers/${cust.id}?tab=overview" style="padding:8px 12px; text-decoration:none; color:var(--cv-brand-green); border-bottom:2px solid var(--cv-brand-green); white-space:nowrap;">Overview</a>
            <a href="#/app/crm/accounts" style="padding:8px 12px; text-decoration:none; color:var(--cv-text-secondary); white-space:nowrap;">Accounts (1)</a>
            <a href="#/app/crm/contacts" style="padding:8px 12px; text-decoration:none; color:var(--cv-text-secondary); white-space:nowrap;">Contacts (3)</a>
            <a href="#/app/crm/opportunities" style="padding:8px 12px; text-decoration:none; color:var(--cv-text-secondary); white-space:nowrap;">Opportunities (2)</a>
            <a href="#/app/activities" style="padding:8px 12px; text-decoration:none; color:var(--cv-text-secondary); white-space:nowrap;">Activities</a>
            <a href="#/app/customer-operations/onboarding" style="padding:8px 12px; text-decoration:none; color:var(--cv-text-secondary); white-space:nowrap;">Onboarding Case</a>
            <a href="#/app/customer-operations/support/tickets" style="padding:8px 12px; text-decoration:none; color:var(--cv-text-secondary); white-space:nowrap;">Support Tickets (1)</a>
            <a href="#/app/enterprise/invoices" style="padding:8px 12px; text-decoration:none; color:var(--cv-text-secondary); white-space:nowrap;">Invoices</a>
          </div>

          <!-- Tab Content (Overview & Connected Entities) -->
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:24px;">
            <div>
              <h4 style="font-size:15px; font-weight:700; margin-bottom:12px;">Corporate Legal Entity Information</h4>
              <div style="font-size:13px; line-height:1.7; color:var(--cv-text-secondary);">
                <strong>Entity Name:</strong> ${cust.name}<br>
                <strong>Jurisdiction:</strong> Mumbai / Maharashtra, India<br>
                <strong>Relationship Manager:</strong> Anand Verma (VP Institutional Sales)<br>
                <strong>Onboarded Date:</strong> 2026-08-14<br>
                <strong>Tenant Boundary:</strong> TENANT-APEX-01 (Strictly Isolated)
              </div>
            </div>

            <div>
              <h4 style="font-size:15px; font-weight:700; margin-bottom:12px;">Active Operations Connections</h4>
              <div style="display:flex; flex-direction:column; gap:8px;">
                <div style="background:var(--cv-bg-page); padding:10px 12px; border:1px solid var(--cv-border); border-radius:3px; display:flex; justify-content:space-between; align-items:center;">
                  <div>
                    <div style="font-weight:600; font-size:13px;">Active Support Incident: TCK-1094</div>
                    <div style="font-size:11px; color:var(--cv-text-muted);">SLA Remaining: 180 mins &bull; High Priority</div>
                  </div>
                  <a href="#/app/customer-operations/support/tickets/TCK-001" class="btn btn-outline" style="padding:4px 8px; font-size:11px;">View Ticket &rarr;</a>
                </div>

                <div style="background:var(--cv-bg-page); padding:10px 12px; border:1px solid var(--cv-border); border-radius:3px; display:flex; justify-content:space-between; align-items:center;">
                  <div>
                    <div style="font-weight:600; font-size:13px;">Open Sales Deal: OPP-101</div>
                    <div style="font-size:11px; color:var(--cv-text-muted);">Contract Value: ₹24.0 Lakh &bull; Stage: Proposal</div>
                  </div>
                  <a href="#/app/crm/opportunities/OPP-101" class="btn btn-outline" style="padding:4px 8px; font-size:11px;">View Deal &rarr;</a>
                </div>
              </div>
            </div>
          </div>

          <div style="margin-top:24px; padding-top:16px; border-top:1px solid var(--cv-border); display:flex; gap:12px;">
            <a href="#/app/crm/customers" class="btn btn-outline" style="font-size:12px;">&larr; Back to Customer Directory</a>
            <a href="#/app/crm/opportunities" class="btn btn-primary" style="font-size:12px;">View All Opportunities &rarr;</a>
          </div>
        </div>
      </div>
    `;
  }

  // Page 38 & 39: Accounts
  if (subRoute === 'accounts') {
    return `
      <div>
        ${renderPageHeader(
          'Institutional Client Accounts',
          'Corporate entity accounts, legal entity identifiers, and billing accounts',
          [
            { label: 'CRM', href: '#/app/crm' },
            { label: 'Accounts' }
          ],
          [
            { label: 'Customer Directory &rarr;', variant: 'btn-primary', onclick: `location.hash='#/app/crm/customers';` }
          ]
        )}

        <div class="panel">
          <div class="table-container">
            <table>
              <thead>
                <tr>
                  <th>Account Code</th>
                  <th>Legal Entity Name</th>
                  <th>Account Type</th>
                  <th>Related Customer 360</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                ${localCustomers.map(c => `
                  <tr>
                    <td style="font-family:monospace; font-weight:600;">${c.customerNumber || c.id}</td>
                    <td><strong>${c.name}</strong></td>
                    <td>${renderStatusBadge(c.type)}</td>
                    <td>
                      <a href="#/app/crm/customers/${c.id}" style="color:var(--cv-brand-green); font-weight:600;">
                        Open Customer 360 &rarr;
                      </a>
                    </td>
                    <td>
                      <a href="#/app/crm/customers/${c.id}" class="btn btn-outline" style="padding:4px 8px; font-size:11px;">Inspect 360</a>
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

  // Page 40 & 41: Contacts
  if (subRoute === 'contacts') {
    const contacts = [
      { id: 'CNT-01', name: 'Rohan Deshmukh', email: 'rohan.d@bharatcustody.in', role: 'Head of Treasury', customer: 'Bharat Digital Custody Pvt Ltd', customerId: 'CUST-001' },
      { id: 'CNT-02', name: 'Priya Nambiar', email: 'priya@deccanfund.in', role: 'Chief Risk Officer', customer: 'Deccan Algorithmic Fund LLP', customerId: 'CUST-002' },
      { id: 'CNT-03', name: 'Vikram Mehta', email: 'vikram@zenithwealth.in', role: 'Managing Partner', customer: 'Zenith Family Office Advisors', customerId: 'CUST-003' }
    ];

    return `
      <div>
        ${renderPageHeader(
          'Enterprise Contact Roster',
          'Key institutional stakeholders, executive sponsors, and operations personnel',
          [
            { label: 'CRM', href: '#/app/crm' },
            { label: 'Contacts' }
          ],
          [
            { label: 'Customer 360 &rarr;', variant: 'btn-primary', onclick: `location.hash='#/app/crm/customers';` }
          ]
        )}

        <div class="panel">
          <div class="table-container">
            <table>
              <thead>
                <tr>
                  <th>Contact ID</th>
                  <th>Full Name</th>
                  <th>Designated Title</th>
                  <th>Email Address</th>
                  <th>Associated Entity</th>
                  <th>Customer 360</th>
                </tr>
              </thead>
              <tbody>
                ${contacts.map(cnt => `
                  <tr>
                    <td style="font-family:monospace; font-weight:600;">${cnt.id}</td>
                    <td><strong>${cnt.name}</strong></td>
                    <td><span class="badge badge-neutral">${cnt.role}</span></td>
                    <td style="font-family:monospace; font-size:12px;">${cnt.email}</td>
                    <td>${cnt.customer}</td>
                    <td>
                      <a href="#/app/crm/customers/${cnt.customerId}" class="btn btn-outline" style="padding:4px 8px; font-size:11px;">
                        Customer 360 &rarr;
                      </a>
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

  // Page 34 & 35: CRM Dashboard & Customer Directory
  return `
    <div>
      ${renderPageHeader(
        'Customer 360 & Client Directory',
        `Institutional and wealth client relationship management for ${state.tenantId}`,
        [
          { label: 'CRM' },
          { label: 'Customers' }
        ],
        [
          { label: 'Accounts Roster', variant: 'btn-outline', onclick: `location.hash='#/app/crm/accounts';` },
          { label: '+ New Enterprise Client', variant: 'btn-primary', id: 'btn-create-customer' }
        ]
      )}

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
                   style="padding:6px 12px; border:1px solid var(--cv-border); border-radius:var(--cv-radius-input); font-size:12px; width:260px;">
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
                    <a href="#/app/crm/customers/${c.id}" style="font-weight:700; color:var(--cv-brand-green); text-decoration:none;">
                      ${c.name}
                    </a>
                    <div style="font-size:11px; color:var(--cv-text-muted);">Primary Contact: Finance & Treasury Ops</div>
                  </td>
                  <td>${renderStatusBadge(c.type)}</td>
                  <td>${renderStatusBadge(c.lifecycleStage)}</td>
                  <td>
                    <div style="display:flex; align-items:center; gap:8px;">
                      <div style="flex:1; height:6px; background:var(--cv-bg-page); border-radius:3px; width:70px; overflow:hidden;">
                        <div style="width:${c.healthScore || 85}%; height:100%; background:${(c.healthScore || 85) > 80 ? 'var(--cv-brand-green)' : '#F59E0B'};"></div>
                      </div>
                      <span style="font-size:12px; font-weight:600;">${c.healthScore || 85}%</span>
                    </div>
                  </td>
                  <td style="font-size:12px; color:var(--cv-text-secondary);">Anand Verma (VP)</td>
                  <td>
                    <a href="#/app/crm/customers/${c.id}" class="btn btn-outline" style="padding:4px 10px; font-size:11px;">View 360 &rarr;</a>
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
