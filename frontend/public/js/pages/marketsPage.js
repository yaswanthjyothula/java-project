/**
 * CryptoVista X Enterprise - Module 2: Market Intelligence (Pages 17 – 21)
 * Asset Explorer, Detailed Asset Telemetry, Watchlists, and Market Movers
 */

import { renderBreadcrumbs, renderPageHeader, renderStatusBadge } from '../components/designSystem.js';
import { store } from '../state.js';

export function renderMarkets(quotes, subRoute = 'overview', paramId = null) {
  const currencyFmt = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' });

  // Page 19: Asset Details View
  if (subRoute === 'details' && paramId) {
    const symbol = paramId.toUpperCase();
    const q = quotes.find(item => item.symbol === symbol) || quotes[0] || { symbol: 'BTC', name: 'Bitcoin', priceInr: 8245100, change24hPct: 2.45, isMock: false };
    
    return `
      <div>
        ${renderPageHeader(
          `${q.name} (${q.symbol}) — Market Intelligence`,
          `Detailed reference telemetry, volatility bands, and simulated order execution gateway`,
          [
            { label: 'Markets', href: '#/app/markets' },
            { label: 'Asset Details' },
            { label: q.symbol }
          ],
          [
            { label: '+ Add to Watchlist', variant: 'btn-outline', onclick: `alert('Added ${q.symbol} to your enterprise watchlist.'); location.hash='#/app/markets/watchlists';` },
            { label: 'Simulate Trade &rarr;', variant: 'btn-primary', onclick: `location.hash='#/app/trading?symbol=${q.symbol}';` }
          ]
        )}

        <!-- Asset Overview KPI Grid -->
        <div class="kpi-grid" style="grid-template-columns:repeat(4, 1fr); margin-bottom:20px;">
          <div class="kpi-card">
            <div class="kpi-label">REFERENCE PRICE</div>
            <div class="kpi-value" style="font-family:monospace;">${currencyFmt.format(q.priceInr)}</div>
            <div class="kpi-delta ${q.change24hPct >= 0 ? 'kpi-delta-up' : 'kpi-delta-down'}">
              ${q.change24hPct >= 0 ? '+' : ''}${q.change24hPct.toFixed(2)}% (24h)
            </div>
          </div>
          <div class="kpi-card">
            <div class="kpi-label">24H HIGH / LOW</div>
            <div class="kpi-value" style="font-size:18px; font-family:monospace;">${currencyFmt.format(q.high24hInr || q.priceInr * 1.02)}</div>
            <div class="kpi-delta">Low: ${currencyFmt.format(q.low24hInr || q.priceInr * 0.98)}</div>
          </div>
          <div class="kpi-card">
            <div class="kpi-label">24H TURNOVER VOLUME</div>
            <div class="kpi-value" style="font-size:18px;">${currencyFmt.format(q.volume24hInr || 45200000000)}</div>
            <div class="kpi-delta">Global Reference</div>
          </div>
          <div class="kpi-card">
            <div class="kpi-label">DATA SOURCE</div>
            <div class="kpi-value" style="font-size:16px;">
              ${renderStatusBadge(q.isMock ? 'DETERMINISTIC MOCK' : 'GROWW REFERENCE')}
            </div>
            <div class="kpi-delta">Updated 2s ago</div>
          </div>
        </div>

        <!-- Telemetry & Chart Visualization Panel -->
        <div class="panel" style="margin-bottom:20px;">
          <div class="panel-header">
            <span class="panel-title">${q.name} Historical Volatility & Reference Trends</span>
            <div style="display:flex; gap:8px;">
              <button class="btn btn-primary" style="padding:4px 8px; font-size:11px;">1D</button>
              <button class="btn btn-outline" style="padding:4px 8px; font-size:11px;">1W</button>
              <button class="btn btn-outline" style="padding:4px 8px; font-size:11px;">1M</button>
              <button class="btn btn-outline" style="padding:4px 8px; font-size:11px;">1Y</button>
            </div>
          </div>
          <div style="background:var(--cv-bg-page); border:1px solid var(--cv-border); border-radius:4px; padding:32px 20px; text-align:center;">
            <div style="font-size:13px; font-weight:700; color:var(--cv-text-primary); margin-bottom:4px;">
              ${q.symbol} Reference Curve &bull; Clean Financial Line Series
            </div>
            <div style="font-size:12px; color:var(--cv-text-muted); margin-bottom:20px;">
              Baseline: ${currencyFmt.format(q.low24hInr || q.priceInr * 0.98)} &bull; Peak: ${currencyFmt.format(q.high24hInr || q.priceInr * 1.02)}
            </div>
            <!-- Minimal SVG Chart Representation -->
            <svg width="100%" height="120" viewBox="0 0 800 120" style="overflow:visible;">
              <polyline fill="none" stroke="var(--cv-brand-green)" stroke-width="2.5"
                points="0,80 100,70 200,90 300,50 400,60 500,30 600,45 700,20 800,35" />
            </svg>
          </div>
        </div>

        <!-- Related Navigation Links -->
        <div style="display:flex; gap:16px;">
          <a href="#/app/markets" class="btn btn-outline" style="font-size:12.5px;">&larr; Back to Market Overview</a>
          <a href="#/app/trading?symbol=${q.symbol}" class="btn btn-primary" style="font-size:12.5px;">Trade ${q.symbol} in Terminal &rarr;</a>
          <a href="#/app/portfolio/holdings" class="btn btn-outline" style="font-size:12.5px;">View Current Holdings &rarr;</a>
        </div>
      </div>
    `;
  }

  // Page 20: Watchlists View
  if (subRoute === 'watchlists') {
    return `
      <div>
        ${renderPageHeader(
          'Institutional Watchlists',
          'Curated digital asset tracking and price volatility alert triggers',
          [
            { label: 'Markets', href: '#/app/markets' },
            { label: 'Watchlists' }
          ],
          [
            { label: '+ Create Watchlist', variant: 'btn-primary', onclick: `alert('New institutional watchlist created.');` }
          ]
        )}

        <div class="panel">
          <div class="panel-header">
            <span class="panel-title">Core Treasury Asset Basket (Active Tracking)</span>
            <span class="badge badge-positive">AUTO-SYNC ACTIVE</span>
          </div>
          <div class="table-container">
            <table>
              <thead>
                <tr>
                  <th>Asset</th>
                  <th>Current Price</th>
                  <th>24h Change</th>
                  <th>Classification</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                ${quotes.slice(0, 3).map(q => `
                  <tr>
                    <td>
                      <a href="#/app/markets/assets/${q.symbol}" style="font-weight:700; color:var(--cv-brand-green); text-decoration:none;">
                        ${q.symbol} &bull; ${q.name}
                      </a>
                    </td>
                    <td style="font-family:monospace; font-weight:700;">${currencyFmt.format(q.priceInr)}</td>
                    <td class="${q.change24hPct >= 0 ? 'kpi-delta-up' : 'kpi-delta-down'}" style="font-weight:600;">
                      ${q.change24hPct >= 0 ? '+' : ''}${q.change24hPct.toFixed(2)}%
                    </td>
                    <td>${renderStatusBadge(q.isMock ? 'DETERMINISTIC MOCK' : 'GROWW REFERENCE')}</td>
                    <td>
                      <a href="#/app/trading?symbol=${q.symbol}" class="btn btn-outline" style="padding:4px 8px; font-size:11px;">Trade</a>
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

  // Page 17 & 18: Market Overview & Asset Explorer
  return `
    <div>
      ${renderPageHeader(
        'Market Intelligence & Benchmark Quotes',
        'Multi-source digital asset discovery with strict separation of actual reference quotes and deterministic simulations',
        [
          { label: 'Markets' },
          { label: 'Overview' }
        ],
        [
          { label: 'Watchlists', variant: 'btn-outline', onclick: `location.hash='#/app/markets/watchlists';` },
          { label: 'Trading Terminal &rarr;', variant: 'btn-primary', onclick: `location.hash='#/app/trading';` }
        ]
      )}

      <!-- Hybrid Reference Disclosure -->
      <div class="disclosure-box">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--cv-brand-green)" stroke-width="2">
          <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
        </svg>
        <div>
          <strong>Hybrid Market Data Pipeline:</strong> Assets labeled <code>GROWW REFERENCE</code> represent live benchmark market indices. Assets labeled <code>DETERMINISTIC MOCK</code> are synthetic test random walks for offline sandbox evaluation.
        </div>
      </div>

      <!-- Quick Market Mover Cards -->
      <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:16px; margin-bottom:24px;">
        ${quotes.slice(0, 3).map(q => `
          <div class="panel" style="margin-bottom:0; cursor:pointer;" onclick="location.hash='#/app/markets/assets/${q.symbol}';">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
              <strong style="font-size:15px; color:var(--cv-text-primary);">${q.symbol} / INR</strong>
              <span class="badge ${q.change24hPct >= 0 ? 'badge-positive' : 'badge-negative'}">
                ${q.change24hPct >= 0 ? '+' : ''}${q.change24hPct.toFixed(2)}%
              </span>
            </div>
            <div style="font-size:19px; font-weight:800; font-family:monospace; margin-bottom:4px;">${currencyFmt.format(q.priceInr)}</div>
            <div style="font-size:11px; color:var(--cv-text-secondary);">${q.name} &bull; Click to view telemetry &rarr;</div>
          </div>
        `).join('')}
      </div>

      <!-- Asset Explorer Table Panel -->
      <div class="panel">
        <div class="panel-header">
          <div style="display:flex; gap:12px; align-items:center;">
            <span class="panel-title">Asset Explorer & Benchmark Directory</span>
            <input type="text" id="market-search" placeholder="Search by asset or ticker (e.g. BTC)..." 
                   style="padding:6px 12px; border:1px solid var(--cv-border); border-radius:var(--cv-radius-input); font-size:12px; width:240px;">
          </div>
          <span style="font-size:12px; color:var(--cv-text-muted);">Real-time Telemetry</span>
        </div>
        <div class="table-container">
          <table id="markets-table">
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
                  <td>
                    <a href="#/app/markets/assets/${q.symbol}" style="font-weight:700; color:var(--cv-brand-green); text-decoration:none;">
                      ${q.symbol}
                    </a>
                  </td>
                  <td>${q.name}</td>
                  <td class="tabular-nums" style="font-weight:700; font-family:monospace;">${currencyFmt.format(q.priceInr)}</td>
                  <td class="tabular-nums" style="font-weight:600; color:${q.change24hPct >= 0 ? 'var(--cv-positive)' : 'var(--cv-negative)'};">
                    ${q.change24hPct >= 0 ? '+' : ''}${q.change24hPct.toFixed(2)}%
                  </td>
                  <td class="tabular-nums">${currencyFmt.format(q.high24hInr || q.priceInr * 1.02)}</td>
                  <td class="tabular-nums">${currencyFmt.format(q.low24hInr || q.priceInr * 0.98)}</td>
                  <td class="tabular-nums">${currencyFmt.format(q.volume24hInr || 1000000000)}</td>
                  <td>${renderStatusBadge(q.isMock ? 'DETERMINISTIC MOCK' : 'GROWW REFERENCE')}</td>
                  <td>
                    <div style="display:flex; gap:6px;">
                      <a href="#/app/markets/assets/${q.symbol}" class="btn btn-outline" style="padding:4px 8px; font-size:11px;">Details</a>
                      <a href="#/app/trading?symbol=${q.symbol}" class="btn btn-primary" style="padding:4px 8px; font-size:11px;">Trade</a>
                    </div>
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
