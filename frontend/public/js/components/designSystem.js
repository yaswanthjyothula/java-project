/**
 * CryptoVista X Enterprise - Master Design System Components
 * Groww-inspired financial product design language
 * #00B386 primary, clean visual calm, rectangular 2-4px geometry, subtle borders, zero emojis
 */

export function renderBreadcrumbs(crumbs = []) {
  if (!crumbs || crumbs.length === 0) return '';
  return `
    <nav class="breadcrumb-nav" aria-label="Breadcrumb" style="display:flex; align-items:center; gap:8px; font-size:12px; color:var(--cv-text-muted); margin-bottom:12px;">
      <a href="#/app/dashboard" style="color:var(--cv-text-secondary); text-decoration:none;">Workstation</a>
      ${crumbs.map((c, i) => {
        const isLast = i === crumbs.length - 1;
        return `
          <span style="color:var(--cv-border-dark);">/</span>
          ${isLast || !c.href ? `
            <span style="color:var(--cv-text-primary); font-weight:600;">${c.label}</span>
          ` : `
            <a href="${c.href}" style="color:var(--cv-text-secondary); text-decoration:none;">${c.label}</a>
          `}
        `;
      }).join('')}
    </nav>
  `;
}

export function renderPageHeader(title, subtitle, crumbs = [], actions = []) {
  return `
    <div style="margin-bottom:24px;">
      ${renderBreadcrumbs(crumbs)}
      <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:16px;">
        <div>
          <h1 class="page-title">${title}</h1>
          ${subtitle ? `<p class="page-subtitle">${subtitle}</p>` : ''}
        </div>
        ${actions.length > 0 ? `
          <div style="display:flex; gap:10px; align-items:center;">
            ${actions.map(a => `
              <button class="btn ${a.variant || 'btn-primary'}" id="${a.id || ''}" onclick="${a.onclick || ''}" style="${a.style || ''}">
                ${a.label}
              </button>
            `).join('')}
          </div>
        ` : ''}
      </div>
    </div>
  `;
}

export function renderStatCard(label, value, delta, subtext = '', isPositive = true) {
  return `
    <div class="kpi-card">
      <div class="kpi-label">${label}</div>
      <div class="kpi-value">${value}</div>
      ${delta ? `
        <div class="kpi-delta ${isPositive ? 'kpi-delta-up' : 'kpi-delta-down'}">
          ${delta}
        </div>
      ` : ''}
      ${subtext ? `<div style="font-size:11.5px; color:var(--cv-text-muted); margin-top:4px;">${subtext}</div>` : ''}
    </div>
  `;
}

export function renderStatusBadge(status, type = 'default') {
  let cls = 'badge-neutral';
  const s = String(status).toUpperCase();
  if (['ACTIVE', 'PAID', 'WON', 'COMPLETED', 'RESOLVED', 'SUCCESS', 'APPROVED', 'GROWW REFERENCE'].includes(s)) {
    cls = 'badge-positive';
  } else if (['REJECTED', 'FAILED', 'CRITICAL', 'HIGH', 'DENIED', 'CANCELLED', 'OVERDUE'].includes(s)) {
    cls = 'badge-negative';
  } else if (['PENDING', 'IN_PROGRESS', 'QUALIFICATION', 'PROPOSAL', 'MEDIUM'].includes(s)) {
    cls = 'badge-warning';
  } else if (['DETERMINISTIC MOCK', 'INSTITUTIONAL', 'NEW', 'NORMAL', 'OPEN'].includes(s)) {
    cls = 'badge-info';
  }
  return `<span class="badge ${cls}">${status}</span>`;
}

export function renderEmptyState(title, description, actionLabel, actionHref) {
  return `
    <div style="text-align:center; padding:48px 24px; background:#FFFFFF; border:1px solid var(--cv-border); border-radius:4px;">
      <div style="width:40px; height:40px; background:var(--cv-soft-green); border-radius:4px; display:inline-flex; align-items:center; justify-content:center; color:var(--cv-brand-green); font-weight:800; font-size:18px; margin-bottom:12px;">
        CV
      </div>
      <h3 style="font-size:16px; font-weight:700; color:var(--cv-text-primary); margin-bottom:6px;">${title}</h3>
      <p style="font-size:13px; color:var(--cv-text-secondary); max-width:400px; margin:0 auto 16px;">${description}</p>
      ${actionLabel && actionHref ? `
        <a href="${actionHref}" class="btn btn-primary" style="font-size:12px; padding:6px 14px;">${actionLabel}</a>
      ` : ''}
    </div>
  `;
}
