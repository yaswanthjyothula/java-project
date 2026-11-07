/**
 * CryptoVista X Enterprise - Module 3: Simulated Trading (Pages 22 – 27)
 * Terminal, Order Previews, Orders Roster, Order Details, and Trade History
 */

import { renderBreadcrumbs, renderPageHeader, renderStatusBadge } from '../components/designSystem.js';
import { store } from '../state.js';

export function renderTrading(state, quotes, subRoute = 'terminal', paramId = null) {
  const currencyFmt = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' });

  // Page 24: Order Details View
  if (subRoute === 'order-details' && paramId) {
    const order = state.orders.find(o => o.id === paramId) || state.orders[0] || {
      id: paramId, symbol: 'BTC', side: 'BUY', qty: 0.25, price: 8245100, status: 'FILLED', time: '10:14:02'
    };

    const totalVal = order.qty * order.price;
    const fee = totalVal * 0.0010;
    const slippage = totalVal * 0.0002;

    return `
      <div>
        ${renderPageHeader(
          `Simulated Order Details — ${order.id}`,
          `Immutable forensic fill parameters, slippage calculation, and double-entry ledger settlement`,
          [
            { label: 'Trading', href: '#/app/trading' },
            { label: 'Orders', href: '#/app/trading/orders' },
            { label: order.id }
          ],
          [
            { label: 'View Trade History', variant: 'btn-outline', onclick: `location.hash='#/app/trading/history';` },
            { label: `Related ${order.symbol} Holding &rarr;`, variant: 'btn-primary', onclick: `location.hash='#/app/portfolio/holdings/${order.symbol}';` }
          ]
        )}

        <div class="kpi-grid" style="grid-template-columns:repeat(4, 1fr); margin-bottom:20px;">
          <div class="kpi-card">
            <div class="kpi-label">EXECUTION STATUS</div>
            <div class="kpi-value" style="font-size:18px;">${renderStatusBadge(order.status)}</div>
            <div class="kpi-delta">Ledger Posted</div>
          </div>
          <div class="kpi-card">
            <div class="kpi-label">FILLED QUANTITY</div>
            <div class="kpi-value" style="font-family:monospace;">${order.qty.toFixed(4)} ${order.symbol}</div>
            <div class="kpi-delta">Side: ${order.side}</div>
          </div>
          <div class="kpi-card">
            <div class="kpi-label">FILL PRICE</div>
            <div class="kpi-value" style="font-family:monospace; font-size:18px;">${currencyFmt.format(order.price)}</div>
            <div class="kpi-delta">Simulated Reference</div>
          </div>
          <div class="kpi-card">
            <div class="kpi-label">TOTAL SETTLED VALUE</div>
            <div class="kpi-value" style="font-size:18px; color:var(--cv-brand-green);">${currencyFmt.format(totalVal)}</div>
            <div class="kpi-delta">Fee: ${currencyFmt.format(fee)}</div>
          </div>
        </div>

        <div class="panel">
          <div class="panel-header">
            <span class="panel-title">Forensic Audit Trail & Ledger Voucher</span>
            <span class="badge badge-positive">IDEMPOTENT TRANSACTION</span>
          </div>
          <div style="font-size:13px; line-height:1.7; color:var(--cv-text-secondary);">
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px;">
              <div>
                <strong>Transaction ID:</strong> <span style="font-family:monospace;">TXN-${order.id}-POST</span><br>
                <strong>Timestamp:</strong> ${order.time} IST &bull; 2026-11-07<br>
                <strong>Trading Account:</strong> VA-88392 (TENANT-APEX-01)<br>
                <strong>Accounting Model:</strong> Balanced Double-Entry Virtual Cash Debited
              </div>
              <div>
                <strong>Simulated Slippage (0.02%):</strong> ${currencyFmt.format(slippage)}<br>
                <strong>Platform Fee (0.10%):</strong> ${currencyFmt.format(fee)}<br>
                <strong>Settlement Mode:</strong> Simulated Immediate Fill &bull; Zero Risk
              </div>
            </div>
          </div>
          <div style="margin-top:20px; display:flex; gap:12px;">
            <a href="#/app/trading/orders" class="btn btn-outline" style="font-size:12px;">&larr; Back to Orders Roster</a>
            <a href="#/app/portfolio/holdings/${order.symbol}" class="btn btn-primary" style="font-size:12px;">Inspect Portfolio Holding &rarr;</a>
          </div>
        </div>
      </div>
    `;
  }

  // Page 23: Orders List View
  if (subRoute === 'orders') {
    return `
      <div>
        ${renderPageHeader(
          'Simulated Orders Management',
          'Roster of open, filled, and settled simulated market and limit orders',
          [
            { label: 'Trading', href: '#/app/trading' },
            { label: 'Orders' }
          ],
          [
            { label: 'New Order in Terminal &rarr;', variant: 'btn-primary', onclick: `location.hash='#/app/trading';` }
          ]
        )}

        <div class="panel">
          <div class="table-container">
            <table>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Time</th>
                  <th>Asset</th>
                  <th>Side</th>
                  <th>Quantity</th>
                  <th>Fill Price</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                ${state.orders.map(o => `
                  <tr>
                    <td><code>${o.id}</code></td>
                    <td>${o.time}</td>
                    <td><strong>${o.symbol}</strong></td>
                    <td><span class="badge ${o.side === 'BUY' ? 'badge-positive' : 'badge-negative'}">${o.side}</span></td>
                    <td class="tabular-nums">${o.qty.toFixed(4)}</td>
                    <td class="tabular-nums" style="font-family:monospace;">${currencyFmt.format(o.price)}</td>
                    <td>${renderStatusBadge(o.status)}</td>
                    <td>
                      <a href="#/app/trading/orders/${o.id}" class="btn btn-outline" style="padding:4px 8px; font-size:11px;">View Details</a>
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

  // Page 25: Trade History
  if (subRoute === 'history') {
    return `
      <div>
        ${renderPageHeader(
          'Simulated Trade Execution History',
          'Chronological audit ledger of simulated digital asset fills and settlements',
          [
            { label: 'Trading', href: '#/app/trading' },
            { label: 'Trade History' }
          ],
          [
            { label: 'Export Ledger CSV', variant: 'btn-outline', onclick: `alert('Exported chronological trade history CSV.');` },
            { label: 'Trading Terminal &rarr;', variant: 'btn-primary', onclick: `location.hash='#/app/trading';` }
          ]
        )}

        <div class="panel">
          <div class="table-container">
            <table>
              <thead>
                <tr>
                  <th>Trade Ref</th>
                  <th>Order Ref</th>
                  <th>Time</th>
                  <th>Asset</th>
                  <th>Side</th>
                  <th>Executed Qty</th>
                  <th>Settled Price</th>
                  <th>Platform Fee</th>
                  <th>Related Holding</th>
                </tr>
              </thead>
              <tbody>
                ${state.orders.map((o, idx) => `
                  <tr>
                    <td style="font-family:monospace; font-weight:600;">TRD-${1000 + idx}</td>
                    <td><a href="#/app/trading/orders/${o.id}" style="color:var(--cv-brand-green);">${o.id}</a></td>
                    <td>${o.time}</td>
                    <td><strong>${o.symbol}</strong></td>
                    <td><span class="badge ${o.side === 'BUY' ? 'badge-positive' : 'badge-negative'}">${o.side}</span></td>
                    <td style="font-family:monospace;">${o.qty.toFixed(4)}</td>
                    <td style="font-family:monospace; font-weight:600;">${currencyFmt.format(o.price)}</td>
                    <td>${currencyFmt.format(o.qty * o.price * 0.0010)}</td>
                    <td>
                      <a href="#/app/portfolio/holdings/${o.symbol}" class="btn btn-outline" style="padding:4px 8px; font-size:11px;">Holding &rarr;</a>
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

  // Page 22: Trading Terminal (Default)
  const defaultQuote = quotes[0] || { symbol: 'BTC', priceInr: 8245100 };

  return `
    <div>
      ${renderPageHeader(
        'Simulated Trading Execution Gateway',
        'Risk-free order book with real-time fee calculation, slippage modeling, and double-entry ledger settlement',
        [
          { label: 'Trading' },
          { label: 'Terminal' }
        ],
        [
          { label: 'Order History', variant: 'btn-outline', onclick: `location.hash='#/app/trading/orders';` },
          { label: 'Portfolio Holdings &rarr;', variant: 'btn-primary', onclick: `location.hash='#/app/portfolio/holdings';` }
        ]
      )}

      <div class="disclosure-box">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--cv-brand-green)" stroke-width="2">
          <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
        </svg>
        <div>
          <strong>Non-Custodial Simulated Trading Notice:</strong> CryptoVista X Enterprise is an educational and enterprise modeling environment. All tokens, orders, fills, and cash balances are strictly virtual. No real-money exchange or fiat deposit exists.
        </div>
      </div>

      <div style="display:grid; grid-template-columns:360px 1fr; gap:20px;">
        <!-- Order Entry Ticket -->
        <div class="card">
          <h3 style="font-size:16px; font-weight:700; margin-bottom:14px;">Simulated Order Ticket</h3>

          <div class="form-group">
            <label class="form-label">Digital Asset</label>
            <select id="order-asset" class="form-select">
              ${quotes.map(q => `
                <option value="${q.symbol}" data-price="${q.priceInr}">
                  ${q.symbol} — ${currencyFmt.format(q.priceInr)}
                </option>
              `).join('')}
            </select>
          </div>

          <div class="form-group">
            <label class="form-label">Order Action</label>
            <div style="display:flex; gap:8px;">
              <button type="button" id="side-buy" class="btn btn-primary" style="flex:1;">BUY</button>
              <button type="button" id="side-sell" class="btn btn-outline" style="flex:1;">SELL</button>
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Order Type</label>
            <select id="order-type" class="form-select">
              <option value="MARKET">MARKET (Execute at Reference Price)</option>
              <option value="LIMIT">LIMIT (Target Trigger Price)</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label">Order Quantity (Units)</label>
            <input type="number" id="order-qty" class="form-input" value="0.25" step="0.01" min="0.0001" />
          </div>

          <!-- Order Calculator Summary -->
          <div style="background:var(--cv-bg-page); border:1px solid var(--cv-border); border-radius:var(--cv-radius-input); padding:12px; margin-bottom:16px;">
            <div style="display:flex; justify-content:space-between; font-size:12px; margin-bottom:4px;">
              <span style="color:var(--cv-text-secondary);">Execution Price:</span>
              <strong id="calc-price" class="tabular-nums">${currencyFmt.format(defaultQuote.priceInr)}</strong>
            </div>
            <div style="display:flex; justify-content:space-between; font-size:12px; margin-bottom:4px;">
              <span style="color:var(--cv-text-secondary);">Simulated Slippage (0.02%):</span>
              <strong id="calc-slippage" class="tabular-nums">₹412.25</strong>
            </div>
            <div style="display:flex; justify-content:space-between; font-size:12px; margin-bottom:6px;">
              <span style="color:var(--cv-text-secondary);">Platform Fee (0.10%):</span>
              <strong id="calc-fee" class="tabular-nums">₹2,061.27</strong>
            </div>
            <div style="border-top:1px solid var(--cv-border); padding-top:6px; display:flex; justify-content:space-between; font-size:13px;">
              <strong>Total Virtual Value:</strong>
              <strong id="calc-total" style="color:var(--cv-brand-green);" class="tabular-nums">₹20,63,685.77</strong>
            </div>
          </div>

          <button type="button" id="submit-order-btn" class="btn btn-primary" style="width:100%; height:42px; font-weight:700;">
            Preview & Execute Simulated Order
          </button>
        </div>

        <!-- Orders & Ledger History -->
        <div class="card">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">
            <h3 style="font-size:16px; font-weight:700;">Recent Simulated Order Fills</h3>
            <a href="#/app/trading/orders" style="font-size:12px; color:var(--cv-brand-green); font-weight:600;">View All Orders &rarr;</a>
          </div>
          <div class="table-container">
            <table class="data-table" id="orders-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Timestamp</th>
                  <th>Asset</th>
                  <th>Side</th>
                  <th>Quantity</th>
                  <th>Fill Price</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                ${state.orders.map(o => `
                  <tr>
                    <td><a href="#/app/trading/orders/${o.id}" style="color:var(--cv-brand-green); font-weight:600;">${o.id}</a></td>
                    <td>${o.time}</td>
                    <td><strong>${o.symbol}</strong></td>
                    <td><span class="badge ${o.side === 'BUY' ? 'badge-positive' : 'badge-negative'}">${o.side}</span></td>
                    <td class="tabular-nums">${o.qty.toFixed(4)}</td>
                    <td class="tabular-nums">${currencyFmt.format(o.price)}</td>
                    <td>${renderStatusBadge(o.status)}</td>
                    <td>
                      <a href="#/app/trading/orders/${o.id}" class="btn btn-outline" style="padding:3px 6px; font-size:11px;">Details</a>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function initTradingListeners(quotes, onOrderExecuted) {
  let currentSide = 'BUY';
  const assetSelect = document.getElementById('order-asset');
  const qtyInput = document.getElementById('order-qty');
  const btnBuy = document.getElementById('side-buy');
  const btnSell = document.getElementById('side-sell');
  const submitBtn = document.getElementById('submit-order-btn');
  const calcPrice = document.getElementById('calc-price');
  const calcSlippage = document.getElementById('calc-slippage');
  const calcFee = document.getElementById('calc-fee');
  const calcTotal = document.getElementById('calc-total');

  const updateCalculations = () => {
    if (!assetSelect || !qtyInput) return;
    const selectedOpt = assetSelect.selectedOptions[0];
    const price = parseFloat(selectedOpt.getAttribute('data-price')) || 8245100;
    const qty = parseFloat(qtyInput.value) || 0;
    const baseVal = qty * price;
    const slippage = baseVal * 0.0002;
    const fee = baseVal * 0.0010;
    const total = currentSide === 'BUY' ? baseVal + slippage + fee : baseVal - slippage - fee;

    const currencyFmt = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' });
    if (calcPrice) calcPrice.textContent = currencyFmt.format(price);
    if (calcSlippage) calcSlippage.textContent = currencyFmt.format(slippage);
    if (calcFee) calcFee.textContent = currencyFmt.format(fee);
    if (calcTotal) calcTotal.textContent = currencyFmt.format(Math.max(0, total));
  };

  if (btnBuy && btnSell) {
    btnBuy.onclick = () => {
      currentSide = 'BUY';
      btnBuy.className = 'btn btn-primary';
      btnSell.className = 'btn btn-outline';
      updateCalculations();
    };
    btnSell.onclick = () => {
      currentSide = 'SELL';
      btnSell.className = 'btn btn-primary';
      btnBuy.className = 'btn btn-outline';
      updateCalculations();
    };
  }

  if (assetSelect) assetSelect.onchange = updateCalculations;
  if (qtyInput) qtyInput.oninput = updateCalculations;

  if (submitBtn) {
    submitBtn.onclick = () => {
      const selectedOpt = assetSelect.selectedOptions[0];
      const symbol = selectedOpt.value;
      const price = parseFloat(selectedOpt.getAttribute('data-price')) || 8245100;
      const qty = parseFloat(qtyInput.value) || 0;

      if (qty <= 0) {
        alert('Please specify a positive simulated order quantity.');
        return;
      }

      // Order Preview Confirmation
      const totalEstimated = qty * price;
      if (confirm(`SIMULATED ORDER PREVIEW:\n\nAction: ${currentSide}\nAsset: ${symbol}\nQuantity: ${qty}\nExecution Price: ₹${price.toLocaleString('en-IN')}\nEstimated Virtual Cost: ₹${totalEstimated.toLocaleString('en-IN')}\n\nProceed to simulate execution and post to double-entry ledger?`)) {
        const res = store.executeSimulatedOrder(symbol, currentSide, qty, price);
        if (res.success) {
          alert(`Order Filled: ${res.orderId}\nPosted to double-entry ledger for tenant TENANT-APEX-01.`);
          location.hash = `#/app/trading/orders/${res.orderId}`;
          if (onOrderExecuted) onOrderExecuted();
        } else {
          alert('Order rejected: ' + res.message);
        }
      }
    };
  }
}
