# CryptoVista X Enterprise - Role-Permission Matrix

**Version:** 4.0  
**Authorization Model:** RBAC (Role-Based Access Control) with ABAC (Attribute-Based Access Control) for tenant scoping and field-level permissions.

---

## 1. Enterprise Roles

1. **TENANT_ADMIN:** Enterprise administrator with full tenant governance.
2. **OPERATOR:** Senior operations lead managing customer accounts, orders, and tickets.
3. **SALES_REP:** Commercial sales representative managing leads and opportunities.
4. **SUPPORT_AGENT:** Service specialist managing customer inquiries and SLAs.
5. **ANALYST / TRADER:** Research analyst modeling portfolios and simulated strategies.
6. **READ_ONLY_AUDITOR:** Compliance auditor with read-only access to audit logs.

---

## 2. Permission Matrix

| Capability / Resource | Action | TENANT_ADMIN | OPERATOR | SALES_REP | SUPPORT_AGENT | ANALYST | AUDITOR |
|---|---|---|---|---|---|---|---|
| **Market Intelligence** | View Reference Prices | ALLOW | ALLOW | ALLOW | ALLOW | ALLOW | ALLOW |
| **Simulated Trading** | Place Simulated Orders | ALLOW | ALLOW | DENY | DENY | ALLOW | DENY |
| **Simulated Trading** | View Order Fills | ALLOW | ALLOW | DENY | DENY | ALLOW | ALLOW |
| **Portfolio NAV** | View Simulated NAV | ALLOW | ALLOW | DENY | DENY | ALLOW | ALLOW |
| **Customer 360** | View Customers | ALLOW | ALLOW | ALLOW | ALLOW | DENY | ALLOW |
| **Customer 360** | Create / Edit Customer | ALLOW | ALLOW | ALLOW | DENY | DENY | DENY |
| **Sales Pipeline** | Manage Opportunities | ALLOW | ALLOW | ALLOW | DENY | DENY | DENY |
| **Support Tickets** | View / Respond to Tickets | ALLOW | ALLOW | DENY | ALLOW | DENY | ALLOW |
| **Support Tickets** | View Internal Notes | ALLOW | ALLOW | DENY | ALLOW | DENY | ALLOW |
| **Workflow Approvals**| Approve Discounts | ALLOW | DENY | DENY | DENY | DENY | DENY |
| **Security & MFA** | Enforce Tenant Policy | ALLOW | DENY | DENY | DENY | DENY | DENY |
| **Audit Log** | View Business Audit Trail| ALLOW | ALLOW | DENY | DENY | DENY | ALLOW |
| **Data Export** | Export CSV / Reports | ALLOW | ALLOW | DENY | DENY | ALLOW | DENY |

