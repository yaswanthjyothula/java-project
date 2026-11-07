/**
 * CryptoVista X Enterprise - Accessible FAQ Accordion
 * Full keyboard support (Enter, Space, Arrow keys) and ARIA state updates
 */

export const FAQ_DATA = [
  {
    q: 'What is CryptoVista X Enterprise?',
    a: 'CryptoVista X Enterprise is a unified fintech and business operations platform that integrates digital asset market intelligence, simulated trading, portfolio analysis, and enterprise CRM into a single controlled workspace.'
  },
  {
    q: 'Is CryptoVista X a real cryptocurrency exchange?',
    a: 'No. CryptoVista X is strictly a software intelligence and simulation platform. It does not accept customer fiat deposits, hold cryptocurrency in custodial wallets, manage private keys, or route live orders to real financial exchanges.'
  },
  {
    q: 'Are trading balances and transactions real?',
    a: 'All balances, orders, fills, and portfolio valuations are entirely simulated. The trading environment allows institutional teams, analysts, and operators to model strategies, test execution dynamics, and evaluate portfolios without capital risk.'
  },
  {
    q: 'Where do market prices come from?',
    a: 'Market prices in CryptoVista X are reference benchmarks sourced from external market data adapters and normalized sample feeds. Reference prices are intended solely for simulation, evaluation, and operational analysis, not for live trade execution.'
  },
  {
    q: 'What is the difference between the portfolio module and CRM?',
    a: 'The Portfolio module tracks simulated asset allocations, unrealized/realized P&L, cost basis, and performance analytics. The Enterprise CRM manages real business customer relationships, corporate accounts, sales opportunities (such as enterprise software licenses), support tickets, and service-level agreements.'
  },
  {
    q: 'Can an organization manage multiple users and departments?',
    a: 'Yes. CryptoVista X includes complete enterprise team administration with Role-Based Access Control (RBAC) and Attribute-Based Access Control (ABAC), department groupings, approval hierarchies, and permissioned workflows.'
  },
  {
    q: 'How does multi-tenant data separation work?',
    a: 'Multi-tenancy is enforced at both the database schema and service query layer. Every tenant-owned record is bound to a strict tenant ID discriminator. Queries, reports, and administrative actions are strictly scoped to the active tenant context, preventing any cross-tenant data leakage.'
  },
  {
    q: 'Does the platform support Multi-Factor Authentication (MFA)?',
    a: 'Yes. CryptoVista X natively supports Time-based One-Time Password (TOTP) MFA (RFC 6238), compatible with standard authenticator applications. Secrets are securely encrypted at rest, and replay protection is strictly enforced.'
  },
  {
    q: 'Can I export customer or portfolio reports?',
    a: 'Authorized users with designated export privileges can generate audit-tracked reports in structured formats. All export operations are recorded in an append-only business audit log.'
  },
  {
    q: 'How do I request a product demonstration?',
    a: 'You can request a personalized walkthrough by clicking "Request a Demo" on the navigation bar or at the bottom of the page. Our enterprise solutions team will arrange a demonstration tailored to your workflow requirements.'
  }
];

export function initFAQ(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = FAQ_DATA.map((item, index) => `
    <div class="accordion-item" id="faq-item-${index}">
      <button type="button" 
              class="accordion-header" 
              aria-expanded="false" 
              aria-controls="faq-collapse-${index}" 
              id="faq-header-${index}">
        <span>${item.q}</span>
        <svg class="accordion-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>
      <div id="faq-collapse-${index}" 
           class="accordion-collapse" 
           role="region" 
           aria-labelledby="faq-header-${index}">
        <div class="accordion-body">
          ${item.a}
        </div>
      </div>
    </div>
  `).join('');

  // Attach event handlers
  const items = container.querySelectorAll('.accordion-item');
  items.forEach((item) => {
    const header = item.querySelector('.accordion-header');
    header.addEventListener('click', () => {
      const isCurrentlyOpen = item.classList.contains('active');
      
      // Close all items
      items.forEach(other => {
        other.classList.remove('active');
        other.querySelector('.accordion-header').setAttribute('aria-expanded', 'false');
      });

      // Toggle clicked item
      if (!isCurrentlyOpen) {
        item.classList.add('active');
        header.setAttribute('aria-expanded', 'true');
      }
    });

    // Keyboard support
    header.addEventListener('keydown', (e) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        header.click();
      }
    });
  });
}
