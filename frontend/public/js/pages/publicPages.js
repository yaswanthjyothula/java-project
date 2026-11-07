/**
 * CryptoVista X Enterprise - Public Website Pages (Pages 2 – 13)
 * Groww-inspired financial product design, clean visual calm, zero emojis
 */

import { loginUser } from '../api.js';
import { store } from '../state.js';

function renderPublicHeader(activeTab) {
  return `
    <header style="background:#FFFFFF; border-bottom:1px solid var(--cv-border); position:sticky; top:0; z-index:100;">
      <div style="max-width:1200px; margin:0 auto; padding:0 24px; height:68px; display:flex; justify-content:space-between; align-items:center;">
        <div style="display:flex; align-items:center; gap:12px;">
          <a href="#/landing" style="display:flex; align-items:center; gap:10px; text-decoration:none;">
            <div style="width:32px; height:32px; background:var(--cv-brand-green); border-radius:3px; display:flex; align-items:center; justify-content:center; color:#FFF; font-weight:800; font-size:16px;">
              CV
            </div>
            <div>
              <span style="font-size:18px; font-weight:800; letter-spacing:-0.4px; color:var(--cv-text-primary);">CryptoVista X</span>
              <span class="brand-badge" style="margin-left:6px; vertical-align:middle;">ENTERPRISE</span>
            </div>
          </a>
        </div>

        <nav style="display:flex; align-items:center; gap:24px; font-size:13.5px; font-weight:600; color:var(--cv-text-secondary);">
          <a href="#/product" style="color:${activeTab === 'product' ? 'var(--cv-brand-green)' : 'inherit'}; text-decoration:none;">Product</a>
          <a href="#/features" style="color:${activeTab === 'features' ? 'var(--cv-brand-green)' : 'inherit'}; text-decoration:none;">Features</a>
          <a href="#/security" style="color:${activeTab === 'security' ? 'var(--cv-brand-green)' : 'inherit'}; text-decoration:none;">Security</a>
          <a href="#/about" style="color:${activeTab === 'about' ? 'var(--cv-brand-green)' : 'inherit'}; text-decoration:none;">About</a>
          <a href="#/faq" style="color:${activeTab === 'faq' ? 'var(--cv-brand-green)' : 'inherit'}; text-decoration:none;">FAQ</a>
          <a href="#/contact" style="color:${activeTab === 'contact' ? 'var(--cv-brand-green)' : 'inherit'}; text-decoration:none;">Contact</a>
        </nav>

        <div style="display:flex; align-items:center; gap:12px;">
          <a href="#/login" class="btn btn-outline" style="font-size:13px; padding:8px 16px;">Sign In</a>
          <a href="#/request-demo" class="btn btn-primary" style="font-size:13px; padding:8px 18px;">Request Demo</a>
        </div>
      </div>
    </header>
  `;
}

function renderPublicFooter() {
  return `
    <footer style="background:#FFFFFF; border-top:1px solid var(--cv-border); padding:48px 24px; font-size:13px; color:var(--cv-text-secondary);">
      <div style="max-width:1200px; margin:0 auto; display:grid; grid-template-columns:2fr 1fr 1fr 1fr; gap:40px; margin-bottom:36px;">
        <div>
          <div style="font-size:16px; font-weight:800; color:var(--cv-text-primary); margin-bottom:8px;">CryptoVista X Enterprise</div>
          <p style="font-size:12.5px; line-height:1.6; color:var(--cv-text-muted); max-width:320px;">
            Digital asset intelligence. Simulated trading execution. Enterprise CRM and operations. One connected platform.
          </p>
          <div style="margin-top:12px; font-size:11px; color:var(--cv-text-muted);">
            Node.js Web Architecture &bull; MySQL 8 Multi-Tenant Schema
          </div>
        </div>
        <div>
          <div style="font-size:12px; font-weight:700; color:var(--cv-text-primary); text-transform:uppercase; letter-spacing:0.5px; margin-bottom:12px;">Platform</div>
          <div style="display:flex; flex-direction:column; gap:8px;">
            <a href="#/product" style="color:inherit; text-decoration:none;">Product Overview</a>
            <a href="#/features" style="color:inherit; text-decoration:none;">Feature Catalogue</a>
            <a href="#/security" style="color:inherit; text-decoration:none;">Security Standards</a>
            <a href="#/app/dashboard" style="color:inherit; text-decoration:none;">Workstation Shell</a>
          </div>
        </div>
        <div>
          <div style="font-size:12px; font-weight:700; color:var(--cv-text-primary); text-transform:uppercase; letter-spacing:0.5px; margin-bottom:12px;">Company</div>
          <div style="display:flex; flex-direction:column; gap:8px;">
            <a href="#/about" style="color:inherit; text-decoration:none;">About Us</a>
            <a href="#/contact" style="color:inherit; text-decoration:none;">Contact Enterprise Team</a>
            <a href="#/request-demo" style="color:inherit; text-decoration:none;">Schedule a Demo</a>
            <a href="#/faq" style="color:inherit; text-decoration:none;">Knowledge Base / FAQ</a>
          </div>
        </div>
        <div>
          <div style="font-size:12px; font-weight:700; color:var(--cv-text-primary); text-transform:uppercase; letter-spacing:0.5px; margin-bottom:12px;">Legal & Trust</div>
          <div style="display:flex; flex-direction:column; gap:8px;">
            <a href="#/privacy" style="color:inherit; text-decoration:none;">Privacy Policy</a>
            <a href="#/terms" style="color:inherit; text-decoration:none;">Terms & Conditions</a>
            <span style="font-size:11.5px; color:var(--cv-text-muted); margin-top:4px;">Non-Custodial Sandbox Notice</span>
          </div>
        </div>
      </div>
      <div style="max-width:1200px; margin:0 auto; padding-top:24px; border-top:1px solid var(--cv-border); display:flex; justify-content:space-between; align-items:center; font-size:12px; color:var(--cv-text-muted);">
        <div>&copy; 2026 CryptoVista X Enterprise. All rights reserved.</div>
        <div>Built for Institutional Financial Operations</div>
      </div>
    </footer>
  `;
}

// Page 2: About Us
export function renderAboutPage() {
  return `
    <div style="min-height:100vh; background:var(--cv-bg-page);">
      ${renderPublicHeader('about')}
      <div style="max-width:960px; margin:48px auto; padding:0 24px;">
        <div style="margin-bottom:32px;">
          <span class="brand-badge">INSTITUTIONAL PROFILE</span>
          <h1 class="page-title" style="font-size:36px; margin-top:12px;">About CryptoVista X Enterprise</h1>
          <p class="page-subtitle" style="font-size:16px;">Bridging real-time digital asset intelligence with enterprise client relationship management.</p>
        </div>

        <div class="panel" style="margin-bottom:24px;">
          <h3 style="font-size:18px; font-weight:700; margin-bottom:12px;">Our Mission</h3>
          <p style="font-size:14px; line-height:1.7; color:var(--cv-text-secondary); margin-bottom:16px;">
            Institutional wealth desks, family offices, and fintech operators face fragmented workflows: market intelligence sits in proprietary terminals, trading execution is siloed, and customer relationships are logged in disconnected CRM software. CryptoVista X Enterprise resolves this by delivering a unified, audited, and tenant-isolated operating system.
          </p>
          <div class="kpi-grid" style="grid-template-columns:repeat(3, 1fr); margin-top:20px;">
            <div class="kpi-card">
              <div class="kpi-label">UNIFIED CODEBASE</div>
              <div class="kpi-value" style="font-size:20px;">1 Architecture</div>
              <div class="kpi-delta">Web & Backend in Node.js</div>
            </div>
            <div class="kpi-card">
              <div class="kpi-label">AUDITABLE TABLES</div>
              <div class="kpi-value" style="font-size:20px;">39 Entities</div>
              <div class="kpi-delta">Relational 3NF Model</div>
            </div>
            <div class="kpi-card">
              <div class="kpi-label">FINANCIAL SECURITY</div>
              <div class="kpi-value" style="font-size:20px;">Zero Custody</div>
              <div class="kpi-delta">Risk-Free Simulation</div>
            </div>
          </div>
        </div>

        <div class="panel">
          <h3 style="font-size:18px; font-weight:700; margin-bottom:12px;">Executive Governance & Engineering Philosophy</h3>
          <p style="font-size:14px; line-height:1.7; color:var(--cv-text-secondary);">
            Every ledger posting, ticket transition, and lead conversion adheres to strict double-entry and separation-of-duty guidelines. Our architecture enforces multi-tenant boundaries at the database layer, ensuring complete cryptographic and logical confidentiality across institutional accounts.
          </p>
        </div>
      </div>
      ${renderPublicFooter()}
    </div>
  `;
}

// Page 3: Product Overview
export function renderProductPage() {
  return `
    <div style="min-height:100vh; background:var(--cv-bg-page);">
      ${renderPublicHeader('product')}
      <div style="max-width:1100px; margin:48px auto; padding:0 24px;">
        <div style="text-align:center; margin-bottom:48px;">
          <span class="brand-badge">PRODUCT SUITE</span>
          <h1 class="page-title" style="font-size:38px; margin-top:12px;">Comprehensive Platform Architecture</h1>
          <p class="page-subtitle" style="font-size:16px; max-width:680px; margin:8px auto 0;">
            Explore the six core pillars powering digital asset intelligence and operations.
          </p>
        </div>

        <div style="display:grid; grid-template-columns:1fr 1fr; gap:24px; margin-bottom:32px;">
          <div class="panel">
            <span class="badge badge-positive" style="margin-bottom:8px;">MODULE B</span>
            <h3 style="font-size:18px; font-weight:700; margin-bottom:8px;">Market Intelligence Engine</h3>
            <p style="font-size:13.5px; line-height:1.6; color:var(--cv-text-secondary); margin-bottom:16px;">
              Live benchmark discovery tracking Bitcoin, Ethereum, Solana and major indices with clear Groww reference indices and transparent mock labeling.
            </p>
            <a href="#/app/markets" class="btn btn-outline" style="font-size:12px;">Explore Market Quotes &rarr;</a>
          </div>

          <div class="panel">
            <span class="badge badge-positive" style="margin-bottom:8px;">MODULE C</span>
            <h3 style="font-size:18px; font-weight:700; margin-bottom:8px;">Simulated Trading Terminal</h3>
            <p style="font-size:13.5px; line-height:1.6; color:var(--cv-text-secondary); margin-bottom:16px;">
              Order entry with real-time slippage modeling (0.02%), execution fee calculator (0.10%), and balanced virtual ledger posting.
            </p>
            <a href="#/app/trading" class="btn btn-outline" style="font-size:12px;">Open Terminal &rarr;</a>
          </div>

          <div class="panel">
            <span class="badge badge-positive" style="margin-bottom:8px;">MODULE D</span>
            <h3 style="font-size:18px; font-weight:700; margin-bottom:8px;">Portfolio Valuation & FIFO P&L</h3>
            <p style="font-size:13.5px; line-height:1.6; color:var(--cv-text-secondary); margin-bottom:16px;">
              Lot-by-lot FIFO cost basis accounting, asset concentration breakdown, and unrealized versus realized profit and loss ledger.
            </p>
            <a href="#/app/portfolio" class="btn btn-outline" style="font-size:12px;">View Portfolio &rarr;</a>
          </div>

          <div class="panel">
            <span class="badge badge-positive" style="margin-bottom:8px;">MODULE E</span>
            <h3 style="font-size:18px; font-weight:700; margin-bottom:8px;">Institutional Customer 360</h3>
            <p style="font-size:13.5px; line-height:1.6; color:var(--cv-text-secondary); margin-bottom:16px;">
              15-tab comprehensive profile linking client corporate entities, contacts, KYC documentation, deal pipelines, and support tickets.
            </p>
            <a href="#/app/crm/customers" class="btn btn-outline" style="font-size:12px;">Browse Customers &rarr;</a>
          </div>
        </div>
      </div>
      ${renderPublicFooter()}
    </div>
  `;
}

// Page 4: Features Catalogue
export function renderFeaturesPage() {
  const features = [
    { title: 'Single-Step User ID & Password Auth', desc: 'Secure credential verification with zero mandatory MFA, OTP, or authenticator app requirement.' },
    { title: 'Multi-Tenant Logical Isolation', desc: 'Tenant context derived securely by backend session tokens with database-level isolation enforcement.' },
    { title: 'Double-Entry Accounting Ledger', desc: 'Every simulated order posts balanced debits and credits with idempotent transaction logs.' },
    { title: 'Four-Eyes Workflow Approvals', desc: 'Dual-authorization matrix for commercial fee discounts greater than 15% and trade limit adjustments.' },
    { title: 'Strict Internal Notes Segregation (SUP-004)', desc: 'Operations notes are physically isolated from public communication channels to prevent leaks.' },
    { title: 'Tamper-Proof Audit Trail', desc: 'Forensic event logging with automatic secret masking (passwords, session keys, tokens).' }
  ];

  return `
    <div style="min-height:100vh; background:var(--cv-bg-page);">
      ${renderPublicHeader('features')}
      <div style="max-width:1080px; margin:48px auto; padding:0 24px;">
        <div style="text-align:center; margin-bottom:48px;">
          <span class="brand-badge">CAPABILITIES</span>
          <h1 class="page-title" style="font-size:38px; margin-top:12px;">Enterprise Feature Catalogue</h1>
          <p class="page-subtitle" style="font-size:16px;">Engineered for security, transparency, and operational clarity.</p>
        </div>

        <div style="display:grid; grid-template-columns:repeat(2, 1fr); gap:20px;">
          ${features.map(f => `
            <div class="panel">
              <div style="font-size:15px; font-weight:700; color:var(--cv-text-primary); margin-bottom:8px;">${f.title}</div>
              <p style="font-size:13px; line-height:1.6; color:var(--cv-text-secondary);">${f.desc}</p>
            </div>
          `).join('')}
        </div>
      </div>
      ${renderPublicFooter()}
    </div>
  `;
}

// Page 5: Security & Architecture
export function renderSecurityPage() {
  return `
    <div style="min-height:100vh; background:var(--cv-bg-page);">
      ${renderPublicHeader('security')}
      <div style="max-width:960px; margin:48px auto; padding:0 24px;">
        <div style="margin-bottom:32px;">
          <span class="brand-badge">SECURITY POSTURE</span>
          <h1 class="page-title" style="font-size:36px; margin-top:12px;">Enterprise Security & Tenant Isolation</h1>
          <p class="page-subtitle" style="font-size:16px;">Cryptographic safeguards and architectural separation of concerns.</p>
        </div>

        <div class="panel" style="margin-bottom:24px;">
          <h3 style="font-size:18px; font-weight:700; margin-bottom:12px;">Single-Step Authentication Protocol</h3>
          <p style="font-size:14px; line-height:1.6; color:var(--cv-text-secondary); margin-bottom:16px;">
            The platform enforces a single-step authentication model utilizing User ID and Password verification. No OTP, TOTP, SMS verification, or mandatory second authentication step is required. Credentials are authenticated on the backend with configurable account lockout and rate limiting.
          </p>
          <div style="background:var(--cv-bg-page); padding:12px 16px; border:1px solid var(--cv-border); border-left:3px solid var(--cv-brand-green); font-size:12.5px;">
            <strong>Backend Tenant Isolation:</strong> Tenant ID supplied by client requests is never trusted directly. The backend resolves tenant context exclusively from the verified user session token.
          </div>
        </div>

        <div class="panel">
          <h3 style="font-size:18px; font-weight:700; margin-bottom:12px;">Automated Secret Redaction</h3>
          <p style="font-size:14px; line-height:1.6; color:var(--cv-text-secondary);">
            All audit logs and telemetry streams automatically scrub API tokens, session cookies, and authentication payloads through cryptographic redaction filters prior to persistence.
          </p>
        </div>
      </div>
      ${renderPublicFooter()}
    </div>
  `;
}

// Page 6: Contact Us
export function renderContactPage() {
  return `
    <div style="min-height:100vh; background:var(--cv-bg-page);">
      ${renderPublicHeader('contact')}
      <div style="max-width:760px; margin:48px auto; padding:0 24px;">
        <div style="text-align:center; margin-bottom:36px;">
          <span class="brand-badge">GET IN TOUCH</span>
          <h1 class="page-title" style="font-size:34px; margin-top:12px;">Contact Institutional Sales & Support</h1>
          <p class="page-subtitle" style="font-size:15px;">Speak directly with our enterprise solutions architecture team.</p>
        </div>

        <div class="panel">
          <form id="contact-form" onsubmit="event.preventDefault(); alert('Message dispatched successfully. Reference Ticket: INQ-' + Math.floor(1000+Math.random()*9000)); this.reset();">
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-bottom:16px;">
              <div>
                <label class="form-label">Full Name</label>
                <input type="text" required class="form-input" placeholder="e.g. Vikram Malhotra">
              </div>
              <div>
                <label class="form-label">Work Email</label>
                <input type="email" required class="form-input" placeholder="e.g. vikram@fund.in">
              </div>
            </div>
            <div style="margin-bottom:16px;">
              <label class="form-label">Organization / Firm</label>
              <input type="text" required class="form-input" placeholder="e.g. Bharat Asset Management Ltd">
            </div>
            <div style="margin-bottom:16px;">
              <label class="form-label">Inquiry Subject</label>
              <select class="form-select">
                <option>Enterprise Platform License Inquiry</option>
                <option>Simulated Trading API Integration</option>
                <option>Tenant Security & Compliance Audit</option>
                <option>Custom CRM Workflow Configuration</option>
              </select>
            </div>
            <div style="margin-bottom:20px;">
              <label class="form-label">Message Details</label>
              <textarea required class="form-input" rows="4" placeholder="Describe your institutional requirements..."></textarea>
            </div>
            <button type="submit" class="btn btn-primary" style="width:100%; padding:12px; font-size:14px;">Send Inquiry</button>
          </form>
        </div>
      </div>
      ${renderPublicFooter()}
    </div>
  `;
}

// Page 7: Request Demo
export function renderRequestDemoPage() {
  return `
    <div style="min-height:100vh; background:var(--cv-bg-page);">
      ${renderPublicHeader('demo')}
      <div style="max-width:760px; margin:48px auto; padding:0 24px;">
        <div style="text-align:center; margin-bottom:36px;">
          <span class="brand-badge">SCHEDULE DEMO</span>
          <h1 class="page-title" style="font-size:34px; margin-top:12px;">Request an Institutional Walkthrough</h1>
          <p class="page-subtitle" style="font-size:15px;">Experience the complete 15-module enterprise suite with our product specialists.</p>
        </div>

        <div class="panel">
          <form id="demo-form" onsubmit="event.preventDefault(); alert('Demo request submitted. An institutional relationship manager will contact you within 4 hours.'); location.hash='#/landing';">
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-bottom:16px;">
              <div>
                <label class="form-label">Contact Name</label>
                <input type="text" required class="form-input" placeholder="e.g. Priya Sundaram">
              </div>
              <div>
                <label class="form-label">Business Email</label>
                <input type="email" required class="form-input" placeholder="e.g. priya@apexcapital.in">
              </div>
            </div>
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-bottom:16px;">
              <div>
                <label class="form-label">Company Name</label>
                <input type="text" required class="form-input" placeholder="Apex Capital Advisors">
              </div>
              <div>
                <label class="form-label">Company Size</label>
                <select class="form-select">
                  <option>10 - 50 Employees</option>
                  <option>50 - 200 Employees</option>
                  <option>200 - 1,000 Employees</option>
                  <option>1,000+ Enterprise</option>
                </select>
              </div>
            </div>
            <div style="margin-bottom:20px;">
              <label class="form-label">Primary Modules of Interest</label>
              <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px; font-size:13px; color:var(--cv-text-secondary);">
                <label><input type="checkbox" checked> Digital Asset Market Intelligence</label>
                <label><input type="checkbox" checked> Simulated Trading & Virtual Ledger</label>
                <label><input type="checkbox" checked> Institutional CRM & Customer 360</label>
                <label><input type="checkbox" checked> SLA Triage & Workflow Approvals</label>
              </div>
            </div>
            <button type="submit" class="btn btn-primary" style="width:100%; padding:12px; font-size:14px;">Schedule Product Demo</button>
          </form>
        </div>
      </div>
      ${renderPublicFooter()}
    </div>
  `;
}

// Page 8: FAQ
export function renderFaqPage() {
  const faqs = [
    { q: 'Is real cryptocurrency traded on CryptoVista X Enterprise?', a: 'No. CryptoVista X Enterprise is strictly an educational, risk modeling, and institutional CRM platform. All trades, orders, fills, and wallet balances are virtual simulations.' },
    { q: 'What authentication method is supported?', a: 'The workstation uses User ID and Password authentication exclusively. There is strictly zero MFA, zero OTP, zero SMS code, and zero authenticator app requirements.' },
    { q: 'How is multi-tenant isolation enforced?', a: 'Every tenant record is isolated at the database level with strict membership verification. The backend derives the tenant ID from the authenticated session and never trusts client-supplied tenant identifiers.' },
    { q: 'Can market quotes be configured with real feeds?', a: 'Yes. The system supports Groww reference benchmark quotes alongside deterministic mock data for testing. Mock data is always transparently labeled.' }
  ];

  return `
    <div style="min-height:100vh; background:var(--cv-bg-page);">
      ${renderPublicHeader('faq')}
      <div style="max-width:880px; margin:48px auto; padding:0 24px;">
        <div style="text-align:center; margin-bottom:40px;">
          <span class="brand-badge">KNOWLEDGE BASE</span>
          <h1 class="page-title" style="font-size:36px; margin-top:12px;">Frequently Asked Questions</h1>
          <p class="page-subtitle" style="font-size:16px;">Everything you need to know about CryptoVista X Enterprise.</p>
        </div>

        <div style="display:flex; flex-direction:column; gap:16px;">
          ${faqs.map(item => `
            <div class="panel" style="margin-bottom:0;">
              <h4 style="font-size:15px; font-weight:700; color:var(--cv-text-primary); margin-bottom:8px;">${item.q}</h4>
              <p style="font-size:13.5px; line-height:1.6; color:var(--cv-text-secondary);">${item.a}</p>
            </div>
          `).join('')}
        </div>
      </div>
      ${renderPublicFooter()}
    </div>
  `;
}

// Page 9: Privacy Policy
export function renderPrivacyPage() {
  return `
    <div style="min-height:100vh; background:var(--cv-bg-page);">
      ${renderPublicHeader('privacy')}
      <div style="max-width:880px; margin:48px auto; padding:0 24px;">
        <h1 class="page-title" style="font-size:32px; margin-bottom:8px;">Enterprise Privacy Policy</h1>
        <p style="font-size:13px; color:var(--cv-text-muted); margin-bottom:24px;">Last updated: November 2026 &bull; DPDP & GDPR Compliant</p>

        <div class="panel" style="font-size:13.5px; line-height:1.7; color:var(--cv-text-secondary);">
          <h3 style="color:var(--cv-text-primary); font-size:16px; margin-bottom:8px;">1. Data Collection and Scoping</h3>
          <p style="margin-bottom:16px;">CryptoVista X Enterprise processes corporate client metadata, authorized operator credentials, and simulated transaction logs within dedicated tenant boundaries.</p>

          <h3 style="color:var(--cv-text-primary); font-size:16px; margin-bottom:8px;">2. Confidential Internal Notes Protection</h3>
          <p style="margin-bottom:16px;">In compliance with specification SUP-004, internal operations notes are segregated from customer-facing interfaces and are never exposed across tenant boundaries.</p>

          <h3 style="color:var(--cv-text-primary); font-size:16px; margin-bottom:8px;">3. Automated Secret Masking</h3>
          <p>Passphrases, session tokens, and cryptographic keys are hashed or masked before persistence in MySQL audit logs.</p>
        </div>
      </div>
      ${renderPublicFooter()}
    </div>
  `;
}

// Page 10: Terms & Conditions
export function renderTermsPage() {
  return `
    <div style="min-height:100vh; background:var(--cv-bg-page);">
      ${renderPublicHeader('terms')}
      <div style="max-width:880px; margin:48px auto; padding:0 24px;">
        <h1 class="page-title" style="font-size:32px; margin-bottom:8px;">Terms and Conditions of Use</h1>
        <p style="font-size:13px; color:var(--cv-text-muted); margin-bottom:24px;">Enterprise Software License Agreement</p>

        <div class="panel" style="font-size:13.5px; line-height:1.7; color:var(--cv-text-secondary);">
          <h3 style="color:var(--cv-text-primary); font-size:16px; margin-bottom:8px;">1. Non-Custodial Simulation License</h3>
          <p style="margin-bottom:16px;">This software provides market simulation and CRM management only. It does not hold real money, execute genuine digital asset transfers, or act as an exchange.</p>

          <h3 style="color:var(--cv-text-primary); font-size:16px; margin-bottom:8px;">2. Tenant Isolation & Acceptable Use</h3>
          <p style="margin-bottom:16px;">Operators agree not to attempt tenant elevation or unauthorized access outside their assigned organization.</p>

          <h3 style="color:var(--cv-text-primary); font-size:16px; margin-bottom:8px;">3. Single-Step Authentication Disclaimer</h3>
          <p>The platform implements User ID and Password verification only without secondary multi-factor verification as requested by the enterprise configuration.</p>
        </div>
      </div>
      ${renderPublicFooter()}
    </div>
  `;
}

// Page 11: Login
export function renderLoginPage() {
  return `
    <div style="min-height:100vh; background:var(--cv-bg-page); display:flex; flex-direction:column; justify-content:space-between;">
      ${renderPublicHeader('login')}
      <div style="max-width:440px; width:100%; margin:48px auto; padding:0 20px;">
        <div class="panel" style="padding:32px; box-shadow:0 4px 12px rgba(0,0,0,0.05);">
          <div style="text-align:center; margin-bottom:24px;">
            <div style="width:36px; height:36px; background:var(--cv-brand-green); border-radius:3px; margin:0 auto 12px; display:flex; align-items:center; justify-content:center; color:#FFF; font-weight:800; font-size:18px;">
              CV
            </div>
            <h2 style="font-size:22px; font-weight:800; color:var(--cv-text-primary);">Workstation Sign In</h2>
            <p style="font-size:12.5px; color:var(--cv-text-muted); margin-top:4px;">User ID and Password Only &bull; Zero MFA</p>
          </div>

          <form id="standalone-login-form">
            <div id="login-error-alert" style="display:none; padding:10px 12px; background:#FEF2F2; border:1px solid #FCA5A5; color:#991B1B; font-size:12px; border-radius:3px; margin-bottom:16px;"></div>

            <div class="form-group">
              <label class="form-label">User ID / Corporate Email</label>
              <input type="text" id="page-user-id" required value="operator@apexcapital.in" class="form-input" placeholder="operator@apexcapital.in">
            </div>

            <div class="form-group" style="margin-bottom:20px;">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
                <label class="form-label" style="margin-bottom:0;">Password</label>
                <button type="button" id="btn-toggle-page-pass" style="background:none; border:none; color:var(--cv-brand-green); font-size:11.5px; font-weight:600; cursor:pointer;">Show</button>
              </div>
              <input type="password" id="page-user-pass" required value="password123" class="form-input" placeholder="Enter password">
            </div>

            <button type="submit" class="btn btn-primary" style="width:100%; height:44px; font-size:14px; font-weight:700;">
              Sign In to Workstation
            </button>

            <div style="margin-top:16px; display:flex; justify-content:space-between; font-size:12px;">
              <a href="#/forgot-password" style="color:var(--cv-text-secondary); text-decoration:none;">Forgot password?</a>
              <span style="color:var(--cv-text-muted);">Tenant: TENANT-APEX-01</span>
            </div>
          </form>
        </div>
      </div>
      ${renderPublicFooter()}
    </div>
  `;
}

export function initLoginPageListeners(onLoginSuccess) {
  const form = document.getElementById('standalone-login-form');
  const toggleBtn = document.getElementById('btn-toggle-page-pass');
  const passInput = document.getElementById('page-user-pass');
  const errorBox = document.getElementById('login-error-alert');

  if (toggleBtn && passInput) {
    toggleBtn.onclick = () => {
      const isPass = passInput.type === 'password';
      passInput.type = isPass ? 'text' : 'password';
      toggleBtn.textContent = isPass ? 'Hide' : 'Show';
    };
  }

  if (form) {
    form.onsubmit = async (e) => {
      e.preventDefault();
      const userId = document.getElementById('page-user-id').value.trim();
      const password = passInput.value.trim();

      const res = await loginUser(userId, password);
      if (res.status === 'AUTHENTICATED' || res.sessionToken) {
        store.setUser(res.user || { id: 'USR-001', email: userId, fullName: 'Apex Operator', role: 'OPERATOR' });
        location.hash = '#/app/dashboard';
        if (onLoginSuccess) onLoginSuccess();
      } else {
        errorBox.textContent = res.error || 'Authentication failed. Please verify credentials.';
        errorBox.style.display = 'block';
      }
    };
  }
}

// Page 12: Forgot Password
export function renderForgotPasswordPage() {
  return `
    <div style="min-height:100vh; background:var(--cv-bg-page); display:flex; flex-direction:column; justify-content:space-between;">
      ${renderPublicHeader('forgot')}
      <div style="max-width:440px; width:100%; margin:48px auto; padding:0 20px;">
        <div class="panel" style="padding:32px;">
          <h2 style="font-size:22px; font-weight:800; margin-bottom:8px; color:var(--cv-text-primary);">Reset Password</h2>
          <p style="font-size:12.5px; color:var(--cv-text-secondary); margin-bottom:20px;">
            Enter your authorized User ID or enterprise email to generate a secure reset token.
          </p>

          <form onsubmit="event.preventDefault(); alert('Reset token generated. For sandbox evaluation, proceeding directly to Reset Password gateway.'); location.hash='#/reset-password';">
            <div class="form-group" style="margin-bottom:20px;">
              <label class="form-label">Corporate Email</label>
              <input type="email" required value="operator@apexcapital.in" class="form-input">
            </div>
            <button type="submit" class="btn btn-primary" style="width:100%; height:42px;">Dispatch Reset Token</button>
            <div style="margin-top:16px; text-align:center;">
              <a href="#/login" style="font-size:12.5px; color:var(--cv-brand-green);">Return to Sign In</a>
            </div>
          </form>
        </div>
      </div>
      ${renderPublicFooter()}
    </div>
  `;
}

// Page 13: Reset Password
export function renderResetPasswordPage() {
  return `
    <div style="min-height:100vh; background:var(--cv-bg-page); display:flex; flex-direction:column; justify-content:space-between;">
      ${renderPublicHeader('reset')}
      <div style="max-width:440px; width:100%; margin:48px auto; padding:0 20px;">
        <div class="panel" style="padding:32px;">
          <h2 style="font-size:22px; font-weight:800; margin-bottom:8px; color:var(--cv-text-primary);">Set New Password</h2>
          <p style="font-size:12.5px; color:var(--cv-text-secondary); margin-bottom:20px;">
            Create a compliant enterprise password (minimum 8 characters, alphanumeric).
          </p>

          <form onsubmit="event.preventDefault(); alert('Password successfully updated. Please sign in with your new password.'); location.hash='#/login';">
            <div class="form-group">
              <label class="form-label">New Password</label>
              <input type="password" required minlength="8" class="form-input" placeholder="Enter new password">
            </div>
            <div class="form-group" style="margin-bottom:20px;">
              <label class="form-label">Confirm Password</label>
              <input type="password" required minlength="8" class="form-input" placeholder="Confirm new password">
            </div>
            <button type="submit" class="btn btn-primary" style="width:100%; height:42px;">Update Password & Sign In</button>
          </form>
        </div>
      </div>
      ${renderPublicFooter()}
    </div>
  `;
}
