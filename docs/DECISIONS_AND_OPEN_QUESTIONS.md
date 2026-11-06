# Architecture Decisions and Open Questions (SRS v1.0 Alignment)

**Project:** CryptoVista X Enterprise  
**Document Version:** 4.1  
**Date:** 2026-11-06  
**Reference:** SRS v1.0 Section 15 (DEC-001 through DEC-020)

---

## 1. Architectural Decision Records (ADRs)

### ADR-001 (DEC-001): Web Presentation Architecture
* **Status:** Accepted
* **Context:** The public marketing website must achieve Groww-level speed, accessibility, clean typography, and responsive presentation while remaining strictly separated from MySQL and the internal Java Swing desktop client.
* **Decision:** Implement the public website in `web/` using semantic HTML5, CSS3 custom properties matching the brand design tokens (`web/css/tokens.css`, `web/css/components.css`, `web/css/layout.css`), and modular vanilla ES6 JavaScript (`web/js/`).
* **Consequences:** Near-zero page weight, sub-second first paint, 100% accessible, zero direct database connectivity risk.

### ADR-002 (DEC-002 & DEC-004): Java Desktop Client Architecture
* **Status:** Accepted
* **Context:** The prompt mandates Java 21 and Swing/AWT for the enterprise desktop client, reflecting the identical design tokens and visual calm as the public website.
* **Decision:** Build a modular Swing client using an MVC/MVP pattern. The UI utilizes a custom `ThemeConstants` palette and clean rectangular border painters (2-4px radius), with strict background execution via `SwingWorker` or `AsyncWorker` to ensure the Event Dispatch Thread (EDT) is never blocked.
* **Consequences:** Native desktop responsiveness, complete UI consistency between web marketing preview and desktop reality, zero freezing during I/O.

### ADR-003 (DEC-011): Multi-Tenant Data Isolation Strategy
* **Status:** Accepted
* **Context:** CryptoVista X Enterprise is a multi-tenant enterprise system on a shared MySQL 8 database.
* **Decision:** Enforce multi-tenancy at the service and repository boundary via a thread-local `TenantContext`. All tenant-owned tables include a non-nullable `tenant_id` column. Every SQL `PreparedStatement` explicitly binds `tenant_id = ?` in `WHERE` clauses and inserts. Composite unique constraints include `tenant_id`.
* **Consequences:** High database operational efficiency on a single shared instance; deterministic defense against cross-tenant data leakage.

### ADR-004 (DEC-012 & DEC-013): Password and Authentication Security
* **Status:** Accepted
* **Context:** Enterprise authentication requires robust credentials and MFA.
* **Decision:** Use Argon2id (or BCrypt with cost factor 12) for password hashing. Implement RFC 6238 Time-based One-Time Passwords (TOTP) for MFA with AES-GCM encrypted secrets at rest, clock drift tolerance (+/- 1 step), and single-use hashed backup recovery codes.
* **Consequences:** Protection against credential stuffing and brute-force GPU attacks; high enterprise compliance readiness.

### ADR-005 (DEC-007, DEC-008, DEC-009, DEC-010): Financial Calculation and Simulation Engine
* **Status:** Accepted
* **Context:** Simulated trading balances, order fills, fees, and P&L must be mathematically sound without IEEE 754 floating-point errors.
* **Decision:** All financial values are modeled strictly as `java.math.BigDecimal` with explicit scale (2 decimal places for INR, 8 for crypto, 4 for fees) and `RoundingMode.HALF_UP`. Mutations to virtual cash or asset balances generate balanced double-entry ledger journal entries. Cost-basis method uses FIFO / Weighted Average Cost.
* **Consequences:** Total balance reconcilability; zero floating-point rounding discrepancies.

---

## 2. SRS v1.0 Section 15 Open Decisions Matrix (DEC-001 .. DEC-020)

| Decision ID | Area | Recommended Baseline / Resolution | Status |
|---|---|---|---|
| **DEC-001** | Exact web framework | Semantic HTML5, CSS3 Tokens, Vanilla ES6 modules in `web/`. | Resolved |
| **DEC-002** | Desktop-to-service API transport | HTTPS REST API over TLS; desktop client never accesses MySQL directly. | Resolved |
| **DEC-003** | Service hosting model | Trusted centralized service container for multi-tenant deployment. | Baseline |
| **DEC-004** | Supported operating systems | Windows 10/11 initially; cross-platform Java 21 desktop client. | Baseline |
| **DEC-005** | Market-data provider | Hybrid adapter: CoinGecko public reference endpoint + deterministic mock adapter. | Resolved |
| **DEC-006** | Supported quote currencies | Indian Rupee (INR) baseline (`₹`); configurable additional fiat anchors. | Resolved |
| **DEC-007** | Fee schedule | Simulated 0.10% (10 bps) maker/taker fee modeled in `TradingSimulationEngine`. | Resolved |
| **DEC-008** | Slippage model | Deterministic configurable slippage in test mode. | Resolved |
| **DEC-009** | Cost-basis method | FIFO (First-In-First-Out) with Weighted Average Cost fallback. | Resolved |
| **DEC-010** | Financial precision & rounding | `BigDecimal` with 2 decimal places for INR, 8 for BTC, `HALF_UP`. | Resolved |
| **DEC-011** | Tenant creation policy | Admin-governed tenant provisioning with explicit `tenant_id`. | Resolved |
| **DEC-012** | Password & session policy | BCrypt / Argon2id, 30-min inactivity timeout, instant session revocation. | Resolved |
| **DEC-013** | MFA enforcement | Mandatory RFC 6238 TOTP for all interactive enterprise users. | Resolved |
| **DEC-014** | File storage & scanning | Private tenant-scoped storage references; non-guessable paths. | Baseline |
| **DEC-015** | Email provider | Mock delivery logging; no external emails dispatched until SMTP/SES configured. | Resolved |
| **DEC-016** | Data retention & deletion | Draft retention guidelines; immutable audit logs preserved. | Review |
| **DEC-017** | Backup & recovery objectives | Daily snapshot backup and point-in-time journal recovery. | Baseline |
| **DEC-018** | Demo enquiry handling | In-memory verification queue and audit logging. | Resolved |
| **DEC-019** | Performance profile | Sub-2s list queries, sub-3s dashboard rendering, zero EDT freezes. | Baseline |
| **DEC-020** | Legal text & disclosures | Prominent non-custodial simulation disclosures; draft terms disclaimer. | Resolved |
