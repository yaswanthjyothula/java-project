/**
 * CryptoVista X Enterprise - Single Page Application Router & Main Controller
 * Pure Node.js & JavaScript Workstation (Zero HTML files)
 */

import { renderSidebar, renderTopbar } from './components/navigation.js';
import { renderLoginModal, initLoginModalEvents } from './components/modal.js';
import { fetchMarketQuotes, fetchCustomers, fetchTickets } from './api.js';
import { store } from './state.js';

import { renderDashboard } from './pages/dashboardPage.js';
import { renderMarkets, initMarketsListeners } from './pages/marketsPage.js';
import { renderTrading, initTradingListeners } from './pages/tradingPage.js';
import { renderPortfolioPage } from './pages/portfolioPage.js';
import { renderCustomersPage, initCustomersListeners } from './pages/customersPage.js';
import { renderLeadsPage, initLeadsListeners } from './pages/leadsPage.js';
import { renderSupportPage, initSupportListeners } from './pages/supportPage.js';
import { renderApprovalsPage, initApprovalsListeners } from './pages/approvalsPage.js';
import { renderAuditPage, initAuditListeners } from './pages/auditPage.js';

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

  await loadData();
  const state = store.getState();
  const rawHash = window.location.hash.replace(/^#\/?/, '');
  const currentRoute = rawHash || 'dashboard';

  let pageContent = '';

  switch (currentRoute) {
    case 'dashboard':
      pageContent = renderDashboard(state, cachedQuotes, cachedCustomers, cachedTickets);
      break;
    case 'markets':
      pageContent = renderMarkets(cachedQuotes);
      break;
    case 'trading':
      pageContent = renderTrading(state, cachedQuotes);
      break;
    case 'portfolio':
      pageContent = await renderPortfolioPage();
      break;
    case 'customers':
      pageContent = await renderCustomersPage();
      break;
    case 'leads':
      pageContent = await renderLeadsPage();
      break;
    case 'support':
      pageContent = await renderSupportPage();
      break;
    case 'approvals':
      pageContent = await renderApprovalsPage();
      break;
    case 'audit':
      pageContent = await renderAuditPage();
      break;
    default:
      pageContent = renderDashboard(state, cachedQuotes, cachedCustomers, cachedTickets);
      break;
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

  // Attach route & page-specific interactive listeners
  attachListeners(currentRoute);
}

function attachListeners(route) {
  // Signout button
  const signoutBtn = document.getElementById('signout-btn');
  if (signoutBtn) {
    signoutBtn.onclick = () => {
      showLoginModal();
    };
  }

  // Page specific hooks
  if (route === 'markets') {
    initMarketsListeners();
  } else if (route === 'trading') {
    initTradingListeners(cachedQuotes, () => {
      renderApp();
    });
  } else if (route === 'customers') {
    initCustomersListeners();
  } else if (route === 'leads') {
    initLeadsListeners();
  } else if (route === 'support') {
    initSupportListeners();
  } else if (route === 'approvals') {
    initApprovalsListeners();
  } else if (route === 'audit') {
    initAuditListeners();
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

// Global bootstrap
window.addEventListener('DOMContentLoaded', () => {
  renderApp();
});

window.addEventListener('hashchange', () => {
  renderApp();
});

store.subscribe(() => {
  renderApp();
});
