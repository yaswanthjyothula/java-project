/**
 * CryptoVista X Enterprise - Market Intelligence Page (Module B)
 */

export function renderMarkets(quotes) {
  const currencyFmt = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' });

  return `
    <div class="page-wrapper">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
        <div>
          <h1 class="page-title">Market Intelligence & Benchmark Quotes</h1>
          <p class="page-subtitle">Multi-source digital asset discovery with strict separation of actual reference quotes and deterministic simulations.</p>
        </div>
        <div style="display:flex; gap:10px;">
          <input type="text" id="market-search" class="form-input" placeholder="Search asset (e.g. BTC, Solana)..." style="width:240px;" />
        </div>
      </div>

      <div class="disclosure-box">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--cv-brand-green)" stroke-width="2">
          <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
        </svg>
        <div>
          <strong>Hybrid Market Data Pipeline:</strong> Assets labeled <code>GROWW REFERENCE</code> represent live benchmark market indices. Assets labeled <code>DETERMINISTIC MOCK</code> are synthetic test random walks for offline sandbox evaluation.
        </div>
      </div>

      <div class="card">
        <div class="table-container">
          <table class="data-table" id="markets-table">
            <thead>
              <tr>
                <th>Ticker</th>
                <th>Asset Name</th>
                <th>Reference Price (INR)</th>
                <th>24h Change</th>
                <th>24h High</th>
                <th>24h Low</th>
                <th>24h Volume (INR)</th>
                <th>Source Classification</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              ${quotes.map(q => `
                <tr data-symbol="${q.symbol}">
                  <td><strong>${q.symbol}</strong></td>
                  <td>${q.name}</td>
                  <td class="tabular-nums" style="font-weight:700;">${currencyFmt.format(q.priceInr)}</td>
                  <td class="tabular-nums" style="font-weight:600; color:${q.change24hPct >= 0 ? 'var(--cv-positive)' : 'var(--cv-negative)'};">
                    ${q.change24hPct >= 0 ? '+' : ''}${q.change24hPct.toFixed(2)}%
                  </td>
                  <td class="tabular-nums">${currencyFmt.format(q.high24hInr)}</td>
                  <td class="tabular-nums">${currencyFmt.format(q.low24hInr)}</td>
                  <td class="tabular-nums">${currencyFmt.format(q.volume24hInr)}</td>
                  <td>
                    <span class="badge ${q.isMock ? 'badge-warning' : 'badge-info'}">
                      ${q.isMock ? 'DETERMINISTIC MOCK' : 'GROWW REFERENCE'}
                    </span>
                  </td>
                  <td>
                    <a href="#/trading" class="btn btn-outline" style="padding:4px 8px; font-size:11.5px;">Simulate Trade</a>
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


export function initMarketsListeners() {
  const search = document.getElementById('market-search');
  if (search) {
    search.oninput = (e) => {
      const q = e.target.value.toLowerCase();
      const rows = document.querySelectorAll('#markets-table tbody tr');
      rows.forEach(r => {
        const text = r.innerText.toLowerCase();
        r.style.display = text.includes(q) ? '' : 'none';
      });
    };
  }
}
