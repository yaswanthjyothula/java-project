# CryptoVista X Enterprise - Security Architecture

**Version:** 4.0  
**Scope:** Multi-tenancy, Authentication, MFA, Authorization, and Audit Logging.

---

## 1. Multi-Tenant Data Separation

CryptoVista X Enterprise implements a shared-database multi-tenant architecture on MySQL 8.
- **Tenant Discriminator:** Every tenant-owned table (`users`, `customers`, `opportunities`, `support_tickets`, `simulated_accounts`, `simulated_orders`, `ledger_entries`, `audit_log`) contains a non-nullable `tenant_id VARCHAR(64)` column.
- **Service Boundary:** The trusted Java service layer retrieves the active tenant from a thread-local `TenantContext`. All SQL queries enforce `tenant_id = ?` in `WHERE` clauses.
- **Cross-Tenant Attack Prevention:** Direct object reference attacks (e.g., requesting Customer `C-100` belonging to Tenant B while authenticated under Tenant A) are blocked by compound keys `(tenant_id, id)`.

---

## 2. Authentication & Credential Storage

- **Password Hashing:** Passwords must be hashed using Argon2id or BCrypt with a work factor of 12. Plaintext passwords or unsalted hashes (MD5, SHA-256) are strictly prohibited.
- **MFA Enforcement:** Mandatory Time-based One-Time Passwords (TOTP) conforming to RFC 6238.
  - Secret keys are stored encrypted at rest using AES-GCM-256.
  - A drift window of +/- 1 time step (30 seconds) is supported.
  - Replay protection rejects identical tokens used within the same window.
- **Session Tokens:** Cryptographically secure 256-bit random opaque tokens. Only the SHA-256 hash of the session token is stored in the database. Sessions are immediately invalidated upon logout or password reset.

---

## 3. Append-Only Audit Logging

All security-sensitive operations generate an immutable record in the `audit_log` table:
- **Captured Attributes:** `tenant_id`, `actor`, `action`, `entity_type`, `entity_id`, `correlation_id`, `result`, `created_at`.
- **Sensitive Data Redaction:** Passwords, TOTP secret seeds, auth tokens, and confidential document contents are never logged.

---

## 4. Protected Support Note Isolation

In the Support module, customer conversation messages are accessible by external client stakeholders, whereas `ticket_internal_notes` are segregated and accessible exclusively by internal authenticated operators. Internal notes are physically separated in the schema and never exposed in customer-facing APIs.

