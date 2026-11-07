/**
 * CryptoVista X Enterprise - Landing Page
 * Groww-inspired institutional showcase
 * "Digital asset intelligence. Enterprise operations. One connected platform."
 */

export function renderLandingPage() {
  return `
    <div style="min-height:100vh; background:var(--cv-bg-page, #F7F8FA); color:var(--cv-text-primary, #171A21); font-family:var(--cv-font, sans-serif);">
      
      <!-- Top Institutional Header -->
      <header style="background:#FFFFFF; border-bottom:1px solid var(--cv-border, #E6E8EB); position:sticky; top:0; z-index:100;">
        <div style="max-width:1200px; margin:0 auto; padding:0 24px; height:68px; display:flex; justify-content:space-between; align-items:center;">
          <div style="display:flex; align-items:center; gap:12px;">
            <div style="width:32px; height:32px; background:var(--cv-brand-green, #00B386); border-radius:3px; display:flex; align-items:center; justify-content:center; color:#FFF; font-weight:800; font-size:16px;">
              CV
            </div>
            <div>
              <span style="font-size:18px; font-weight:800; letter-spacing:-0.4px;">CryptoVista X</span>
              <span class="brand-badge" style="margin-left:6px; vertical-align:middle;">ENTERPRISE</span>
            </div>
          </div>

          <nav style="display:flex; align-items:center; gap:28px; font-size:13.5px; font-weight:600; color:var(--cv-text-secondary, #6B7280);">
            <a href="#features" style="color:inherit; text-decoration:none;">Platform Architecture</a>
            <a href="#modules" style="color:inherit; text-decoration:none;">Enterprise Modules</a>
            <a href="#compliance" style="color:inherit; text-decoration:none;">Governance & Security</a>
            <a href="#/markets" style="color:inherit; text-decoration:none;">Market Quotes</a>
          </nav>

          <div style="display:flex; align-items:center; gap:12px;">
            <a href="#/dashboard" class="btn btn-outline" style="font-size:13px; padding:8px 16px;">
              Sign In
            </a>
            <a href="#/dashboard" class="btn btn-primary" style="font-size:13px; padding:8px 18px;">
              Launch Workstation
            </a>
          </div>
        </div>
      </header>

      <!-- Hero Section -->
      <section style="background:#FFFFFF; border-bottom:1px solid var(--cv-border, #E6E8EB); padding:72px 24px 64px;">
        <div style="max-width:1080px; margin:0 auto; text-align:center;">
          <div style="display:inline-flex; align-items:center; gap:8px; padding:6px 14px; background:var(--cv-soft-green, #E8F7F1); border:1px solid rgba(0,179,134,0.25); border-radius:3px; font-size:12px; font-weight:700; color:var(--cv-brand-green, #00B386); margin-bottom:24px;">
            <span>JAVA 21 LTS + NODE.JS HYBRID ARCHITECTURE</span>
            <span style="color:var(--cv-border-dark);">•</span>
            <span>MULTI-TENANT MYSQL 8</span>
          </div>

          <h1 style="font-size:46px; font-weight:800; line-height:1.15; letter-spacing:-1px; color:#111827; margin-bottom:20px;">
            Digital asset intelligence.<br>Enterprise operations.<br>
            <span style="color:var(--cv-brand-green, #00B386);">One connected platform.</span>
          </h1>

          <p style="font-size:17px; line-height:1.6; color:var(--cv-text-secondary, #6B7280); max-width:760px; margin:0 auto 36px;">
            CryptoVista X Enterprise unites real-time market benchmark discovery, simulated multi-asset trading, institutional portfolio accounting, and end-to-end CRM workflows into a single high-integrity platform.
          </p>

          <div style="display:flex; justify-content:center; gap:16px; margin-bottom:48px;">
            <a href="#/dashboard" class="btn btn-primary" style="padding:12px 28px; font-size:14.5px; font-weight:700;">
              Launch Authenticated Workstation
            </a>
            <a href="#/markets" class="btn btn-outline" style="padding:12px 24px; font-size:14.5px; font-weight:600;">
              View Live Market Quotes
            </a>
          </div>

          <!-- Quick Metrics Ribbon -->
          <div style="display:grid; grid-template-columns:repeat(4, 1fr); gap:16px; background:var(--cv-bg-page, #F7F8FA); border:1px solid var(--cv-border, #E6E8EB); border-radius:4px; padding:20px;">
            <div>
              <div style="font-size:11px; font-weight:700; color:var(--cv-text-muted); text-transform:uppercase; letter-spacing:0.5px;">Simulated Liquidity</div>
              <div style="font-size:22px; font-weight:800; color:#111827; margin-top:4px;">₹10.00 Cr</div>
              <div style="font-size:11.5px; color:var(--cv-positive); font-weight:600;">Risk-Free Sandbox</div>
            </div>
            <div>
              <div style="font-size:11px; font-weight:700; color:var(--cv-text-muted); text-transform:uppercase; letter-spacing:0.5px;">Enterprise Schema</div>
              <div style="font-size:22px; font-weight:800; color:#111827; margin-top:4px;">39 Tables</div>
              <div style="font-size:11.5px; color:var(--cv-text-secondary);">3NF Normalized</div>
            </div>
            <div>
              <div style="font-size:11px; font-weight:700; color:var(--cv-text-muted); text-transform:uppercase; letter-spacing:0.5px;">SLA Compliance</div>
              <div style="font-size:22px; font-weight:800; color:#111827; margin-top:4px;">99.4%</div>
              <div style="font-size:11.5px; color:var(--cv-positive); font-weight:600;">P1 Incident Queue</div>
            </div>
            <div>
              <div style="font-size:11px; font-weight:700; color:var(--cv-text-muted); text-transform:uppercase; letter-spacing:0.5px;">Authentication Policy</div>
              <div style="font-size:22px; font-weight:800; color:#111827; margin-top:4px;">Single-Step</div>
              <div style="font-size:11.5px; color:var(--cv-text-secondary);">User ID & Password Only</div>
            </div>
          </div>
        </div>
      </section>

      <!-- Institutional Market Ticker Bar -->
      <section style="background:#FFFFFF; border-bottom:1px solid var(--cv-border, #E6E8EB); padding:16px 24px;">
        <div style="max-width:1200px; margin:0 auto; display:flex; justify-content:space-between; align-items:center; font-size:13px; overflow-x:auto; gap:24px;">
          <div style="display:flex; align-items:center; gap:8px; white-space:nowrap;">
            <strong style="color:var(--cv-text-primary);">BTC / INR</strong>
            <span style="font-family:monospace; font-weight:700;">₹82,45,100.00</span>
            <span class="badge badge-positive">+2.45%</span>
          </div>
          <div style="display:flex; align-items:center; gap:8px; white-space:nowrap;">
            <strong style="color:var(--cv-text-primary);">ETH / INR</strong>
            <span style="font-family:monospace; font-weight:700;">₹2,98,450.00</span>
            <span class="badge badge-negative">-1.18%</span>
          </div>
          <div style="display:flex; align-items:center; gap:8px; white-space:nowrap;">
            <strong style="color:var(--cv-text-primary);">SOL / INR</strong>
            <span style="font-family:monospace; font-weight:700;">₹16,420.00</span>
            <span class="badge badge-positive">+5.82%</span>
          </div>
          <div style="display:flex; align-items:center; gap:8px; white-space:nowrap;">
            <strong style="color:var(--cv-text-primary);">MATIC / INR</strong>
            <span style="font-family:monospace; font-weight:700;">₹42.10</span>
            <span class="badge badge-positive">+1.15%</span>
          </div>
          <div style="display:flex; align-items:center; gap:8px; white-space:nowrap;">
            <strong style="color:var(--cv-text-primary);">AVAX / INR</strong>
            <span style="font-family:monospace; font-weight:700;">₹2,840.00</span>
            <span class="badge badge-negative">-2.30%</span>
          </div>
        </div>
      </section>

      <!-- Core Modules Showcase -->
      <section id="modules" style="max-width:1200px; margin:0 auto; padding:64px 24px;">
        <div style="text-align:center; margin-bottom:48px;">
          <div style="font-size:12px; font-weight:700; color:var(--cv-brand-green, #00B386); text-transform:uppercase; letter-spacing:0.5px; margin-bottom:8px;">Enterprise Architecture</div>
          <h2 style="font-size:32px; font-weight:800; letter-spacing:-0.5px; color:#111827;">Engineered for Institutional Rigor</h2>
          <p style="font-size:15px; color:var(--cv-text-secondary, #6B7280); max-width:640px; margin:8px auto 0;">
            A unified modular monolith bridging digital asset telemetry with transactional enterprise CRM and risk controls.
          </p>
        </div>

        <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:24px;">
          <!-- Card 1 -->
          <div class="card" style="margin-bottom:0; display:flex; flex-direction:column; justify-content:space-between;">
            <div>
              <div style="width:36px; height:36px; background:var(--cv-soft-green); border-radius:3px; display:flex; align-items:center; justify-content:center; color:var(--cv-brand-green); font-weight:700; margin-bottom:16px;">
                M
              </div>
              <h3 style="font-size:18px; font-weight:700; margin-bottom:8px; color:var(--cv-text-primary);">Market Intelligence</h3>
              <p style="font-size:13.5px; color:var(--cv-text-secondary); line-height:1.55; margin-bottom:16px;">
                Multi-source digital asset discovery with strict separation of actual Groww reference benchmark quotes and deterministic sandbox walks.
              </p>
            </div>
            <a href="#/markets" style="font-size:13px; font-weight:700; color:var(--cv-brand-green);">Explore Markets &rarr;</a>
          </div>

          <!-- Card 2 -->
          <div class="card" style="margin-bottom:0; display:flex; flex-direction:column; justify-content:space-between;">
            <div>
              <div style="width:36px; height:36px; background:var(--cv-soft-green); border-radius:3px; display:flex; align-items:center; justify-content:center; color:var(--cv-brand-green); font-weight:700; margin-bottom:16px;">
                T
              </div>
              <h3 style="font-size:18px; font-weight:700; margin-bottom:8px; color:var(--cv-text-primary);">Simulated Trading Gateway</h3>
              <p style="font-size:13.5px; color:var(--cv-text-secondary); line-height:1.55; margin-bottom:16px;">
                High-performance order matching simulation with real-time fee calculations (0.10%), slippage modeling (0.02%), and double-entry ledger postings.
              </p>
            </div>
            <a href="#/trading" style="font-size:13px; font-weight:700; color:var(--cv-brand-green);">Open Trading Gateway &rarr;</a>
          </div>

          <!-- Card 3 -->
          <div class="card" style="margin-bottom:0; display:flex; flex-direction:column; justify-content:space-between;">
            <div>
              <div style="width:36px; height:36px; background:var(--cv-soft-green); border-radius:3px; display:flex; align-items:center; justify-content:center; color:var(--cv-brand-green); font-weight:700; margin-bottom:16px;">
                P
              </div>
              <h3 style="font-size:18px; font-weight:700; margin-bottom:8px; color:var(--cv-text-primary);">Portfolio & Valuation</h3>
              <p style="font-size:13.5px; color:var(--cv-text-secondary); line-height:1.55; margin-bottom:16px;">
                Multi-asset valuation engine with FIFO cost basis, real-time unrealized/realized P&L, asset concentration charts, and cash balance tracking.
              </p>
            </div>
            <a href="#/portfolio" style="font-size:13px; font-weight:700; color:var(--cv-brand-green);">View Portfolio Engine &rarr;</a>
          </div>

          <!-- Card 4 -->
          <div class="card" style="margin-bottom:0; display:flex; flex-direction:column; justify-content:space-between;">
            <div>
              <div style="width:36px; height:36px; background:var(--cv-soft-green); border-radius:3px; display:flex; align-items:center; justify-content:center; color:var(--cv-brand-green); font-weight:700; margin-bottom:16px;">
                C
              </div>
              <h3 style="font-size:18px; font-weight:700; margin-bottom:8px; color:var(--cv-text-primary);">Customer 360 & Accounts</h3>
              <p style="font-size:13.5px; color:var(--cv-text-secondary); line-height:1.55; margin-bottom:16px;">
                Complete institutional client directories, account tiers, relationship health scoring, and multi-tenant isolation guarantees.
              </p>
            </div>
            <a href="#/customers" style="font-size:13px; font-weight:700; color:var(--cv-brand-green);">Access Client Directory &rarr;</a>
          </div>

          <!-- Card 5 -->
          <div class="card" style="margin-bottom:0; display:flex; flex-direction:column; justify-content:space-between;">
            <div>
              <div style="width:36px; height:36px; background:var(--cv-soft-green); border-radius:3px; display:flex; align-items:center; justify-content:center; color:var(--cv-brand-green); font-weight:700; margin-bottom:16px;">
                L
              </div>
              <h3 style="font-size:18px; font-weight:700; margin-bottom:8px; color:var(--cv-text-primary);">Leads & Deal Funnel</h3>
              <p style="font-size:13.5px; color:var(--cv-text-secondary); line-height:1.55; margin-bottom:16px;">
                Inbound prospect capture, proprietary qualification scoring, deal pipeline tracking, and one-click conversion into institutional accounts.
              </p>
            </div>
            <a href="#/leads" style="font-size:13px; font-weight:700; color:var(--cv-brand-green);">Manage Sales Pipeline &rarr;</a>
          </div>

          <!-- Card 6 -->
          <div class="card" style="margin-bottom:0; display:flex; flex-direction:column; justify-content:space-between;">
            <div>
              <div style="width:36px; height:36px; background:var(--cv-soft-green); border-radius:3px; display:flex; align-items:center; justify-content:center; color:var(--cv-brand-green); font-weight:700; margin-bottom:16px;">
                S
              </div>
              <h3 style="font-size:18px; font-weight:700; margin-bottom:8px; color:var(--cv-text-primary);">Operations, SLA & Audit</h3>
              <p style="font-size:13.5px; color:var(--cv-text-secondary); line-height:1.55; margin-bottom:16px;">
                SLA incident triage, confidential internal notes segregation (SUP-004), dual-authorization workflows, and immutable forensic audit trails.
              </p>
            </div>
            <a href="#/support" style="font-size:13px; font-weight:700; color:var(--cv-brand-green);">Review Operations &rarr;</a>
          </div>
        </div>
      </section>

      <!-- Compliance & Non-Custodial Disclosure Banner -->
      <section id="compliance" style="background:#FFFFFF; border-top:1px solid var(--cv-border, #E6E8EB); border-bottom:1px solid var(--cv-border, #E6E8EB); padding:48px 24px;">
        <div style="max-width:980px; margin:0 auto; background:var(--cv-bg-page); border:1px solid var(--cv-border); border-left:4px solid var(--cv-brand-green); border-radius:4px; padding:24px;">
          <h4 style="font-size:15px; font-weight:700; color:var(--cv-text-primary); margin-bottom:8px;">Enterprise Non-Custodial Simulation Disclosure</h4>
          <p style="font-size:13px; line-height:1.6; color:var(--cv-text-secondary); margin-bottom:12px;">
            CryptoVista X Enterprise is an educational, analytical, and institutional operations modeling workstation. All cryptocurrency assets, orders, fills, and ledger balances are strictly virtual. No real fiat deposit, real cryptocurrency custody, or banking integration is required or executed.
          </p>
          <div style="display:flex; gap:16px; font-size:12px; font-weight:600; color:var(--cv-text-secondary);">
            <span>Zero Real-World Financial Risk</span>
            <span>•</span>
            <span>Tenant-Isolated Database</span>
            <span>•</span>
            <span>Single-Step User ID & Password Security</span>
          </div>
        </div>
      </section>

      <!-- Institutional Footer -->
      <footer style="background:#FFFFFF; padding:40px 24px; font-size:12.5px; color:var(--cv-text-muted);">
        <div style="max-width:1200px; margin:0 auto; display:flex; justify-content:space-between; align-items:center;">
          <div>
            <strong>CryptoVista X Enterprise</strong> &copy; 2026. All rights reserved.
            <div style="margin-top:4px;">Built with Java 21 LTS, Java Swing, MySQL 8, and Node.js.</div>
          </div>
          <div style="display:flex; gap:20px;">
            <a href="#/dashboard" style="color:var(--cv-brand-green); font-weight:600;">Workstation Dashboard</a>
            <a href="#/markets" style="color:var(--cv-brand-green); font-weight:600;">Markets</a>
            <a href="#/audit" style="color:var(--cv-brand-green); font-weight:600;">Audit Trail</a>
          </div>
        </div>
      </footer>

    </div>
  `;
}

