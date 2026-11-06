# CryptoVista X Enterprise — Implementation Roadmap

**Document Version:** 4.1  
**Execution Mode:** Autonomous Continuous Engineering Loop  

---

## Roadmap Phases & Work Breakdown Structure

### Phase 1: Repository Audit & Architecture Foundation
- [x] Audit workspace, compilers, and dependencies.
- [x] Verify Java 21 LTS runtime (`Eclipse Adoptium OpenJDK 21`).
- [x] Align Maven configuration (`pom.xml`) with modular layout.

### Phase 2: Brand Identity, Design System & Desktop Shell
- [x] Vector branding assets (`logo.svg`, `logo-mark.svg`, `favicon.svg`).
- [x] CSS design tokens (`tokens.css`, `base.css`, `components.css`).
- [x] Java Swing theme constants (`ThemeConstants.java`) with Groww-inspired `#00B386` primary palette.
- [x] Desktop application shell (`MainFrame`, `NavigationSidebar`, `TopBar`).

### Phase 3: Public Landing Page & Web Workstation
- [x] 14-section Groww-inspired public portal (`web/index.html`).
- [x] Truthful simulation and reference data disclosures.
- [x] Interactive simulated order calculator and accessible FAQ.
- [x] Interactive web dashboard workstation (`web/dashboard.html`).

### Phase 4: Database Migrations & Multi-Tenant Schema
- [x] Baseline MySQL 8 schema (`sql/V1__init_schema.sql`).
- [x] Comprehensive 39-table enterprise DDL (`sql/V2__complete_enterprise_erd.sql`).
- [x] Strict tenant isolation via `tenant_id` and composite keys.

### Phase 5: Authentication: User ID and Password Only (Refactoring)
- [ ] Remove all MFA / TOTP / OTP code, fields, and dependencies.
- [ ] Implement backend `AuthService` with BCrypt hashing, rate limiting, and account lockout.
- [ ] Build desktop `LoginDialog` (User ID, Password, Show/Hide Password, Forgot Password, Error display).
- [ ] Refactor web workstation login modal to single-step User ID + Password.

### Phase 6: Multi-Tenant Authorization & Session Management
- [ ] Session tokens with cryptographic SHA-256 storage and revocation.
- [ ] Backend `TenantContext` resolution from validated user memberships.
- [ ] Role-Based Access Control (RBAC) permission checks.

### Phase 7–10: Enterprise CRM, Operations & Customer 360
- [ ] Split in-memory stores into dedicated, cleanly separated repositories (`InMemoryCustomerRepository`, `InMemoryLeadRepository`, etc.).
- [ ] Lead scoring and atomic transactional conversion to Customer 360 + initial Opportunity.
- [ ] Support tickets with SLA resolution timers, automated escalations, and isolated internal notes (`SUP-004`).
- [ ] Workflow dual-authorization engine.

### Phase 11–13: Market Intelligence, Simulated Trading & Portfolio Engine
- [ ] Hybrid market data feeds and deterministic mock generator clearly labeled.
- [ ] Order preview, parameter validation, simulation engine with slippage and fees.
- [ ] Balanced double-entry financial ledger postings (debit == credit).
- [ ] Real-time portfolio NAV valuation and FIFO cost basis.

### Phase 14–15: Reporting, Analytics & Administration
- [ ] Real-time persisted data aggregation for dashboards and CSV exports.
- [ ] Audit logging with automated credential/secret redaction.

### Phase 16–17: Automated Testing, Packaging & Deployment
- [ ] Comprehensive JUnit 5 and Python test harnesses.
- [ ] Compile Java 21 bytecode with Adoptium JDK 21 compiler.
- [ ] Package production JAR `cryptovista-x.jar`.

