/**
 * CryptoVista X Enterprise - Master Navigation Component
 * 15 Expandable Groups matching the Master Prompt
 * Highlights active route and provides global search, notifications drawer, and user profile
 */

export function renderSidebar(currentRoute) {
  const groups = [
    {
      id: 'grp-overview',
      label: '1. Overview',
      items: [
        { id: 'app/dashboard', label: 'Dashboard' },
        { id: 'app/notifications', label: 'Notifications' },
        { id: 'app/search', label: 'Global Search' }
      ]
    },
    {
      id: 'grp-markets',
      label: '2. Markets',
      items: [
        { id: 'app/markets', label: 'Market Overview' },
        { id: 'app/markets/assets', label: 'Asset Explorer' },
        { id: 'app/markets/assets/BTC', label: 'Asset Details (BTC)' },
        { id: 'app/markets/watchlists', label: 'Watchlists' },
        { id: 'app/markets/movers', label: 'Market Movers' }
      ]
    },
    {
      id: 'grp-trading',
      label: '3. Trading',
      items: [
        { id: 'app/trading', label: 'Trading Terminal' },
        { id: 'app/trading/orders', label: 'Orders' },
        { id: 'app/trading/history', label: 'Trade History' },
        { id: 'app/trading/accounts', label: 'Trading Accounts' }
      ]
    },
    {
      id: 'grp-portfolio',
      label: '4. Portfolio',
      items: [
        { id: 'app/portfolio', label: 'Portfolio Overview' },
        { id: 'app/portfolio/holdings', label: 'Holdings' },
        { id: 'app/portfolio/performance', label: 'Performance' },
        { id: 'app/portfolio/ledger', label: 'Transaction Ledger' },
        { id: 'app/portfolio/reports', label: 'Portfolio Reports' }
      ]
    },
    {
      id: 'grp-crm',
      label: '5. CRM',
      items: [
        { id: 'app/crm', label: 'CRM Dashboard' },
        { id: 'app/crm/customers', label: 'Customers' },
        { id: 'app/crm/customers/CUST-001', label: 'Customer 360' },
        { id: 'app/crm/accounts', label: 'Accounts' },
        { id: 'app/crm/contacts', label: 'Contacts' }
      ]
    },
    {
      id: 'grp-leads',
      label: '6. Leads',
      items: [
        { id: 'app/crm/leads', label: 'Lead Dashboard' },
        { id: 'app/crm/leads/list', label: 'Lead List' },
        { id: 'app/crm/leads/LEAD-001', label: 'Lead Details' },
        { id: 'app/crm/leads/assignment', label: 'Lead Assignment' },
        { id: 'app/crm/leads/sources', label: 'Lead Sources' },
        { id: 'app/crm/leads/reports', label: 'Lead Reports' }
      ]
    },
    {
      id: 'grp-sales',
      label: '7. Sales',
      items: [
        { id: 'app/crm/sales', label: 'Sales Dashboard' },
        { id: 'app/crm/opportunities/pipeline', label: 'Pipeline Kanban' },
        { id: 'app/crm/opportunities', label: 'Opportunity List' },
        { id: 'app/crm/opportunities/OPP-101', label: 'Opportunity Details' },
        { id: 'app/crm/opportunities/stages', label: 'Pipeline Stages' },
        { id: 'app/crm/sales/forecast', label: 'Sales Forecast' },
        { id: 'app/crm/sales/reports', label: 'Sales Reports' }
      ]
    },
    {
      id: 'grp-activities',
      label: '8. Activities',
      items: [
        { id: 'app/activities', label: 'Activity Dashboard' },
        { id: 'app/activities/list', label: 'Activity List' },
        { id: 'app/activities/calendar', label: 'Calendar' },
        { id: 'app/activities/tasks', label: 'Tasks' },
        { id: 'app/activities/reminders', label: 'Reminders' },
        { id: 'app/activities/notes', label: 'Notes' }
      ]
    },
    {
      id: 'grp-ops',
      label: '9. Customer Operations',
      items: [
        { id: 'app/customer-operations/onboarding', label: 'Onboarding Dashboard' },
        { id: 'app/customer-operations/onboarding/cases', label: 'Onboarding Cases' },
        { id: 'app/customer-operations/support', label: 'Support Dashboard' },
        { id: 'app/customer-operations/support/tickets', label: 'Support Tickets' },
        { id: 'app/customer-operations/support/tickets/TCK-001', label: 'Ticket Details' },
        { id: 'app/customer-operations/support/sla', label: 'SLA Management' },
        { id: 'app/customer-operations/complaints', label: 'Complaints' },
        { id: 'app/customer-operations/customer-success', label: 'Customer Success' },
        { id: 'app/customer-operations/customer-success/health', label: 'Customer Health' },
        { id: 'app/customer-operations/customer-success/renewals', label: 'Renewals' }
      ]
    },
    {
      id: 'grp-comms',
      label: '10. Communications',
      items: [
        { id: 'app/communications', label: 'Campaign Dashboard' },
        { id: 'app/communications/campaigns/list', label: 'Campaign List' },
        { id: 'app/communications/history', label: 'Communication History' },
        { id: 'app/communications/templates', label: 'Message Templates' }
      ]
    },
    {
      id: 'grp-enterprise',
      label: '11. Enterprise',
      items: [
        { id: 'app/enterprise', label: 'Employee Dashboard' },
        { id: 'app/enterprise/employees/list', label: 'Employee List' },
        { id: 'app/enterprise/teams', label: 'Teams' },
        { id: 'app/enterprise/departments', label: 'Departments' },
        { id: 'app/enterprise/vendors', label: 'Vendors' },
        { id: 'app/enterprise/subscriptions', label: 'Subscriptions' },
        { id: 'app/enterprise/invoices', label: 'Invoices' },
        { id: 'app/enterprise/documents', label: 'Documents' }
      ]
    },
    {
      id: 'grp-workflows',
      label: '12. Workflows',
      items: [
        { id: 'app/workflows', label: 'Workflow Dashboard' },
        { id: 'app/workflows/list', label: 'Workflow List' },
        { id: 'app/workflows/builder', label: 'Workflow Builder' },
        { id: 'app/approvals', label: 'Approval Inbox' },
        { id: 'app/approvals/WF-APP-501', label: 'Approval Details' }
      ]
    },
    {
      id: 'grp-analytics',
      label: '13. Analytics',
      items: [
        { id: 'app/analytics', label: 'Analytics Dashboard' },
        { id: 'app/analytics/business', label: 'Business Reports' },
        { id: 'app/analytics/crm', label: 'CRM Reports' },
        { id: 'app/analytics/sales', label: 'Sales Reports' },
        { id: 'app/analytics/support', label: 'Support Reports' },
        { id: 'app/analytics/trading', label: 'Trading Analytics' },
        { id: 'app/analytics/portfolio', label: 'Portfolio Analytics' },
        { id: 'app/analytics/exports', label: 'Report Exports' }
      ]
    },
    {
      id: 'grp-admin',
      label: '14. Administration',
      items: [
        { id: 'app/admin', label: 'Admin Dashboard' },
        { id: 'app/admin/users', label: 'User Management' },
        { id: 'app/admin/roles', label: 'Roles & Permissions' },
        { id: 'app/admin/tenants', label: 'Tenant Management' },
        { id: 'app/admin/settings', label: 'Tenant Settings' },
        { id: 'app/admin/login-history', label: 'Login History' },
        { id: 'app/admin/sessions', label: 'Session Management' },
        { id: 'app/admin/audit-logs', label: 'Audit Logs' },
        { id: 'app/admin/security-events', label: 'Security Events' },
        { id: 'app/admin/system', label: 'System Configuration' }
      ]
    },
    {
      id: 'grp-profile',
      label: '15. Profile',
      items: [
        { id: 'app/profile', label: 'My Profile' },
        { id: 'app/profile/edit', label: 'Edit Profile' },
        { id: 'app/profile/password', label: 'Change Password' },
        { id: 'app/profile/preferences', label: 'Preferences' },
        { id: 'app/profile/sessions', label: 'My Sessions' }
      ]
    }
  ];

  return `
    <aside class="sidebar" style="width:260px; background:#FFFFFF; border-right:1px solid var(--cv-border); display:flex; flex-direction:column; position:fixed; top:0; bottom:0; left:0; z-index:100; overflow-y:auto;">
      <div class="sidebar-header" style="height:64px; display:flex; align-items:center; padding:0 20px; border-bottom:1px solid var(--cv-border);">
        <a href="#/landing" style="display:flex; align-items:center; gap:8px; text-decoration:none;">
          <div style="width:28px; height:28px; background:var(--cv-brand-green); border-radius:3px; display:flex; align-items:center; justify-content:center; color:#FFF; font-weight:800; font-size:14px;">
            CV
          </div>
          <span class="brand-title" style="font-size:16px; font-weight:700; color:var(--cv-text-primary);">CryptoVista X</span>
          <span class="brand-badge" style="font-size:10px; font-weight:700; background:var(--cv-soft-green); color:var(--cv-brand-green); padding:2px 6px; border-radius:2px;">ENTERPRISE</span>
        </a>
      </div>

      <nav style="flex:1; padding:12px 0 32px;">
        <div style="padding:4px 20px 8px; font-size:10px; font-weight:700; color:var(--cv-text-muted); text-transform:uppercase; letter-spacing:0.5px;">
          Public Portal
        </div>
        <a href="#/landing" class="nav-link" style="padding:6px 20px; font-size:12.5px; display:flex; align-items:center; color:var(--cv-text-secondary); text-decoration:none;">
          &larr; Back to Public Website
        </a>

        ${groups.map(g => {
          const isGroupActive = g.items.some(item => currentRoute === item.id || currentRoute.startsWith(item.id));
          return `
            <div class="sidebar-group" style="margin-top:8px;">
              <div class="nav-group-title" style="font-size:11px; font-weight:700; color:${isGroupActive ? 'var(--cv-brand-green)' : 'var(--cv-text-muted)'}; text-transform:uppercase; letter-spacing:0.5px; padding:10px 20px 4px; display:flex; justify-content:space-between; align-items:center; cursor:default;">
                <span>${g.label}</span>
              </div>
              <div class="nav-group-items">
                ${g.items.map(item => {
                  const isActive = currentRoute === item.id || (item.id === 'app/dashboard' && currentRoute === 'dashboard');
                  return `
                    <a href="#/${item.id}" class="nav-link ${isActive ? 'active' : ''}" data-route="${item.id}"
                       style="display:flex; align-items:center; padding:6px 20px; font-size:12.5px; color:${isActive ? 'var(--cv-brand-green)' : 'var(--cv-text-secondary)'}; font-weight:${isActive ? '600' : '500'}; text-decoration:none; border-left:3px solid ${isActive ? 'var(--cv-brand-green)' : 'transparent'}; background:${isActive ? 'var(--cv-soft-green)' : 'transparent'}; transition:all 0.15s ease;">
                      ${item.label}
                    </a>
                  `;
                }).join('')}
              </div>
            </div>
          `;
        }).join('')}
      </nav>

      <div style="padding:16px 20px; border-top:1px solid var(--cv-border); font-size:11px; color:var(--cv-text-muted); background:var(--cv-bg-page);">
        <div>Node.js Runtime &bull; Multi-Tenant</div>
        <div style="margin-top:2px; font-weight:600; color:var(--cv-text-primary);">Tenant: TENANT-APEX-01</div>
      </div>
    </aside>
  `;
}

export function renderTopbar(user, tenantId) {
  return `
    <header class="topbar" style="height:64px; background:#FFFFFF; border-bottom:1px solid var(--cv-border); display:flex; align-items:center; justify-content:space-between; padding:0 28px; position:sticky; top:0; z-index:90;">
      <div class="topbar-left" style="display:flex; align-items:center; gap:16px;">
        <!-- Global Search Input -->
        <div style="position:relative; width:320px;">
          <input type="text" id="topbar-global-search" placeholder="Search customers, leads, tickets, orders..." 
                 onkeydown="if(event.key === 'Enter'){ window.location.hash = '#/app/search?q=' + encodeURIComponent(this.value); }"
                 style="width:100%; padding:7px 12px 7px 32px; border:1px solid var(--cv-border); border-radius:3px; font-size:12.5px; outline:none; background:var(--cv-bg-page); transition:border-color 0.15s ease;">
          <svg style="position:absolute; left:10px; top:8px; width:14px; height:14px; color:var(--cv-text-muted);" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </div>

        <span class="tenant-pill" style="font-size:11.5px; font-weight:600; color:var(--cv-text-secondary); background:var(--cv-bg-page); border:1px solid var(--cv-border); padding:3px 8px; border-radius:3px;">
          Tenant: ${tenantId}
        </span>
        <span class="badge badge-positive" style="font-size:10px;">SINGLE-STEP AUTH</span>
      </div>

      <div class="topbar-right" style="display:flex; align-items:center; gap:14px;">
        <!-- Notifications button -->
        <a href="#/app/notifications" style="position:relative; color:var(--cv-text-secondary); text-decoration:none; padding:6px; border-radius:3px;" title="Notifications">
          <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
          </svg>
          <span style="position:absolute; top:2px; right:2px; width:8px; height:8px; background:var(--cv-brand-green); border-radius:50%;"></span>
        </a>

        <!-- User Profile Pill -->
        <a href="#/app/profile" style="display:flex; align-items:center; gap:10px; text-decoration:none;" title="User Profile">
          <div style="width:32px; height:32px; background:var(--cv-brand-green); color:#FFF; font-weight:700; font-size:13px; border-radius:3px; display:flex; align-items:center; justify-content:center;">
            ${(user.fullName || 'Apex Operator').substring(0, 2).toUpperCase()}
          </div>
          <div style="text-align:left;">
            <div style="font-size:12.5px; font-weight:600; color:var(--cv-text-primary); line-height:1.2;">${user.fullName || 'Apex Operator'}</div>
            <div style="font-size:11px; color:var(--cv-text-muted);">${user.role || 'OPERATOR'}</div>
          </div>
        </a>

        <button class="btn btn-outline" id="signout-btn" style="padding:4px 10px; font-size:11.5px;">Sign Out</button>
      </div>
    </header>
  `;
}
