# CryptoVista X Enterprise — Internal Service & REST API Documentation

**Document Version:** 4.1  
**Authentication Scheme:** Bearer Session Token (derived from User ID + Password)  
**Security:** Rate Limited (Max 5 attempts/min), Role-Based Access Control  

---

## 1. Authentication Endpoints (Pure User ID + Password)

### POST `/api/v1/auth/login`
Authenticates a user and issues an enterprise session token. Zero MFA or OTP required.

**Request Body:**
```json
{
  "userId": "operator@apexcapital.in",
  "password": "SecureEnterprisePassword123!"
}
```

**Success Response (`200 OK`):**
```json
{
  "status": "AUTHENTICATED",
  "sessionToken": "cvx_sess_89f7edc533448e4...",
  "tenantId": "TENANT-APEX-01",
  "user": {
    "id": "USR-001",
    "email": "operator@apexcapital.in",
    "fullName": "Apex Operator",
    "role": "OPERATOR"
  },
  "expiresAt": "2026-11-06T20:45:00Z"
}
```

**Failure Responses:**
- `401 Unauthorized`: `{"error": "INVALID_CREDENTIALS", "message": "Invalid User ID or Password"}`
- `423 Locked`: `{"error": "ACCOUNT_LOCKED", "message": "Account locked due to 5 consecutive failed attempts"}`

### POST `/api/v1/auth/logout`
Revokes active session.

---

## 2. Market Intelligence Endpoints

### GET `/api/v1/markets/quotes`
Retrieves live or deterministic mock asset prices with source metadata.

**Response (`200 OK`):**
```json
[
  {
    "symbol": "BTC",
    "name": "Bitcoin",
    "priceInr": 8245100.00,
    "change24hPct": 2.45,
    "high24hInr": 8320000.00,
    "low24hInr": 8110000.00,
    "volume24hInr": 45200000000.00,
    "isMock": false,
    "provider": "GROWW_REFERENCE"
  }
]
```

---

## 3. Simulated Trading Endpoints

### POST `/api/v1/trading/orders`
Submits a virtual simulated order with idempotency protection.

**Request Body:**
```json
{
  "accountId": "ACC-APEX-VIRTUAL-01",
  "symbol": "BTC",
  "side": "BUY",
  "orderType": "MARKET",
  "quantity": "0.25000000",
  "idempotencyKey": "ord_req_998124_btc"
}
```

**Response (`201 Created`):**
```json
{
  "orderId": "ORD-SIM-20261106-992",
  "status": "FILLED",
  "filledQuantity": "0.25000000",
  "avgFillPrice": 8245100.00,
  "feeAmount": 824.51,
  "totalDebitedInr": 2062099.51,
  "settlementJournalId": "JRN-8921"
}
```

---

## 4. CRM & Operations Endpoints

- `GET /api/v1/crm/customers`: Lists all tenant customers.
- `POST /api/v1/crm/customers`: Creates a new enterprise customer record.
- `POST /api/v1/crm/leads/{id}/convert`: Transactionally converts a lead into Customer + Contact + Deal.
- `POST /api/v1/support/tickets/{id}/internal-notes`: Appends a strictly confidential operator note (`SUP-004`).
- `POST /api/v1/workflows/approvals/{id}/decide`: Dual-control approval (`APPROVE` or `REJECT`).

