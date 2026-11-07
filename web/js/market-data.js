/**
 * CryptoVista X Enterprise - Reference Market Data
 * Sample assets: BTC, ETH, SOL, XRP, ADA in INR
 * Clear attribution: Reference / Sample Data with timestamp
 */

export const MARKET_ASSETS = [
  {
    symbol: 'BTC',
    name: 'Bitcoin',
    priceINR: 5924800.00,
    change24h: 2.45,
    volume24hINR: '₹1,84,250 Cr',
    marketCapINR: '₹116.8 L Cr',
    sparkline: 'M0,18 L8,16 L16,19 L24,14 L32,15 L40,11 L48,13 L56,9 L64,6',
    isPositive: true
  },
  {
    symbol: 'ETH',
    name: 'Ethereum',
    priceINR: 284350.00,
    change24h: -0.82,
    volume24hINR: '₹89,400 Cr',
    marketCapINR: '₹34.2 L Cr',
    sparkline: 'M0,8 L8,10 L16,7 L24,12 L32,11 L40,15 L48,13 L56,16 L64,18',
    isPositive: false
  },
  {
    symbol: 'SOL',
    name: 'Solana',
    priceINR: 14820.00,
    change24h: 5.12,
    volume24hINR: '₹32,100 Cr',
    marketCapINR: '₹6.8 L Cr',
    sparkline: 'M0,20 L8,18 L16,15 L24,16 L32,12 L40,10 L48,8 L56,9 L64,4',
    isPositive: true
  },
  {
    symbol: 'XRP',
    name: 'XRP',
    priceINR: 52.40,
    change24h: 1.18,
    volume24hINR: '₹12,450 Cr',
    marketCapINR: '₹2.9 L Cr',
    sparkline: 'M0,14 L8,15 L16,12 L24,14 L32,10 L40,11 L48,9 L56,8 L64,6',
    isPositive: true
  },
  {
    symbol: 'ADA',
    name: 'Cardano',
    priceINR: 34.80,
    change24h: -1.45,
    volume24hINR: '₹4,120 Cr',
    marketCapINR: '₹1.2 L Cr',
    sparkline: 'M0,6 L8,8 L16,11 L24,9 L32,13 L40,12 L48,16 L56,15 L64,18',
    isPositive: false
  }
];

export function formatINR(val) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(val);
}

export function renderMarketTable(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const rowsHtml = MARKET_ASSETS.map(asset => {
    const changeClass = asset.isPositive ? 'badge-positive' : 'badge-negative';
    const changePrefix = asset.isPositive ? '+' : '';
    const strokeColor = asset.isPositive ? '#16A36A' : '#D94B4B';

    return `
      <tr>
        <td>
          <div style="display:flex; align-items:center; gap:8px;">
            <div style="width:28px; height:28px; border-radius:3px; background:#F7F8FA; border:1px solid #E6E8EB; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:11px; color:#171A21;">
              ${asset.symbol}
            </div>
            <div>
              <div style="font-weight:600; color:#171A21;">${asset.name}</div>
              <div style="font-size:11.5px; color:#6B7280;">${asset.symbol}/INR</div>
            </div>
          </div>
        </td>
        <td class="num-col" style="font-weight:600;">${formatINR(asset.priceINR)}</td>
        <td class="num-col">
          <span class="badge ${changeClass}">
            ${changePrefix}${asset.change24h}%
          </span>
        </td>
        <td class="num-col" style="color:#6B7280;">${asset.volume24hINR}</td>
        <td class="num-col" style="color:#6B7280;">${asset.marketCapINR}</td>
        <td style="text-align:center;">
          <svg width="68" height="24" viewBox="0 0 64 24" fill="none">
            <path d="${asset.sparkline}" stroke="${strokeColor}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </td>
      </tr>
    `;
  }).join('');

  container.innerHTML = rowsHtml;
}
