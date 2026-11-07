/**
 * CryptoVista X Enterprise - Master Application Router & Controller
 * Complete Page-to-Page Connectivity Across All 130 Application Routes
 * Pure Node.js & JavaScript (Zero HTML Files)
 */

import { renderSidebar, renderTopbar } from './components/navigation.js';
import { renderLoginModal, initLoginModalEvents } from './components/modal.js';
import { renderPageHeader, renderBreadcrumbs } from './components/designSystem.js';
import { fetchMarketQuotes, fetchCustomers, fetchTickets } from './api.js';
import { store } from './state.js';

// Public Pages (1 – 13)
import { renderLandingPage } from './pages/landingPage.js';
import {
  renderAboutPage,
  renderProductPage,
  renderFeaturesPage,
  renderSecurityPage,
  renderContactPage,
  renderRequestDemoPage,
  renderFaqPage,
  renderPrivacyPage,
  renderTermsPage,
  renderLoginPage,
  initLoginPageListeners,
  renderForgotPasswordPage,
  renderResetPasswordPage
} from './pages/publicPages.js';

// Authenticated Modules (14 – 130)
import { renderDashboard } from './pages/dashboardPage.js';
import { renderMarkets, initMarketsListeners } from './pages/marketsPage.js';
import { renderTrading, initTradingListeners } from './pages/tradingPage.js';
import { renderPortfolioPage } from './pages/portfolioPage.js';
import { renderCustomersPage, initCustomersListeners } from './pages/customersPage.js';
import { renderLeadsPage, initLeadsListeners } from './pages/leadsPage.js';
import { renderSalesPage, initSalesListeners } from './pages/salesPage.js';
import { renderActivitiesPage, initActivitiesListeners } from './pages/activitiesPage.js';
import { renderSupportPage, initSupportListeners } from './pages/supportPage.js';
import { renderCampaignsPage, initCampaignsListeners } from './pages/campaignsPage.js';
import { renderEnterprisePage } from './pages/enterprisePage.js';
import { renderApprovalsPage, initApprovalsListeners } from './pages/approvalsPage.js';
import { renderAnalyticsPage } from './pages/analyticsPage.js';
import { renderAdminPage, initAdminListeners } from './pages/adminPage.js';
import { renderProfilePage } from './pages/profilePage.js';

let cachedQuotes = null;
let cachedCustomers = null;
let cachedTickets = null;

async function loadData() {
  if (!cachedQuotes) cachedQuotes = await fetchMarketQuotes();
  if (!cachedCustomers) cachedCustomers = await fetchCustomers();
  if (!cachedTickets) cachedTickets = await fetchTickets();
}

export async function renderApp() {
  const root = document.getElementById('app-root');
  if (!root) return;

  const rawHash = window.location.hash.replace(/^#\/?/, '').split('?')[0];
  const queryString = window.location.hash.includes('?') ? window.location.hash.split('?')[1] : '';
  const currentRoute = rawHash || 'landing';

  // --- PART A: PUBLIC PAGES ROUTING ---
  if (currentRoute === '' || currentRoute === 'landing') {
    root.innerHTML = renderLandingPage();
    return;
  }
  if (currentRoute === 'about') {
    root.innerHTML = renderAboutPage();
    return;
  }
  if (currentRoute === 'product') {
    root.innerHTML = renderProductPage();
    return;
  }
  if (currentRoute === 'features') {
    root.innerHTML = renderFeaturesPage();
    return;
  }
  if (currentRoute === 'security') {
    root.innerHTML = renderSecurityPage();
    return;
  }
  if (currentRoute === 'contact') {
    root.innerHTML = renderContactPage();
    return;
  }
  if (currentRoute === 'request-demo') {
    root.innerHTML = renderRequestDemoPage();
    return;
  }
  if (currentRoute === 'faq') {
    root.innerHTML = renderFaqPage();
    return;
  }
  if (currentRoute === 'privacy') {
    root.innerHTML = renderPrivacyPage();
    return;
  }
  if (currentRoute === 'terms') {
    root.innerHTML = renderTermsPage();
    return;
  }
  if (currentRoute === 'login') {
    root.innerHTML = renderLoginPage();
    initLoginPageListeners(() => {
      window.location.hash = '#/app/dashboard';
    });
    return;
  }
  if (currentRoute === 'forgot-password') {
    root.innerHTML = renderForgotPasswordPage();
    return;
  }
  if (currentRoute === 'reset-password') {
    root.innerHTML = renderResetPasswordPage();
    return;
  }

  // --- PART B: AUTHENTICATED WORKSTATION ROUTING ---
  await loadData();
  const state = store.getState();
  let pageContent = '';

  // Parametric route parsing helper
  const matchParam = (prefix) => {
    if (currentRoute.startsWith(prefix + '/')) {
      return currentRoute.replace(prefix + '/', '');
    }
    return null;
  };

  // 1. Overview
  if (currentRoute === 'app/dashboard' || currentRoute === 'dashboard') {
    pageContent = renderDashboard(state, cachedQuotes, cachedCustomers, cachedTickets);
  } else if (currentRoute === 'app/notifications') {
    pageContent = `
      <div>
        ${renderPageHeader(
          'Notifications & System Alerts',
          'Real-time operational alerts, lead assignments, and SLA triggers',
          [{ label: 'Overview', href: '#/app/dashboard' }, { label: 'Notifications' }],
          [{ label: 'Mark All as Read', variant: 'btn-outline', onclick: `alert('All notifications marked as read.');` }]
        )}
        <div class="panel">
          <div style="display:flex; flex-direction:column; gap:12px;">
            <div style="background:var(--cv-bg-page); padding:12px; border-radius:3px; border-left:3px solid var(--cv-brand-green);">
              <div style="font-weight:700; font-size:13px;">Simulated Limit Order Executed &bull; ORD-SIM-992</div>
              <div style="font-size:12px; color:var(--cv-text-secondary); margin-top:2px;">Executed BUY 0.25 BTC at reference price ₹82,45,100.00. Balanced ledger voucher posted.</div>
              <div style="font-size:11px; color:var(--cv-text-muted); margin-top:6px;">10 mins ago &bull; Trading Simulation</div>
            </div>
            <div style="background:var(--cv-bg-page); padding:12px; border-radius:3px; border-left:3px solid #F59E0B;">
              <div style="font-weight:700; font-size:13px;">New Inbound Qualified Lead &bull; Vikram Malhotra</div>
              <div style="font-size:12px; color:var(--cv-text-secondary); margin-top:2px;">Malhotra Family Office requested an institutional demo. BANT Score: 85.</div>
              <div style="font-size:11px; color:var(--cv-text-muted); margin-top:6px;">1 hour ago &bull; Lead Management</div>
            </div>
          </div>
        </div>
      </div>
    `;
  } else if (currentRoute === 'app/search') {
    const qParam = new URLSearchParams(queryString).get('q') || '';
    pageContent = `
      <div>
        ${renderPageHeader(
          'Universal Global Search',
          `Cross-module search across customers, leads, tickets, orders, and documents`,
          [{ label: 'Overview', href: '#/app/dashboard' }, { label: 'Search' }]
        )}
        <div class="panel" style="margin-bottom:20px;">
          <input type="text" value="${qParam}" placeholder="Search keyword..." 
                 onkeydown="if(event.key==='Enter'){location.hash='#/app/search?q='+encodeURIComponent(this.value);}"
                 style="width:100%; padding:10px 14px; border:1px solid var(--cv-border); border-radius:3px; font-size:14px;">
        </div>
        <div class="panel">
          <div class="panel-header"><span class="panel-title">Matched Entity Records</span></div>
          <div style="display:flex; flex-direction:column; gap:10px;">
            <div style="padding:10px; background:var(--cv-bg-page); border-radius:3px;">
              <a href="#/app/crm/customers/CUST-001" style="font-weight:700; color:var(--cv-brand-green);">Bharat Digital Custody Pvt Ltd</a>
              <div style="font-size:12px; color:var(--cv-text-secondary);">Customer 360 &bull; Institutional Client Tier &bull; Code: CUST-8021</div>
            </div>
            <div style="padding:10px; background:var(--cv-bg-page); border-radius:3px;">
              <a href="#/app/markets/assets/BTC" style="font-weight:700; color:var(--cv-brand-green);">Bitcoin (BTC) Reference Asset</a>
              <div style="font-size:12px; color:var(--cv-text-secondary);">Market Intelligence &bull; Live Telemetry & Benchmark Quotes</div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // 2. Markets
  else if (currentRoute.startsWith('app/markets/assets/')) {
    const assetId = matchParam('app/markets/assets');
    pageContent = renderMarkets(cachedQuotes, 'details', assetId);
  } else if (currentRoute === 'app/markets/assets') {
    pageContent = renderMarkets(cachedQuotes, 'explorer');
  } else if (currentRoute === 'app/markets/watchlists') {
    pageContent = renderMarkets(cachedQuotes, 'watchlists');
  } else if (currentRoute.startsWith('app/markets') || currentRoute === 'markets') {
    pageContent = renderMarkets(cachedQuotes, 'overview');
  }

  // 3. Trading
  else if (currentRoute.startsWith('app/trading/orders/')) {
    const orderId = matchParam('app/trading/orders');
    pageContent = renderTrading(state, cachedQuotes, 'order-details', orderId);
  } else if (currentRoute === 'app/trading/orders') {
    pageContent = renderTrading(state, cachedQuotes, 'orders');
  } else if (currentRoute === 'app/trading/history') {
    pageContent = renderTrading(state, cachedQuotes, 'history');
  } else if (currentRoute.startsWith('app/trading') || currentRoute === 'trading') {
    pageContent = renderTrading(state, cachedQuotes, 'terminal');
  }

  // 4. Portfolio
  else if (currentRoute.startsWith('app/portfolio/holdings/')) {
    const holdingId = matchParam('app/portfolio/holdings');
    pageContent = await renderPortfolioPage('holding-details', holdingId);
  } else if (currentRoute === 'app/portfolio/holdings') {
    pageContent = await renderPortfolioPage('overview');
  } else if (currentRoute === 'app/portfolio/ledger') {
    pageContent = await renderPortfolioPage('ledger');
  } else if (currentRoute.startsWith('app/portfolio') || currentRoute === 'portfolio') {
    pageContent = await renderPortfolioPage('overview');
  }

  // 5. CRM & Customers
  else if (currentRoute.startsWith('app/crm/customers/')) {
    const custId = matchParam('app/crm/customers');
    pageContent = await renderCustomersPage('details', custId);
  } else if (currentRoute === 'app/crm/accounts') {
    pageContent = await renderCustomersPage('accounts');
  } else if (currentRoute === 'app/crm/contacts') {
    pageContent = await renderCustomersPage('contacts');
  } else if (currentRoute === 'app/crm/customers' || currentRoute === 'customers') {
    pageContent = await renderCustomersPage('directory');
  }

  // 6. Leads
  else if (currentRoute.startsWith('app/crm/leads/')) {
    const leadId = matchParam('app/crm/leads');
    pageContent = await renderLeadsPage('details', leadId);
  } else if (currentRoute.startsWith('app/crm/leads') || currentRoute === 'leads') {
    pageContent = await renderLeadsPage('list');
  }

  // 7. Sales & Opportunities
  else if (currentRoute.startsWith('app/crm/opportunities/')) {
    const oppId = matchParam('app/crm/opportunities');
    pageContent = renderSalesPage('details', oppId);
  } else if (currentRoute === 'app/crm/opportunities' || currentRoute === 'app/crm/sales') {
    pageContent = renderSalesPage('pipeline');
  }

  // 8. Activities
  else if (currentRoute.startsWith('app/activities') || currentRoute === 'activities') {
    const sub = currentRoute.includes('calendar') ? 'calendar' : currentRoute.includes('tasks') ? 'tasks' : 'list';
    pageContent = renderActivitiesPage(sub);
  }

  // 9. Customer Operations
  else if (currentRoute.startsWith('app/customer-operations/support/tickets/')) {
    const tckId = matchParam('app/customer-operations/support/tickets');
    pageContent = await renderSupportPage('details', tckId);
  } else if (currentRoute === 'app/customer-operations/support/sla') {
    pageContent = await renderSupportPage('sla');
  } else if (currentRoute.startsWith('app/customer-operations/support') || currentRoute === 'support') {
    pageContent = await renderSupportPage('tickets');
  } else if (currentRoute.startsWith('app/customer-operations')) {
    pageContent = await renderSupportPage('tickets');
  }

  // 10. Communications
  else if (currentRoute.startsWith('app/communications') || currentRoute === 'campaigns') {
    const sub = currentRoute.includes('templates') ? 'templates' : currentRoute.includes('history') ? 'history' : 'list';
    pageContent = renderCampaignsPage(sub);
  }

  // 11. Enterprise Management
  else if (currentRoute.startsWith('app/enterprise') || currentRoute === 'enterprise') {
    const sub = currentRoute.includes('invoices') ? 'invoices' : currentRoute.includes('vendors') ? 'vendors' : 'employees';
    pageContent = renderEnterprisePage(sub);
  }

  // 12. Workflow Approvals
  else if (currentRoute.startsWith('app/workflows') || currentRoute === 'approvals') {
    pageContent = await renderApprovalsPage();
  }

  // 13. Analytics
  else if (currentRoute.startsWith('app/analytics') || currentRoute === 'analytics') {
    const sub = currentRoute.includes('trading') ? 'trading' : currentRoute.includes('crm') ? 'crm' : 'dashboard';
    pageContent = renderAnalyticsPage(sub);
  }

  // 14. Administration
  else if (currentRoute.startsWith('app/admin') || currentRoute === 'admin') {
    const sub = currentRoute.includes('sessions') ? 'sessions' : currentRoute.includes('settings') ? 'settings' : 'users';
    pageContent = renderAdminPage(sub);
  }

  // 15. User Profile
  else if (currentRoute.startsWith('app/profile') || currentRoute === 'profile') {
    const sub = currentRoute.includes('password') ? 'password' : currentRoute.includes('preferences') ? 'preferences' : 'overview';
    pageContent = renderProfilePage(sub);
  } else {
    pageContent = renderDashboard(state, cachedQuotes, cachedCustomers, cachedTickets);
  }

  root.innerHTML = `
    <div class="app-layout">
      ${renderSidebar(currentRoute)}
      <div class="main-wrapper" style="margin-left:240px; min-height:100vh; background:var(--cv-bg-page);">
        ${renderTopbar(state.currentUser, state.tenantId)}
        <main class="content-body" id="page-container" style="padding:28px;">
          ${pageContent}
        </main>
      </div>
    </div>
  `;

  attachListeners(currentRoute);
}

function attachListeners(route) {
  const signoutBtn = document.getElementById('signout-btn');
  if (signoutBtn) {
    signoutBtn.onclick = () => {
      showLoginModal();
    };
  }

  if (route.startsWith('app/markets') || route === 'markets') {
    initMarketsListeners();
  } else if (route.startsWith('app/trading') || route === 'trading') {
    initTradingListeners(cachedQuotes, () => {
      renderApp();
    });
  } else if (route.startsWith('app/crm/customers') || route === 'customers') {
    initCustomersListeners();
  } else if (route.startsWith('app/crm/leads') || route === 'leads') {
    initLeadsListeners();
  } else if (route.startsWith('app/crm/sales') || route.startsWith('app/crm/opportunities') || route === 'sales') {
    initSalesListeners();
  } else if (route.startsWith('app/activities') || route === 'activities') {
    initActivitiesListeners();
  } else if (route.startsWith('app/customer-operations/support') || route === 'support') {
    initSupportListeners();
  } else if (route.startsWith('app/communications') || route === 'campaigns') {
    initCampaignsListeners();
  } else if (route.startsWith('app/workflows') || route === 'approvals') {
    initApprovalsListeners();
  } else if (route.startsWith('app/admin') || route === 'admin') {
    initAdminListeners();
  }
}

function showLoginModal() {
  const existing = document.getElementById('login-modal-overlay');
  if (existing) existing.remove();

  const modalContainer = document.createElement('div');
  modalContainer.innerHTML = renderLoginModal();
  document.body.appendChild(modalContainer.firstElementChild);

  initLoginModalEvents(() => {
    renderApp();
  });
}

window.addEventListener('DOMContentLoaded', () => {
  renderApp();
});

window.addEventListener('hashchange', () => {
  renderApp();
});

store.subscribe(() => {
  renderApp();
});
