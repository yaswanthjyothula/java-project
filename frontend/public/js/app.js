/**
 * CryptoVista X Enterprise - Master Application Router & Controller
 * Powers Public Website (Pages 1-13) and All 15 Authenticated Modules (Pages 14-130)
 * Pure Node.js & JavaScript (Zero HTML Files)
 */

import { renderSidebar, renderTopbar } from './components/navigation.js';
import { renderLoginModal, initLoginModalEvents } from './components/modal.js';
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

  const rawHash = window.location.hash.replace(/^#\/?/, '');
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

  if (currentRoute === 'app/dashboard' || currentRoute === 'dashboard') {
    pageContent = renderDashboard(state, cachedQuotes, cachedCustomers, cachedTickets);
  } else if (currentRoute.startsWith('app/markets') || currentRoute === 'markets') {
    pageContent = renderMarkets(cachedQuotes);
  } else if (currentRoute.startsWith('app/trading') || currentRoute === 'trading') {
    pageContent = renderTrading(state, cachedQuotes);
  } else if (currentRoute.startsWith('app/portfolio') || currentRoute === 'portfolio') {
    pageContent = await renderPortfolioPage();
  } else if (currentRoute.startsWith('app/crm/customers') || currentRoute === 'customers') {
    pageContent = await renderCustomersPage();
  } else if (currentRoute.startsWith('app/crm/leads') || currentRoute === 'leads') {
    pageContent = await renderLeadsPage();
  } else if (currentRoute.startsWith('app/crm/sales') || currentRoute.startsWith('app/crm/opportunities') || currentRoute === 'sales') {
    const sub = currentRoute.includes('forecast') ? 'forecast' : currentRoute.includes('pipeline') ? 'pipeline' : 'list';
    pageContent = renderSalesPage(sub);
  } else if (currentRoute.startsWith('app/activities') || currentRoute === 'activities') {
    const sub = currentRoute.includes('calendar') ? 'calendar' : currentRoute.includes('tasks') ? 'tasks' : 'list';
    pageContent = renderActivitiesPage(sub);
  } else if (currentRoute.startsWith('app/customer-operations') || currentRoute === 'support') {
    pageContent = await renderSupportPage();
  } else if (currentRoute.startsWith('app/communications') || currentRoute === 'campaigns') {
    const sub = currentRoute.includes('templates') ? 'templates' : currentRoute.includes('history') ? 'history' : 'list';
    pageContent = renderCampaignsPage(sub);
  } else if (currentRoute.startsWith('app/enterprise') || currentRoute === 'enterprise') {
    const sub = currentRoute.includes('invoices') ? 'invoices' : currentRoute.includes('vendors') ? 'vendors' : 'employees';
    pageContent = renderEnterprisePage(sub);
  } else if (currentRoute.startsWith('app/workflows') || currentRoute === 'approvals') {
    pageContent = await renderApprovalsPage();
  } else if (currentRoute.startsWith('app/analytics') || currentRoute === 'analytics') {
    const sub = currentRoute.includes('trading') ? 'trading' : currentRoute.includes('crm') ? 'crm' : 'dashboard';
    pageContent = renderAnalyticsPage(sub);
  } else if (currentRoute.startsWith('app/admin') || currentRoute === 'admin') {
    const sub = currentRoute.includes('sessions') ? 'sessions' : currentRoute.includes('settings') ? 'settings' : 'users';
    pageContent = renderAdminPage(sub);
  } else if (currentRoute.startsWith('app/profile') || currentRoute === 'profile') {
    const sub = currentRoute.includes('password') ? 'password' : currentRoute.includes('preferences') ? 'preferences' : 'overview';
    pageContent = renderProfilePage(sub);
  } else {
    pageContent = renderDashboard(state, cachedQuotes, cachedCustomers, cachedTickets);
  }

  root.innerHTML = `
    <div class="app-layout">
      ${renderSidebar(currentRoute)}
      <div class="main-wrapper">
        ${renderTopbar(state.currentUser, state.tenantId)}
        <main class="content-body" id="page-container">
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
  } else if (route.startsWith('app/customer-operations') || route === 'support') {
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
