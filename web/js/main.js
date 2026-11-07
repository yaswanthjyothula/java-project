/**
 * CryptoVista X Enterprise - Main Application Script
 */

import { renderMarketTable } from './market-data.js';
import { initFAQ } from './faq.js';
import { initModals } from './modal.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Render Reference Market Table
  renderMarketTable('market-table-body');

  // 2. Initialize Accessible FAQ
  initFAQ('faq-accordion-container');

  // 3. Initialize Demo & Auth Modals
  initModals();

  // 4. Mobile Menu Navigation
  const menuBtn = document.getElementById('mobile-menu-toggle');
  const navMenu = document.getElementById('primary-nav');
  if (menuBtn && navMenu) {
    menuBtn.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('mobile-open');
      menuBtn.setAttribute('aria-expanded', String(isOpen));
    });
  }

  // 5. Interactive Trading Simulation Widget (Section 6.5)
  initTradingWidget();
});

function initTradingWidget() {
  const sideButtons = document.querySelectorAll('[data-trade-side]');
  const orderTypeButtons = document.querySelectorAll('[data-trade-type]');
  const qtyInput = document.getElementById('trade-qty');
  const priceDisplay = document.getElementById('trade-price-display');
  const notionalDisplay = document.getElementById('trade-notional-display');
  const feeDisplay = document.getElementById('trade-fee-display');
  const totalDisplay = document.getElementById('trade-total-display');
  const executeBtn = document.getElementById('trade-submit-btn');
  const orderStatusBox = document.getElementById('trade-status-box');

  let currentSide = 'BUY';
  let currentType = 'MARKET';
  const btcRefPrice = 5924800.00;

  sideButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      sideButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentSide = btn.getAttribute('data-trade-side');
      updateCalculations();
    });
  });

  orderTypeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      orderTypeButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentType = btn.getAttribute('data-trade-type');
      updateCalculations();
    });
  });

  if (qtyInput) {
    qtyInput.addEventListener('input', updateCalculations);
  }

  function updateCalculations() {
    const qty = parseFloat(qtyInput ? qtyInput.value : 0) || 0;
    const notional = qty * btcRefPrice;
    const fee = notional * 0.0010; // 0.10% simulated maker/taker fee
    const total = currentSide === 'BUY' ? (notional + fee) : (notional - fee);

    if (notionalDisplay) notionalDisplay.textContent = formatRupees(notional);
    if (feeDisplay) feeDisplay.textContent = formatRupees(fee);
    if (totalDisplay) totalDisplay.textContent = formatRupees(total);
    if (executeBtn) {
      executeBtn.textContent = `Place Simulated ${currentSide} Order`;
      executeBtn.style.backgroundColor = currentSide === 'BUY' ? 'var(--cv-brand-green)' : 'var(--cv-negative)';
      executeBtn.style.borderColor = currentSide === 'BUY' ? 'var(--cv-brand-green)' : 'var(--cv-negative)';
    }
  }

  if (executeBtn) {
    executeBtn.addEventListener('click', () => {
      const qty = parseFloat(qtyInput.value) || 0;
      if (qty <= 0) {
        alert('Please specify a positive simulated quantity.');
        return;
      }
      
      const notional = qty * btcRefPrice;
      const orderId = 'SIM-' + Math.floor(100000 + Math.random() * 900000);
      
      if (orderStatusBox) {
        orderStatusBox.innerHTML = `
          <div style="padding:10px 14px; background:#ECFDF5; border:1px solid #A7F3D0; border-radius:3px; margin-top:12px; font-size:12.5px; color:#065F46;">
            <strong>Simulated Fill Verified (${orderId}):</strong> Filled ${qty} BTC @ ₹59,24,800.00. Virtual balance updated. Audit record logged to in-memory ledger.
          </div>
        `;
      }
    });
  }

  updateCalculations();
}

function formatRupees(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2
  }).format(amount);
}
