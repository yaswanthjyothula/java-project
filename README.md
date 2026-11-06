# CryptoVista X Enterprise

**"Digital asset intelligence. Enterprise operations. One connected platform."**

CryptoVista X Enterprise is a unified enterprise desktop platform combining digital asset market intelligence, simulated trading execution, portfolio analytics, and customer relationship operations into a single desktop workstation.

The user interface is built with **Java 21 Swing** following the visual clarity, calm aesthetic, and clean rectangular geometry inspired by Groww (`#00B386` primary, neutral grey surfaces, zero emojis, zero purple gradients).

---

## 1. Product Capabilities & Modules

1. **Enterprise Dashboard (Module A):** Consolidated KPIs (Pipeline Value, SLA Performance, Active Accounts, Open Escalations, Recent Activities).
2. **Market Intelligence (Module B):** Real-time & deterministic reference pricing for top digital assets (BTC, ETH, SOL, MATIC, AVAX, LINK) with 24h volume, gainers/losers, and explicit mock label disclosures.
3. **Simulated Trading (Module C):** Risk-free virtual trading engine with market & limit orders, fee & slippage modeling, and balanced double-entry financial ledger accounting. Zero real money, zero custodial risk.
4. **Portfolio Intelligence (Module D):** Real-time NAV valuation, FIFO acquisition cost basis, realized/unrealized P&L, and asset allocation breakdown.
5. **Enterprise CRM & Customer 360 (Module E):** Full Customer 360 view, contact directory, lead scoring, and transactional atomic conversion to Customer + Deal + Contact.
6. **Customer Operations & Support (Module F):** Multi-tier ticket queues, SLA response and resolution timers, automated escalations, and strict segregation of confidential operator notes (`SUP-004`).
7. **Enterprise Operations (Module G):** Workflow approval engine with multi-tier dual authorization for commercial exceptions and discounts.
8. **Reporting & Analytics (Module H):** Persisted business metrics and data export capabilities.
9. **Administration & Security (Module I):** User management, Role-Based Access Control (RBAC), and immutable audit logging with secret redaction.

---

## 2. Technology Stack & Architecture

| Layer | Technology | Details |
| :--- | :--- | :--- |
| **Desktop Client** | Java 21 LTS (Swing / AWT) | Pure desktop workstation with `CardLayout` routing, `ThemeConstants`, custom `RectangularButton` components, and non-blocking background workers. |
| **Authentication** | User ID & Password ONLY | Pure credential authentication with BCrypt / salted cryptographic hashing, rate limiting (10 attempts/min), account lockout (after 5 failed attempts), session token issuance, and password recovery. **Zero MFA / Zero OTP.** |
| **Business Logic** | Application Services & Domain | `AuthService`, `CrmService`, `TicketService`, `WorkflowService`, `TradingSimulationEngine`, `PortfolioService`, `FinancialMath`. |
| **Persistence** | MySQL 8.0+ (InnoDB) / JDBC | Shared multi-tenant database with strict `tenant_id VARCHAR(64)` discriminator column isolation across all 39 relational tables. |
| **Testing** | JUnit 5 & Python Harness | Automated unit, domain, security, and schema audit suites. |

---

## 3. Quick Start & Execution

### 3.1 Launching the Desktop Application

The standalone desktop executable is pre-packaged in the root directory: [`cryptovista-x.jar`](file:///c:/Users/narsi/Downloads/java-project/cryptovista-x.jar).

Run using **Java 21 LTS**:
```powershell
& "C:\Program Files\Eclipse Adoptium\jdk-21.0.13.9-hotspot\bin\java.exe" -jar cryptovista-x.jar
```

*(Or simply `java -jar cryptovista-x.jar` if Java 21 is in your system PATH)*

#### Default Demonstration Credentials
- **User ID / Email:** `operator@apexcapital.in`
- **Password:** `password123`
- *(Admin Account: `admin@apexcapital.in` / `admin123`)*

Upon signing in, the authenticated session loads tenant `TENANT-APEX-01` and opens the full enterprise desktop workstation.

---

## 4. Building from Source & Running Automated Tests

### 4.1 Compile Java Sources
```powershell
$files = (Get-ChildItem -Path src/main/java -Recurse -Filter *.java).FullName
& "C:\Program Files\Eclipse Adoptium\jdk-21.0.13.9-hotspot\bin\javac.exe" -d target/classes $files
```

### 4.2 Run Test Suites
```powershell
python test_enterprise_suite.py
```

All 4 test suites verify:
1. **JUnit 5 Domain & Security Test Suite:** Pure password login, tenant isolation, transactional lead conversion, internal note isolation, workflow approvals, balanced double-entry ledger invariants, secret redaction, and `BigDecimal` financial math precision.
2. **SRS Traceability Audit:** 27 core enterprise requirement IDs traced.
3. **MySQL 8 Schema Validation:** All 12 base tables (V1) and all 39 enterprise tables (V2) audited with `tenant_id` constraints.
4. **Desktop Architecture Audit:** 19 compiled bytecode classes verified, with zero HTML files in the project.

---

## 5. Security & Truthful Simulation Disclosures

- **Simulated Trading Only:** CryptoVista X Enterprise is not an exchange and does not provide fiat deposits, crypto withdrawals, or real custody. All funds and positions are virtual.
- **Tenant Isolation:** Every query binds ambient `tenant_id` from the authenticated user's validated membership.
- **Support Note Confidentiality (`SUP-004`):** Operator internal notes are strictly segregated from customer communication channels.
