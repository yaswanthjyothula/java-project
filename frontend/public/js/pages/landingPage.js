/**
 * CryptoVista X Enterprise - Master Groww-Inspired Landing Page
 * Complete Institutional Fintech Presentation
 * Headline: "See the market. Understand the numbers. Manage the business."
 */

export function renderLandingPage() {
  return `
    <div style="min-height:100vh; background:var(--cv-bg-page, #F7F8FA); color:var(--cv-text-primary, #171A21); font-family:var(--cv-font, sans-serif);">
      
      <!-- 1. Professional Institutional Navigation Bar -->
      <header style="background:#FFFFFF; border-bottom:1px solid var(--cv-border, #E6E8EB); position:sticky; top:0; z-index:100;">
        <div style="max-width:1200px; margin:0 auto; padding:0 24px; height:68px; display:flex; justify-content:space-between; align-items:center;">
          <div style="display:flex; align-items:center; gap:12px;">
            <a href="#/landing" style="display:flex; align-items:center; gap:10px; text-decoration:none;">
              <div style="width:32px; height:32px; background:var(--cv-brand-green, #00B386); border-radius:3px; display:flex; align-items:center; justify-content:center; color:#FFF; font-weight:800; font-size:16px;">
                CV
              </div>
              <div>
                <span style="font-size:18px; font-weight:800; letter-spacing:-0.4px; color:var(--cv-text-primary, #171A21);">CryptoVista X</span>
                <span class="brand-badge" style="margin-left:6px; vertical-align:middle;">ENTERPRISE</span>
              </div>
            </a>
          </div>

          <nav style="display:flex; align-items:center; gap:28px; font-size:13.5px; font-weight:600; color:var(--cv-text-secondary, #6B7280);">
            <a href="#/product" style="color:inherit; text-decoration:none;">Product</a>
            <a href="#/app/markets" style="color:inherit; text-decoration:none;">Markets</a>
            <a href="#/features" style="color:inherit; text-decoration:none;">Features</a>
            <a href="#/app/enterprise" style="color:inherit; text-decoration:none;">Enterprise</a>
            <a href="#/about" style="color:inherit; text-decoration:none;">About</a>
            <a href="#/contact" style="color:inherit; text-decoration:none;">Contact</a>
          </nav>

          <div style="display:flex; align-items:center; gap:12px;">
            <a href="#/login" class="btn btn-outline" style="font-size:13px; padding:8px 16px;">Sign In</a>
            <a href="#/request-demo" class="btn btn-primary" style="font-size:13px; padding:8px 18px;">Request Demo</a>
          </div>
        </div>
      </header>

      <!-- 2. Hero Section -->
      <section style="background:#FFFFFF; border-bottom:1px solid var(--cv-border, #E6E8EB); padding:72px 24px 64px;">
        <div style="max-width:1120px; margin:0 auto; text-align:center;">
          <div style="display:inline-flex; align-items:center; gap:8px; padding:6px 14px; background:var(--cv-soft-green, #E8F7F1); border:1px solid rgba(0,179,134,0.25); border-radius:3px; font-size:12px; font-weight:700; color:var(--cv-brand-green, #00B386); margin-bottom:24px;">
            <span>NODE.JS WEB ARCHITECTURE</span>
            <span style="color:var(--cv-border-dark);">•</span>
            <span>MULTI-TENANT MYSQL 8</span>
            <span style="color:var(--cv-border-dark);">•</span>
            <span>SINGLE-STEP AUTH</span>
          </div>

          <h1 style="font-size:48px; font-weight:800; line-height:1.15; letter-spacing:-1.2px; color:#111827; margin-bottom:20px;">
            See the market. Understand the numbers.<br>
            <span style="color:var(--cv-brand-green, #00B386);">Manage the business.</span>
          </h1>

          <p style="font-size:17px; line-height:1.6; color:var(--cv-text-secondary, #6B7280); max-width:780px; margin:0 auto 36px;">
            Bring digital asset intelligence, simulated trading, portfolio analytics and enterprise customer operations together in one connected workspace.
          </p>

          <div style="display:flex; justify-content:center; gap:16px; margin-bottom:48px;">
            <a href="#/app/dashboard" class="btn btn-primary" style="padding:12px 28px; font-size:14.5px; font-weight:700;">
              Launch Authenticated Workstation
            </a>
            <a href="#/request-demo" class="btn btn-outline" style="padding:12px 24px; font-size:14.5px; font-weight:600;">
              Schedule Enterprise Demo
            </a>
          </div>

          <!-- Realistic Financial Dashboard Composition Preview -->
          <div style="background:var(--cv-bg-page); border:1px solid var(--cv-border); border-radius:6px; padding:16px; box-shadow:0 12px 32px rgba(0,0,0,0.06); text-align:left;">
            <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--cv-border); padding-bottom:12px; margin-bottom:16px;">
              <div style="display:flex; align-items:center; gap:10px;">
                <div style="width:10px; height:10px; background:#EF4444; border-radius:50%;"></div>
                <div style="width:10px; height:10px; background:#F59E0B; border-radius:50%;"></div>
                <div style="width:10px; height:10px; background:#10B981; border-radius:50%;"></div>
                <span style="font-size:12px; font-weight:600; color:var(--cv-text-muted); margin-left:8px;">CryptoVista X Enterprise — Live Unified Workstation Preview</span>
              </div>
              <span class="badge badge-positive">Tenant: TENANT-APEX-01</span>
            </div>

            <!-- Dashboard Preview Grid -->
            <div style="display:grid; grid-template-columns:repeat(4, 1fr); gap:12px; margin-bottom:16px;">
              <div style="background:#FFFFFF; border:1px solid var(--cv-border); padding:12px; border-radius:3px;">
                <div style="font-size:11px; font-weight:700; color:var(--cv-text-muted);">TOTAL VIRTUAL NAV</div>
                <div style="font-size:20px; font-weight:800; color:var(--cv-text-primary); margin-top:2px;">₹1,38,42,875.00</div>
                <div style="font-size:11px; color:var(--cv-positive); font-weight:600;">+4.12% Unrealized P&L</div>
              </div>
              <div style="background:#FFFFFF; border:1px solid var(--cv-border); padding:12px; border-radius:3px;">
                <div style="font-size:11px; font-weight:700; color:var(--cv-text-muted);">ENTERPRISE ARR</div>
                <div style="font-size:20px; font-weight:800; color:var(--cv-text-primary); margin-top:2px;">₹52,50,000.00</div>
                <div style="font-size:11px; color:var(--cv-text-secondary);">4 Active Retainers</div>
              </div>
              <div style="background:#FFFFFF; border:1px solid var(--cv-border); padding:12px; border-radius:3px;">
                <div style="font-size:11px; font-weight:700; color:var(--cv-text-muted);">ACTIVE TICKETS</div>
                <div style="font-size:20px; font-weight:800; color:var(--cv-text-primary); margin-top:2px;">2 Incidents</div>
                <div style="font-size:11px; color:var(--cv-positive); font-weight:600;">99.4% SLA Compliance</div>
              </div>
              <div style="background:#FFFFFF; border:1px solid var(--cv-border); padding:12px; border-radius:3px;">
                <div style="font-size:11px; font-weight:700; color:var(--cv-text-muted);">PENDING APPROVALS</div>
                <div style="font-size:20px; font-weight:800; color:#F59E0B; margin-top:2px;">1 Request</div>
                <div style="font-size:11px; color:var(--cv-text-secondary);">Dual Authorization</div>
              </div>
            </div>

            <!-- Mini Terminal Row -->
            <div style="background:#FFFFFF; border:1px solid var(--cv-border); padding:14px; border-radius:3px; display:flex; justify-content:space-between; align-items:center;">
              <div style="display:flex; align-items:center; gap:16px;">
                <span style="font-size:13px; font-weight:700;">Simulated Order Gateway:</span>
                <span style="font-family:monospace; font-size:13px; color:var(--cv-text-secondary);">BUY 0.25 BTC @ ₹82,45,100.00</span>
                <span class="badge badge-positive">FILLED</span>
              </div>
              <a href="#/app/trading" class="btn btn-outline" style="font-size:11.5px; padding:4px 10px;">Launch Terminal &rarr;</a>
            </div>
          </div>
        </div>
      </section>

      <!-- 3. Market Overview Cards -->
      <section id="markets" style="max-width:1200px; margin:0 auto; padding:64px 24px;">
        <div style="display:flex; justify-content:space-between; align-items:flex-end; margin-bottom:28px;">
          <div>
            <span class="brand-badge" style="margin-bottom:8px;">BENCHMARK TELEMETRY</span>
            <h2 style="font-size:28px; font-weight:800; letter-spacing:-0.5px; color:#111827;">Market Overview & Reference Quotes</h2>
            <p style="font-size:14px; color:var(--cv-text-secondary); margin-top:4px;">
              Continuous digital asset discovery with strict separation of actual Groww reference benchmarks and deterministic simulations.
            </p>
          </div>
          <a href="#/app/markets/assets" class="btn btn-outline" style="font-size:13px;">View All Assets &rarr;</a>
        </div>

        <div style="display:grid; grid-template-columns:repeat(4, 1fr); gap:16px;">
          <div class="panel" style="margin-bottom:0; cursor:pointer;" onclick="location.hash='#/app/markets/assets/BTC'">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
              <strong style="font-size:16px; color:var(--cv-text-primary);">BTC</strong>
              <span class="badge badge-positive">+2.45%</span>
            </div>
            <div style="font-size:12px; color:var(--cv-text-muted);">Bitcoin Reference</div>
            <div style="font-size:20px; font-weight:800; color:var(--cv-text-primary); margin:8px 0 4px; font-family:monospace;">₹82,45,100.00</div>
            <div style="font-size:11px; color:var(--cv-text-secondary);">Vol: ₹4,520 Cr &bull; <span style="color:var(--cv-brand-green); font-weight:600;">GROWW REFERENCE</span></div>
          </div>

          <div class="panel" style="margin-bottom:0; cursor:pointer;" onclick="location.hash='#/app/markets/assets/ETH'">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
              <strong style="font-size:16px; color:var(--cv-text-primary);">ETH</strong>
              <span class="badge badge-negative">-1.18%</span>
            </div>
            <div style="font-size:12px; color:var(--cv-text-muted);">Ethereum Reference</div>
            <div style="font-size:20px; font-weight:800; color:var(--cv-text-primary); margin:8px 0 4px; font-family:monospace;">₹2,98,450.00</div>
            <div style="font-size:11px; color:var(--cv-text-secondary);">Vol: ₹1,840 Cr &bull; <span style="color:var(--cv-brand-green); font-weight:600;">GROWW REFERENCE</span></div>
          </div>

          <div class="panel" style="margin-bottom:0; cursor:pointer;" onclick="location.hash='#/app/markets/assets/SOL'">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
              <strong style="font-size:16px; color:var(--cv-text-primary);">SOL</strong>
              <span class="badge badge-positive">+5.82%</span>
            </div>
            <div style="font-size:12px; color:var(--cv-text-muted);">Solana Deterministic</div>
            <div style="font-size:20px; font-weight:800; color:var(--cv-text-primary); margin:8px 0 4px; font-family:monospace;">₹16,420.00</div>
            <div style="font-size:11px; color:var(--cv-text-secondary);">Vol: ₹890 Cr &bull; <span style="color:#F59E0B; font-weight:600;">DETERMINISTIC MOCK</span></div>
          </div>

          <div class="panel" style="margin-bottom:0; cursor:pointer;" onclick="location.hash='#/app/markets/assets/AVAX'">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
              <strong style="font-size:16px; color:var(--cv-text-primary);">AVAX</strong>
              <span class="badge badge-negative">-2.30%</span>
            </div>
            <div style="font-size:12px; color:var(--cv-text-muted);">Avalanche Deterministic</div>
            <div style="font-size:20px; font-weight:800; color:var(--cv-text-primary); margin:8px 0 4px; font-family:monospace;">₹2,840.00</div>
            <div style="font-size:11px; color:var(--cv-text-secondary);">Vol: ₹310 Cr &bull; <span style="color:#F59E0B; font-weight:600;">DETERMINISTIC MOCK</span></div>
          </div>
        </div>
      </section>

      <!-- 4. Product Showcase & Platform Capabilities -->
      <section id="product" style="background:#FFFFFF; border-top:1px solid var(--cv-border); border-bottom:1px solid var(--cv-border); padding:64px 24px;">
        <div style="max-width:1200px; margin:0 auto;">
          <div style="text-align:center; margin-bottom:48px;">
            <span class="brand-badge">PRODUCT SUITE</span>
            <h2 style="font-size:32px; font-weight:800; letter-spacing:-0.5px; color:#111827;">One Connected Financial Platform</h2>
            <p style="font-size:15px; color:var(--cv-text-secondary); max-width:680px; margin:8px auto 0;">
              Eliminate software silos by uniting market discovery, simulation, portfolio accounting, and client operations.
            </p>
          </div>

          <div style="display:grid; grid-template-columns:repeat(4, 1fr); gap:20px;">
            <div class="card" style="margin-bottom:0; display:flex; flex-direction:column; justify-content:space-between;">
              <div>
                <span class="badge badge-info" style="margin-bottom:12px;">MODULE B</span>
                <h3 style="font-size:17px; font-weight:700; color:var(--cv-text-primary); margin-bottom:8px;">Market Intelligence</h3>
                <p style="font-size:13px; line-height:1.6; color:var(--cv-text-secondary); margin-bottom:16px;">
                  Multi-source asset discovery, 24h gainers/losers, volume rankings, and live market depth.
                </p>
              </div>
              <a href="#/app/markets" style="font-size:13px; font-weight:700; color:var(--cv-brand-green);">Explore Markets &rarr;</a>
            </div>

            <div class="card" style="margin-bottom:0; display:flex; flex-direction:column; justify-content:space-between;">
              <div>
                <span class="badge badge-info" style="margin-bottom:12px;">MODULE C</span>
                <h3 style="font-size:17px; font-weight:700; color:var(--cv-text-primary); margin-bottom:8px;">Simulated Trading</h3>
                <p style="font-size:13px; line-height:1.6; color:var(--cv-text-secondary); margin-bottom:16px;">
                  Slippage modeling (0.02%), platform fee calculations (0.10%), and balanced virtual ledger posting.
                </p>
              </div>
              <a href="#/app/trading" style="font-size:13px; font-weight:700; color:var(--cv-brand-green);">Launch Terminal &rarr;</a>
            </div>

            <div class="card" style="margin-bottom:0; display:flex; flex-direction:column; justify-content:space-between;">
              <div>
                <span class="badge badge-info" style="margin-bottom:12px;">MODULE D</span>
                <h3 style="font-size:17px; font-weight:700; color:var(--cv-text-primary); margin-bottom:8px;">Portfolio Valuation</h3>
                <p style="font-size:13px; line-height:1.6; color:var(--cv-text-secondary); margin-bottom:16px;">
                  FIFO cost basis accounting, concentration breakdown, and unrealized/realized P&L reconciliation.
                </p>
              </div>
              <a href="#/app/portfolio" style="font-size:13px; font-weight:700; color:var(--cv-brand-green);">View Portfolio &rarr;</a>
            </div>

            <div class="card" style="margin-bottom:0; display:flex; flex-direction:column; justify-content:space-between;">
              <div>
                <span class="badge badge-info" style="margin-bottom:12px;">MODULE E</span>
                <h3 style="font-size:17px; font-weight:700; color:var(--cv-text-primary); margin-bottom:8px;">Customer 360 & CRM</h3>
                <p style="font-size:13px; line-height:1.6; color:var(--cv-text-secondary); margin-bottom:16px;">
                  15-tab profile linking accounts, contacts, pipelines, onboarding cases, and support tickets.
                </p>
              </div>
              <a href="#/app/crm/customers" style="font-size:13px; font-weight:700; color:var(--cv-brand-green);">Access Customer 360 &rarr;</a>
            </div>
          </div>
        </div>
      </section>

      <!-- 5. How It Works (Four-Step Explanation) -->
      <section style="max-width:1100px; margin:0 auto; padding:64px 24px;">
        <div style="text-align:center; margin-bottom:48px;">
          <span class="brand-badge">ARCHITECTURE WORKFLOW</span>
          <h2 style="font-size:30px; font-weight:800; letter-spacing:-0.5px; color:#111827;">How CryptoVista X Operates</h2>
        </div>

        <div style="display:grid; grid-template-columns:repeat(4, 1fr); gap:20px;">
          <div style="background:#FFFFFF; border:1px solid var(--cv-border); border-radius:4px; padding:20px;">
            <div style="width:32px; height:32px; background:var(--cv-brand-green); color:#FFF; font-weight:800; font-size:14px; border-radius:3px; display:flex; align-items:center; justify-content:center; margin-bottom:14px;">1</div>
            <h4 style="font-size:15px; font-weight:700; margin-bottom:6px;">Single-Step Sign In</h4>
            <p style="font-size:12.5px; color:var(--cv-text-secondary); line-height:1.55;">Authenticate with User ID and Password only. Zero MFA/OTP friction.</p>
          </div>
          <div style="background:#FFFFFF; border:1px solid var(--cv-border); border-radius:4px; padding:20px;">
            <div style="width:32px; height:32px; background:var(--cv-brand-green); color:#FFF; font-weight:800; font-size:14px; border-radius:3px; display:flex; align-items:center; justify-content:center; margin-bottom:14px;">2</div>
            <h4 style="font-size:15px; font-weight:700; margin-bottom:6px;">Derive Tenant Context</h4>
            <p style="font-size:12.5px; color:var(--cv-text-secondary); line-height:1.55;">Backend resolves organization membership with strict database-level isolation.</p>
          </div>
          <div style="background:#FFFFFF; border:1px solid var(--cv-border); border-radius:4px; padding:20px;">
            <div style="width:32px; height:32px; background:var(--cv-brand-green); color:#FFF; font-weight:800; font-size:14px; border-radius:3px; display:flex; align-items:center; justify-content:center; margin-bottom:14px;">3</div>
            <h4 style="font-size:15px; font-weight:700; margin-bottom:6px;">Simulate & Trade</h4>
            <p style="font-size:12.5px; color:var(--cv-text-secondary); line-height:1.55;">Execute risk-free simulated orders settled to a double-entry virtual ledger.</p>
          </div>
          <div style="background:#FFFFFF; border:1px solid var(--cv-border); border-radius:4px; padding:20px;">
            <div style="width:32px; height:32px; background:var(--cv-brand-green); color:#FFF; font-weight:800; font-size:14px; border-radius:3px; display:flex; align-items:center; justify-content:center; margin-bottom:14px;">4</div>
            <h4 style="font-size:15px; font-weight:700; margin-bottom:6px;">Manage & Audit</h4>
            <p style="font-size:12.5px; color:var(--cv-text-secondary); line-height:1.55;">Track client pipelines, resolve SLA tickets, and audit every operational action.</p>
          </div>
        </div>
      </section>

      <!-- 6. Enterprise Use Cases -->
      <section style="background:#FFFFFF; border-top:1px solid var(--cv-border); border-bottom:1px solid var(--cv-border); padding:64px 24px;">
        <div style="max-width:1100px; margin:0 auto;">
          <div style="text-align:center; margin-bottom:40px;">
            <span class="brand-badge">TAILORED ROLES</span>
            <h2 style="font-size:30px; font-weight:800; letter-spacing:-0.5px; color:#111827;">Engineered for Financial Teams</h2>
          </div>

          <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:24px;">
            <div class="panel" style="margin-bottom:0;">
              <h4 style="font-size:16px; font-weight:700; margin-bottom:8px;">Traders & Market Analysts</h4>
              <p style="font-size:13px; line-height:1.6; color:var(--cv-text-secondary); margin-bottom:12px;">
                Model digital asset strategies with realistic slippage, fee simulation, and real-time Groww benchmark quotes.
              </p>
              <a href="#/app/trading" style="font-size:12.5px; font-weight:700; color:var(--cv-brand-green);">Open Trading Terminal &rarr;</a>
            </div>
            <div class="panel" style="margin-bottom:0;">
              <h4 style="font-size:16px; font-weight:700; margin-bottom:8px;">Relationship Managers</h4>
              <p style="font-size:13px; line-height:1.6; color:var(--cv-text-secondary); margin-bottom:12px;">
                Manage institutional accounts, track lead qualification funnels, and monitor client relationship health scores.
              </p>
              <a href="#/app/crm/customers" style="font-size:12.5px; font-weight:700; color:var(--cv-brand-green);">View Client Directory &rarr;</a>
            </div>
            <div class="panel" style="margin-bottom:0;">
              <h4 style="font-size:16px; font-weight:700; margin-bottom:8px;">Operations & Security Officers</h4>
              <p style="font-size:13px; line-height:1.6; color:var(--cv-text-secondary); margin-bottom:12px;">
                Triage SLA priority tickets, review dual approvals, enforce four-eyes governance, and inspect immutable audit logs.
              </p>
              <a href="#/app/customer-operations/support" style="font-size:12.5px; font-weight:700; color:var(--cv-brand-green);">Inspect Operations &rarr;</a>
            </div>
          </div>
        </div>
      </section>

      <!-- 7. Trust, Security & Non-Custodial Disclosure -->
      <section id="security" style="max-width:1000px; margin:0 auto; padding:64px 24px;">
        <div style="background:#FFFFFF; border:1px solid var(--cv-border); border-left:4px solid var(--cv-brand-green); border-radius:4px; padding:28px;">
          <h3 style="font-size:18px; font-weight:800; color:var(--cv-text-primary); margin-bottom:8px;">Security Architecture & Regulatory Disclosure</h3>
          <p style="font-size:13.5px; line-height:1.65; color:var(--cv-text-secondary); margin-bottom:16px;">
            CryptoVista X Enterprise is an educational and analytical risk modeling platform. All cryptocurrency trades, balances, orders, and tokens are simulated. The platform maintains no real cryptocurrency custody and processes no fiat transfers. Operator authentication utilizes single-step User ID and Password verification only without MFA/OTP overhead.
          </p>
          <div style="display:flex; gap:20px; font-size:12.5px; font-weight:600; color:var(--cv-text-secondary); flex-wrap:wrap;">
            <span>Zero Real-World Financial Risk</span>
            <span>&bull;</span>
            <span>Tenant-Isolated Database</span>
            <span>&bull;</span>
            <span>Automated Secret Redaction</span>
            <span>&bull;</span>
            <span>Double-Entry Balanced Ledgers</span>
          </div>
        </div>
      </section>

      <!-- 8. Searchable FAQ -->
      <section id="faq" style="background:#FFFFFF; border-top:1px solid var(--cv-border); border-bottom:1px solid var(--cv-border); padding:64px 24px;">
        <div style="max-width:880px; margin:0 auto;">
          <div style="text-align:center; margin-bottom:40px;">
            <span class="brand-badge">FREQUENTLY ASKED QUESTIONS</span>
            <h2 style="font-size:30px; font-weight:800; letter-spacing:-0.5px; color:#111827;">Got Questions? We Have Answers.</h2>
          </div>

          <div style="display:flex; flex-direction:column; gap:14px;">
            <div class="panel" style="margin-bottom:0;">
              <h4 style="font-size:15px; font-weight:700; margin-bottom:6px;">Is real cryptocurrency traded on CryptoVista X Enterprise?</h4>
              <p style="font-size:13px; line-height:1.6; color:var(--cv-text-secondary);">
                No. All trades, orders, fills, and wallet balances are strictly virtual simulations. No real fiat deposit, real crypto custody, or banking integration is required or executed.
              </p>
            </div>
            <div class="panel" style="margin-bottom:0;">
              <h4 style="font-size:15px; font-weight:700; margin-bottom:6px;">What authentication method is enforced?</h4>
              <p style="font-size:13px; line-height:1.6; color:var(--cv-text-secondary);">
                Single-step User ID and Password authentication only. There is strictly zero MFA, zero OTP, zero SMS code, and zero authenticator app requirement.
              </p>
            </div>
            <div class="panel" style="margin-bottom:0;">
              <h4 style="font-size:15px; font-weight:700; margin-bottom:6px;">How are confidential notes handled in customer operations?</h4>
              <p style="font-size:13px; line-height:1.6; color:var(--cv-text-secondary);">
                Under specification SUP-004, internal operations notes are physically segregated from external communications to ensure complete operational confidentiality.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- 9. Final CTA Ribbon -->
      <section style="background:var(--cv-soft-green); padding:64px 24px; text-align:center; border-bottom:1px solid var(--cv-border);">
        <div style="max-width:800px; margin:0 auto;">
          <h2 style="font-size:32px; font-weight:800; letter-spacing:-0.5px; color:#111827; margin-bottom:12px;">
            Ready to Streamline Your Financial Operations?
          </h2>
          <p style="font-size:16px; color:var(--cv-text-secondary); margin-bottom:28px;">
            Launch the authenticated workstation or schedule a customized institutional walkthrough today.
          </p>
          <div style="display:flex; justify-content:center; gap:16px;">
            <a href="#/app/dashboard" class="btn btn-primary" style="padding:12px 28px; font-size:14.5px; font-weight:700;">
              Launch Workstation
            </a>
            <a href="#/request-demo" class="btn btn-outline" style="padding:12px 24px; font-size:14.5px; font-weight:600; background:#FFF;">
              Request Institutional Demo
            </a>
          </div>
        </div>
      </section>

      <!-- 10. Professional Institutional Footer -->
      <footer style="background:#FFFFFF; padding:48px 24px 32px; font-size:13px; color:var(--cv-text-secondary);">
        <div style="max-width:1200px; margin:0 auto; display:grid; grid-template-columns:2fr 1fr 1fr 1fr; gap:40px; margin-bottom:36px;">
          <div>
            <div style="font-size:16px; font-weight:800; color:var(--cv-text-primary); margin-bottom:8px;">CryptoVista X Enterprise</div>
            <p style="font-size:12.5px; line-height:1.6; color:var(--cv-text-muted); max-width:320px;">
              Digital asset intelligence. Simulated trading execution. Enterprise CRM and operations. One connected platform.
            </p>
            <div style="margin-top:12px; font-size:11px; color:var(--cv-text-muted);">
              Pure Node.js Web Architecture &bull; 39 Relational Tables &bull; Single-Step Auth
            </div>
          </div>
          <div>
            <div style="font-size:12px; font-weight:700; color:var(--cv-text-primary); text-transform:uppercase; letter-spacing:0.5px; margin-bottom:12px;">Platform</div>
            <div style="display:flex; flex-direction:column; gap:8px;">
              <a href="#/product" style="color:inherit; text-decoration:none;">Product Overview</a>
              <a href="#/features" style="color:inherit; text-decoration:none;">Feature Catalogue</a>
              <a href="#/app/markets" style="color:inherit; text-decoration:none;">Market Quotes</a>
              <a href="#/app/dashboard" style="color:inherit; text-decoration:none;">Workstation Shell</a>
            </div>
          </div>
          <div>
            <div style="font-size:12px; font-weight:700; color:var(--cv-text-primary); text-transform:uppercase; letter-spacing:0.5px; margin-bottom:12px;">Company</div>
            <div style="display:flex; flex-direction:column; gap:8px;">
              <a href="#/about" style="color:inherit; text-decoration:none;">About Us</a>
              <a href="#/contact" style="color:inherit; text-decoration:none;">Contact Sales</a>
              <a href="#/request-demo" style="color:inherit; text-decoration:none;">Request Demo</a>
              <a href="#/faq" style="color:inherit; text-decoration:none;">FAQ & Support</a>
            </div>
          </div>
          <div>
            <div style="font-size:12px; font-weight:700; color:var(--cv-text-primary); text-transform:uppercase; letter-spacing:0.5px; margin-bottom:12px;">Legal & Security</div>
            <div style="display:flex; flex-direction:column; gap:8px;">
              <a href="#/privacy" style="color:inherit; text-decoration:none;">Privacy Policy</a>
              <a href="#/terms" style="color:inherit; text-decoration:none;">Terms of Service</a>
              <a href="#/security" style="color:inherit; text-decoration:none;">Security Standards</a>
            </div>
          </div>
        </div>
        <div style="max-width:1200px; margin:0 auto; padding-top:24px; border-top:1px solid var(--cv-border); display:flex; justify-content:space-between; align-items:center; font-size:12px; color:var(--cv-text-muted);">
          <div>&copy; 2026 CryptoVista X Enterprise. All rights reserved.</div>
          <div>Simulated FinTech Platform &bull; Zero Custodial Risk</div>
        </div>
      </footer>

    </div>
  `;
}
