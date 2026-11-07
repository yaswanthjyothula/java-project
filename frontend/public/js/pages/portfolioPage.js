/**
 * CryptoVista X Enterprise - Module 4: Portfolio Management (Pages 28 – 33)
 * NAV Valuation, Position Lots, Holding Details, Performance, and Ledger
 */

import { renderBreadcrumbs, renderPageHeader, renderStatusBadge } from '../components/designSystem.js';
import { fetchMarketQuotes } from '../api.js';
import { store } from '../state.js';

export async function renderPortfolioPage(subRoute = 'overview', paramId = null) {
  const state = store.getState();
  const quotes = await fetchMarketQuotes();
  const quoteMap = Object.fromEntries(quotes.map(q => [q.symbol, q]));
  const currencyFmt = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' });

  let totalHoldingsValue = 0;
  let totalInvestedCost = 0;

  const enrichedHoldings = state.holdings.map(h => {
    const q = quoteMap[h.symbol] || { priceInr: h.avgCost, change24hPct: 0 };
    const curValue = h.quantity * q.priceInr;
    const costValue = h.quantity * h.avgCost;
    const pnl = curValue - costValue;
    const pnlPct = costValue > 0 ? (pnl / costValue) * 100 : 0;

    totalHoldingsValue += curValue;
    totalInvestedCost += costValue;

    return {
      ...h,
      currentPrice: q.priceInr,
      currentValue: curValue,
      costValue,
      pnl,
      pnlPct,
      change24hPct: q.change24hPct
    };
  });

  const totalPortfolioValue = state.availableCashInr + totalHoldingsValue;
  const overallPnl = totalHoldingsValue - totalInvestedCost;
  const overallPnlPct = totalInvestedCost > 0 ? (overallPnl / totalInvestedCost) * 100 : 0;
  const cashWeight = totalPortfolioValue > 0 ? ((state.availableCashInr / totalPortfolioValue) * 100).toFixed(1) : '100.0';

  // Page 30: Holding Details View
  if (subRoute === 'holding-details' && paramId) {
    const symbol = paramId.toUpperCase();
    const h = enrichedHoldings.find(item => item.symbol === symbol) || enrichedHoldings[0] || {
      symbol: symbol, quantity: 1.0, avgCost: 8000000, currentPrice: 8245100, costValue: 8000000, currentValue: 8245100, pnl: 245100, pnlPct: 3.06
    };

    return `
      <div>
        ${renderPageHeader(
          `${h.symbol} Position Details & Cost Basis`,
          `Lot-by-lot FIFO acquisition history, valuation benchmarks, and unrealized returns`,
          [
            { label: 'Portfolio', href: '#/app/portfolio' },
            { label: 'Holdings', href: '#/app/portfolio/holdings' },
            { label: h.symbol }
          ],
          [
            { label: 'Transaction Ledger', variant: 'btn-outline', onclick: `location.hash='#/app/portfolio/ledger';` },
            { label: `Trade ${h.symbol} &rarr;`, variant: 'btn-primary', onclick: `location.hash='#/app/trading?symbol=${h.symbol}';` }
          ]
        )}

        <div class="kpi-grid" style="grid-template-columns:repeat(4, 1fr); margin-bottom:20px;">
          <div class="kpi-card">
            <div class="kpi-label">TOTAL POSITION QUANTITY</div>
            <div class="kpi-value" style="font-family:monospace;">${h.quantity.toFixed(8)}</div>
            <div class="kpi-delta">${h.symbol} Virtual Units</div>
          </div>
          <div class="kpi-card">
            <div class="kpi-label">CURRENT POSITION VALUE</div>
            <div class="kpi-value">${currencyFmt.format(h.currentValue)}</div>
            <div class="kpi-delta">Ref: ${currencyFmt.format(h.currentPrice)}</div>
          </div>
          <div class="kpi-card">
            <div class="kpi-label">AVERAGE ACQUISITION COST</div>
            <div class="kpi-value">${currencyFmt.format(h.avgCost)}</div>
            <div class="kpi-delta">FIFO Lot Method</div>
          </div>
          <div class="kpi-card">
            <div class="kpi-label">UNREALIZED P&L</div>
            <div class="kpi-value ${h.pnl >= 0 ? 'kpi-delta-up' : 'kpi-delta-down'}">
              ${h.pnl >= 0 ? '+' : ''}${currencyFmt.format(h.pnl)}
            </div>
            <div class="kpi-delta ${h.pnl >= 0 ? 'kpi-delta-up' : 'kpi-delta-down'}">
              ${h.pnlPct >= 0 ? '+' : ''}${h.pnlPct.toFixed(2)}%
            </div>
          </div>
        </div>

        <div class="panel">
          <div class="panel-header">
            <span class="panel-title">Lot Acquisition Journal & Related Ledger Entries</span>
            <span class="badge badge-positive">AUDITED LEDGER VOUCHER</span>
          </div>
          <div class="table-container">
            <table>
              <thead>
                <tr>
                  <th>Lot ID</th>
                  <th>Execution Timestamp</th>
                  <th>Accounting Side</th>
                  <th>Quantity</th>
                  <th>Unit Price (INR)</th>
                  <th>Total Cost Basis</th>
                  <th>Accounting Voucher</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style="font-family:monospace; font-weight:600;">LOT-${h.symbol}-01</td>
                  <td>2026-11-06 09:30 IST</td>
                  <td><span class="badge badge-positive">BUY</span></td>
                  <td style="font-family:monospace;">${h.quantity.toFixed(4)}</td>
                  <td>${currencyFmt.format(h.avgCost)}</td>
                  <td style="font-weight:600;">${currencyFmt.format(h.costValue)}</td>
                  <td><code>VOUCHER-LEDGER-8812</code></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div style="margin-top:20px; display:flex; gap:12px;">
            <a href="#/app/portfolio/holdings" class="btn btn-outline" style="font-size:12px;">&larr; Back to All Holdings</a>
            <a href="#/app/portfolio/ledger" class="btn btn-outline" style="font-size:12px;">View Complete Transaction Ledger &rarr;</a>
            <a href="#/app/trading?symbol=${h.symbol}" class="btn btn-primary" style="font-size:12px;">Rebalance Position &rarr;</a>
          </div>
        </div>
      </div>
    `;
  }

  // Page 32: Transaction Ledger View
  if (subRoute === 'ledger') {
    return `
      <div>
        ${renderPageHeader(
          'Transaction Ledger & Journal Entries',
          'Double-entry journal vouchers recording all simulated debits, credits, and platform fees',
          [
            { label: 'Portfolio', href: '#/app/portfolio' },
            { label: 'Transaction Ledger' }
          ],
          [
            { label: 'Export Ledger CSV', variant: 'btn-outline', onclick: `alert('Exported double-entry transaction ledger CSV.');` },
            { label: 'Portfolio Overview &rarr;', variant: 'btn-primary', onclick: `location.hash='#/app/portfolio';` }
          ]
        )}

        <div class="panel">
          <div class="table-container">
            <table>
              <thead>
                <tr>
                  <th>Voucher ID</th>
                  <th>Timestamp</th>
                  <th>Debit Account</th>
                  <th>Credit Account</th>
                  <th>Asset</th>
                  <th>Amount (INR)</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                ${state.orders.map((o, idx) => `
                  <tr>
                    <td style="font-family:monospace; font-weight:600;">VOUCHER-${8800 + idx}</td>
                    <td>${o.time}</td>
                    <td><code>${o.side === 'BUY' ? 'VA-DIGITAL-CUSTODY' : 'VA-CASH-INR'}</code></td>
                    <td><code>${o.side === 'BUY' ? 'VA-CASH-INR' : 'VA-DIGITAL-CUSTODY'}</code></td>
                    <td><strong>${o.symbol}</strong></td>
                    <td style="font-family:monospace; font-weight:700;">${currencyFmt.format(o.qty * o.price)}</td>
                    <td style="font-size:12px; color:var(--cv-text-secondary);">Simulated ${o.side} ${o.qty} ${o.symbol} fill settlement</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  }

  // Page 28 & 29: Portfolio Overview & Holdings
  return `
    <div>
      ${renderPageHeader(
        'Portfolio Valuation & Holdings',
        'Multi-asset valuation, simulated FIFO cost basis, and unrealized profit & loss',
        [
          { label: 'Portfolio' },
          { label: 'Overview' }
        ],
        [
          { label: 'Transaction Ledger', variant: 'btn-outline', onclick: `location.hash='#/app/portfolio/ledger';` },
          { label: 'Execute Rebalance &rarr;', variant: 'btn-primary', onclick: `location.hash='#/app/trading';` }
        ]
      )}

      <!-- KPI Grid -->
      <div class="kpi-grid">
        <div class="kpi-card">
          <div class="kpi-label">TOTAL VIRTUAL NAV</div>
          <div class="kpi-value">${currencyFmt.format(totalPortfolioValue)}</div>
          <div class="kpi-delta ${overallPnl >= 0 ? 'kpi-delta-up' : 'kpi-delta-down'}">
            ${overallPnl >= 0 ? '+' : ''}${currencyFmt.format(overallPnl)} (${overallPnlPct.toFixed(2)}%)
          </div>
        </div>
        <div class="kpi-card">
          <div class="kpi-label">AVAILABLE CASH (INR)</div>
          <div class="kpi-value">${currencyFmt.format(state.availableCashInr)}</div>
          <div class="kpi-delta">${cashWeight}% of Portfolio</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-label">DIGITAL ASSETS VALUE</div>
          <div class="kpi-value">${currencyFmt.format(totalHoldingsValue)}</div>
          <div class="kpi-delta">${(100 - parseFloat(cashWeight)).toFixed(1)}% of Portfolio</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-label">INVESTED COST BASIS</div>
          <div class="kpi-value">${currencyFmt.format(totalInvestedCost)}</div>
          <div class="kpi-delta">FIFO Accounting</div>
        </div>
      </div>

      <!-- Asset Allocation Visual Bar -->
      <div class="panel" style="margin-bottom:20px;">
        <div class="panel-header">
          <span class="panel-title">Asset Allocation Breakdown</span>
          <span style="font-size:12px; color:var(--cv-text-muted);">Risk Concentration: Moderate</span>
        </div>
        <div style="display:flex; height:12px; border-radius:var(--cv-radius-xs); overflow:hidden; background:var(--cv-bg-page); margin-bottom:12px;">
          <div style="width:${cashWeight}%; background:var(--cv-brand-green);" title="Cash: ${cashWeight}%"></div>
          ${enrichedHoldings.map((h, i) => {
            const w = totalPortfolioValue > 0 ? ((h.currentValue / totalPortfolioValue) * 100).toFixed(1) : 0;
            const colors = ['#2563EB', '#F59E0B', '#8B5CF6', '#EC4899'];
            return `<div style="width:${w}%; background:${colors[i % colors.length]};" title="${h.symbol}: ${w}%"></div>`;
          }).join('')}
        </div>
        <div style="display:flex; gap:20px; font-size:12px; color:var(--cv-text-secondary); flex-wrap:wrap;">
          <div style="display:flex; align-items:center; gap:6px;">
            <span style="width:10px; height:10px; background:var(--cv-brand-green); border-radius:2px;"></span>
            Cash (INR): ${cashWeight}%
          </div>
          ${enrichedHoldings.map((h, i) => {
            const w = totalPortfolioValue > 0 ? ((h.currentValue / totalPortfolioValue) * 100).toFixed(1) : 0;
            const colors = ['#2563EB', '#F59E0B', '#8B5CF6', '#EC4899'];
            return `
              <div style="display:flex; align-items:center; gap:6px;">
                <span style="width:10px; height:10px; background:${colors[i % colors.length]}; border-radius:2px;"></span>
                ${h.symbol}: ${w}%
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <!-- Holdings Table -->
      <div class="panel">
        <div class="panel-header">
          <span class="panel-title">Current Asset Positions (${enrichedHoldings.length})</span>
          <a href="#/app/portfolio/ledger" class="btn btn-outline" style="font-size:12px; padding:6px 12px;">View Ledger Journal</a>
        </div>
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>Asset</th>
                <th>Holding Quantity</th>
                <th>Avg Buy Price</th>
                <th>Current Price</th>
                <th>Total Cost</th>
                <th>Current Value</th>
                <th>Unrealized P&L</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              ${enrichedHoldings.map(h => `
                <tr>
                  <td>
                    <a href="#/app/portfolio/holdings/${h.symbol}" style="font-weight:700; color:var(--cv-brand-green); text-decoration:none;">
                      ${h.symbol}
                    </a>
                    <div style="font-size:11px; color:var(--cv-text-muted);">Virtual Custody</div>
                  </td>
                  <td style="font-family:monospace; font-weight:600;">${h.quantity.toFixed(8)}</td>
                  <td>${currencyFmt.format(h.avgCost)}</td>
                  <td>${currencyFmt.format(h.currentPrice)}</td>
                  <td>${currencyFmt.format(h.costValue)}</td>
                  <td style="font-weight:600;">${currencyFmt.format(h.currentValue)}</td>
                  <td class="${h.pnl >= 0 ? 'kpi-delta-up' : 'kpi-delta-down'}" style="font-weight:600;">
                    ${h.pnl >= 0 ? '+' : ''}${currencyFmt.format(h.pnl)}
                    <div style="font-size:11px; font-weight:normal;">(${h.pnlPct >= 0 ? '+' : ''}${h.pnlPct.toFixed(2)}%)</div>
                  </td>
                  <td>
                    <div style="display:flex; gap:6px;">
                      <a href="#/app/portfolio/holdings/${h.symbol}" class="btn btn-outline" style="padding:4px 8px; font-size:11px;">Details</a>
                      <a href="#/app/trading?symbol=${h.symbol}" class="btn btn-primary" style="padding:4px 8px; font-size:11px;">Trade</a>
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
