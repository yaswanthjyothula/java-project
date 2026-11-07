/**
 * CryptoVista X Enterprise - Navigation Components
 * Groww-inspired information hierarchy and clean visual calm
 */

export function renderSidebar(currentRoute) {
  const routes = [
    { group: 'OVERVIEW', items: [
      { id: 'dashboard', label: 'Dashboard' }
    ]},
    { group: 'MARKETS & PORTFOLIO', items: [
      { id: 'markets', label: 'Markets' },
      { id: 'trading', label: 'Trading Simulation' },
      { id: 'portfolio', label: 'Portfolio' }
    ]},
    { group: 'ENTERPRISE CRM', items: [
      { id: 'customers', label: 'Customer 360' },
      { id: 'leads', label: 'Leads & Pipeline' }
    ]},
    { group: 'OPERATIONS & CONTROL', items: [
      { id: 'support', label: 'Support & SLA' },
      { id: 'approvals', label: 'Workflow Approvals' },
      { id: 'audit', label: 'Security & Audit Log' }
    ]}
  ];

  return `
    <aside class="sidebar">
      <div class="sidebar-header">
        <span class="brand-title">CryptoVista X</span>
        <span class="brand-badge">ENTERPRISE</span>
      </div>
      <nav style="flex:1; padding-bottom:24px;">
        ${routes.map(g => `
          <div class="nav-group-title">${g.group}</div>
          ${g.items.map(item => `
            <a href="#/${item.id}" class="nav-link ${currentRoute === item.id ? 'active' : ''}" data-route="${item.id}">
              ${item.label}
            </a>
          `).join('')}
        `).join('')}
      </nav>
      <div style="padding:16px 20px; border-top:1px solid var(--cv-border); font-size:11px; color:var(--cv-text-muted);">
        <div>Runtime: <strong>Node.js + Java 21</strong></div>
        <div style="margin-top:2px;">Simulated FinTech Engine</div>
      </div>
    </aside>
  `;
}

export function renderTopbar(user, tenantId) {
  return `
    <header class="topbar">
      <div class="topbar-left">
        <span class="tenant-pill">Tenant: ${tenantId}</span>
        <span class="badge badge-positive">SECURE SESSION</span>
      </div>
      <div class="topbar-right">
        <div style="text-align:right;">
          <div style="font-size:13px; font-weight:600; color:var(--cv-text-primary);">${user.fullName}</div>
          <div style="font-size:11px; color:var(--cv-text-muted);">${user.email}</div>
        </div>
        <button class="btn btn-outline" id="signout-btn" style="padding:4px 10px; font-size:12px;">Sign Out</button>
      </div>
    </header>
  `;
}
