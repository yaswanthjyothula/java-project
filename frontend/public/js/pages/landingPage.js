/**
 * CryptoVista X Enterprise - Master Groww-Inspired Landing Page
 * Complete Multi-Section Institutional Web Presentation
 * Headline: "See the market. Understand the numbers. Manage the business."
 *
 * Implements all 22 Sections:
 * 1. Sticky Public Header with Mega Navigation (Markets, Trading, Portfolio, Enterprise, Resources)
 * 2. Global Search Dialog (Ctrl+K Modal)
 * 3. Hero Section (56px typography, 3 CTAs, Live Dashboard Composition Preview)
 * 4. Trust and Platform Capability Strip
 * 5. Product Showcase Cards (3 Cards with 3D Perspective Hover)
 * 6. Market Intelligence Section (Quotes, SVG Charts, Depth Preview)
 * 7. Simulated Trading Section (Order Gateway, Fee/Slippage Breakdown, Clear Disclosures)
 * 8. Portfolio Analytics Section (Allocation Chart, FIFO Cost Basis, NAV Trajectory)
 * 9. Enterprise CRM & Operations Section (6 Core Pillars)
 * 10. Unified Workspace Section (End-to-End Architectural Data Flow)
 * 11. 3D Learning Carousel (All 14 Original Cards with Continuous 32s Rotation & Pause on Hover)
 * 12. Security & Platform Governance Section (Argon2id, Tenant Isolation, Secret Redaction)
 * 13. Tailored Use Cases Section (5 Institutional Financial Teams)
 * 14. Request a Demo Section (Working Form Connected to /api/v1/public/demo-requests)
 * 15. Searchable FAQ Accordion (12 Complete Questions & Answers)
 * 16. Complete Footer (Brand, Social, Company, Product, Enterprise, Legal Columns)
 * 17. Financial Disclosures & User Awareness (Sections A through H)
 * 18. Important User Notice Ticker (90-second Continuous Marquee)
 */

import { renderHeroIllustration } from '../components/heroIllustration.js';

export function renderLandingPage() {
  const currentYear = new Date().getFullYear();

  return `
    <div style="min-height:100vh; background:var(--background-primary, #FFFFFF); color:var(--content-primary, #44475B); font-family:var(--cv-font, sans-serif);">
      
      <!-- ===================================================================
           1. STICKY PUBLIC HEADER & MEGA-NAVIGATION
           =================================================================== -->
      <header class="public-header" id="cvx-header">
        <div class="public-header-inner">
          
          <!-- Brand Logo -->
          <a href="#/landing" style="display:flex; align-items:center; gap:12px; text-decoration:none;">
            <div style="width:36px; height:36px; background:linear-gradient(135deg, #04B488 0%, #03906D 100%); border-radius:6px; display:flex; align-items:center; justify-content:center; color:#FFF; font-weight:800; font-size:18px; box-shadow:0 2px 6px rgba(4,180,136,0.3);">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
                <polyline points="16 7 22 7 22 13"></polyline>
              </svg>
            </div>
            <div>
              <div style="display:flex; align-items:center; gap:6px;">
                <span style="font-size:19px; font-weight:800; letter-spacing:-0.5px; color:#171A21;">CryptoVista X</span>
                <span style="background:var(--accent-subtle); color:var(--accent-green); font-size:10px; font-weight:700; padding:2px 6px; border-radius:3px; letter-spacing:0.5px;">ENTERPRISE</span>
              </div>
              <div style="font-size:10px; color:var(--content-tertiary); font-weight:600; letter-spacing:0.2px;">FINANCIAL INTELLIGENCE</div>
            </div>
          </a>

          <!-- Center: Mega Navigation Menus -->
          <nav class="nav-mega-group" id="public-mega-nav">
            
            <!-- Category 1: Markets -->
            <div class="mega-nav-item">
              <button class="mega-trigger-btn" type="button" aria-expanded="false">
                <span>Markets</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </button>
              <div class="mega-dropdown-panel">
                <div class="mega-panel-content">
                  <div class="mega-featured-card">
                    <div>
                      <span class="mega-featured-badge">FEATURED INTELLIGENCE</span>
                      <h4 class="mega-featured-title">Market Intelligence</h4>
                      <p class="mega-featured-desc">
                        Explore digital assets, monitor market movements, and understand market trends through a unified intelligence workspace.
                      </p>
                    </div>
                    <a href="#/app/markets" class="btn btn-primary" style="padding:8px 14px; font-size:12.5px; text-align:center;">Launch Markets &rarr;</a>
                  </div>
                  <div class="mega-links-grid">
                    <a href="#/app/markets" class="mega-link-item">
                      <span class="mega-link-title">Asset Explorer</span>
                      <span class="mega-link-sub">Browse top digital assets and benchmark quotes</span>
                    </a>
                    <a href="#/app/markets" class="mega-link-item">
                      <span class="mega-link-title">Market Overview</span>
                      <span class="mega-link-sub">24h market cap, volume trends, and breadth</span>
                    </a>
                    <a href="#/app/markets" class="mega-link-item">
                      <span class="mega-link-title">Market Movers</span>
                      <span class="mega-link-sub">Real-time gainers, decliners, and high-volume pairs</span>
                    </a>
                    <a href="#/app/markets" class="mega-link-item">
                      <span class="mega-link-title">Digital Asset Rankings</span>
                      <span class="mega-link-sub">Institutional rankings and market liquidity</span>
                    </a>
                    <a href="#/app/markets" class="mega-link-item">
                      <span class="mega-link-title">Watchlists</span>
                      <span class="mega-link-sub">Custom portfolios and tracking lists</span>
                    </a>
                    <a href="#/security" class="mega-link-item">
                      <span class="mega-link-title">Market Data Sources</span>
                      <span class="mega-link-sub">Hybrid reference and deterministic feeds</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <!-- Category 2: Trading -->
            <div class="mega-nav-item">
              <button class="mega-trigger-btn" type="button" aria-expanded="false">
                <span>Trading</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </button>
              <div class="mega-dropdown-panel">
                <div class="mega-panel-content">
                  <div class="mega-featured-card">
                    <div>
                      <span class="mega-featured-badge" style="background:#FFF8E6; color:#D99A16;">SIMULATED TRADING ONLY</span>
                      <h4 class="mega-featured-title">Simulated Trading Terminal</h4>
                      <p class="mega-featured-desc">
                        Explore simulated trading workflows, test strategies, and monitor virtual trading activity without executing real-money trades.
                      </p>
                    </div>
                    <a href="#/app/trading" class="btn btn-primary" style="padding:8px 14px; font-size:12.5px; text-align:center;">Launch Terminal &rarr;</a>
                  </div>
                  <div class="mega-links-grid">
                    <a href="#/app/trading" class="mega-link-item">
                      <span class="mega-link-title">Trading Terminal</span>
                      <span class="mega-link-sub">Market, limit, and stop simulated execution</span>
                    </a>
                    <a href="#/app/trading" class="mega-link-item">
                      <span class="mega-link-title">Virtual Trading Accounts</span>
                      <span class="mega-link-sub">Manage ₹1.00 Cr virtual initial allocation</span>
                    </a>
                    <a href="#/app/trading" class="mega-link-item">
                      <span class="mega-link-title">Orders and Executions</span>
                      <span class="mega-link-sub">Slippage modeling (0.02%) & fee estimation (0.10%)</span>
                    </a>
                    <a href="#/app/trading" class="mega-link-item">
                      <span class="mega-link-title">Trade History</span>
                      <span class="mega-link-sub">Immutable transaction log and audit trail</span>
                    </a>
                    <a href="#/learning" class="mega-link-item">
                      <span class="mega-link-title">Trading Strategies</span>
                      <span class="mega-link-sub">Educational strategy backtesting models</span>
                    </a>
                    <a href="#/learning" class="mega-link-item">
                      <span class="mega-link-title">Trading Education</span>
                      <span class="mega-link-sub">Order routing mechanics and risk guidance</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <!-- Category 3: Portfolio -->
            <div class="mega-nav-item">
              <button class="mega-trigger-btn" type="button" aria-expanded="false">
                <span>Portfolio</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </button>
              <div class="mega-dropdown-panel">
                <div class="mega-panel-content">
                  <div class="mega-featured-card">
                    <div>
                      <span class="mega-featured-badge">PORTFOLIO VALUATION</span>
                      <h4 class="mega-featured-title">Portfolio Analytics</h4>
                      <p class="mega-featured-desc">
                        Monitor holdings, evaluate portfolio performance, and understand allocation and simulated profit and loss.
                      </p>
                    </div>
                    <a href="#/app/portfolio" class="btn btn-primary" style="padding:8px 14px; font-size:12.5px; text-align:center;">View Holdings &rarr;</a>
                  </div>
                  <div class="mega-links-grid">
                    <a href="#/app/portfolio" class="mega-link-item">
                      <span class="mega-link-title">Portfolio Overview</span>
                      <span class="mega-link-sub">Total virtual NAV and unrealized P&L reconciliation</span>
                    </a>
                    <a href="#/app/portfolio" class="mega-link-item">
                      <span class="mega-link-title">Holdings Breakdown</span>
                      <span class="mega-link-sub">BTC, ETH, and alternative asset positions</span>
                    </a>
                    <a href="#/app/portfolio" class="mega-link-item">
                      <span class="mega-link-title">Asset Allocation</span>
                      <span class="mega-link-sub">Diversification ratios and concentration limits</span>
                    </a>
                    <a href="#/app/portfolio" class="mega-link-item">
                      <span class="mega-link-title">Performance Analysis</span>
                      <span class="mega-link-sub">FIFO cost basis and benchmark relative return</span>
                    </a>
                    <a href="#/app/portfolio" class="mega-link-item">
                      <span class="mega-link-title">Transaction Ledger</span>
                      <span class="mega-link-sub">Double-entry balanced virtual cash ledger</span>
                    </a>
                    <a href="#/app/analytics" class="mega-link-item">
                      <span class="mega-link-title">Portfolio Reports</span>
                      <span class="mega-link-sub">Exportable PDF and CSV valuation summaries</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <!-- Category 4: Enterprise -->
            <div class="mega-nav-item">
              <button class="mega-trigger-btn" type="button" aria-expanded="false">
                <span>Enterprise</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </button>
              <div class="mega-dropdown-panel" style="width:840px;">
                <div class="mega-panel-content" style="grid-template-columns:260px 1fr;">
                  <div class="mega-featured-card">
                    <div>
                      <span class="mega-featured-badge">ENTERPRISE PLATFORM</span>
                      <h4 class="mega-featured-title">Enterprise Operations</h4>
                      <p class="mega-featured-desc">
                        Connect customer relationships, sales operations, workflows, and business intelligence in one enterprise platform.
                      </p>
                    </div>
                    <a href="#/app/enterprise" class="btn btn-primary" style="padding:8px 14px; font-size:12.5px; text-align:center;">Enterprise Hub &rarr;</a>
                  </div>
                  <div class="mega-links-grid" style="grid-template-columns:repeat(2, 1fr);">
                    <a href="#/app/crm/customers" class="mega-link-item">
                      <span class="mega-link-title">CRM & Customer 360</span>
                      <span class="mega-link-sub">15-tab profile, contacts, contracts, accounts</span>
                    </a>
                    <a href="#/app/crm/leads" class="mega-link-item">
                      <span class="mega-link-title">Lead Management</span>
                      <span class="mega-link-sub">Qualification funnels and scoring metrics</span>
                    </a>
                    <a href="#/app/crm/sales" class="mega-link-item">
                      <span class="mega-link-title">Sales Pipeline</span>
                      <span class="mega-link-sub">Deal progression, probability, expected ARR</span>
                    </a>
                    <a href="#/app/customer-operations/support" class="mega-link-item">
                      <span class="mega-link-title">Customer Operations</span>
                      <span class="mega-link-sub">SLA tracking, confidential internal notes</span>
                    </a>
                    <a href="#/app/approvals" class="mega-link-item">
                      <span class="mega-link-title">Dual Approvals</span>
                      <span class="mega-link-sub">Four-eyes governance for sensitive actions</span>
                    </a>
                    <a href="#/app/analytics" class="mega-link-item">
                      <span class="mega-link-title">Business Analytics</span>
                      <span class="mega-link-sub">Operational KPIs, conversion, SLA reports</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <!-- Category 5: Resources -->
            <div class="mega-nav-item">
              <button class="mega-trigger-btn" type="button" aria-expanded="false">
                <span>Resources</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </button>
              <div class="mega-dropdown-panel" style="width:680px; left:auto; right:0; transform:none;">
                <div class="mega-panel-content" style="grid-template-columns:1fr 1fr; gap:16px;">
                  <div style="display:flex; flex-direction:column; gap:10px;">
                    <span style="font-size:11px; font-weight:700; color:var(--content-tertiary); text-transform:uppercase; letter-spacing:0.5px;">KNOWLEDGE & LEARNING</span>
                    <a href="#/learning" class="mega-link-item">
                      <span class="mega-link-title">Learning Center</span>
                      <span class="mega-link-sub">14 visual guides on assets and operations</span>
                    </a>
                    <a href="#/product" class="mega-link-item">
                      <span class="mega-link-title">Product Architecture</span>
                      <span class="mega-link-sub">Node.js web runtime & MySQL 8 schema</span>
                    </a>
                    <a href="#/features" class="mega-link-item">
                      <span class="mega-link-title">Feature Catalog</span>
                      <span class="mega-link-sub">Comprehensive enterprise functional matrix</span>
                    </a>
                    <a href="#/faq" class="mega-link-item">
                      <span class="mega-link-title">FAQs & Help</span>
                      <span class="mega-link-sub">Answers to common operational questions</span>
                    </a>
                  </div>
                  <div style="display:flex; flex-direction:column; gap:10px; border-left:1px solid var(--border-subtle); padding-left:16px;">
                    <span style="font-size:11px; font-weight:700; color:var(--content-tertiary); text-transform:uppercase; letter-spacing:0.5px;">SECURITY & TRUST</span>
                    <a href="#/security" class="mega-link-item">
                      <span class="mega-link-title">Security & Governance</span>
                      <span class="mega-link-sub">Argon2id auth, tenant isolation, auditability</span>
                    </a>
                    <a href="#/about" class="mega-link-item">
                      <span class="mega-link-title">About CryptoVista</span>
                      <span class="mega-link-sub">Institutional mission and engineering ethics</span>
                    </a>
                    <a href="#/contact" class="mega-link-item">
                      <span class="mega-link-title">Contact Enterprise Sales</span>
                      <span class="mega-link-sub">Direct advisory inquiries and support</span>
                    </a>
                    <a href="#/terms" class="mega-link-item">
                      <span class="mega-link-title">Regulatory Disclosures</span>
                      <span class="mega-link-sub">Simulated trading & non-custodial boundaries</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

          </nav>

          <!-- Right: Global Search & Action Buttons -->
          <div style="display:flex; align-items:center; gap:14px;">
            <!-- Global Search Trigger -->
            <button class="header-search-bar" id="search-trigger-btn" type="button" aria-label="Search markets and platform">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              <span>Search markets, assets, features...</span>
              <span class="search-shortcut-badge">Ctrl+K</span>
            </button>

            <!-- Login & CTA -->
            <a href="#/login" class="btn btn-outline" style="font-size:13px; padding:7px 16px; border-radius:4px; font-weight:600;">Sign In</a>
            <a href="#demo-form-section" class="btn btn-primary" style="font-size:13px; padding:7px 18px; border-radius:4px; font-weight:700;">Request Demo</a>

            <!-- Mobile Menu Toggle Button -->
            <button class="mobile-nav-toggle" id="mobile-menu-btn" aria-label="Toggle navigation menu">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
            </button>
          </div>

        </div>
      </header>

      <!-- ===================================================================
           2. GLOBAL SEARCH DIALOG MODAL (Ctrl+K)
           =================================================================== -->
      <div id="global-search-modal" class="search-modal-backdrop" style="display:none;" role="dialog" aria-modal="true" aria-label="Global Search">
        <div class="search-modal-window">
          <div class="search-modal-header">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color:var(--content-secondary);"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            <input type="text" id="global-search-input" class="search-modal-input" placeholder="Search assets (BTC, ETH), features (trading, crm), or docs..." autocomplete="off">
            <button id="search-modal-close" style="background:none; border:none; color:var(--content-secondary); font-size:18px; cursor:pointer;" aria-label="Close search">&times;</button>
          </div>
          <div class="search-modal-body" id="search-results-container">
            <div style="padding:24px; text-align:center; color:var(--content-secondary); font-size:13px;">
              Type a search term above or try <a href="#/app/markets/assets/BTC" style="font-weight:600;">BTC</a>, <a href="#/app/trading" style="font-weight:600;">Trading Terminal</a>, or <a href="#/learning" style="font-weight:600;">Learning Center</a>.
            </div>
          </div>
          <div class="search-modal-footer">
            <span>Navigation: <kbd style="background:#FFF; border:1px solid #CCC; padding:1px 5px; border-radius:3px;">&uarr;</kbd> <kbd style="background:#FFF; border:1px solid #CCC; padding:1px 5px; border-radius:3px;">&darr;</kbd> to navigate</span>
            <span><kbd style="background:#FFF; border:1px solid #CCC; padding:1px 5px; border-radius:3px;">ESC</kbd> to close</span>
          </div>
        </div>
      </div>

      <!-- ===================================================================
           3. HERO SECTION (56px Heading, 3 CTAs, Financial Dashboard Preview)
           =================================================================== -->
      <section style="background:#FFFFFF; border-bottom:1px solid var(--border-primary); padding:80px 32px 72px;">
        <div style="max-width:1120px; margin:0 auto; text-align:center;">
          
          <!-- Architecture Pill -->
          <div style="display:inline-flex; align-items:center; gap:10px; padding:6px 16px; background:var(--accent-subtle); border:1px solid var(--accent-border); border-radius:9999px; font-size:12px; font-weight:700; color:var(--accent-green); margin-bottom:28px;">
            <span>NODE.JS ENTERPRISE RUNTIME</span>
            <span style="opacity:0.4;">•</span>
            <span>MULTI-TENANT MYSQL 8</span>
            <span style="opacity:0.4;">•</span>
            <span>SINGLE-STEP AUTH</span>
          </div>

          <!-- Main 56px Hero Heading -->
          <h1 style="font-size:var(--font-hero, 56px); font-weight:800; line-height:1.15; letter-spacing:-1.5px; color:#171A21; margin-bottom:22px;">
            See the market. Understand the numbers.<br>
            <span style="color:var(--accent-green);">Manage the business.</span>
          </h1>

          <!-- Supporting Text -->
          <p style="font-size:18px; line-height:1.6; color:var(--content-secondary); max-width:820px; margin:0 auto 36px;">
            One connected platform for digital asset intelligence, portfolio analytics, simulated trading, and enterprise operations.
          </p>

          <!-- CTAs -->
          <div style="display:flex; justify-content:center; align-items:center; gap:16px; margin-bottom:56px; flex-wrap:wrap;">
            <a href="#/app/dashboard" class="btn btn-primary" style="padding:14px 32px; font-size:15px; font-weight:700; border-radius:6px; box-shadow:0 4px 14px rgba(4,180,136,0.25);">
              Explore the Platform
            </a>
            <a href="#demo-form-section" class="btn btn-outline" style="padding:14px 28px; font-size:15px; font-weight:600; border-radius:6px; background:#FFFFFF;">
              Request a Demo
            </a>
            <a href="#/login" class="btn" style="padding:14px 24px; font-size:15px; font-weight:600; color:var(--content-secondary); background:transparent; border:none;">
              Login &rarr;
            </a>
          </div>

          <!-- Realistic Financial Dashboard Composition Preview -->
          <div class="hero-preview-composition" id="hero-preview-composition" style="background:var(--background-secondary); border:1px solid var(--border-primary); border-radius:8px; padding:20px; box-shadow:0 16px 40px rgba(0,0,0,0.06); text-align:left;">
            
            <!-- Window Bar -->
            <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--border-primary); padding-bottom:14px; margin-bottom:18px;">
              <div style="display:flex; align-items:center; gap:10px;">
                <div style="width:11px; height:11px; background:#ED5533; border-radius:50%;"></div>
                <div style="width:11px; height:11px; background:#FFB61B; border-radius:50%;"></div>
                <div style="width:11px; height:11px; background:#04B488; border-radius:50%;"></div>
                <span style="font-size:12.5px; font-weight:600; color:var(--content-secondary); margin-left:8px;">
                  CryptoVista X Enterprise — Live Unified Workstation Preview
                </span>
              </div>
              <div style="display:flex; align-items:center; gap:8px;">
                <span style="background:var(--accent-subtle); color:var(--accent-green); font-size:11px; font-weight:700; padding:3px 8px; border-radius:3px;">
                  TENANT: TENANT-APEX-01
                </span>
                <span style="background:#FFF; border:1px solid var(--border-primary); font-size:11px; font-weight:600; padding:3px 8px; border-radius:3px; color:var(--content-secondary); display:inline-flex; align-items:center;">
                  <span class="cv-radar-dot"></span>
                  SIMULATION ACTIVE
                </span>
              </div>
            </div>

            <!-- 3D Isometric Financial Telemetry Preview -->
            <div style="margin-bottom:18px; border-radius:8px; overflow:hidden; border:1px solid var(--border-primary); background:#FFFFFF; display:flex; justify-content:center; align-items:center; box-shadow:0 4px 16px rgba(0,0,0,0.03);">
              ${renderHeroIllustration({ maxHeight: '480px' })}
            </div>

            <!-- KPI Metric Grid -->
            <div style="display:grid; grid-template-columns:repeat(4, 1fr); gap:14px; margin-bottom:16px;">
              <div style="background:#FFFFFF; border:1px solid var(--border-primary); padding:16px; border-radius:6px;">
                <div style="font-size:11px; font-weight:700; color:var(--content-tertiary); letter-spacing:0.4px;">TOTAL VIRTUAL NAV</div>
                <div id="hero-kpi-nav" style="font-size:22px; font-weight:800; color:var(--content-primary); margin-top:4px; font-family:var(--cv-font-mono); padding:1px 4px; border-radius:3px; transition:background-color 0.4s;">₹1,38,42,875.00</div>
                <div style="font-size:11.5px; color:var(--positive); font-weight:600; margin-top:2px;">+4.12% Unrealized P&L</div>
              </div>
              <div style="background:#FFFFFF; border:1px solid var(--border-primary); padding:16px; border-radius:6px;">
                <div style="font-size:11px; font-weight:700; color:var(--content-tertiary); letter-spacing:0.4px;">ENTERPRISE ARR</div>
                <div style="font-size:22px; font-weight:800; color:var(--content-primary); margin-top:4px; font-family:var(--cv-font-mono);">₹52,50,000.00</div>
                <div style="font-size:11.5px; color:var(--content-secondary); margin-top:2px;">4 Active Retainers</div>
              </div>
              <div style="background:#FFFFFF; border:1px solid var(--border-primary); padding:16px; border-radius:6px;">
                <div style="font-size:11px; font-weight:700; color:var(--content-tertiary); letter-spacing:0.4px;">ACTIVE TICKETS</div>
                <div style="font-size:22px; font-weight:800; color:var(--content-primary); margin-top:4px;">2 Incidents</div>
                <div style="font-size:11.5px; color:var(--positive); font-weight:600; margin-top:2px;">99.4% SLA Compliance</div>
              </div>
              <div style="background:#FFFFFF; border:1px solid var(--border-primary); padding:16px; border-radius:6px;">
                <div style="font-size:11px; font-weight:700; color:var(--content-tertiary); letter-spacing:0.4px;">PENDING APPROVALS</div>
                <div style="font-size:22px; font-weight:800; color:var(--warning); margin-top:4px;">1 Request</div>
                <div style="font-size:11.5px; color:var(--content-secondary); margin-top:2px;">Dual Authorization Required</div>
              </div>
            </div>

            <!-- Mini Terminal Strip Preview -->
            <div style="background:#FFFFFF; border:1px solid var(--border-primary); padding:14px 18px; border-radius:6px; display:flex; justify-content:space-between; align-items:center;">
              <div style="display:flex; align-items:center; gap:16px; flex-wrap:wrap;">
                <span style="font-size:13px; font-weight:700; color:var(--content-primary);">Order Gateway Telemetry:</span>
                <span id="hero-live-order-quote" style="font-family:var(--cv-font-mono); font-size:13px; color:var(--content-secondary); padding:1px 4px; border-radius:3px; transition:background-color 0.4s;">
                  BUY 0.25 BTC @ ₹82,45,100.00
                </span>
                <span style="background:var(--positive-bg); color:var(--positive); font-size:11px; font-weight:700; padding:2px 8px; border-radius:3px; display:inline-flex; align-items:center;">
                  <span class="cv-radar-dot" style="width:6px; height:6px;"></span>
                  FILLED (VIRTUAL)
                </span>
                <span style="font-size:12px; color:var(--content-tertiary);">
                  Slippage: 0.02% • Fee: 0.10% (₹206.13)
                </span>
              </div>
              <a href="#/app/trading" class="btn btn-outline" style="font-size:12px; padding:5px 12px; border-radius:4px;">
                Open Terminal &rarr;
              </a>
            </div>

          </div>

        </div>
      </section>

      <!-- ===================================================================
           4. TRUST & PLATFORM CAPABILITIES STRIP
           =================================================================== -->
      <section style="background:var(--background-secondary); border-bottom:1px solid var(--border-primary); padding:36px 32px;">
        <div style="max-width:1200px; margin:0 auto; display:grid; grid-template-columns:repeat(4, 1fr); gap:24px; text-align:center;">
          <div>
            <div style="font-size:26px; font-weight:800; color:var(--content-primary); font-family:var(--cv-font-mono);">₹13.8 Cr+</div>
            <div style="font-size:12.5px; color:var(--content-secondary); margin-top:4px; font-weight:500;">Virtual Volume Modeled</div>
          </div>
          <div>
            <div style="font-size:26px; font-weight:800; color:var(--accent-green); font-family:var(--cv-font-mono);">99.4%</div>
            <div style="font-size:12.5px; color:var(--content-secondary); margin-top:4px; font-weight:500;">SLA Compliance Enforced</div>
          </div>
          <div>
            <div style="font-size:26px; font-weight:800; color:var(--content-primary); font-family:var(--cv-font-mono);">100%</div>
            <div style="font-size:12.5px; color:var(--content-secondary); margin-top:4px; font-weight:500;">Non-Custodial Architecture</div>
          </div>
          <div>
            <div style="font-size:26px; font-weight:800; color:var(--content-primary); font-family:var(--cv-font-mono);">Single-Step</div>
            <div style="font-size:12.5px; color:var(--content-secondary); margin-top:4px; font-weight:500;">Argon2id Auth (Zero MFA)</div>
          </div>
        </div>
      </section>

      <!-- ===================================================================
           5. PRODUCT SHOWCASE CARDS (3 Cards with Subtle Perspective Hover)
           =================================================================== -->
      <section style="padding:72px 32px; background:#FFFFFF; border-bottom:1px solid var(--border-primary);">
        <div style="max-width:1200px; margin:0 auto;">
          <div style="text-align:center; margin-bottom:52px;">
            <span style="color:var(--accent-green); font-size:12px; font-weight:700; text-transform:uppercase; letter-spacing:0.8px;">CORE CAPABILITIES</span>
            <h2 style="font-size:var(--font-section-head, 40px); font-weight:800; letter-spacing:-0.8px; color:#171A21; margin-top:8px;">
              Engineered for Institutional Clarity
            </h2>
            <p style="font-size:16px; color:var(--content-secondary); max-width:680px; margin:12px auto 0;">
              Three foundational pillars engineered into one seamless, responsive operational application.
            </p>
          </div>

          <div class="perspective-card-grid" style="display:grid; grid-template-columns:repeat(3, 1fr); gap:28px;">
            
            <!-- Card 1: Market Intelligence -->
            <div class="card perspective-card" style="padding:32px; display:flex; flex-direction:column; justify-content:space-between; margin-bottom:0;">
              <div>
                <div style="width:44px; height:44px; background:var(--accent-subtle); border-radius:8px; display:flex; align-items:center; justify-content:center; color:var(--accent-green); margin-bottom:20px;">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
                </div>
                <h3 style="font-size:22px; font-weight:800; color:var(--content-primary); margin-bottom:12px;">Market Intelligence</h3>
                <p style="font-size:14px; line-height:1.65; color:var(--content-secondary); margin-bottom:20px;">
                  Real-time reference benchmarks from Groww paired with deterministic simulation tokens. Inspect 24h market cap, volume rankings, bid/ask depth, and technical curves.
                </p>
                <div style="display:flex; flex-direction:column; gap:8px; font-size:13px; color:var(--content-primary); font-weight:600; margin-bottom:24px;">
                  <div style="display:flex; align-items:center; gap:8px;">
                    <span style="color:var(--accent-green);">✓</span> Multi-source asset discovery
                  </div>
                  <div style="display:flex; align-items:center; gap:8px;">
                    <span style="color:var(--accent-green);">✓</span> 24h gainers, decliners & volume
                  </div>
                  <div style="display:flex; align-items:center; gap:8px;">
                    <span style="color:var(--accent-green);">✓</span> Distinct mock vs reference labels
                  </div>
                </div>
              </div>
              <a href="#/app/markets" class="btn btn-outline" style="width:100%; text-align:center; font-weight:700;">Explore Markets &rarr;</a>
            </div>

            <!-- Card 2: Portfolio Analytics -->
            <div class="card perspective-card" style="padding:32px; display:flex; flex-direction:column; justify-content:space-between; margin-bottom:0;">
              <div>
                <div style="width:44px; height:44px; background:var(--secondary-blue-bg); border-radius:8px; display:flex; align-items:center; justify-content:center; color:var(--secondary-blue); margin-bottom:20px;">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path><path d="M22 12A10 10 0 0 0 12 2v10z"></path></svg>
                </div>
                <h3 style="font-size:22px; font-weight:800; color:var(--content-primary); margin-bottom:12px;">Portfolio Analytics</h3>
                <p style="font-size:14px; line-height:1.65; color:var(--content-secondary); margin-bottom:20px;">
                  Institutional-grade FIFO cost basis accounting, concentration risk metrics, and unrealized versus realized P&L reconciliation across all virtual holdings.
                </p>
                <div style="display:flex; flex-direction:column; gap:8px; font-size:13px; color:var(--content-primary); font-weight:600; margin-bottom:24px;">
                  <div style="display:flex; align-items:center; gap:8px;">
                    <span style="color:var(--secondary-blue);">✓</span> FIFO cost basis lot tracking
                  </div>
                  <div style="display:flex; align-items:center; gap:8px;">
                    <span style="color:var(--secondary-blue);">✓</span> Net Asset Value (NAV) reconciliation
                  </div>
                  <div style="display:flex; align-items:center; gap:8px;">
                    <span style="color:var(--secondary-blue);">✓</span> Asset concentration limits
                  </div>
                </div>
              </div>
              <a href="#/app/portfolio" class="btn btn-outline" style="width:100%; text-align:center; font-weight:700;">View Portfolio &rarr;</a>
            </div>

            <!-- Card 3: Enterprise CRM -->
            <div class="card perspective-card" style="padding:32px; display:flex; flex-direction:column; justify-content:space-between; margin-bottom:0;">
              <div>
                <div style="width:44px; height:44px; background:#FFF8E6; border-radius:8px; display:flex; align-items:center; justify-content:center; color:#D99A16; margin-bottom:20px;">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                </div>
                <h3 style="font-size:22px; font-weight:800; color:var(--content-primary); margin-bottom:12px;">Enterprise CRM</h3>
                <p style="font-size:14px; line-height:1.65; color:var(--content-secondary); margin-bottom:20px;">
                  A full Customer 360 profile connecting institutional client accounts, lead qualification funnels, SLA support tickets, and four-eyes dual authorization.
                </p>
                <div style="display:flex; flex-direction:column; gap:8px; font-size:13px; color:var(--content-primary); font-weight:600; margin-bottom:24px;">
                  <div style="display:flex; align-items:center; gap:8px;">
                    <span style="color:#D99A16;">✓</span> 15-tab customer relationship profile
                  </div>
                  <div style="display:flex; align-items:center; gap:8px;">
                    <span style="color:#D99A16;">✓</span> SLA priority incident tracking
                  </div>
                  <div style="display:flex; align-items:center; gap:8px;">
                    <span style="color:#D99A16;">✓</span> Dual approvals & audit trails
                  </div>
                </div>
              </div>
              <a href="#/app/crm/customers" class="btn btn-outline" style="width:100%; text-align:center; font-weight:700;">Open CRM 360 &rarr;</a>
            </div>

          </div>
        </div>
      </section>

      <!-- ===================================================================
           6. MARKET INTELLIGENCE SECTION ("See Beyond the Price")
           =================================================================== -->
      <section style="padding:72px 32px; background:var(--background-secondary); border-bottom:1px solid var(--border-primary);">
        <div style="max-width:1200px; margin:0 auto;">
          <div style="display:flex; justify-content:space-between; align-items:flex-end; margin-bottom:32px;">
            <div>
              <span style="color:var(--accent-green); font-size:12px; font-weight:700; text-transform:uppercase; letter-spacing:0.8px;">BENCHMARK TELEMETRY</span>
              <h2 style="font-size:var(--font-section-head, 36px); font-weight:800; letter-spacing:-0.8px; color:#171A21; margin-top:6px;">
                Market Intelligence — See beyond the price.
              </h2>
              <p style="font-size:15px; color:var(--content-secondary); margin-top:6px;">
                Live quotes with clear disclosure: real Groww benchmark telemetry vs deterministic simulation tokens.
              </p>
            </div>
            <a href="#/app/markets" class="btn btn-outline" style="font-size:13px; font-weight:700;">View All Assets &rarr;</a>
          </div>

          <!-- Asset Grid -->
          <div style="display:grid; grid-template-columns:repeat(5, 1fr); gap:16px; margin-bottom:28px;">
            
            <!-- BTC -->
            <div class="card" style="padding:18px; margin-bottom:0; cursor:pointer;" onclick="location.hash='#/app/markets/assets/BTC'">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
                <span style="font-size:16px; font-weight:800; color:var(--content-primary);">BTC</span>
                <span style="background:var(--positive-bg); color:var(--positive); font-size:11px; font-weight:700; padding:2px 6px; border-radius:3px;">+2.45%</span>
              </div>
              <div style="font-size:11px; color:var(--content-tertiary);">Bitcoin Benchmark</div>
              <div style="font-size:18px; font-weight:800; color:var(--content-primary); margin:8px 0 6px; font-family:var(--cv-font-mono);">₹82,45,100.00</div>
              <!-- Mini SVG Sparkline -->
              <svg width="100%" height="28" viewBox="0 0 100 28" fill="none">
                <path d="M0,22 Q25,8 50,15 T100,4" stroke="#04B488" stroke-width="2" fill="none"></path>
              </svg>
              <div style="font-size:10.5px; color:var(--accent-green); font-weight:700; margin-top:6px;">GROWW REFERENCE</div>
            </div>

            <!-- ETH -->
            <div class="card" style="padding:18px; margin-bottom:0; cursor:pointer;" onclick="location.hash='#/app/markets/assets/ETH'">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
                <span style="font-size:16px; font-weight:800; color:var(--content-primary);">ETH</span>
                <span style="background:var(--negative-bg); color:var(--negative); font-size:11px; font-weight:700; padding:2px 6px; border-radius:3px;">-1.18%</span>
              </div>
              <div style="font-size:11px; color:var(--content-tertiary);">Ethereum Benchmark</div>
              <div style="font-size:18px; font-weight:800; color:var(--content-primary); margin:8px 0 6px; font-family:var(--cv-font-mono);">₹2,98,450.00</div>
              <svg width="100%" height="28" viewBox="0 0 100 28" fill="none">
                <path d="M0,6 Q30,12 60,8 T100,24" stroke="#ED5533" stroke-width="2" fill="none"></path>
              </svg>
              <div style="font-size:10.5px; color:var(--accent-green); font-weight:700; margin-top:6px;">GROWW REFERENCE</div>
            </div>

            <!-- SOL -->
            <div class="card" style="padding:18px; margin-bottom:0; cursor:pointer;" onclick="location.hash='#/app/markets/assets/SOL'">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
                <span style="font-size:16px; font-weight:800; color:var(--content-primary);">SOL</span>
                <span style="background:var(--positive-bg); color:var(--positive); font-size:11px; font-weight:700; padding:2px 6px; border-radius:3px;">+5.82%</span>
              </div>
              <div style="font-size:11px; color:var(--content-tertiary);">Solana Simulation</div>
              <div style="font-size:18px; font-weight:800; color:var(--content-primary); margin:8px 0 6px; font-family:var(--cv-font-mono);">₹16,420.00</div>
              <svg width="100%" height="28" viewBox="0 0 100 28" fill="none">
                <path d="M0,24 Q35,18 65,10 T100,2" stroke="#04B488" stroke-width="2" fill="none"></path>
              </svg>
              <div style="font-size:10.5px; color:#D99A16; font-weight:700; margin-top:6px;">DETERMINISTIC MOCK</div>
            </div>

            <!-- MATIC -->
            <div class="card" style="padding:18px; margin-bottom:0; cursor:pointer;" onclick="location.hash='#/app/markets/assets/MATIC'">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
                <span style="font-size:16px; font-weight:800; color:var(--content-primary);">MATIC</span>
                <span style="background:var(--positive-bg); color:var(--positive); font-size:11px; font-weight:700; padding:2px 6px; border-radius:3px;">+1.15%</span>
              </div>
              <div style="font-size:11px; color:var(--content-tertiary);">Polygon Simulation</div>
              <div style="font-size:18px; font-weight:800; color:var(--content-primary); margin:8px 0 6px; font-family:var(--cv-font-mono);">₹42.10</div>
              <svg width="100%" height="28" viewBox="0 0 100 28" fill="none">
                <path d="M0,18 Q40,15 70,12 T100,6" stroke="#04B488" stroke-width="2" fill="none"></path>
              </svg>
              <div style="font-size:10.5px; color:#D99A16; font-weight:700; margin-top:6px;">DETERMINISTIC MOCK</div>
            </div>

            <!-- AVAX -->
            <div class="card" style="padding:18px; margin-bottom:0; cursor:pointer;" onclick="location.hash='#/app/markets/assets/AVAX'">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
                <span style="font-size:16px; font-weight:800; color:var(--content-primary);">AVAX</span>
                <span style="background:var(--negative-bg); color:var(--negative); font-size:11px; font-weight:700; padding:2px 6px; border-radius:3px;">-2.30%</span>
              </div>
              <div style="font-size:11px; color:var(--content-tertiary);">Avalanche Simulation</div>
              <div style="font-size:18px; font-weight:800; color:var(--content-primary); margin:8px 0 6px; font-family:var(--cv-font-mono);">₹2,840.00</div>
              <svg width="100%" height="28" viewBox="0 0 100 28" fill="none">
                <path d="M0,8 Q35,14 65,18 T100,26" stroke="#ED5533" stroke-width="2" fill="none"></path>
              </svg>
              <div style="font-size:10.5px; color:#D99A16; font-weight:700; margin-top:6px;">DETERMINISTIC MOCK</div>
            </div>

          </div>

          <!-- Market Depth & Order Book Preview -->
          <div style="background:#FFFFFF; border:1px solid var(--border-primary); border-radius:6px; padding:20px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">
              <div>
                <span style="font-size:14px; font-weight:700; color:var(--content-primary);">BTC/INR Reference Market Depth</span>
                <span style="font-size:12px; color:var(--content-secondary); margin-left:12px;">Spread: ₹150.00 (0.0018%)</span>
              </div>
              <span style="font-size:11.5px; color:var(--accent-green); font-weight:600;">Live Feed Latency: 12ms</span>
            </div>
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:20px;">
              <div>
                <div style="font-size:11px; font-weight:700; color:var(--positive); margin-bottom:6px; text-transform:uppercase;">Top 3 Bids (Buy Orders)</div>
                <div style="display:flex; justify-content:space-between; font-size:12px; padding:4px 0; border-bottom:1px solid var(--border-subtle);">
                  <span style="font-family:var(--cv-font-mono); color:var(--positive);">₹82,45,000.00</span>
                  <span style="color:var(--content-secondary);">0.850 BTC (₹70.08L)</span>
                </div>
                <div style="display:flex; justify-content:space-between; font-size:12px; padding:4px 0; border-bottom:1px solid var(--border-subtle);">
                  <span style="font-family:var(--cv-font-mono); color:var(--positive);">₹82,44,800.00</span>
                  <span style="color:var(--content-secondary);">1.240 BTC (₹1.02 Cr)</span>
                </div>
                <div style="display:flex; justify-content:space-between; font-size:12px; padding:4px 0;">
                  <span style="font-family:var(--cv-font-mono); color:var(--positive);">₹82,44,500.00</span>
                  <span style="color:var(--content-secondary);">2.500 BTC (₹2.06 Cr)</span>
                </div>
              </div>
              <div>
                <div style="font-size:11px; font-weight:700; color:var(--negative); margin-bottom:6px; text-transform:uppercase;">Top 3 Asks (Sell Orders)</div>
                <div style="display:flex; justify-content:space-between; font-size:12px; padding:4px 0; border-bottom:1px solid var(--border-subtle);">
                  <span style="font-family:var(--cv-font-mono); color:var(--negative);">₹82,45,150.00</span>
                  <span style="color:var(--content-secondary);">0.620 BTC (₹51.12L)</span>
                </div>
                <div style="display:flex; justify-content:space-between; font-size:12px; padding:4px 0; border-bottom:1px solid var(--border-subtle);">
                  <span style="font-family:var(--cv-font-mono); color:var(--negative);">₹82,45,400.00</span>
                  <span style="color:var(--content-secondary);">1.100 BTC (₹90.70L)</span>
                </div>
                <div style="display:flex; justify-content:space-between; font-size:12px; padding:4px 0;">
                  <span style="font-family:var(--cv-font-mono); color:var(--negative);">₹82,45,800.00</span>
                  <span style="color:var(--content-secondary);">3.200 BTC (₹2.64 Cr)</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      <!-- ===================================================================
           7. SIMULATED TRADING SECTION
           =================================================================== -->
      <section style="padding:72px 32px; background:#FFFFFF; border-bottom:1px solid var(--border-primary);">
        <div style="max-width:1200px; margin:0 auto; display:grid; grid-template-columns:1fr 1fr; gap:48px; align-items:center;">
          <div>
            <span style="color:#D99A16; font-size:12px; font-weight:700; text-transform:uppercase; letter-spacing:0.8px;">SIMULATION WORKFLOW</span>
            <h2 style="font-size:var(--font-section-head, 36px); font-weight:800; letter-spacing:-0.8px; color:#171A21; margin:8px 0 16px;">
              Practice strategies.<br>Understand execution.
            </h2>
            <p style="font-size:15px; line-height:1.65; color:var(--content-secondary); margin-bottom:20px;">
              Explore simulated trading workflows, test strategies, and monitor virtual trading activity without executing real-money trades.
            </p>

            <!-- Important Disclosure Box -->
            <div style="background:#FFF8E6; border:1px solid rgba(217,154,22,0.3); border-left:4px solid #D99A16; border-radius:4px; padding:16px; margin-bottom:24px;">
              <div style="font-size:12.5px; font-weight:800; color:#B45309; margin-bottom:4px;">
                IMPORTANT: SIMULATED TRADING ONLY
              </div>
              <p style="font-size:12px; line-height:1.55; color:#92400E;">
                CryptoVista X Enterprise maintains no custody of real cryptocurrency and executes no real-money orders. All fills, fees (0.10%), and slippage (0.02%) are deterministic mathematical simulations.
              </p>
            </div>

            <div style="display:flex; gap:16px;">
              <a href="#/app/trading" class="btn btn-primary" style="padding:10px 22px; font-weight:700;">Launch Simulated Terminal</a>
              <a href="#/learning" class="btn btn-outline" style="padding:10px 20px; font-weight:600;">Execution Guides</a>
            </div>
          </div>

          <!-- Simulated Order Terminal Widget -->
          <div style="background:var(--background-secondary); border:1px solid var(--border-primary); border-radius:8px; padding:24px;">
            <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--border-primary); padding-bottom:12px; margin-bottom:16px;">
              <div style="font-weight:700; font-size:14px; color:var(--content-primary);">Simulated Order Execution Ticket</div>
              <span style="background:var(--accent-subtle); color:var(--accent-green); font-size:11px; font-weight:700; padding:2px 8px; border-radius:3px;">VA-88392</span>
            </div>
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:16px;">
              <div>
                <label style="font-size:11px; font-weight:700; color:var(--content-tertiary); display:block; margin-bottom:4px;">ORDER SIDE</label>
                <div style="display:flex; border:1px solid var(--border-primary); border-radius:4px; overflow:hidden;">
                  <button type="button" style="flex:1; padding:6px; background:var(--accent-green); color:#FFF; font-weight:700; font-size:12px; border:none;">BUY</button>
                  <button type="button" style="flex:1; padding:6px; background:#FFF; color:var(--content-secondary); font-weight:600; font-size:12px; border:none;">SELL</button>
                </div>
              </div>
              <div>
                <label style="font-size:11px; font-weight:700; color:var(--content-tertiary); display:block; margin-bottom:4px;">ORDER TYPE</label>
                <select style="width:100%; padding:6px; border:1px solid var(--border-primary); border-radius:4px; font-size:12px; background:#FFF;">
                  <option>Market Order</option>
                  <option>Limit Order</option>
                  <option>Stop-Loss</option>
                </select>
              </div>
            </div>
            <div style="margin-bottom:16px;">
              <label style="font-size:11px; font-weight:700; color:var(--content-tertiary); display:block; margin-bottom:4px;">QUANTITY (BTC)</label>
              <input type="text" value="0.25000000" readonly style="width:100%; padding:8px 12px; border:1px solid var(--border-primary); border-radius:4px; font-family:var(--cv-font-mono); font-size:13px; background:#FFF;">
            </div>
            <div style="background:#FFFFFF; border:1px solid var(--border-primary); border-radius:4px; padding:12px; font-size:12px; margin-bottom:16px;">
              <div style="display:flex; justify-content:space-between; margin-bottom:4px;">
                <span style="color:var(--content-secondary);">Estimated Reference Value:</span>
                <span style="font-weight:700; font-family:var(--cv-font-mono);">₹20,61,275.00</span>
              </div>
              <div style="display:flex; justify-content:space-between; margin-bottom:4px;">
                <span style="color:var(--content-secondary);">Simulated Platform Fee (0.10%):</span>
                <span style="font-family:var(--cv-font-mono);">₹206.13</span>
              </div>
              <div style="display:flex; justify-content:space-between;">
                <span style="color:var(--content-secondary);">Simulated Slippage (0.02%):</span>
                <span style="font-family:var(--cv-font-mono);">₹41.22</span>
              </div>
            </div>
            <a href="#/app/trading" class="btn btn-primary" style="width:100%; text-align:center; padding:10px; font-weight:700; border-radius:4px;">
              Place Simulated Order &rarr;
            </a>
          </div>
        </div>
      </section>

      <!-- ===================================================================
           8. PORTFOLIO ANALYTICS SECTION
           =================================================================== -->
      <section style="padding:72px 32px; background:var(--background-secondary); border-bottom:1px solid var(--border-primary);">
        <div style="max-width:1200px; margin:0 auto;">
          <div style="text-align:center; margin-bottom:48px;">
            <span style="color:var(--accent-green); font-size:12px; font-weight:700; text-transform:uppercase; letter-spacing:0.8px;">PORTFOLIO VALUATION</span>
            <h2 style="font-size:var(--font-section-head, 36px); font-weight:800; letter-spacing:-0.8px; color:#171A21; margin-top:6px;">
              Understand every part of your portfolio.
            </h2>
            <p style="font-size:15px; color:var(--content-secondary); max-width:640px; margin:8px auto 0;">
              FIFO cost basis accounting, concentration breakdown, and unrealized versus realized P&L reconciliation.
            </p>
          </div>

          <div style="display:grid; grid-template-columns:1fr 1fr; gap:24px;">
            <!-- Holdings & FIFO Table -->
            <div style="background:#FFFFFF; border:1px solid var(--border-primary); border-radius:6px; padding:24px;">
              <h4 style="font-size:15px; font-weight:700; margin-bottom:14px; color:var(--content-primary);">
                Holdings & FIFO Cost Basis Summary
              </h4>
              <table>
                <thead>
                  <tr>
                    <th>Asset</th>
                    <th>Holding</th>
                    <th>Avg Cost</th>
                    <th>Current Value</th>
                    <th>P&L</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>BTC</strong></td>
                    <td class="tabular-nums">1.0000</td>
                    <td class="tabular-nums">₹79,50,000</td>
                    <td class="tabular-nums">₹82,45,100</td>
                    <td><span style="color:var(--positive); font-weight:700;">+₹2,95,100</span></td>
                  </tr>
                  <tr>
                    <td><strong>ETH</strong></td>
                    <td class="tabular-nums">10.0000</td>
                    <td class="tabular-nums">₹3,02,000</td>
                    <td class="tabular-nums">₹29,84,500</td>
                    <td><span style="color:var(--negative); font-weight:700;">-₹35,500</span></td>
                  </tr>
                  <tr>
                    <td><strong>SOL</strong></td>
                    <td class="tabular-nums">100.0000</td>
                    <td class="tabular-nums">₹15,500</td>
                    <td class="tabular-nums">₹16,42,000</td>
                    <td><span style="color:var(--positive); font-weight:700;">+₹92,000</span></td>
                  </tr>
                  <tr>
                    <td><strong>CASH</strong></td>
                    <td class="tabular-nums">INR</td>
                    <td class="tabular-nums">—</td>
                    <td class="tabular-nums">₹9,71,275</td>
                    <td><span style="color:var(--content-secondary); font-weight:600;">Liquid</span></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Asset Allocation Breakdown -->
            <div style="background:#FFFFFF; border:1px solid var(--border-primary); border-radius:6px; padding:24px;">
              <h4 style="font-size:15px; font-weight:700; margin-bottom:14px; color:var(--content-primary);">
                Asset Allocation & Concentration Ratios
              </h4>
              <div style="display:flex; flex-direction:column; gap:16px;">
                <div>
                  <div style="display:flex; justify-content:space-between; font-size:12.5px; font-weight:600; margin-bottom:4px;">
                    <span>Bitcoin (BTC)</span>
                    <span>59.5% (₹82.45L)</span>
                  </div>
                  <div style="height:8px; background:var(--background-secondary); border-radius:4px; overflow:hidden;">
                    <div style="width:59.5%; height:100%; background:var(--accent-green);"></div>
                  </div>
                </div>
                <div>
                  <div style="display:flex; justify-content:space-between; font-size:12.5px; font-weight:600; margin-bottom:4px;">
                    <span>Ethereum (ETH)</span>
                    <span>21.6% (₹29.85L)</span>
                  </div>
                  <div style="height:8px; background:var(--background-secondary); border-radius:4px; overflow:hidden;">
                    <div style="width:21.6%; height:100%; background:var(--secondary-blue);"></div>
                  </div>
                </div>
                <div>
                  <div style="display:flex; justify-content:space-between; font-size:12.5px; font-weight:600; margin-bottom:4px;">
                    <span>Solana (SOL)</span>
                    <span>11.9% (₹16.42L)</span>
                  </div>
                  <div style="height:8px; background:var(--background-secondary); border-radius:4px; overflow:hidden;">
                    <div style="width:11.9%; height:100%; background:#FFB61B;"></div>
                  </div>
                </div>
                <div>
                  <div style="display:flex; justify-content:space-between; font-size:12.5px; font-weight:600; margin-bottom:4px;">
                    <span>Virtual Cash Reserves (INR)</span>
                    <span>7.0% (₹9.71L)</span>
                  </div>
                  <div style="height:8px; background:var(--background-secondary); border-radius:4px; overflow:hidden;">
                    <div style="width:7.0%; height:100%; background:var(--content-secondary);"></div>
                  </div>
                </div>
              </div>
              <div style="margin-top:20px; padding:12px; background:var(--accent-subtle); border-radius:4px; font-size:12px; color:var(--accent-green); font-weight:600;">
                ✓ Portfolio concentration limits compliant with Apex Institutional Risk Policy R-402.
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ===================================================================
           9. ENTERPRISE CRM & OPERATIONS SECTION (6 Core Pillars)
           =================================================================== -->
      <section style="padding:72px 32px; background:#FFFFFF; border-bottom:1px solid var(--border-primary);">
        <div style="max-width:1200px; margin:0 auto;">
          <div style="text-align:center; margin-bottom:52px;">
            <span style="color:var(--accent-green); font-size:12px; font-weight:700; text-transform:uppercase; letter-spacing:0.8px;">ENTERPRISE OPERATIONS</span>
            <h2 style="font-size:var(--font-section-head, 36px); font-weight:800; letter-spacing:-0.8px; color:#171A21; margin-top:6px;">
              Unify Client Relationships & Operations
            </h2>
            <p style="font-size:15px; color:var(--content-secondary); max-width:680px; margin:8px auto 0;">
              Connect customer relationships, sales operations, workflows, and business intelligence in one enterprise platform.
            </p>
          </div>

          <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:24px;">
            
            <div class="card" style="margin-bottom:0; padding:24px;">
              <div style="font-size:12px; font-weight:700; color:var(--accent-green); margin-bottom:6px;">PILLAR 1</div>
              <h4 style="font-size:17px; font-weight:700; margin-bottom:8px; color:var(--content-primary);">Customer 360</h4>
              <p style="font-size:13px; line-height:1.6; color:var(--content-secondary);">
                15-tab profile linking corporate contacts, trading accounts, contracts, compliance flags, and onboarding cases.
              </p>
              <a href="#/app/crm/customers" style="display:inline-block; font-size:12.5px; font-weight:700; margin-top:12px;">Customer Directory &rarr;</a>
            </div>

            <div class="card" style="margin-bottom:0; padding:24px;">
              <div style="font-size:12px; font-weight:700; color:var(--accent-green); margin-bottom:6px;">PILLAR 2</div>
              <h4 style="font-size:17px; font-weight:700; margin-bottom:8px; color:var(--content-primary);">Lead Qualification</h4>
              <p style="font-size:13px; line-height:1.6; color:var(--content-secondary);">
                Score incoming institutional inquiries, assign owners, and track lead conversion funnels systematically.
              </p>
              <a href="#/app/crm/leads" style="display:inline-block; font-size:12.5px; font-weight:700; margin-top:12px;">Manage Leads &rarr;</a>
            </div>

            <div class="card" style="margin-bottom:0; padding:24px;">
              <div style="font-size:12px; font-weight:700; color:var(--accent-green); margin-bottom:6px;">PILLAR 3</div>
              <h4 style="font-size:17px; font-weight:700; margin-bottom:8px; color:var(--content-primary);">Sales Pipeline</h4>
              <p style="font-size:13px; line-height:1.6; color:var(--content-secondary);">
                Track enterprise deal stages, probability-weighted revenue forecasts, and scheduled onboarding milestones.
              </p>
              <a href="#/app/crm/sales" style="display:inline-block; font-size:12.5px; font-weight:700; margin-top:12px;">View Pipeline &rarr;</a>
            </div>

            <div class="card" style="margin-bottom:0; padding:24px;">
              <div style="font-size:12px; font-weight:700; color:var(--accent-green); margin-bottom:6px;">PILLAR 4</div>
              <h4 style="font-size:17px; font-weight:700; margin-bottom:8px; color:var(--content-primary);">SLA Support Operations</h4>
              <p style="font-size:13px; line-height:1.6; color:var(--content-secondary);">
                Triage priority incidents, track minute-by-minute SLA countdown timers, and maintain confidential internal notes.
              </p>
              <a href="#/app/customer-operations/support" style="display:inline-block; font-size:12.5px; font-weight:700; margin-top:12px;">Support Desk &rarr;</a>
            </div>

            <div class="card" style="margin-bottom:0; padding:24px;">
              <div style="font-size:12px; font-weight:700; color:var(--accent-green); margin-bottom:6px;">PILLAR 5</div>
              <h4 style="font-size:17px; font-weight:700; margin-bottom:8px; color:var(--content-primary);">Dual Approvals</h4>
              <p style="font-size:13px; line-height:1.6; color:var(--content-secondary);">
                Enforce four-eyes governance requiring dual authorization before sensitive account or balance modifications take effect.
              </p>
              <a href="#/app/approvals" style="display:inline-block; font-size:12.5px; font-weight:700; margin-top:12px;">Review Approvals &rarr;</a>
            </div>

            <div class="card" style="margin-bottom:0; padding:24px;">
              <div style="font-size:12px; font-weight:700; color:var(--accent-green); margin-bottom:6px;">PILLAR 6</div>
              <h4 style="font-size:17px; font-weight:700; margin-bottom:8px; color:var(--content-primary);">Business Analytics</h4>
              <p style="font-size:13px; line-height:1.6; color:var(--content-secondary);">
                Comprehensive operational dashboards, SLA compliance audits, conversion velocities, and customer health telemetry.
              </p>
              <a href="#/app/analytics" style="display:inline-block; font-size:12.5px; font-weight:700; margin-top:12px;">Analytics Hub &rarr;</a>
            </div>

          </div>
        </div>
      </section>

      <!-- ===================================================================
           10. UNIFIED WORKSPACE ARCHITECTURAL DIAGRAM
           =================================================================== -->
      <section style="padding:72px 32px; background:var(--background-secondary); border-bottom:1px solid var(--border-primary);">
        <div style="max-width:1120px; margin:0 auto; text-align:center;">
          <span style="color:var(--accent-green); font-size:12px; font-weight:700; text-transform:uppercase; letter-spacing:0.8px;">SYSTEM TOPOLOGY</span>
          <h2 style="font-size:var(--font-section-head, 36px); font-weight:800; letter-spacing:-0.8px; color:#171A21; margin:8px 0 16px;">
            One connected view of your operations.
          </h2>
          <p style="font-size:15px; color:var(--content-secondary); max-width:720px; margin:0 auto 40px;">
            No fragmented tools. Market data flows into the simulated execution engine, updates portfolio ledgers, and synchronizes with customer relationship telemetry.
          </p>

          <!-- Connected Architecture SVG Visualization -->
          <div style="background:#FFFFFF; border:1px solid var(--border-primary); border-radius:8px; padding:32px; box-shadow:0 4px 16px rgba(0,0,0,0.03);">
            <div style="display:grid; grid-template-columns:repeat(5, 1fr); gap:12px; position:relative; align-items:center;">
              
              <div style="background:var(--background-secondary); border:1px solid var(--border-primary); border-radius:6px; padding:16px;">
                <div style="font-size:11px; font-weight:700; color:var(--accent-green); margin-bottom:4px;">INPUT</div>
                <div style="font-size:14px; font-weight:800; color:var(--content-primary);">Market Quotes</div>
                <div style="font-size:11px; color:var(--content-secondary); margin-top:4px;">Groww & Mock Feeds</div>
              </div>

              <div style="font-size:20px; color:var(--accent-green); font-weight:800;">&rarr;</div>

              <div style="background:var(--background-secondary); border:1px solid var(--border-primary); border-radius:6px; padding:16px;">
                <div style="font-size:11px; font-weight:700; color:var(--accent-green); margin-bottom:4px;">ENGINE</div>
                <div style="font-size:14px; font-weight:800; color:var(--content-primary);">Simulated Orders</div>
                <div style="font-size:11px; color:var(--content-secondary); margin-top:4px;">0.02% Slippage Model</div>
              </div>

              <div style="font-size:20px; color:var(--accent-green); font-weight:800;">&rarr;</div>

              <div style="background:var(--background-secondary); border:1px solid var(--border-primary); border-radius:6px; padding:16px;">
                <div style="font-size:11px; font-weight:700; color:var(--accent-green); margin-bottom:4px;">LEDGER</div>
                <div style="font-size:14px; font-weight:800; color:var(--content-primary);">Portfolio & NAV</div>
                <div style="font-size:11px; color:var(--content-secondary); margin-top:4px;">FIFO Cost Accounting</div>
              </div>

            </div>

            <div style="margin:24px auto 0; padding-top:20px; border-top:1px dashed var(--border-primary); display:flex; justify-content:center; gap:36px; font-size:12.5px; color:var(--content-secondary);">
              <div>🔒 <strong>Single-Step Auth:</strong> Argon2id User ID & Password</div>
              <div>🏢 <strong>Multi-Tenant:</strong> Strict Row-Level Separation</div>
              <div>📜 <strong>Audit Trail:</strong> Immutable Event Log</div>
            </div>
          </div>
        </div>
      </section>

      <!-- ===================================================================
           11. THREE-DIMENSIONAL LEARNING CAROUSEL (14 Original Learning Cards)
           =================================================================== -->
      <section style="padding:72px 0; background:#FFFFFF; border-bottom:1px solid var(--border-primary); overflow:hidden;">
        <div style="max-width:1200px; margin:0 auto; padding:0 32px; text-align:center; margin-bottom:40px;">
          <span style="color:var(--accent-green); font-size:12px; font-weight:700; text-transform:uppercase; letter-spacing:0.8px;">CRYPTOVISTA LEARNING</span>
          <h2 style="font-size:var(--font-section-head, 36px); font-weight:800; letter-spacing:-0.8px; color:#171A21; margin:8px 0 12px;">
            Digital finance, made clearer. In every language.
          </h2>
          <p style="font-size:16px; color:var(--content-secondary); max-width:720px; margin:0 auto;">
            Explore digital asset concepts, portfolio fundamentals, simulated trading, and enterprise operations through visual learning.
          </p>
        </div>

        <!-- 3D Continuous Marquee Carousel Viewport -->
        <div class="carousel-viewport" id="learning-carousel-viewport" tabindex="0" aria-label="3D Learning Carousel">
          <div class="carousel-track" id="learning-carousel-track">
            
            <!-- Card 1 -->
            <a href="#/learning" class="learning-card">
              <div>
                <span class="learning-card-badge">MODULE 1</span>
                <h4 class="learning-card-title">Digital Asset Fundamentals</h4>
                <p class="learning-card-desc">Understanding cryptographic ledgers, decentralization, consensus, and digital scarcity.</p>
              </div>
              <div style="font-size:12px; font-weight:700; color:var(--accent-green);">Read Chapter &rarr;</div>
            </a>

            <!-- Card 2 -->
            <a href="#/learning" class="learning-card">
              <div>
                <span class="learning-card-badge">MODULE 2</span>
                <h4 class="learning-card-title">Bitcoin Explained</h4>
                <p class="learning-card-desc">Proof-of-work mechanics, halving cycles, hash rate security, and store of value economics.</p>
              </div>
              <div style="font-size:12px; font-weight:700; color:var(--accent-green);">Read Chapter &rarr;</div>
            </a>

            <!-- Card 3 -->
            <a href="#/learning" class="learning-card">
              <div>
                <span class="learning-card-badge">MODULE 3</span>
                <h4 class="learning-card-title">Ethereum and Blockchain</h4>
                <p class="learning-card-desc">Smart contracts, virtual machine execution, proof-of-stake validators, and gas dynamics.</p>
              </div>
              <div style="font-size:12px; font-weight:700; color:var(--accent-green);">Read Chapter &rarr;</div>
            </a>

            <!-- Card 4 -->
            <a href="#/learning" class="learning-card">
              <div>
                <span class="learning-card-badge">MODULE 4</span>
                <h4 class="learning-card-title">Understanding Asset Prices</h4>
                <p class="learning-card-desc">How order books, market depth, bid-ask spreads, and trading volume shape benchmark prices.</p>
              </div>
              <div style="font-size:12px; font-weight:700; color:var(--accent-green);">Read Chapter &rarr;</div>
            </a>

            <!-- Card 5 -->
            <a href="#/learning" class="learning-card">
              <div>
                <span class="learning-card-badge">MODULE 5</span>
                <h4 class="learning-card-title">Market Trends</h4>
                <p class="learning-card-desc">Identifying institutional liquidity cycles, market breadth, momentum indicators, and trendlines.</p>
              </div>
              <div style="font-size:12px; font-weight:700; color:var(--accent-green);">Read Chapter &rarr;</div>
            </a>

            <!-- Card 6 -->
            <a href="#/learning" class="learning-card">
              <div>
                <span class="learning-card-badge">MODULE 6</span>
                <h4 class="learning-card-title">Portfolio Diversification</h4>
                <p class="learning-card-desc">Risk balancing strategies, correlation coefficients, and institutional asset allocation rules.</p>
              </div>
              <div style="font-size:12px; font-weight:700; color:var(--accent-green);">Read Chapter &rarr;</div>
            </a>

            <!-- Card 7 -->
            <a href="#/learning" class="learning-card">
              <div>
                <span class="learning-card-badge">MODULE 7</span>
                <h4 class="learning-card-title">Portfolio Analytics</h4>
                <p class="learning-card-desc">Calculating Net Asset Value (NAV), FIFO cost basis accounting, and benchmark relative return.</p>
              </div>
              <div style="font-size:12px; font-weight:700; color:var(--accent-green);">Read Chapter &rarr;</div>
            </a>

            <!-- Card 8 -->
            <a href="#/learning" class="learning-card">
              <div>
                <span class="learning-card-badge">MODULE 8</span>
                <h4 class="learning-card-title">Understanding Risk</h4>
                <p class="learning-card-desc">Measuring volatility, drawdown, liquidity constraints, and systemic digital market exposure.</p>
              </div>
              <div style="font-size:12px; font-weight:700; color:var(--accent-green);">Read Chapter &rarr;</div>
            </a>

            <!-- Card 9 -->
            <a href="#/learning" class="learning-card">
              <div>
                <span class="learning-card-badge">MODULE 9</span>
                <h4 class="learning-card-title">Simulated Trading</h4>
                <p class="learning-card-desc">Practicing trade execution in a non-custodial sandbox with realistic slippage and virtual capital.</p>
              </div>
              <div style="font-size:12px; font-weight:700; color:var(--accent-green);">Read Chapter &rarr;</div>
            </a>

            <!-- Card 10 -->
            <a href="#/learning" class="learning-card">
              <div>
                <span class="learning-card-badge">MODULE 10</span>
                <h4 class="learning-card-title">Orders and Execution</h4>
                <p class="learning-card-desc">Market orders, limit pricing, stop triggers, and deterministic virtual ledger postings.</p>
              </div>
              <div style="font-size:12px; font-weight:700; color:var(--accent-green);">Read Chapter &rarr;</div>
            </a>

            <!-- Card 11 -->
            <a href="#/learning" class="learning-card">
              <div>
                <span class="learning-card-badge">MODULE 11</span>
                <h4 class="learning-card-title">Customer Relationship Mgmt</h4>
                <p class="learning-card-desc">Managing corporate accounts, onboarding lifecycles, and institutional contact records.</p>
              </div>
              <div style="font-size:12px; font-weight:700; color:var(--accent-green);">Read Chapter &rarr;</div>
            </a>

            <!-- Card 12 -->
            <a href="#/learning" class="learning-card">
              <div>
                <span class="learning-card-badge">MODULE 12</span>
                <h4 class="learning-card-title">Lead and Sales Management</h4>
                <p class="learning-card-desc">Institutional deal pipelines, qualification criteria, and recurring ARR forecasting.</p>
              </div>
              <div style="font-size:12px; font-weight:700; color:var(--accent-green);">Read Chapter &rarr;</div>
            </a>

            <!-- Card 13 -->
            <a href="#/learning" class="learning-card">
              <div>
                <span class="learning-card-badge">MODULE 13</span>
                <h4 class="learning-card-title">Business Analytics</h4>
                <p class="learning-card-desc">Operational reporting, SLA compliance analytics, and institutional audit trails.</p>
              </div>
              <div style="font-size:12px; font-weight:700; color:var(--accent-green);">Read Chapter &rarr;</div>
            </a>

            <!-- Card 14 -->
            <a href="#/learning" class="learning-card">
              <div>
                <span class="learning-card-badge">MODULE 14</span>
                <h4 class="learning-card-title">Security and Governance</h4>
                <p class="learning-card-desc">Dual authorization signoff, tenant isolation, single-step auth, and regulatory risk boundaries.</p>
              </div>
              <div style="font-size:12px; font-weight:700; color:var(--accent-green);">Read Chapter &rarr;</div>
            </a>

            <!-- Duplicate set for seamless continuous marquee loop -->
            <a href="#/learning" class="learning-card">
              <div>
                <span class="learning-card-badge">MODULE 1</span>
                <h4 class="learning-card-title">Digital Asset Fundamentals</h4>
                <p class="learning-card-desc">Understanding cryptographic ledgers, decentralization, consensus, and digital scarcity.</p>
              </div>
              <div style="font-size:12px; font-weight:700; color:var(--accent-green);">Read Chapter &rarr;</div>
            </a>
            <a href="#/learning" class="learning-card">
              <div>
                <span class="learning-card-badge">MODULE 2</span>
                <h4 class="learning-card-title">Bitcoin Explained</h4>
                <p class="learning-card-desc">Proof-of-work mechanics, halving cycles, hash rate security, and store of value economics.</p>
              </div>
              <div style="font-size:12px; font-weight:700; color:var(--accent-green);">Read Chapter &rarr;</div>
            </a>
            <a href="#/learning" class="learning-card">
              <div>
                <span class="learning-card-badge">MODULE 3</span>
                <h4 class="learning-card-title">Ethereum and Blockchain</h4>
                <p class="learning-card-desc">Smart contracts, virtual machine execution, proof-of-stake validators, and gas dynamics.</p>
              </div>
              <div style="font-size:12px; font-weight:700; color:var(--accent-green);">Read Chapter &rarr;</div>
            </a>

          </div>
        </div>

        <div style="text-align:center; margin-top:32px;">
          <a href="#/learning" class="btn btn-primary" style="padding:12px 28px; font-size:14px; font-weight:700; border-radius:4px;">
            Explore CryptoVista Learning
          </a>
        </div>
      </section>

      <!-- ===================================================================
           12. SECURITY & PLATFORM GOVERNANCE SECTION
           =================================================================== -->
      <section style="padding:72px 32px; background:var(--background-secondary); border-bottom:1px solid var(--border-primary);">
        <div style="max-width:1100px; margin:0 auto;">
          <div style="text-align:center; margin-bottom:48px;">
            <span style="color:var(--accent-green); font-size:12px; font-weight:700; text-transform:uppercase; letter-spacing:0.8px;">GOVERNANCE & TRUST</span>
            <h2 style="font-size:var(--font-section-head, 36px); font-weight:800; letter-spacing:-0.8px; color:#171A21; margin-top:6px;">
              Security & Platform Governance
            </h2>
            <p style="font-size:15px; color:var(--content-secondary); max-width:680px; margin:8px auto 0;">
              Built for enterprise defense: verifiable controls without cumbersome operational friction.
            </p>
          </div>

          <div style="display:grid; grid-template-columns:repeat(4, 1fr); gap:20px;">
            <div style="background:#FFFFFF; border:1px solid var(--border-primary); border-radius:6px; padding:22px;">
              <div style="font-size:24px; margin-bottom:12px;">🔑</div>
              <h4 style="font-size:16px; font-weight:700; margin-bottom:6px; color:var(--content-primary);">Single-Step Auth</h4>
              <p style="font-size:12.5px; line-height:1.55; color:var(--content-secondary);">
                Argon2id password hashing with strictly User ID and Password verification. Zero MFA or OTP overhead.
              </p>
            </div>
            <div style="background:#FFFFFF; border:1px solid var(--border-primary); border-radius:6px; padding:22px;">
              <div style="font-size:24px; margin-bottom:12px;">🏢</div>
              <h4 style="font-size:16px; font-weight:700; margin-bottom:6px; color:var(--content-primary);">Tenant Isolation</h4>
              <p style="font-size:12.5px; line-height:1.55; color:var(--content-secondary);">
                Every record is scoped to an authorized tenant identifier at the database query level to prevent cross-tenant leaks.
              </p>
            </div>
            <div style="background:#FFFFFF; border:1px solid var(--border-primary); border-radius:6px; padding:22px;">
              <div style="font-size:24px; margin-bottom:12px;">🛡️</div>
              <h4 style="font-size:16px; font-weight:700; margin-bottom:6px; color:var(--content-primary);">Dual Authorization</h4>
              <p style="font-size:12.5px; line-height:1.55; color:var(--content-secondary);">
                High-impact financial adjustments require independent four-eyes signoff before ledger commitment.
              </p>
            </div>
            <div style="background:#FFFFFF; border:1px solid var(--border-primary); border-radius:6px; padding:22px;">
              <div style="font-size:24px; margin-bottom:12px;">📜</div>
              <h4 style="font-size:16px; font-weight:700; margin-bottom:6px; color:var(--content-primary);">Zero Secret Leakage</h4>
              <p style="font-size:12.5px; line-height:1.55; color:var(--content-secondary);">
                All API keys, secrets, and customer notes undergo automatic runtime redaction across logging pipelines.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- ===================================================================
           13. TAILORED USE CASES SECTION (5 Financial Teams)
           =================================================================== -->
      <section style="padding:72px 32px; background:#FFFFFF; border-bottom:1px solid var(--border-primary);">
        <div style="max-width:1200px; margin:0 auto;">
          <div style="text-align:center; margin-bottom:48px;">
            <span style="color:var(--accent-green); font-size:12px; font-weight:700; text-transform:uppercase; letter-spacing:0.8px;">TAILORED EXPERIENCES</span>
            <h2 style="font-size:var(--font-section-head, 36px); font-weight:800; letter-spacing:-0.8px; color:#171A21; margin-top:6px;">
              Engineered for Modern Financial Teams
            </h2>
          </div>

          <div style="display:grid; grid-template-columns:repeat(5, 1fr); gap:16px;">
            <div class="card" style="margin-bottom:0; padding:20px;">
              <h4 style="font-size:15px; font-weight:700; margin-bottom:8px; color:var(--content-primary);">Market Research</h4>
              <p style="font-size:12px; line-height:1.55; color:var(--content-secondary); margin-bottom:12px;">
                Inspect continuous digital asset telemetry and comparative benchmark analytics.
              </p>
              <a href="#/app/markets" style="font-size:12px; font-weight:700;">Explore &rarr;</a>
            </div>
            <div class="card" style="margin-bottom:0; padding:20px;">
              <h4 style="font-size:15px; font-weight:700; margin-bottom:8px; color:var(--content-primary);">Portfolio Teams</h4>
              <p style="font-size:12px; line-height:1.55; color:var(--content-secondary); margin-bottom:12px;">
                Reconcile FIFO valuation lots, cash distributions, and concentration ratios.
              </p>
              <a href="#/app/portfolio" style="font-size:12px; font-weight:700;">Explore &rarr;</a>
            </div>
            <div class="card" style="margin-bottom:0; padding:20px;">
              <h4 style="font-size:15px; font-weight:700; margin-bottom:8px; color:var(--content-primary);">Sales & BD</h4>
              <p style="font-size:12px; line-height:1.55; color:var(--content-secondary); margin-bottom:12px;">
                Track institutional opportunities, deal stages, and onboarding milestones.
              </p>
              <a href="#/app/crm/sales" style="font-size:12px; font-weight:700;">Explore &rarr;</a>
            </div>
            <div class="card" style="margin-bottom:0; padding:20px;">
              <h4 style="font-size:15px; font-weight:700; margin-bottom:8px; color:var(--content-primary);">Operations</h4>
              <p style="font-size:12px; line-height:1.55; color:var(--content-secondary); margin-bottom:12px;">
                Triage SLA-sensitive incidents and maintain physical note segregation.
              </p>
              <a href="#/app/customer-operations/support" style="font-size:12px; font-weight:700;">Explore &rarr;</a>
            </div>
            <div class="card" style="margin-bottom:0; padding:20px;">
              <h4 style="font-size:15px; font-weight:700; margin-bottom:8px; color:var(--content-primary);">Enterprise Admins</h4>
              <p style="font-size:12px; line-height:1.55; color:var(--content-secondary); margin-bottom:12px;">
                Configure tenant parameters, review dual authorizations, and audit logs.
              </p>
              <a href="#/app/admin" style="font-size:12px; font-weight:700;">Explore &rarr;</a>
            </div>
          </div>
        </div>
      </section>

      <!-- ===================================================================
           14. REQUEST A DEMO SECTION (Functional Interactive Form)
           =================================================================== -->
      <section id="demo-form-section" style="padding:80px 32px; background:var(--background-secondary); border-bottom:1px solid var(--border-primary);">
        <div style="max-width:840px; margin:0 auto;">
          <div style="text-align:center; margin-bottom:40px;">
            <span style="color:var(--accent-green); font-size:12px; font-weight:700; text-transform:uppercase; letter-spacing:0.8px;">SCHEDULE A WALKTHROUGH</span>
            <h2 style="font-size:var(--font-section-head, 36px); font-weight:800; letter-spacing:-0.8px; color:#171A21; margin:8px 0 12px;">
              See how CryptoVista connects your business.
            </h2>
            <p style="font-size:15px; color:var(--content-secondary); max-width:620px; margin:0 auto;">
              Discover how market intelligence, portfolio analytics, simulated trading, and enterprise operations can work together.
            </p>
          </div>

          <div style="background:#FFFFFF; border:1px solid var(--border-primary); border-radius:8px; padding:36px; box-shadow:0 8px 24px rgba(0,0,0,0.04);">
            <div id="demo-form-alert" style="display:none; padding:14px; border-radius:4px; margin-bottom:20px; font-size:13px;"></div>

            <form id="crypto-demo-form">
              <div style="display:grid; grid-template-columns:1fr 1fr; gap:18px; margin-bottom:18px;">
                <div>
                  <label style="display:block; font-size:12px; font-weight:700; color:var(--content-primary); margin-bottom:6px;">Full Name *</label>
                  <input type="text" id="demo-fullName" required placeholder="e.g. Anand Verma" style="width:100%; padding:10px 14px; border:1px solid var(--border-primary); border-radius:4px; font-size:13.5px; outline:none;">
                </div>
                <div>
                  <label style="display:block; font-size:12px; font-weight:700; color:var(--content-primary); margin-bottom:6px;">Business Email *</label>
                  <input type="email" id="demo-email" required placeholder="anand@apexcapital.in" style="width:100%; padding:10px 14px; border:1px solid var(--border-primary); border-radius:4px; font-size:13.5px; outline:none;">
                </div>
              </div>

              <div style="display:grid; grid-template-columns:1fr 1fr; gap:18px; margin-bottom:18px;">
                <div>
                  <label style="display:block; font-size:12px; font-weight:700; color:var(--content-primary); margin-bottom:6px;">Company / Institution *</label>
                  <input type="text" id="demo-company" required placeholder="Apex Capital Advisors" style="width:100%; padding:10px 14px; border:1px solid var(--border-primary); border-radius:4px; font-size:13.5px; outline:none;">
                </div>
                <div>
                  <label style="display:block; font-size:12px; font-weight:700; color:var(--content-primary); margin-bottom:6px;">Job Title</label>
                  <input type="text" id="demo-jobTitle" placeholder="Chief Investment Officer" style="width:100%; padding:10px 14px; border:1px solid var(--border-primary); border-radius:4px; font-size:13.5px; outline:none;">
                </div>
              </div>

              <div style="margin-bottom:18px;">
                <label style="display:block; font-size:12px; font-weight:700; color:var(--content-primary); margin-bottom:6px;">Primary Area of Interest</label>
                <select id="demo-interest" style="width:100%; padding:10px 14px; border:1px solid var(--border-primary); border-radius:4px; font-size:13.5px; background:#FFF; outline:none;">
                  <option value="Complete Unified Platform">Complete Unified Platform</option>
                  <option value="Market Intelligence & Telemetry">Market Intelligence & Telemetry</option>
                  <option value="Simulated Trading Terminal">Simulated Trading Terminal</option>
                  <option value="Portfolio Analytics & FIFO Accounting">Portfolio Analytics & FIFO Accounting</option>
                  <option value="Enterprise CRM & SLA Support">Enterprise CRM & SLA Support</option>
                </select>
              </div>

              <div style="margin-bottom:24px;">
                <label style="display:block; font-size:12px; font-weight:700; color:var(--content-primary); margin-bottom:6px;">Message / Operational Requirements</label>
                <textarea id="demo-message" rows="3" placeholder="Tell us about your team size, expected virtual trading volumes, and operational workflows..." style="width:100%; padding:10px 14px; border:1px solid var(--border-primary); border-radius:4px; font-size:13.5px; outline:none; resize:vertical;"></textarea>
              </div>

              <button type="submit" id="demo-submit-btn" class="btn btn-primary" style="width:100%; padding:14px; font-size:15px; font-weight:700; border-radius:4px;">
                Request Institutional Demo &rarr;
              </button>
            </form>
          </div>
        </div>
      </section>

      <!-- ===================================================================
           15. SEARCHABLE FAQ ACCORDION (12 Questions)
           =================================================================== -->
      <section style="padding:72px 32px; background:#FFFFFF; border-bottom:1px solid var(--border-primary);">
        <div style="max-width:880px; margin:0 auto;">
          <div style="text-align:center; margin-bottom:36px;">
            <span style="color:var(--accent-green); font-size:12px; font-weight:700; text-transform:uppercase; letter-spacing:0.8px;">FREQUENTLY ASKED QUESTIONS</span>
            <h2 style="font-size:var(--font-section-head, 36px); font-weight:800; letter-spacing:-0.8px; color:#171A21; margin:8px 0 12px;">
              Frequently Asked Questions
            </h2>
            <!-- Searchable FAQ Filter -->
            <div style="margin:20px auto 0; max-width:480px;">
              <input type="text" id="faq-search-filter" placeholder="Search questions (e.g. simulated trading, auth, crm)..." style="width:100%; padding:10px 16px; border:1px solid var(--border-primary); border-radius:9999px; font-size:13px; outline:none;">
            </div>
          </div>

          <div id="faq-accordion-list">
            
            <div class="faq-accordion-item open">
              <button class="faq-accordion-header" type="button">
                <span>1. What is CryptoVista X Enterprise?</span>
                <span class="faq-accordion-icon">▼</span>
              </button>
              <div class="faq-accordion-body">
                CryptoVista X Enterprise is a unified financial intelligence and enterprise operations workstation. It connects real-time digital asset intelligence, simulated trading, FIFO portfolio valuation, and enterprise CRM with support operations into one single connected web application.
              </div>
            </div>

            <div class="faq-accordion-item">
              <button class="faq-accordion-header" type="button">
                <span>2. What does Market Intelligence provide?</span>
                <span class="faq-accordion-icon">▼</span>
              </button>
              <div class="faq-accordion-body">
                Market Intelligence provides continuous asset price discovery, 24-hour gainers and losers, volume depth, and technical sparklines. Benchmark prices are referenced from Groww telemetry, while synthetic assets use a deterministic mock engine clearly labeled for users.
              </div>
            </div>

            <div class="faq-accordion-item">
              <button class="faq-accordion-header" type="button">
                <span>3. Does CryptoVista execute real trades?</span>
                <span class="faq-accordion-icon">▼</span>
              </button>
              <div class="faq-accordion-body">
                No. CryptoVista X Enterprise does not execute real financial transactions. It is strictly a simulated trading and enterprise management workspace for education, analytical research, and risk modeling.
              </div>
            </div>

            <div class="faq-accordion-item">
              <button class="faq-accordion-header" type="button">
                <span>4. What is simulated trading?</span>
                <span class="faq-accordion-icon">▼</span>
              </button>
              <div class="faq-accordion-body">
                Simulated trading enables operators and analysts to practice market, limit, and stop orders using virtual currency balances. It calculates realistic slippage (0.02%) and simulated fees (0.10%) settled to an append-only virtual double-entry ledger without real capital risk.
              </div>
            </div>

            <div class="faq-accordion-item">
              <button class="faq-accordion-header" type="button">
                <span>5. Can I monitor multiple digital assets?</span>
                <span class="faq-accordion-icon">▼</span>
              </button>
              <div class="faq-accordion-body">
                Yes. The platform provides comprehensive monitoring across major benchmark assets (BTC, ETH) and alternative simulated tokens (SOL, MATIC, AVAX) with customizable watchlists and live market depth indicators.
              </div>
            </div>

            <div class="faq-accordion-item">
              <button class="faq-accordion-header" type="button">
                <span>6. What portfolio analytics are available?</span>
                <span class="faq-accordion-icon">▼</span>
              </button>
              <div class="faq-accordion-body">
                The portfolio module computes total Net Asset Value (NAV), FIFO cost basis accounting per buy lot, unrealized versus realized profit and loss, and asset concentration percentages with institutional policy alerts.
              </div>
            </div>

            <div class="faq-accordion-item">
              <button class="faq-accordion-header" type="button">
                <span>7. Does CryptoVista include CRM?</span>
                <span class="faq-accordion-icon">▼</span>
              </button>
              <div class="faq-accordion-body">
                Yes. The application features an institutional CRM with a consolidated Customer 360 profile covering 15 functional facets including corporate accounts, primary contacts, deal pipelines, onboarding tasks, and support history.
              </div>
            </div>

            <div class="faq-accordion-item">
              <button class="faq-accordion-header" type="button">
                <span>8. Can enterprise teams manage workflows and approvals?</span>
                <span class="faq-accordion-icon">▼</span>
              </button>
              <div class="faq-accordion-body">
                Yes. CryptoVista includes automated workflow progression and dual approvals requiring four-eyes authorization before sensitive actions—such as customer limit adjustments or ledger reconciliations—are executed.
              </div>
            </div>

            <div class="faq-accordion-item">
              <button class="faq-accordion-header" type="button">
                <span>9. Where does market data come from?</span>
                <span class="faq-accordion-icon">▼</span>
              </button>
              <div class="faq-accordion-body">
                Market data is supplied through a hybrid architecture: reference quotes are mapped from public benchmark telemetry, while additional demonstration assets utilize internal deterministic feeds. Every quote badge clearly indicates its exact source.
              </div>
            </div>

            <div class="faq-accordion-item">
              <button class="faq-accordion-header" type="button">
                <span>10. Is market data always live?</span>
                <span class="faq-accordion-icon">▼</span>
              </button>
              <div class="faq-accordion-body">
                Reference data is refreshed periodically and may experience normal network delays. If a data stream is interrupted, the platform automatically presents an explicit delayed or mock data banner to preserve operational transparency.
              </div>
            </div>

            <div class="faq-accordion-item">
              <button class="faq-accordion-header" type="button">
                <span>11. How does CryptoVista protect account access?</span>
                <span class="faq-accordion-icon">▼</span>
              </button>
              <div class="faq-accordion-body">
                Account authentication uses Argon2id password hashing with single-step User ID and Password verification (strictly zero MFA/OTP friction). All database queries enforce tenant isolation, and audit trails redact all sensitive secrets.
              </div>
            </div>

            <div class="faq-accordion-item">
              <button class="faq-accordion-header" type="button">
                <span>12. How can an organization request a demo?</span>
                <span class="faq-accordion-icon">▼</span>
              </button>
              <div class="faq-accordion-body">
                Organizations can submit the Request a Demo form directly on this page or email enterprise@cryptovista.in. Our solutions engineering team will provision a tailored multi-tenant sandbox within 24 hours.
              </div>
            </div>

          </div>
        </div>
      </section>

      <!-- ===================================================================
           16. COMPLETE FOOTER (Groww-inspired Institutional Structure)
           =================================================================== -->
      <footer style="background:#FFFFFF; border-top:1px solid var(--border-primary); padding:64px 32px 32px; font-size:13px; color:var(--content-secondary);">
        <div style="max-width:1200px; margin:0 auto; display:grid; grid-template-columns:2.2fr 1fr 1fr 1fr 1fr; gap:36px; margin-bottom:48px;">
          
          <!-- Column 1: Brand & Contact -->
          <div>
            <div style="display:flex; align-items:center; gap:10px; margin-bottom:14px;">
              <div style="width:30px; height:30px; background:var(--accent-green); border-radius:4px; display:flex; align-items:center; justify-content:center; color:#FFF; font-weight:800; font-size:15px;">
                CV
              </div>
              <span style="font-size:17px; font-weight:800; color:var(--content-primary);">CryptoVista X Enterprise</span>
            </div>
            <p style="font-size:12.5px; line-height:1.65; color:var(--content-secondary); max-width:320px; margin-bottom:16px;">
              CryptoVista X Enterprise brings digital asset intelligence, portfolio analytics, simulated trading, and enterprise operations together in one connected platform.
            </p>
            <div style="font-size:11.5px; color:var(--content-tertiary); line-height:1.6;">
              Apex Financial Technologies Pvt Ltd<br>
              Cyber Gateway, HITEC City, Hyderabad, TG 500081<br>
              Inquiries: contact@cryptovista.in • Support: ops@cryptovista.in
            </div>
          </div>

          <!-- Column 2: Company -->
          <div>
            <div style="font-size:12px; font-weight:700; color:var(--content-primary); text-transform:uppercase; letter-spacing:0.6px; margin-bottom:14px;">Company</div>
            <div style="display:flex; flex-direction:column; gap:9px;">
              <a href="#/about" style="color:inherit;">About CryptoVista</a>
              <a href="#/product" style="color:inherit;">Platform Architecture</a>
              <a href="#/features" style="color:inherit;">Feature Catalog</a>
              <a href="#/security" style="color:inherit;">Security & Governance</a>
              <a href="#/contact" style="color:inherit;">Contact Sales</a>
              <a href="#demo-form-section" style="color:inherit;">Request Demo</a>
            </div>
          </div>

          <!-- Column 3: Product -->
          <div>
            <div style="font-size:12px; font-weight:700; color:var(--content-primary); text-transform:uppercase; letter-spacing:0.6px; margin-bottom:14px;">Product</div>
            <div style="display:flex; flex-direction:column; gap:9px;">
              <a href="#/app/markets" style="color:inherit;">Market Intelligence</a>
              <a href="#/app/markets" style="color:inherit;">Asset Explorer</a>
              <a href="#/app/trading" style="color:inherit;">Simulated Trading</a>
              <a href="#/app/portfolio" style="color:inherit;">Portfolio Valuation</a>
              <a href="#/app/crm/customers" style="color:inherit;">Customer 360 CRM</a>
              <a href="#/app/customer-operations/support" style="color:inherit;">Support & SLA Desk</a>
            </div>
          </div>

          <!-- Column 4: Enterprise & Resources -->
          <div>
            <div style="font-size:12px; font-weight:700; color:var(--content-primary); text-transform:uppercase; letter-spacing:0.6px; margin-bottom:14px;">Enterprise</div>
            <div style="display:flex; flex-direction:column; gap:9px;">
              <a href="#/app/enterprise" style="color:inherit;">Enterprise Workspace</a>
              <a href="#/app/approvals" style="color:inherit;">Dual Approvals</a>
              <a href="#/app/analytics" style="color:inherit;">Business Analytics</a>
              <a href="#/learning" style="color:inherit;">Learning Center</a>
              <a href="#/faq" style="color:inherit;">FAQ Knowledge Base</a>
              <a href="#/app/dashboard" style="color:inherit;">Workstation Login</a>
            </div>
          </div>

          <!-- Column 5: Legal & Policy -->
          <div>
            <div style="font-size:12px; font-weight:700; color:var(--content-primary); text-transform:uppercase; letter-spacing:0.6px; margin-bottom:14px;">Legal & Security</div>
            <div style="display:flex; flex-direction:column; gap:9px;">
              <a href="#/privacy" style="color:inherit;">Privacy Policy</a>
              <a href="#/terms" style="color:inherit;">Terms of Service</a>
              <a href="#/terms" style="color:inherit;">Risk Disclosures</a>
              <a href="#/terms" style="color:inherit;">Simulated Trading Terms</a>
              <a href="#/security" style="color:inherit;">Data Usage Standards</a>
            </div>
          </div>

        </div>

        <!-- ===================================================================
             17. FINANCIAL DISCLOSURES & USER AWARENESS (Sections A through H)
             =================================================================== -->
        <div style="max-width:1200px; margin:0 auto; padding-top:36px; border-top:1px solid var(--border-primary); font-size:11.5px; line-height:1.7; color:var(--content-tertiary);">
          
          <div style="margin-bottom:18px;">
            <strong style="color:var(--content-primary);">A. Platform Overview:</strong> CryptoVista X Enterprise is a digital asset intelligence and enterprise operations software suite providing market discovery, portfolio accounting, simulated trading, and customer relationship management.
          </div>

          <div style="margin-bottom:18px; background:var(--background-secondary); border:1px solid var(--border-primary); border-left:3px solid #D99A16; padding:12px; border-radius:4px;">
            <strong style="color:#B45309;">B. IMPORTANT: SIMULATED TRADING ONLY:</strong> CryptoVista X Enterprise provides simulated trading functionality for educational, analytical, and demonstration purposes. Orders submitted through the platform are simulated and do not execute on real financial markets. Virtual balances, simulated fills, estimated fees, and displayed profit or loss are not actual financial transactions or guaranteed investment outcomes. CryptoVista does not provide real-money trading, brokerage execution, custody of digital assets, deposits, withdrawals, or exchange settlement through the simulated trading functionality. Historical market data, simulated results, and hypothetical performance may differ materially from actual market conditions and execution outcomes.
          </div>

          <div style="margin-bottom:14px;">
            <strong style="color:var(--content-primary);">C. Digital Asset Risk Disclosure:</strong> Digital assets exhibit high market volatility, potential liquidity fragmentation, technology and network protocol risks, and evolving regulatory boundaries. The platform is intended to help operators model scenarios without financial loss.
          </div>

          <div style="margin-bottom:14px;">
            <strong style="color:var(--content-primary);">D. Secure Platform Operations:</strong> All platform accounts authenticate using Argon2id single-step password verification without MFA/OTP friction. Multi-tenant database constraints and immutable audit logs ensure isolation.
          </div>

          <div style="margin-bottom:14px;">
            <strong style="color:var(--content-primary);">E. Investor & User Awareness:</strong> Users should evaluate information independently, understand the distinction between simulated and live trading, verify data freshness, protect login credentials, and avoid relying exclusively on automated indicators.
          </div>

          <div style="margin-bottom:14px;">
            <strong style="color:var(--content-primary);">F. Market Data Disclaimer:</strong> Digital asset reference quotes are derived from Groww reference data or deterministic demonstration models. Market data may be delayed due to network conditions. Demonstrations are never represented as live order books.
          </div>

          <div style="margin-bottom:14px;">
            <strong style="color:var(--content-primary);">G. Legal Disclaimer:</strong> The information and analytical tools provided through CryptoVista X Enterprise are intended for informational, educational, analytical, and enterprise operational purposes. Nothing on the platform should be interpreted as personalized investment advice, a recommendation to purchase or sell a financial instrument, or an offer of regulated financial services.
          </div>

          <div>
            <strong style="color:var(--content-primary);">H. Regulatory & Corporate Information:</strong> CryptoVista X Enterprise is engineered by Apex Financial Technologies Pvt Ltd. No brokerage, depository, or portfolio management registrations are claimed.
          </div>

        </div>

        <!-- Copyright Line -->
        <div style="max-width:1200px; margin:28px auto 0; padding-top:20px; border-top:1px solid var(--border-primary); display:flex; justify-content:space-between; align-items:center; font-size:12px; color:var(--content-tertiary); flex-wrap:wrap; gap:12px;">
          <div>&copy; ${currentYear} CryptoVista X Enterprise. All rights reserved.</div>
          <div>Pure Node.js Web Architecture &bull; 0 HTML Files on Disk &bull; Non-Custodial Simulation</div>
        </div>
      </footer>

      <!-- ===================================================================
           18. IMPORTANT USER NOTICE TICKER (90-second Continuous Marquee)
           =================================================================== -->
      <aside class="footer_tickerWrap__ERqAU" aria-label="Important notices marquee">
        <div class="footer_foot21ticker__b3iJJ">
          <span class="ticker-item"><span class="ticker-item-dot"></span> <strong>NOTICE:</strong> Simulated trading does not execute real financial transactions.</span>
          <span class="ticker-item"><span class="ticker-item-dot"></span> Virtual balances and simulated profit or loss are not actual investment returns.</span>
          <span class="ticker-item"><span class="ticker-item-dot"></span> Market data may be delayed or unavailable due to external telemetry feeds.</span>
          <span class="ticker-item"><span class="ticker-item-dot"></span> Historical performance does not guarantee future market outcomes.</span>
          <span class="ticker-item"><span class="ticker-item-dot"></span> Protect your account credentials; CryptoVista will never request your password.</span>
          <span class="ticker-item"><span class="ticker-item-dot"></span> Analytical indicators and technical curves are not guaranteed trading signals.</span>
          <!-- Duplicate ticker items for continuous marquee -->
          <span class="ticker-item"><span class="ticker-item-dot"></span> <strong>NOTICE:</strong> Simulated trading does not execute real financial transactions.</span>
          <span class="ticker-item"><span class="ticker-item-dot"></span> Virtual balances and simulated profit or loss are not actual investment returns.</span>
          <span class="ticker-item"><span class="ticker-item-dot"></span> Market data may be delayed or unavailable due to external telemetry feeds.</span>
          <span class="ticker-item"><span class="ticker-item-dot"></span> Historical performance does not guarantee future market outcomes.</span>
        </div>
      </aside>

    </div>
  `;
}

/**
 * Initializes Interactive Handlers for the Landing Page:
 * - Mega dropdown hover & click toggles
 * - Ctrl+K Global Search Dialog & debounced search
 * - Working Demo Request Form submission to /api/v1/public/demo-requests
 * - Interactive FAQ search filter & accordion expansion
 */
export function initLandingPageListeners() {
  // 1. Mega Dropdown Navigation Interaction
  const navItems = document.querySelectorAll('.mega-nav-item');
  navItems.forEach(item => {
    const trigger = item.querySelector('.mega-trigger-btn');
    const panel = item.querySelector('.mega-dropdown-panel');
    if (!trigger || !panel) return;

    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = panel.classList.contains('open');
      document.querySelectorAll('.mega-dropdown-panel.open').forEach(p => p.classList.remove('open'));
      if (!isOpen) {
        panel.classList.add('open');
        trigger.setAttribute('aria-expanded', 'true');
      } else {
        trigger.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // Close dropdowns on outside click
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.mega-nav-item')) {
      document.querySelectorAll('.mega-dropdown-panel.open').forEach(p => p.classList.remove('open'));
      document.querySelectorAll('.mega-trigger-btn').forEach(b => b.setAttribute('aria-expanded', 'false'));
    }
  });

  // 2. Global Search Dialog (Ctrl+K)
  const searchModal = document.getElementById('global-search-modal');
  const searchInput = document.getElementById('global-search-input');
  const searchClose = document.getElementById('search-modal-close');
  const searchTrigger = document.getElementById('search-trigger-btn');
  const searchResults = document.getElementById('search-results-container');

  const openSearch = () => {
    if (searchModal) {
      searchModal.style.display = 'flex';
      if (searchInput) {
        searchInput.value = '';
        searchInput.focus();
      }
    }
  };

  const closeSearch = () => {
    if (searchModal) searchModal.style.display = 'none';
  };

  if (searchTrigger) searchTrigger.addEventListener('click', openSearch);
  if (searchClose) searchClose.addEventListener('click', closeSearch);

  if (searchModal) {
    searchModal.addEventListener('click', (e) => {
      if (e.target === searchModal) closeSearch();
    });
  }

  // Keyboard shortcut listener for Ctrl+K / Cmd+K and Escape
  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      openSearch();
    }
    if (e.key === 'Escape') {
      closeSearch();
      document.querySelectorAll('.mega-dropdown-panel.open').forEach(p => p.classList.remove('open'));
    }
  });

  // Debounced Search Query Handler
  let debounceTimer = null;
  if (searchInput && searchResults) {
    searchInput.addEventListener('input', (e) => {
      clearTimeout(debounceTimer);
      const query = e.target.value.trim();
      if (!query) {
        searchResults.innerHTML = `
          <div style="padding:24px; text-align:center; color:var(--content-secondary); font-size:13px;">
            Type a search term above or try <a href="#/app/markets/assets/BTC" style="font-weight:600;">BTC</a>, <a href="#/app/trading" style="font-weight:600;">Trading Terminal</a>, or <a href="#/learning" style="font-weight:600;">Learning Center</a>.
          </div>
        `;
        return;
      }

      debounceTimer = setTimeout(async () => {
        searchResults.innerHTML = `
          <div style="padding:20px; text-align:center; color:var(--content-secondary); font-size:13px;">
            Searching platform registry...
          </div>
        `;

        try {
          const res = await fetch(`/api/v1/public/search?q=${encodeURIComponent(query)}`);
          const data = await res.json();
          let html = '';

          if (data.assets && data.assets.length > 0) {
            html += `<div class="search-modal-category">Digital Assets</div>`;
            data.assets.forEach(item => {
              html += `
                <a href="${item.href}" class="search-modal-item" onclick="document.getElementById('global-search-modal').style.display='none'">
                  <div>
                    <div style="font-weight:700; font-size:13.5px; color:var(--content-primary);">${item.title}</div>
                    <div style="font-size:12px; color:var(--content-secondary);">${item.subtitle}</div>
                  </div>
                  <span style="font-size:10.5px; font-weight:700; padding:2px 6px; border-radius:3px; background:var(--accent-subtle); color:var(--accent-green);">${item.badge}</span>
                </a>
              `;
            });
          }

          if (data.features && data.features.length > 0) {
            html += `<div class="search-modal-category">Platform Features</div>`;
            data.features.forEach(item => {
              html += `
                <a href="${item.href}" class="search-modal-item" onclick="document.getElementById('global-search-modal').style.display='none'">
                  <div>
                    <div style="font-weight:700; font-size:13.5px; color:var(--content-primary);">${item.title}</div>
                    <div style="font-size:12px; color:var(--content-secondary);">${item.subtitle}</div>
                  </div>
                  <span style="font-size:11px; color:var(--accent-green); font-weight:700;">Open &rarr;</span>
                </a>
              `;
            });
          }

          if (data.resources && data.resources.length > 0) {
            html += `<div class="search-modal-category">Learning & Documentation</div>`;
            data.resources.forEach(item => {
              html += `
                <a href="${item.href}" class="search-modal-item" onclick="document.getElementById('global-search-modal').style.display='none'">
                  <div>
                    <div style="font-weight:700; font-size:13.5px; color:var(--content-primary);">${item.title}</div>
                    <div style="font-size:12px; color:var(--content-secondary);">${item.subtitle}</div>
                  </div>
                  <span style="font-size:11px; color:var(--content-secondary);">Resource</span>
                </a>
              `;
            });
          }

          if (!html) {
            html = `
              <div style="padding:24px; text-align:center; color:var(--content-secondary); font-size:13px;">
                No results found for "${query}". Try searching for BTC, ETH, trading, crm, or security.
              </div>
            `;
          }

          searchResults.innerHTML = html;
        } catch (err) {
          searchResults.innerHTML = `
            <div style="padding:20px; text-align:center; color:var(--negative); font-size:13px;">
              Error retrieving search results.
            </div>
          `;
        }
      }, 200);
    });
  }

  // 3. Demo Request Form Submission to /api/v1/public/demo-requests
  const demoForm = document.getElementById('crypto-demo-form');
  const demoAlert = document.getElementById('demo-form-alert');
  const demoBtn = document.getElementById('demo-submit-btn');

  if (demoForm) {
    demoForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const fullName = document.getElementById('demo-fullName').value.trim();
      const email = document.getElementById('demo-email').value.trim();
      const company = document.getElementById('demo-company').value.trim();
      const jobTitle = document.getElementById('demo-jobTitle').value.trim();
      const interest = document.getElementById('demo-interest').value;
      const message = document.getElementById('demo-message').value.trim();

      if (!fullName || !email || !company) {
        if (demoAlert) {
          demoAlert.style.display = 'block';
          demoAlert.style.background = '#FEF2F2';
          demoAlert.style.color = '#B91C1C';
          demoAlert.style.border = '1px solid #FCA5A5';
          demoAlert.innerText = 'Please complete all required fields (Full Name, Business Email, and Company).';
        }
        return;
      }

      if (demoBtn) {
        demoBtn.disabled = true;
        demoBtn.innerText = 'Submitting Request...';
      }

      try {
        const response = await fetch('/api/v1/public/demo-requests', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ fullName, email, company, jobTitle, interest, message })
        });

        const resData = await response.json();

        if (response.ok && resData.success) {
          if (demoAlert) {
            demoAlert.style.display = 'block';
            demoAlert.style.background = 'var(--accent-subtle)';
            demoAlert.style.color = 'var(--accent-green)';
            demoAlert.style.border = '1px solid var(--accent-border)';
            demoAlert.innerHTML = `
              <strong>✓ Demo Request Registered Successfully!</strong><br>
              Reference ID: <strong>${resData.requestId}</strong>. Our enterprise solutions team will contact you at <strong>${email}</strong> within 24 hours.
            `;
          }
          demoForm.reset();
        } else {
          throw new Error(resData.error || 'Failed to submit demo request.');
        }
      } catch (err) {
        if (demoAlert) {
          demoAlert.style.display = 'block';
          demoAlert.style.background = '#FEF2F2';
          demoAlert.style.color = '#B91C1C';
          demoAlert.style.border = '1px solid #FCA5A5';
          demoAlert.innerText = 'Submission error: ' + err.message;
        }
      } finally {
        if (demoBtn) {
          demoBtn.disabled = false;
          demoBtn.innerText = 'Request Institutional Demo →';
        }
      }
    });
  }

  // 4. FAQ Accordion Interaction & Live Search Filter
  const faqItems = document.querySelectorAll('.faq-accordion-item');
  faqItems.forEach(item => {
    const header = item.querySelector('.faq-accordion-header');
    if (!header) return;
    header.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      faqItems.forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  const faqFilter = document.getElementById('faq-search-filter');
  if (faqFilter) {
    faqFilter.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      faqItems.forEach(item => {
        const text = item.textContent.toLowerCase();
        if (text.includes(q)) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  }

  // 5. Interactive 3D Parallax & Perspective Tilt on Hero Preview
  const heroComposition = document.getElementById('hero-preview-composition');
  const heroVector = document.getElementById('hero-vector-layer');

  if (heroComposition) {
    heroComposition.addEventListener('mousemove', (e) => {
      const rect = heroComposition.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -5; // Max 5 deg tilt
      const rotateY = ((x - centerX) / centerX) * 5;  // Max 5 deg tilt

      heroComposition.style.transform = `perspective(1200px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`;
      if (heroVector) {
        heroVector.style.transform = `translate3d(${((x - centerX) * 0.03).toFixed(1)}px, ${((y - centerY) * 0.03).toFixed(1)}px, 15px)`;
      }
    });

    heroComposition.addEventListener('mouseleave', () => {
      heroComposition.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg)';
      if (heroVector) {
        heroVector.style.transform = 'translate3d(0px, 0px, 0px)';
      }
    });
  }

  // 6. Live Real-Time Simulated Ticker & Telemetry Pulse
  if (window._cvHeroTickerInterval) {
    clearInterval(window._cvHeroTickerInterval);
  }

  const btcPriceEl = document.getElementById('hero-live-btc-price');
  const btcChangeEl = document.getElementById('hero-live-btc-change');
  const heroNavEl = document.getElementById('hero-live-nav-val');
  const kpiNavEl = document.getElementById('hero-kpi-nav');
  const orderQuoteEl = document.getElementById('hero-live-order-quote');

  let basePrice = 8245100;
  let baseNav = 13842875;

  window._cvHeroTickerInterval = setInterval(() => {
    if (!document.getElementById('hero-live-btc-price')) {
      clearInterval(window._cvHeroTickerInterval);
      return;
    }

    const deltaPrice = (Math.random() - 0.46) * 1400;
    basePrice = Math.max(8210000, Math.min(8325000, basePrice + deltaPrice));
    const deltaNav = (deltaPrice * 0.25) + ((Math.random() - 0.42) * 600);
    baseNav = Math.max(13810000, baseNav + deltaNav);

    const formattedPrice = '₹' + Math.round(basePrice).toLocaleString('en-IN');
    const formattedNav = '₹' + Math.round(baseNav).toLocaleString('en-IN') + '.00';
    const pctChange = ((basePrice - 8048000) / 8048000 * 100).toFixed(2);

    if (btcPriceEl) {
      btcPriceEl.textContent = formattedPrice;
      btcPriceEl.style.backgroundColor = deltaPrice >= 0 ? 'rgba(4, 180, 136, 0.2)' : 'rgba(237, 85, 51, 0.15)';
      setTimeout(() => { if (btcPriceEl) btcPriceEl.style.backgroundColor = 'transparent'; }, 600);
    }

    if (btcChangeEl) {
      btcChangeEl.textContent = `${pctChange >= 0 ? '+' : ''}${pctChange}% ${pctChange >= 0 ? '▲' : '▼'}`;
      btcChangeEl.style.color = pctChange >= 0 ? 'var(--positive)' : 'var(--negative)';
    }

    if (heroNavEl) {
      heroNavEl.textContent = formattedNav;
      heroNavEl.style.backgroundColor = 'rgba(4, 180, 136, 0.15)';
      setTimeout(() => { if (heroNavEl) heroNavEl.style.backgroundColor = 'transparent'; }, 600);
    }

    if (kpiNavEl) {
      kpiNavEl.textContent = formattedNav;
      kpiNavEl.style.backgroundColor = 'rgba(4, 180, 136, 0.15)';
      setTimeout(() => { if (kpiNavEl) kpiNavEl.style.backgroundColor = 'transparent'; }, 600);
    }

    if (orderQuoteEl) {
      orderQuoteEl.textContent = `BUY 0.25 BTC @ ${formattedPrice}.00`;
      orderQuoteEl.style.backgroundColor = 'rgba(4, 180, 136, 0.12)';
      setTimeout(() => { if (orderQuoteEl) orderQuoteEl.style.backgroundColor = 'transparent'; }, 600);
    }
  }, 2200);
}
