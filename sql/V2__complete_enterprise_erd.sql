-- =============================================================================
-- CRYPTOVISTA X ENTERPRISE — COMPLETE DATABASE ARCHITECTURE DDL (V2)
-- Database Engine: MySQL 8.0+ (InnoDB)
-- Collation: utf8mb4_unicode_ci
-- Architecture: Shared Multi-Tenant Schema with strict discriminator (tenant_id)
-- Financial Integrity: Balanced Double-Entry Append-Only Financial Ledger
-- Information Segregation: Isolated Private Support Notes (SUP-004)
-- =============================================================================

SET FOREIGN_KEY_CHECKS = 0;

-- -----------------------------------------------------------------------------
-- 1. MULTI-TENANCY & TENANT GOVERNANCE
-- -----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS tenants (
    id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    tier VARCHAR(32) NOT NULL DEFAULT 'ENTERPRISE',
    status VARCHAR(32) NOT NULL DEFAULT 'ACTIVE',
    max_users INT NOT NULL DEFAULT 50,
    base_currency VARCHAR(8) NOT NULL DEFAULT 'INR',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_tenants_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS tenant_settings (
    tenant_id VARCHAR(64) NOT NULL,
    setting_key VARCHAR(128) NOT NULL,
    setting_value TEXT,
    is_encrypted BOOLEAN NOT NULL DEFAULT FALSE,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (tenant_id, setting_key),
    CONSTRAINT fk_ts_tenant FOREIGN KEY (tenant_id) REFERENCES tenants (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS tenant_memberships (
    tenant_id VARCHAR(64) NOT NULL,
    user_id VARCHAR(64) NOT NULL,
    membership_role VARCHAR(64) NOT NULL DEFAULT 'MEMBER',
    status VARCHAR(32) NOT NULL DEFAULT 'ACTIVE',
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (tenant_id, user_id),
    CONSTRAINT fk_tm_tenant FOREIGN KEY (tenant_id) REFERENCES tenants (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------------------------
-- 2. IDENTITY, ACCESS MANAGEMENT & AUTHENTICATION (Diagram 1)
-- -----------------------------------------------------------------------------

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
    INDEX idx_users_email (email),
    CONSTRAINT fk_users_tenant FOREIGN KEY (tenant_id) REFERENCES tenants (id) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS login_history (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    tenant_id VARCHAR(64) NOT NULL,
    user_id VARCHAR(64) NOT NULL,
    ip_address VARCHAR(45),
    user_agent VARCHAR(255),
    status VARCHAR(32) NOT NULL DEFAULT 'SUCCESS',
    failure_reason VARCHAR(128),
    attempted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_login_history_user (tenant_id, user_id),
    CONSTRAINT fk_lh_user FOREIGN KEY (tenant_id, user_id) REFERENCES users (tenant_id, id) ON DELETE CASCADE
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
    INDEX idx_sessions_expires (expires_at),
    CONSTRAINT fk_sessions_user FOREIGN KEY (tenant_id, user_id) REFERENCES users (tenant_id, id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS roles (
    tenant_id VARCHAR(64) NOT NULL,
    id VARCHAR(64) NOT NULL,
    role_code VARCHAR(64) NOT NULL,
    role_name VARCHAR(255) NOT NULL,
    description TEXT,
    is_system BOOLEAN NOT NULL DEFAULT FALSE,
    PRIMARY KEY (tenant_id, id),
    UNIQUE KEY uk_tenant_role_code (tenant_id, role_code),
    CONSTRAINT fk_roles_tenant FOREIGN KEY (tenant_id) REFERENCES tenants (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS permissions (
    id VARCHAR(64) PRIMARY KEY,
    module VARCHAR(64) NOT NULL,
    action VARCHAR(64) NOT NULL,
    description VARCHAR(255)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS role_permissions (
    tenant_id VARCHAR(64) NOT NULL,
    role_id VARCHAR(64) NOT NULL,
    permission_id VARCHAR(64) NOT NULL,
    PRIMARY KEY (tenant_id, role_id, permission_id),
    CONSTRAINT fk_rp_role FOREIGN KEY (tenant_id, role_id) REFERENCES roles (tenant_id, id) ON DELETE CASCADE,
    CONSTRAINT fk_rp_perm FOREIGN KEY (permission_id) REFERENCES permissions (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS user_roles (
    tenant_id VARCHAR(64) NOT NULL,
    user_id VARCHAR(64) NOT NULL,
    role_id VARCHAR(64) NOT NULL,
    granted_by VARCHAR(64),
    granted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (tenant_id, user_id, role_id),
    CONSTRAINT fk_ur_user FOREIGN KEY (tenant_id, user_id) REFERENCES users (tenant_id, id) ON DELETE CASCADE,
    CONSTRAINT fk_ur_role FOREIGN KEY (tenant_id, role_id) REFERENCES roles (tenant_id, id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------------------------
-- 3. MARKET INTELLIGENCE (Diagram 3)
-- -----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS crypto_assets (
    id VARCHAR(64) PRIMARY KEY,
    symbol VARCHAR(16) NOT NULL UNIQUE,
    name VARCHAR(128) NOT NULL,
    asset_class VARCHAR(32) NOT NULL DEFAULT 'LAYER_1',
    base_currency VARCHAR(8) NOT NULL DEFAULT 'INR',
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS market_prices (
    symbol VARCHAR(16) PRIMARY KEY,
    price_inr DECIMAL(18, 4) NOT NULL,
    change_24h_pct DECIMAL(6, 2) NOT NULL,
    high_24h_inr DECIMAL(18, 4) NOT NULL,
    low_24h_inr DECIMAL(18, 4) NOT NULL,
    volume_24h_inr DECIMAL(24, 2) NOT NULL,
    source_type VARCHAR(32) NOT NULL DEFAULT 'MOCK',
    provider_name VARCHAR(64) NOT NULL DEFAULT 'MOCK_ENGINE',
    is_mock BOOLEAN NOT NULL DEFAULT TRUE,
    market_timestamp TIMESTAMP NOT NULL,
    fetched_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_market_prices_source (source_type, is_mock),
    CONSTRAINT fk_mp_asset FOREIGN KEY (symbol) REFERENCES crypto_assets (symbol) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS historical_prices (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    symbol VARCHAR(16) NOT NULL,
    timeframe VARCHAR(16) NOT NULL DEFAULT '1D',
    open_price DECIMAL(18, 4) NOT NULL,
    high_price DECIMAL(18, 4) NOT NULL,
    low_price DECIMAL(18, 4) NOT NULL,
    close_price DECIMAL(18, 4) NOT NULL,
    volume DECIMAL(24, 4) NOT NULL,
    candle_time TIMESTAMP NOT NULL,
    UNIQUE KEY uk_candle (symbol, timeframe, candle_time),
    INDEX idx_candle_lookup (symbol, timeframe, candle_time DESC),
    CONSTRAINT fk_hp_asset FOREIGN KEY (symbol) REFERENCES crypto_assets (symbol) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS watchlists (
    tenant_id VARCHAR(64) NOT NULL,
    id VARCHAR(64) NOT NULL,
    user_id VARCHAR(64) NOT NULL,
    name VARCHAR(128) NOT NULL,
    is_default BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (tenant_id, id),
    INDEX idx_wl_user (tenant_id, user_id),
    CONSTRAINT fk_wl_tenant FOREIGN KEY (tenant_id) REFERENCES tenants (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS watchlist_items (
    tenant_id VARCHAR(64) NOT NULL,
    watchlist_id VARCHAR(64) NOT NULL,
    symbol VARCHAR(16) NOT NULL,
    display_order INT NOT NULL DEFAULT 0,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (tenant_id, watchlist_id, symbol),
    CONSTRAINT fk_wli_watchlist FOREIGN KEY (tenant_id, watchlist_id) REFERENCES watchlists (tenant_id, id) ON DELETE CASCADE,
    CONSTRAINT fk_wli_asset FOREIGN KEY (symbol) REFERENCES crypto_assets (symbol) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------------------------
-- 4. SIMULATED TRADING & BALANCED FINANCIAL LEDGER (Diagram 2 & 5)
-- -----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS simulated_accounts (
    tenant_id VARCHAR(64) NOT NULL,
    id VARCHAR(64) NOT NULL,
    user_id VARCHAR(64) NOT NULL,
    account_number VARCHAR(64) NOT NULL,
    currency VARCHAR(16) NOT NULL DEFAULT 'INR',
    available_cash DECIMAL(18, 4) NOT NULL DEFAULT 10000000.0000,
    reserved_cash DECIMAL(18, 4) NOT NULL DEFAULT 0.0000,
    status VARCHAR(32) NOT NULL DEFAULT 'ACTIVE',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (tenant_id, id),
    UNIQUE KEY uk_tenant_account_num (tenant_id, account_number),
    INDEX idx_accounts_user (tenant_id, user_id),
    CONSTRAINT fk_sa_tenant FOREIGN KEY (tenant_id) REFERENCES tenants (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS simulated_holdings (
    tenant_id VARCHAR(64) NOT NULL,
    account_id VARCHAR(64) NOT NULL,
    symbol VARCHAR(16) NOT NULL,
    quantity DECIMAL(18, 8) NOT NULL DEFAULT 0.00000000,
    reserved_qty DECIMAL(18, 8) NOT NULL DEFAULT 0.00000000,
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
    avg_fill_price DECIMAL(18, 4),
    status VARCHAR(32) NOT NULL DEFAULT 'NEW',
    idempotency_key VARCHAR(128),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (tenant_id, id),
    UNIQUE KEY uk_order_idempotency (tenant_id, idempotency_key),
    INDEX idx_orders_account (tenant_id, account_id),
    INDEX idx_orders_status (tenant_id, status),
    CONSTRAINT fk_orders_account FOREIGN KEY (tenant_id, account_id) REFERENCES simulated_accounts (tenant_id, id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS order_fills (
    tenant_id VARCHAR(64) NOT NULL,
    id VARCHAR(64) NOT NULL,
    order_id VARCHAR(64) NOT NULL,
    fill_quantity DECIMAL(18, 8) NOT NULL,
    fill_price DECIMAL(18, 4) NOT NULL,
    fee_amount DECIMAL(18, 4) NOT NULL DEFAULT 0.0000,
    executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (tenant_id, id),
    INDEX idx_fills_order (tenant_id, order_id),
    CONSTRAINT fk_fills_order FOREIGN KEY (tenant_id, order_id) REFERENCES simulated_orders (tenant_id, id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS trades (
    tenant_id VARCHAR(64) NOT NULL,
    id VARCHAR(64) NOT NULL,
    order_id VARCHAR(64) NOT NULL,
    fill_id VARCHAR(64) NOT NULL,
    account_id VARCHAR(64) NOT NULL,
    symbol VARCHAR(16) NOT NULL,
    side VARCHAR(8) NOT NULL,
    quantity DECIMAL(18, 8) NOT NULL,
    price DECIMAL(18, 4) NOT NULL,
    total_value DECIMAL(18, 4) NOT NULL,
    fee DECIMAL(18, 4) NOT NULL DEFAULT 0.0000,
    trade_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (tenant_id, id),
    INDEX idx_trades_account (tenant_id, account_id, trade_time DESC),
    CONSTRAINT fk_trades_account FOREIGN KEY (tenant_id, account_id) REFERENCES simulated_accounts (tenant_id, id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS ledger_journals (
    tenant_id VARCHAR(64) NOT NULL,
    id VARCHAR(64) NOT NULL,
    journal_type VARCHAR(64) NOT NULL,
    description VARCHAR(255) NOT NULL,
    reference_id VARCHAR(64) NOT NULL,
    is_balanced BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (tenant_id, id),
    INDEX idx_journals_ref (tenant_id, reference_id),
    CONSTRAINT fk_lj_tenant FOREIGN KEY (tenant_id) REFERENCES tenants (id) ON DELETE RESTRICT
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
    INDEX idx_ledger_journal (tenant_id, journal_id),
    CONSTRAINT fk_ledger_journal FOREIGN KEY (tenant_id, journal_id) REFERENCES ledger_journals (tenant_id, id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------------------------
-- 5. PORTFOLIO INTELLIGENCE
-- -----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS portfolios (
    tenant_id VARCHAR(64) NOT NULL,
    id VARCHAR(64) NOT NULL,
    user_id VARCHAR(64) NOT NULL,
    account_id VARCHAR(64) NOT NULL,
    name VARCHAR(128) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (tenant_id, id),
    INDEX idx_portfolio_user (tenant_id, user_id),
    CONSTRAINT fk_pf_tenant FOREIGN KEY (tenant_id) REFERENCES tenants (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS portfolio_snapshots (
    tenant_id VARCHAR(64) NOT NULL,
    id VARCHAR(64) NOT NULL,
    portfolio_id VARCHAR(64) NOT NULL,
    total_nav_inr DECIMAL(18, 4) NOT NULL,
    cash_balance_inr DECIMAL(18, 4) NOT NULL,
    invested_value_inr DECIMAL(18, 4) NOT NULL,
    unrealized_pnl_inr DECIMAL(18, 4) NOT NULL,
    realized_pnl_inr DECIMAL(18, 4) NOT NULL,
    snapshot_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (tenant_id, id),
    INDEX idx_snapshots_nav (tenant_id, portfolio_id, snapshot_timestamp DESC),
    CONSTRAINT fk_ps_portfolio FOREIGN KEY (tenant_id, portfolio_id) REFERENCES portfolios (tenant_id, id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------------------------
-- 6. ENTERPRISE CRM & CUSTOMER 360 (Diagram 4 & 5)
-- -----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS leads (
    tenant_id VARCHAR(64) NOT NULL,
    id VARCHAR(64) NOT NULL,
    lead_number VARCHAR(64) NOT NULL,
    first_name VARCHAR(128) NOT NULL,
    last_name VARCHAR(128) NOT NULL,
    email VARCHAR(255) NOT NULL,
    company VARCHAR(255),
    status VARCHAR(32) NOT NULL DEFAULT 'NEW',
    lead_score INT NOT NULL DEFAULT 50,
    assigned_user_id VARCHAR(64),
    converted_customer_id VARCHAR(64),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (tenant_id, id),
    UNIQUE KEY uk_tenant_lead_num (tenant_id, lead_number),
    INDEX idx_leads_email (tenant_id, email),
    CONSTRAINT fk_leads_tenant FOREIGN KEY (tenant_id) REFERENCES tenants (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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
    INDEX idx_customers_tenant_owner (tenant_id, owner_user_id),
    CONSTRAINT fk_customers_tenant FOREIGN KEY (tenant_id) REFERENCES tenants (id) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS contacts (
    tenant_id VARCHAR(64) NOT NULL,
    id VARCHAR(64) NOT NULL,
    customer_id VARCHAR(64) NOT NULL,
    first_name VARCHAR(128) NOT NULL,
    last_name VARCHAR(128) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(32),
    title VARCHAR(128),
    is_primary BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (tenant_id, id),
    INDEX idx_contacts_customer (tenant_id, customer_id),
    CONSTRAINT fk_contacts_customer FOREIGN KEY (tenant_id, customer_id) REFERENCES customers (tenant_id, id) ON DELETE CASCADE
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

CREATE TABLE IF NOT EXISTS activities (
    tenant_id VARCHAR(64) NOT NULL,
    id VARCHAR(64) NOT NULL,
    customer_id VARCHAR(64) NOT NULL,
    activity_type VARCHAR(32) NOT NULL DEFAULT 'TASK',
    subject VARCHAR(255) NOT NULL,
    description TEXT,
    due_date TIMESTAMP NULL,
    status VARCHAR(32) NOT NULL DEFAULT 'PENDING',
    assigned_user_id VARCHAR(64),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (tenant_id, id),
    INDEX idx_activities_customer (tenant_id, customer_id),
    CONSTRAINT fk_activities_customer FOREIGN KEY (tenant_id, customer_id) REFERENCES customers (tenant_id, id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------------------------
-- 7. CUSTOMER OPERATIONS, SUPPORT & SLA (Diagram 4 & 5)
-- -----------------------------------------------------------------------------

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
    first_responded_at TIMESTAMP NULL,
    resolved_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (tenant_id, id),
    UNIQUE KEY uk_tenant_ticket_num (tenant_id, ticket_number),
    INDEX idx_tickets_customer (tenant_id, customer_id),
    INDEX idx_tickets_sla (tenant_id, status, sla_due_at),
    CONSTRAINT fk_tickets_customer FOREIGN KEY (tenant_id, customer_id) REFERENCES customers (tenant_id, id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS ticket_messages (
    tenant_id VARCHAR(64) NOT NULL,
    id VARCHAR(64) NOT NULL,
    ticket_id VARCHAR(64) NOT NULL,
    sender_user_id VARCHAR(64) NOT NULL,
    message_body TEXT NOT NULL,
    is_customer_visible BOOLEAN NOT NULL DEFAULT TRUE,
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (tenant_id, id),
    INDEX idx_messages_ticket (tenant_id, ticket_id),
    CONSTRAINT fk_messages_ticket FOREIGN KEY (tenant_id, ticket_id) REFERENCES support_tickets (tenant_id, id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Strictly segregated private internal notes (SUP-004)
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

CREATE TABLE IF NOT EXISTS sla_policies (
    tenant_id VARCHAR(64) NOT NULL,
    id VARCHAR(64) NOT NULL,
    policy_name VARCHAR(128) NOT NULL,
    priority VARCHAR(32) NOT NULL,
    response_time_mins INT NOT NULL DEFAULT 60,
    resolution_time_mins INT NOT NULL DEFAULT 480,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    PRIMARY KEY (tenant_id, id),
    CONSTRAINT fk_sla_tenant FOREIGN KEY (tenant_id) REFERENCES tenants (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS onboarding_cases (
    tenant_id VARCHAR(64) NOT NULL,
    id VARCHAR(64) NOT NULL,
    customer_id VARCHAR(64) NOT NULL,
    case_number VARCHAR(64) NOT NULL,
    status VARCHAR(32) NOT NULL DEFAULT 'IN_PROGRESS',
    target_date DATE,
    completed_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (tenant_id, id),
    INDEX idx_onb_customer (tenant_id, customer_id),
    CONSTRAINT fk_onb_customer FOREIGN KEY (tenant_id, customer_id) REFERENCES customers (tenant_id, id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------------------------
-- 8. WORKFLOWS, DOCUMENTS & AUDIT TRAIL
-- -----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS workflow_definitions (
    tenant_id VARCHAR(64) NOT NULL,
    id VARCHAR(64) NOT NULL,
    workflow_key VARCHAR(64) NOT NULL,
    title VARCHAR(255) NOT NULL,
    trigger_event VARCHAR(64) NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    PRIMARY KEY (tenant_id, id),
    CONSTRAINT fk_wd_tenant FOREIGN KEY (tenant_id) REFERENCES tenants (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS workflow_instances (
    tenant_id VARCHAR(64) NOT NULL,
    id VARCHAR(64) NOT NULL,
    definition_id VARCHAR(64) NOT NULL,
    entity_type VARCHAR(64) NOT NULL,
    entity_id VARCHAR(64) NOT NULL,
    status VARCHAR(32) NOT NULL DEFAULT 'PENDING_APPROVAL',
    initiated_by VARCHAR(64) NOT NULL,
    initiated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP NULL,
    PRIMARY KEY (tenant_id, id),
    INDEX idx_wfi_entity (tenant_id, entity_type, entity_id),
    CONSTRAINT fk_wfi_def FOREIGN KEY (tenant_id, definition_id) REFERENCES workflow_definitions (tenant_id, id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS workflow_approvals (
    tenant_id VARCHAR(64) NOT NULL,
    id VARCHAR(64) NOT NULL,
    instance_id VARCHAR(64) NOT NULL,
    step_name VARCHAR(128) NOT NULL,
    approver_user_id VARCHAR(64),
    status VARCHAR(32) NOT NULL DEFAULT 'PENDING',
    comments TEXT,
    decided_at TIMESTAMP NULL,
    PRIMARY KEY (tenant_id, id),
    CONSTRAINT fk_wfa_inst FOREIGN KEY (tenant_id, instance_id) REFERENCES workflow_instances (tenant_id, id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS documents (
    tenant_id VARCHAR(64) NOT NULL,
    id VARCHAR(64) NOT NULL,
    customer_id VARCHAR(64),
    title VARCHAR(255) NOT NULL,
    document_type VARCHAR(64) NOT NULL DEFAULT 'CONTRACT',
    storage_path VARCHAR(512) NOT NULL,
    file_size_bytes BIGINT NOT NULL,
    mime_type VARCHAR(128) NOT NULL,
    uploaded_by VARCHAR(64) NOT NULL,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (tenant_id, id),
    INDEX idx_documents_customer (tenant_id, customer_id),
    CONSTRAINT fk_docs_tenant FOREIGN KEY (tenant_id) REFERENCES tenants (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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
    INDEX idx_audit_created (created_at),
    INDEX idx_audit_entity (tenant_id, entity_type, entity_id),
    CONSTRAINT fk_audit_tenant FOREIGN KEY (tenant_id) REFERENCES tenants (id) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

SET FOREIGN_KEY_CHECKS = 1;

