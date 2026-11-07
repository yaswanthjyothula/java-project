/**
 * CryptoVista X Enterprise - Simulated Trading Page (Module C)
 */

export function renderTrading(state, quotes) {
  const currencyFmt = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' });
  const defaultQuote = quotes[0] || { symbol: 'BTC', priceInr: 8245100 };

  return `
    <div class="page-wrapper">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
        <div>
          <h1 class="page-title">Simulated Trading Execution Gateway</h1>
          <p class="page-subtitle">Risk-free simulated order book with real-time fee calculation, slippage modeling, and double-entry ledger settlement.</p>
        </div>
        <div style="display:flex; gap:10px;">
          <span class="badge badge-positive">AVAILABLE VIRTUAL CASH: ${currencyFmt.format(state.availableCashInr)}</span>
        </div>
      </div>

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

          <button type="button" id="submit-order-btn" class="btn btn-primary" style="width:100%; height:42px;">
            Execute Simulated Order
          </button>
        </div>

        <!-- Orders & Ledger History -->
        <div class="card">
          <h3 style="font-size:16px; font-weight:700; margin-bottom:14px;">Simulated Execution History & Ledger Postings</h3>
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
                    <td class="tabular-nums">${currencyFmt.format(o.price)}</td>
                    <td><span class="badge badge-positive">${o.status}</span></td>
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

      const res = store.executeSimulatedOrder(symbol, currentSide, qty, price);
      if (res.success) {
        alert(`Executed simulated ${currentSide} order for ${qty} ${symbol} at reference price ₹${price.toLocaleString('en-IN')}.\nOrder Ref: ${res.orderId}\nVirtual ledger posted.`);
        if (onOrderExecuted) onOrderExecuted();
      } else {
        alert('Order execution rejected: ' + res.message);
      }
    };
  }
}
