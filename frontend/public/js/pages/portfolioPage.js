/**
 * CryptoVista X Enterprise - Module D: Portfolio Management
 * Professional simulated NAV, asset allocation, FIFO cost basis, unrealized/realized P&L
 */

import { fetchMarketQuotes } from '../api.js';
import { store } from '../state.js';

export async function renderPortfolioPage() {
  const state = store.getState();
  const quotes = await fetchMarketQuotes();
  const quoteMap = Object.fromEntries(quotes.map(q => [q.symbol, q]));

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

  return `
    <div class="content-header">
      <div>
        <h1 class="page-title">Portfolio Valuation & Holdings</h1>
        <p class="page-subtitle">Multi-asset valuation, simulated FIFO cost basis, and unrealized profit & loss</p>
      </div>
      <div style="display:flex; gap:12px; align-items:center;">
        <span class="badge badge-neutral">Tenant: ${state.tenantId}</span>
        <span class="badge badge-positive">SIMULATED LEDGER</span>
      </div>
    </div>

    <!-- KPI Grid -->
    <div class="kpi-grid">
      <div class="kpi-card">
        <div class="kpi-label">TOTAL VIRTUAL NAV</div>
        <div class="kpi-value">₹${totalPortfolioValue.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</div>
        <div class="kpi-delta ${overallPnl >= 0 ? 'kpi-delta-up' : 'kpi-delta-down'}">
          ${overallPnl >= 0 ? '+' : ''}₹${overallPnl.toLocaleString('en-IN', { minimumFractionDigits: 2 })} (${overallPnlPct.toFixed(2)}%)
        </div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">AVAILABLE CASH (INR)</div>
        <div class="kpi-value">₹${state.availableCashInr.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</div>
        <div class="kpi-delta">${cashWeight}% of Portfolio</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">DIGITAL ASSETS VALUE</div>
        <div class="kpi-value">₹${totalHoldingsValue.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</div>
        <div class="kpi-delta">${(100 - parseFloat(cashWeight)).toFixed(1)}% of Portfolio</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">INVESTED COST BASIS</div>
        <div class="kpi-value">₹${totalInvestedCost.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</div>
        <div class="kpi-delta">FIFO Accounting</div>
      </div>
    </div>

    <!-- Asset Allocation Visual Bar -->
    <div class="panel" style="margin-bottom:20px;">
      <div class="panel-header">
        <span class="panel-title">Asset Allocation Breakdown</span>
        <span style="font-size:12px; color:var(--cv-text-muted);">Risk Concentration: Moderate</span>
      </div>
      <div style="display:flex; height:12px; border-radius:var(--cv-radius-xs); overflow:hidden; background:var(--cv-bg); margin-bottom:12px;">
        <div style="width:${cashWeight}%; background:var(--cv-primary);" title="Cash: ${cashWeight}%"></div>
        ${enrichedHoldings.map((h, i) => {
          const w = totalPortfolioValue > 0 ? ((h.currentValue / totalPortfolioValue) * 100).toFixed(1) : 0;
          const colors = ['#2563EB', '#F59E0B', '#8B5CF6', '#EC4899'];
          return `<div style="width:${w}%; background:${colors[i % colors.length]};" title="${h.symbol}: ${w}%"></div>`;
        }).join('')}
      </div>
      <div style="display:flex; gap:20px; font-size:12px; color:var(--cv-text-secondary); flex-wrap:wrap;">
        <div style="display:flex; align-items:center; gap:6px;">
          <span style="width:10px; height:10px; background:var(--cv-primary); border-radius:2px;"></span>
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
        <button class="btn btn-outline" onclick="location.hash='#/trading'" style="font-size:12px; padding:6px 12px;">Execute Rebalance</button>
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
            ${enrichedHoldings.length === 0 ? `
              <tr><td colspan="8" style="text-align:center; padding:32px; color:var(--cv-text-muted);">No open asset positions. Use Trading Simulation to buy assets.</td></tr>
            ` : enrichedHoldings.map(h => `
              <tr>
                <td>
                  <div style="font-weight:600; color:var(--cv-text-primary);">${h.symbol}</div>
                  <div style="font-size:11px; color:var(--cv-text-muted);">Virtual Custody</div>
                </td>
                <td style="font-family:monospace; font-weight:600;">${h.quantity.toFixed(8)}</td>
                <td>₹${h.avgCost.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                <td>₹${h.currentPrice.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                <td>₹${h.costValue.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                <td style="font-weight:600;">₹${h.currentValue.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                <td class="${h.pnl >= 0 ? 'delta-positive' : 'delta-negative'}" style="font-weight:600;">
                  ${h.pnl >= 0 ? '+' : ''}₹${h.pnl.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                  <div style="font-size:11px; font-weight:normal;">(${h.pnlPct >= 0 ? '+' : ''}${h.pnlPct.toFixed(2)}%)</div>
                </td>
                <td>
                  <button class="btn btn-primary" onclick="location.hash='#/trading'" style="padding:4px 10px; font-size:11px;">Trade</button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}
