/**
 * CryptoVista X Enterprise - Navigation Components
 * Groww-inspired information hierarchy covering all 15 Enterprise Modules
 */

export function renderSidebar(currentRoute) {
  const routes = [
    { group: 'PUBLIC PORTAL', items: [
      { id: 'landing', label: 'Home / Landing' }
    ]},
    { group: 'OVERVIEW & MARKETS', items: [
      { id: 'app/dashboard', label: '1. Dashboard' },
      { id: 'app/markets', label: '2. Market Intelligence' },
      { id: 'app/trading', label: '3. Simulated Trading' },
      { id: 'app/portfolio', label: '4. Portfolio Valuation' }
    ]},
    { group: 'ENTERPRISE CRM & SALES', items: [
      { id: 'app/crm/customers', label: '5. Customer 360' },
      { id: 'app/crm/leads', label: '6. Leads Management' },
      { id: 'app/crm/sales', label: '7. Sales & Opportunities' },
      { id: 'app/activities', label: '8. Activities & Calendar' }
    ]},
    { group: 'OPERATIONS & GOVERNANCE', items: [
      { id: 'app/customer-operations/support', label: '9. Support & SLA Triage' },
      { id: 'app/communications', label: '10. Communications' },
      { id: 'app/enterprise', label: '11. Enterprise Ops' },
      { id: 'app/workflows', label: '12. Workflow Approvals' }
    ]},
    { group: 'ANALYTICS & CONTROL', items: [
      { id: 'app/analytics', label: '13. Analytics & Reports' },
      { id: 'app/admin', label: '14. System Administration' },
      { id: 'app/profile', label: '15. Profile & Settings' }
    ]}
  ];

  return `
    <aside class="sidebar">
      <div class="sidebar-header">
        <a href="#/landing" style="display:flex; align-items:center; text-decoration:none;">
          <span class="brand-title">CryptoVista X</span>
          <span class="brand-badge">ENTERPRISE</span>
        </a>
      </div>
      <nav style="flex:1; padding-bottom:24px;">
        ${routes.map(g => `
          <div class="nav-group-title">${g.group}</div>
          ${g.items.map(item => `
            <a href="#/${item.id}" class="nav-link ${currentRoute.startsWith(item.id) || (item.id === 'app/dashboard' && currentRoute === 'dashboard') ? 'active' : ''}" data-route="${item.id}">
              ${item.label}
            </a>
          `).join('')}
        `).join('')}
      </nav>
      <div style="padding:16px 20px; border-top:1px solid var(--cv-border); font-size:11px; color:var(--cv-text-muted);">
        <div>Runtime: <strong>Node.js Enterprise</strong></div>
        <div style="margin-top:2px;">15 Connected Modules</div>
      </div>
    </aside>
  `;
}

export function renderTopbar(user, tenantId) {
  return `
    <header class="topbar">
      <div class="topbar-left">
        <span class="tenant-pill">Tenant: ${tenantId}</span>
        <span class="badge badge-positive">AUTHENTICATED WORKSTATION</span>
      </div>
      <div class="topbar-right">
        <div style="text-align:right;">
          <div style="font-size:13px; font-weight:600; color:var(--cv-text-primary);">${user.fullName || 'Apex Operator'}</div>
          <div style="font-size:11px; color:var(--cv-text-muted);">${user.email || 'operator@apexcapital.in'}</div>
        </div>
        <button class="btn btn-outline" id="signout-btn" style="padding:4px 10px; font-size:12px;">Sign Out</button>
      </div>
    </header>
  `;
}
