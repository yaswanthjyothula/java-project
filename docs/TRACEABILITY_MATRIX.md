# CryptoVista X Enterprise - Traceability Matrix

**Document Version:** 4.1 (SRS v1.0 Baseline Alignment)  
**Date:** 2026-11-06  
**Status:** Living Document  
**Scope:** Complete lifecycle mapping from SRS v1.0 Functional Requirements to Implementation Artifacts and Verification Evidence.

---

## 1. Traceability Summary by Domain

| Domain | SRS Section | Total Requirements | Implemented / Verified | Status |
|---|---|---|---|---|
| **Public Website** | SRS §4.1 (WEB-001..013) | 13 | 13 Verified | 100% Complete |
| **Authentication & Identity** | SRS §4.2 (AUTH-001..014) | 14 | 14 Implemented / Tested | Core Engine Active |
| **Tenant Management** | SRS §4.3 (TEN-001..010) | 10 | 10 Implemented | Enforced |
| **Authorization & RBAC** | SRS §4.4 (IAM-001..009) | 9 | 9 Implemented | Active |
| **Customer & Contacts** | SRS §4.5 (CRM-CUS-*, CRM-ACC-*, CRM-CON-*) | 12 | 12 Implemented | Active |
| **Leads & Sales Pipeline** | SRS §4.6 (CRM-LEAD-*, CRM-OPP-*, CRM-ACT-*) | 14 | 14 Implemented | Active |
| **Onboarding & Success** | SRS §4.7 (CS-ONB-*, CS-SUC-*) | 9 | 9 Implemented | Active |
| **Support & SLA** | SRS §4.8 (SUP-001..011) | 11 | 11 Implemented | Active |
| **Market Intelligence** | SRS §4.13 (MKT-001..010) | 10 | 10 Implemented | Active |
| **Simulated Trading** | SRS §4.14 (TRD-001..015) | 15 | 15 Implemented / Tested | Verified Invariants |
| **Portfolio Intelligence**| SRS §4.15 (PORT-001..012) | 12 | 12 Implemented | Active |
| **Audit & Security** | SRS §4.18 (AUD-001..007) | 7 | 7 Implemented | Enforced |

---

## 2. Public Website Requirements (SRS §4.1: WEB-001..013)

| Req ID | Requirement Statement | Implementation Artifact | Verification Evidence | Status |
|---|---|---|---|---|
| **WEB-001** | Display brand, product positioning, and primary navigation | `web/index.html#header`, `logo.svg` | Verified via `test_website.py` | Verified |
| **WEB-002** | Explain Market Intelligence, Trading, Portfolio, and CRM | `web/index.html#discovery` | Verified via `test_website.py` | Verified |
| **WEB-003** | Product preview using labeled sample or authorized data | `web/index.html#hero` preview window | Verified via `test_website.py` | Verified |
| **WEB-004** | Disclose simulated nature of trading (no real crypto held) | `web/index.html#trading`, `#footer` | Truthful disclosure check | Verified |
| **WEB-005** | Navigation links lead to valid sections or routes | `web/index.html` anchor tags | Nav link click audit | Verified |
| **WEB-006** | Request Demo action opens validated enquiry form | `web/js/modal.js#handleDemoSubmit` | Form modal test | Verified |
| **WEB-007** | Enquiry form collects only necessary contact details | `web/index.html#demo-modal` | Field schema inspection | Verified |
| **WEB-008** | FAQ section with accessible expand/collapse behavior | `web/js/faq.js`, `web/index.html#faq` | 10 questions accordion test | Verified |
| **WEB-009** | Product, security, contact, and legal footer navigation | `web/index.html#footer` | Footer link audit | Verified |
| **WEB-010** | Adapt to desktop, tablet, and mobile viewports | `web/css/responsive.css` | Media query audit | Verified |
| **WEB-011** | Meet basic accessibility (keyboard, focus, contrast) | `web/css/base.css`, `web/js/main.js` | WCAG contrast & focus check | Verified |
| **WEB-012** | Prohibit fabricated metrics, testimonials, or fake badges | `web/index.html#roles` | Negative content check | Verified |
| **WEB-013** | Zero direct MySQL database connections from website | `web/` static architecture | Architecture audit | Verified |

---

## 3. Identity, Tenancy & Security (SRS §4.2–4.4: AUTH, TEN, IAM)

| Req ID | Requirement Statement | Implementation Artifact | Verification Evidence | Status |
|---|---|---|---|---|
| **AUTH-001** | Authenticate via account identifier and password | `sql/V1__init_schema.sql`, `AuthService` | Database schema & service | Implemented |
| **AUTH-002** | Store passwords using Argon2id or BCrypt | `pom.xml` (`jbcrypt`), `sql/` | Security specification | Implemented |
| **AUTH-003** | Require TOTP MFA according to tenant security policy | `TotpService.java` | `SimulationAndSecurityTest` | Verified |
| **AUTH-006** | Rate-limit authentication and MFA replay | `TotpService.java#usedTokens` | Replay suppression test | Verified |
| **AUTH-008** | Sessions expire and support revocation | `sql/V1__init_schema.sql` (`sessions`) | Schema check | Implemented |
| **TEN-001** | Shared MySQL 8 database with tenant discriminator | `sql/V1__init_schema.sql` (`tenant_id`) | Schema foreign key audit | Implemented |
| **TEN-003** | Tenant context derived from authenticated membership | `TenantContext.java` | ThreadLocal isolation test | Verified |
| **TEN-004** | Service queries enforce tenant scope for reads/writes | `TenantContext.java`, SQL DDL | Compound key check | Implemented |
| **IAM-001** | Support Role-Based Access Control (RBAC) | `docs/ROLE_PERMISSION_MATRIX.md` | Permission matrix | Implemented |
| **IAM-003** | Permissions checked by trusted service for operations | Swing Shell & Backend services | Service boundary rule | Implemented |

---

## 4. CRM & Enterprise Operations (SRS §4.5–4.8: CRM-*, CS-*, SUP-*)

| Req ID | Requirement Statement | Implementation Artifact | Verification Evidence | Status |
|---|---|---|---|---|
| **CRM-CUS-001** | Create, view, update, and archive customer records | `sql/V1__init_schema.sql`, `Customer360Panel` | UI & DB schema | Implemented |
| **CRM-CUS-005** | Customer search, filtering, and pagination | `Customer360Panel.java` | Swing Table filtering | Implemented |
| **CRM-LEAD-005** | Lead conversion into customer and opportunity | `Customer360Panel.java` pipeline view | Workflow mapping | Implemented |
| **CRM-OPP-001** | Sales pipeline with stage-gated opportunities | `sql/V1__init_schema.sql`, `Customer360Panel` | Opportunity table check | Implemented |
| **CS-ONB-001** | Onboarding cases and synthetic KYC dossiers | `Customer360Panel.java` onboarding tab | UI detail inspection | Implemented |
| **SUP-001** | Support ticket creation, queues, and assignment | `sql/V1__init_schema.sql`, `SupportTicketsPanel` | Ticket queue inspection | Implemented |
| **SUP-004** | Internal notes strictly segregated from customer msgs | `SupportTicketsPanel.java`, `ticket_internal_notes`| Separate table & panel | Implemented |
| **SUP-006** | SLA deadline calculation and escalation countdown | `SupportTicketsPanel.java` SLA clock | SLA indicator check | Implemented |

---

## 5. Simulated Trading & Portfolio (SRS §4.14–4.15: TRD-*, PORT-*)

| Req ID | Requirement Statement | Implementation Artifact | Verification Evidence | Status |
|---|---|---|---|---|
| **TRD-001** | Virtual trading accounts with simulated balances | `sql/V1__init_schema.sql`, `TradingPanel` | Virtual account model | Implemented |
| **TRD-003** | Support market and limit orders | `TradingPanel.java`, `TradingSimulationEngine` | Engine order execution | Implemented |
| **TRD-010** | Order submission uses idempotency key | `TradingSimulationEngine.java` | Idempotency test | Verified |
| **TRD-011** | Order, fill, fee, and ledger postings transactionally consistent | `TradingSimulationEngine.java` | Balanced journal test | Verified |
| **TRD-012** | Prevent available simulated balance from becoming negative | `TradingSimulationEngine.java` | Negative balance guard test| Verified |
| **TRD-015** | Every trading screen discloses simulation only | `TradingPanel.java`, `DisclosurePanel.java` | Visible disclosure check | Verified |
| **PORT-001** | Display total simulated NAV and cash balances | `PortfolioPanel.java` KPI row | Financial label check | Implemented |
| **PORT-004** | Calculate realized and unrealized P&L | `FinancialMath.java`, `PortfolioPanel` | Math precision check | Verified |
| **PORT-009** | Reconcile portfolio totals to ledger balances | `TradingSimulationEngine.java` | Double-entry journal test | Verified |

---

## 6. Audit & Non-Functional Requirements (SRS §4.18, §5)

| Req ID | Requirement Statement | Implementation Artifact | Verification Evidence | Status |
|---|---|---|---|---|
| **AUD-001** | Immutable audit log of material business actions | `sql/V1__init_schema.sql` (`audit_log`) | Schema audit check | Implemented |
| **AUD-007** | Logs exclude passwords, MFA codes, and secrets | `SecurityAdminPanel.java`, `AuditService` | Redaction rule check | Verified |
| **NFR-PERF-004**| Service operations do not freeze Swing EDT | `CryptoVistaApp.java`, `SwingUtilities` | EDT thread discipline | Implemented |
| **DATA-001** | Strict `BigDecimal` arithmetic for all financial math | `FinancialMath.java` | Precision test | Verified |
