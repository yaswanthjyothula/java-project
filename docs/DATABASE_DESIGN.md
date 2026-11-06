# CryptoVista X Enterprise — Database Design & Schema Architecture

**Document Version:** 4.1  
**Database Engine:** MySQL 8.0+ (InnoDB)  
**Encoding:** `utf8mb4` / `utf8mb4_unicode_ci`  
**Isolation Model:** Shared Multi-Tenant Schema with `tenant_id` Discriminator  

---

## 1. Relational Design Principles

1. **Strict Multi-Tenancy:**
   Every tenant-scoped table contains `tenant_id VARCHAR(64)` as part of its primary or composite unique keys.
2. **Authentication Standards (User ID & Password Only):**
   - Pure User ID and password authentication using BCrypt/Argon2 hashes.
   - Zero MFA, zero OTP, zero TOTP, zero SMS/email verification during login.
   - Account lockout parameters: `failed_logins INT DEFAULT 0`, `is_locked BOOLEAN DEFAULT FALSE`.
3. **Financial Invariants (Double-Entry Balanced Accounting):**
   - Virtual cash balances are backed by append-only `ledger_journals` and `ledger_entries`.
   - Every trade execution posts paired debit and credit entries:
     $$\sum \text{Debit} = \sum \text{Credit}$$
   - Non-negative balance constraint: virtual balances cannot drop below zero.
4. **Information Segregation (`SUP-004`):**
   - Operator internal notes (`ticket_internal_notes`) are stored in an isolated physical table, never accessible by external customer communication channels (`ticket_messages`).

---

## 2. Table Inventory (38 Enterprise Tables)

| Domain | Tables | Primary Keys & Key Constraints |
| :--- | :--- | :--- |
| **Governance** | `tenants`, `tenant_settings`, `tenant_memberships` | `id`, `(tenant_id, setting_key)`, `(tenant_id, user_id)` |
| **Identity & IAM** | `users`, `sessions`, `roles`, `permissions`, `role_permissions`, `user_roles` | `(tenant_id, id)`, `session_id_hash`, `(tenant_id, role_code)` |
| **Market Data** | `crypto_assets`, `market_prices`, `historical_prices`, `watchlists`, `watchlist_items` | `symbol`, `(symbol, timeframe, candle_time)`, `(tenant_id, id)` |
| **Simulated Trading** | `simulated_accounts`, `simulated_holdings`, `simulated_orders`, `order_fills`, `trades`, `ledger_journals`, `ledger_entries` | `(tenant_id, id)`, `(tenant_id, idempotency_key) UNIQUE`, `id BIGINT AUTO_INC` |
| **Portfolio** | `portfolios`, `portfolio_snapshots` | `(tenant_id, id)`, `(tenant_id, portfolio_id, snapshot_time)` |
| **Enterprise CRM** | `leads`, `customers`, `contacts`, `opportunities`, `activities` | `(tenant_id, id)`, `(tenant_id, customer_number) UNIQUE` |
| **Operations & SLA** | `support_tickets`, `ticket_messages`, `ticket_internal_notes`, `sla_policies`, `onboarding_cases` | `(tenant_id, id)`, `(tenant_id, ticket_number) UNIQUE` |
| **Governance** | `workflow_definitions`, `workflow_instances`, `workflow_approvals`, `documents`, `audit_log` | `(tenant_id, id)`, `id BIGINT AUTO_INC` |

---

## 3. Migration Scripts
- **Baseline Migration:** [`sql/V1__init_schema.sql`](file:///c:/Users/narsi/Downloads/java-project/sql/V1__init_schema.sql)
- **Full Enterprise DDL:** [`sql/V2__complete_enterprise_erd.sql`](file:///c:/Users/narsi/Downloads/java-project/sql/V2__complete_enterprise_erd.sql)

