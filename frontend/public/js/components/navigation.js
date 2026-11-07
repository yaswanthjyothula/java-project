/**
 * CryptoVista X Enterprise - Master Clean Navigation Component
 * Groww-inspired minimal information hierarchy
 * Shows ONLY primary module options; secondary/detail pages are accessed via contextual actions
 */

import { store } from '../state.js';

export function renderSidebar(currentRoute) {
  const user = store.getState().currentUser || { role: 'OPERATOR' };

  // Primary Module Navigation Groups (Groww-inspired visual calm & minimalism)
  const navGroups = [
    {
      group: 'WORKSPACE',
      items: [
        { id: 'app/dashboard', label: 'Dashboard', routePrefix: 'app/dashboard' }
      ]
    },
    {
      group: 'MARKETS & TRADING',
      items: [
        { id: 'app/markets', label: 'Markets', routePrefix: 'app/markets' },
        { id: 'app/trading', label: 'Trading Terminal', routePrefix: 'app/trading' },
        { id: 'app/portfolio', label: 'Portfolio', routePrefix: 'app/portfolio' }
      ]
    },
    {
      group: 'CLIENTS & SALES',
      items: [
        { id: 'app/crm/customers', label: 'Customers', routePrefix: 'app/crm/customers' },
        { id: 'app/crm/leads', label: 'Leads', routePrefix: 'app/crm/leads' },
        { id: 'app/crm/opportunities', label: 'Opportunities', routePrefix: 'app/crm/opportunities' },
        { id: 'app/activities', label: 'Activities', routePrefix: 'app/activities' }
      ]
    },
    {
      group: 'OPERATIONS',
      items: [
        { id: 'app/customer-operations/support', label: 'Support & SLA', routePrefix: 'app/customer-operations' },
        { id: 'app/communications', label: 'Communications', routePrefix: 'app/communications' },
        { id: 'app/enterprise', label: 'Enterprise Ops', routePrefix: 'app/enterprise' },
        { id: 'app/workflows', label: 'Workflow Approvals', routePrefix: 'app/workflows' }
      ]
    },
    {
      group: 'INTELLIGENCE & CONTROL',
      items: [
        { id: 'app/analytics', label: 'Analytics', routePrefix: 'app/analytics' },
        // Role-based visibility: Administration visible to authorized roles
        ...(user.role === 'ADMIN' || user.role === 'OPERATOR' ? [
          { id: 'app/admin', label: 'Administration', routePrefix: 'app/admin' }
        ] : [])
      ]
    }
  ];

  // Helper to determine if an item is active
  const isItemActive = (item) => {
    if (item.id === 'app/dashboard' && (currentRoute === 'dashboard' || currentRoute === 'app/dashboard')) {
      return true;
    }
    return currentRoute.startsWith(item.routePrefix) || (item.routePrefix === 'app/crm/opportunities' && currentRoute.startsWith('app/crm/sales'));
  };

  return `
    <aside class="sidebar" style="width:240px; background:#FFFFFF; border-right:1px solid var(--cv-border); display:flex; flex-direction:column; position:fixed; top:0; bottom:0; left:0; z-index:100; overflow-y:auto;">
      
      <!-- Brand Logo Header -->
      <div class="sidebar-header" style="height:64px; display:flex; align-items:center; padding:0 20px; border-bottom:1px solid var(--cv-border);">
        <a href="#/landing" style="display:flex; align-items:center; gap:10px; text-decoration:none;">
          <div style="width:28px; height:28px; background:var(--cv-brand-green); border-radius:3px; display:flex; align-items:center; justify-content:center; color:#FFF; font-weight:800; font-size:14px;">
            CV
          </div>
          <div>
            <span class="brand-title" style="font-size:15px; font-weight:700; color:var(--cv-text-primary); letter-spacing:-0.2px;">CryptoVista X</span>
            <span class="brand-badge" style="font-size:9.5px; font-weight:700; background:var(--cv-soft-green); color:var(--cv-brand-green); padding:2px 5px; border-radius:2px; margin-left:4px;">ENTERPRISE</span>
          </div>
        </a>
      </div>

      <!-- Clean Minimal Navigation Menu -->
      <nav style="flex:1; padding:12px 0 24px;">
        ${navGroups.map(g => `
          <div class="sidebar-group" style="margin-bottom:12px;">
            <div class="nav-group-title" style="font-size:10.5px; font-weight:700; color:var(--cv-text-muted); text-transform:uppercase; letter-spacing:0.6px; padding:8px 20px 4px;">
              ${g.group}
            </div>
            <div>
              ${g.items.map(item => {
                const active = isItemActive(item);
                return `
                  <a href="#/${item.id}" class="nav-link ${active ? 'active' : ''}" data-route="${item.id}"
                     style="display:flex; align-items:center; padding:8px 20px; font-size:13px; color:${active ? 'var(--cv-brand-green)' : 'var(--cv-text-secondary)'}; font-weight:${active ? '600' : '500'}; text-decoration:none; border-left:3px solid ${active ? 'var(--cv-brand-green)' : 'transparent'}; background:${active ? 'var(--cv-soft-green)' : 'transparent'}; transition:all 0.15s ease;">
                    ${item.label}
                  </a>
                `;
              }).join('')}
            </div>
          </div>
        `).join('')}
      </nav>

      <!-- Minimal Bottom Status -->
      <div style="padding:14px 20px; border-top:1px solid var(--cv-border); font-size:11px; color:var(--cv-text-muted); background:var(--cv-bg-page);">
        <div style="font-weight:600; color:var(--cv-text-secondary);">${store.getState().tenantId}</div>
        <div style="margin-top:2px;">Single-Step Node.js Runtime</div>
      </div>
    </aside>
  `;
}

export function renderTopbar(user, tenantId) {
  return `
    <header class="topbar" style="height:64px; background:#FFFFFF; border-bottom:1px solid var(--cv-border); display:flex; align-items:center; justify-content:space-between; padding:0 28px; position:sticky; top:0; z-index:90;">
      
      <!-- Topbar Left: Global Search & Tenant Context -->
      <div class="topbar-left" style="display:flex; align-items:center; gap:16px;">
        <div style="position:relative; width:280px;">
          <input type="text" id="topbar-global-search" placeholder="Search records, assets, tickets..." 
                 onkeydown="if(event.key === 'Enter'){ window.location.hash = '#/app/search?q=' + encodeURIComponent(this.value); }"
                 style="width:100%; padding:6px 12px 6px 30px; border:1px solid var(--cv-border); border-radius:3px; font-size:12px; outline:none; background:var(--cv-bg-page); transition:border-color 0.15s ease;">
          <svg style="position:absolute; left:9px; top:8px; width:13px; height:13px; color:var(--cv-text-muted);" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </div>

        <span class="tenant-pill" style="font-size:11px; font-weight:600; color:var(--cv-text-secondary); background:var(--cv-bg-page); border:1px solid var(--cv-border); padding:3px 8px; border-radius:3px;">
          Tenant: ${tenantId}
        </span>
      </div>

      <!-- Topbar Right: Notifications, User Profile & Actions -->
      <div class="topbar-right" style="display:flex; align-items:center; gap:16px;">
        <!-- Public Website Link -->
        <a href="#/landing" style="font-size:12px; font-weight:600; color:var(--cv-text-secondary); text-decoration:none;" title="Public Website">
          Public Website
        </a>

        <!-- Notifications Indicator -->
        <a href="#/app/notifications" style="position:relative; color:var(--cv-text-secondary); text-decoration:none; padding:4px;" title="Notifications">
          <svg width="17" height="17" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
          </svg>
          <span style="position:absolute; top:2px; right:2px; width:6px; height:6px; background:var(--cv-brand-green); border-radius:50%;"></span>
        </a>

        <!-- User Profile Pill -->
        <a href="#/app/profile" style="display:flex; align-items:center; gap:8px; text-decoration:none;" title="User Profile">
          <div style="width:28px; height:28px; background:var(--cv-brand-green); color:#FFF; font-weight:700; font-size:12px; border-radius:3px; display:flex; align-items:center; justify-content:center;">
            ${(user.fullName || 'Apex Operator').substring(0, 2).toUpperCase()}
          </div>
          <span style="font-size:12.5px; font-weight:600; color:var(--cv-text-primary);">${user.fullName || 'Apex Operator'}</span>
        </a>

        <button class="btn btn-outline" id="signout-btn" style="padding:4px 10px; font-size:11.5px;">Sign Out</button>
      </div>
    </header>
  `;
}
