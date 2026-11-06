-- =============================================================================
-- CryptoVista X Enterprise — MySQL 8 Multi-Tenant Schema (V1)
-- Strict tenant isolation via discriminator column (tenant_id)
-- Financial balances backed by double-entry ledger journals
-- =============================================================================

CREATE TABLE IF NOT EXISTS tenants (
    id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    tier VARCHAR(32) NOT NULL DEFAULT 'ENTERPRISE',
    status VARCHAR(32) NOT NULL DEFAULT 'ACTIVE',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS users (
    tenant_id VARCHAR(64) NOT NULL,
    id VARCHAR(64) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(64) NOT NULL DEFAULT 'OPERATOR',
    status VARCHAR(32) NOT NULL DEFAULT 'ACTIVE',
    failed_logins INT NOT NULL DEFAULT 0,
    is_locked BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (tenant_id, id),
    UNIQUE KEY uk_tenant_user_email (tenant_id, email),
    CONSTRAINT fk_users_tenant FOREIGN KEY (tenant_id) REFERENCES tenants (id) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS sessions (
    session_id_hash VARCHAR(64) PRIMARY KEY,
    tenant_id VARCHAR(64) NOT NULL,
    user_id VARCHAR(64) NOT NULL,
    ip_address VARCHAR(45),
    user_agent VARCHAR(255),
    expires_at TIMESTAMP NOT NULL,
    revoked BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_sessions_tenant_user (tenant_id, user_id),
    CONSTRAINT fk_sessions_user FOREIGN KEY (tenant_id, user_id) REFERENCES users (tenant_id, id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================================================
-- CRM CORE TABLES (Customer 360, Opportunities, Support Tickets)
-- =============================================================================

CREATE TABLE IF NOT EXISTS customers (
    tenant_id VARCHAR(64) NOT NULL,
    id VARCHAR(64) NOT NULL,
    customer_number VARCHAR(64) NOT NULL,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(64) NOT NULL DEFAULT 'INSTITUTIONAL',
    lifecycle_stage VARCHAR(64) NOT NULL DEFAULT 'ACTIVE_ENTERPRISE',
    health_score INT NOT NULL DEFAULT 85,
    owner_user_id VARCHAR(64),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (tenant_id, id),
    UNIQUE KEY uk_tenant_customer_num (tenant_id, customer_number),
    INDEX idx_customers_tenant_owner (tenant_id, owner_user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS opportunities (
    tenant_id VARCHAR(64) NOT NULL,
    id VARCHAR(64) NOT NULL,
    customer_id VARCHAR(64) NOT NULL,
    title VARCHAR(255) NOT NULL,
    stage VARCHAR(64) NOT NULL DEFAULT 'QUALIFICATION',
    value DECIMAL(18, 2) NOT NULL DEFAULT 0.00,
    probability INT NOT NULL DEFAULT 50,
    expected_close DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (tenant_id, id),
    INDEX idx_opps_customer (tenant_id, customer_id),
    CONSTRAINT fk_opps_customer FOREIGN KEY (tenant_id, customer_id) REFERENCES customers (tenant_id, id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS support_tickets (
    tenant_id VARCHAR(64) NOT NULL,
    id VARCHAR(64) NOT NULL,
    customer_id VARCHAR(64) NOT NULL,
    ticket_number VARCHAR(64) NOT NULL,
    title VARCHAR(255) NOT NULL,
    priority VARCHAR(32) NOT NULL DEFAULT 'NORMAL',
    status VARCHAR(32) NOT NULL DEFAULT 'OPEN',
    assigned_user_id VARCHAR(64),
    sla_due_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (tenant_id, id),
    UNIQUE KEY uk_tenant_ticket_num (tenant_id, ticket_number),
    INDEX idx_tickets_customer (tenant_id, customer_id),
    CONSTRAINT fk_tickets_customer FOREIGN KEY (tenant_id, customer_id) REFERENCES customers (tenant_id, id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Internal Notes: strictly segregated from customer conversation threads
CREATE TABLE IF NOT EXISTS ticket_internal_notes (
    tenant_id VARCHAR(64) NOT NULL,
    id VARCHAR(64) NOT NULL,
    ticket_id VARCHAR(64) NOT NULL,
    author_user_id VARCHAR(64) NOT NULL,
    note_content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (tenant_id, id),
    INDEX idx_notes_ticket (tenant_id, ticket_id),
    CONSTRAINT fk_notes_ticket FOREIGN KEY (tenant_id, ticket_id) REFERENCES support_tickets (tenant_id, id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================================================
-- SIMULATED TRADING & BALANCED FINANCIAL LEDGER
-- =============================================================================

CREATE TABLE IF NOT EXISTS simulated_accounts (
    tenant_id VARCHAR(64) NOT NULL,
    id VARCHAR(64) NOT NULL,
    user_id VARCHAR(64) NOT NULL,
    account_number VARCHAR(64) NOT NULL,
    currency VARCHAR(16) NOT NULL DEFAULT 'INR',
    available_cash DECIMAL(18, 4) NOT NULL DEFAULT 10000000.0000,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (tenant_id, id),
    UNIQUE KEY uk_tenant_account_num (tenant_id, account_number)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS simulated_holdings (
    tenant_id VARCHAR(64) NOT NULL,
    account_id VARCHAR(64) NOT NULL,
    symbol VARCHAR(16) NOT NULL,
    quantity DECIMAL(18, 8) NOT NULL DEFAULT 0.00000000,
    cost_basis_inr DECIMAL(18, 4) NOT NULL DEFAULT 0.0000,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (tenant_id, account_id, symbol),
    CONSTRAINT fk_holdings_account FOREIGN KEY (tenant_id, account_id) REFERENCES simulated_accounts (tenant_id, id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS simulated_orders (
    tenant_id VARCHAR(64) NOT NULL,
    id VARCHAR(64) NOT NULL,
    account_id VARCHAR(64) NOT NULL,
    symbol VARCHAR(16) NOT NULL,
    side VARCHAR(8) NOT NULL,
    order_type VARCHAR(16) NOT NULL DEFAULT 'MARKET',
    quantity DECIMAL(18, 8) NOT NULL,
    limit_price DECIMAL(18, 4),
    filled_quantity DECIMAL(18, 8) NOT NULL DEFAULT 0.00000000,
    status VARCHAR(32) NOT NULL DEFAULT 'NEW',
    idempotency_key VARCHAR(128),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (tenant_id, id),
    UNIQUE KEY uk_order_idempotency (tenant_id, idempotency_key),
    INDEX idx_orders_account (tenant_id, account_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS ledger_entries (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    tenant_id VARCHAR(64) NOT NULL,
    journal_id VARCHAR(64) NOT NULL,
    account_id VARCHAR(64) NOT NULL,
    entry_type ENUM('DEBIT', 'CREDIT') NOT NULL,
    amount DECIMAL(18, 4) NOT NULL,
    currency VARCHAR(16) NOT NULL DEFAULT 'INR',
    reference_id VARCHAR(64) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_ledger_tenant_account (tenant_id, account_id),
    INDEX idx_ledger_journal (tenant_id, journal_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================================================
-- IMMUTABLE AUDIT TRAIL
-- =============================================================================

CREATE TABLE IF NOT EXISTS audit_log (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    tenant_id VARCHAR(64) NOT NULL,
    actor VARCHAR(255) NOT NULL,
    action VARCHAR(128) NOT NULL,
    entity_type VARCHAR(64) NOT NULL,
    entity_id VARCHAR(64) NOT NULL,
    correlation_id VARCHAR(64),
    result VARCHAR(32) NOT NULL DEFAULT 'SUCCESS',
    details TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_audit_tenant_actor (tenant_id, actor),
    INDEX idx_audit_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

