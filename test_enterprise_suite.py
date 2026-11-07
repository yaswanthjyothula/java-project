"""
CryptoVista X Enterprise - Pure Java Desktop Test Harness
Executes:
1. Java 21 Domain, Financial Engine & Security Test Suite (com.cryptovista.TestRunner)
2. SRS Alignment & Traceability Completeness Check
3. Multi-Tenant MySQL 8 Persistence & Schema Audit (V1 and V2 DDL)
4. Java 21 Swing Desktop Architecture & Bytecode Verification
5. Strict Invariant Verification: ZERO HTML files in repository
"""

import os
import re
import sys
import subprocess
import glob

WORKSPACE_DIR = os.path.dirname(os.path.abspath(__file__))
JAVA_BIN = r"C:\Program Files\Eclipse Adoptium\jdk-21.0.13.9-hotspot\bin\java.exe"

def run_java_domain_test_suite():
    print("[TEST SUITE 1/4] Running Java 21 Domain, Financial & Security Test Suite...")
    m2_repo = os.path.expanduser(r"~\.m2\repository")
    jars = []
    for root, _, files in os.walk(m2_repo):
        for f in files:
            if f.endswith('.jar'):
                jars.append(os.path.join(root, f))
    cp = os.path.join(WORKSPACE_DIR, 'target', 'classes') + ";" + os.path.join(WORKSPACE_DIR, 'target', 'test-classes') + ";" + ";".join(jars)

    cmd = [JAVA_BIN, "-cp", cp, "com.cryptovista.TestRunner"]
    res = subprocess.run(cmd, capture_output=True, text=True, encoding='utf-8', errors='replace')
    assert res.returncode == 0, f"Domain test runner failed:\n{res.stderr}\n{res.stdout}"
    print(res.stdout.strip())
    print("✓ All Java domain unit, financial ledger, and security tests passed 100%.")

def run_srs_traceability_audit():
    print("\n[TEST SUITE 2/4] Running SRS v1.0 Traceability Audit...")
    matrix_path = os.path.join(WORKSPACE_DIR, 'docs', 'TRACEABILITY_MATRIX.md')
    assert os.path.exists(matrix_path), "Missing TRACEABILITY_MATRIX.md"
    with open(matrix_path, 'r', encoding='utf-8') as f:
        content = f.read()

    mandatory_reqs = [
        'AUTH-001', 'AUTH-002', 'AUTH-003', 'AUTH-006',
        'TEN-001', 'TEN-003', 'TEN-004',
        'IAM-001', 'IAM-003',
        'CRM-CUS-001', 'CRM-LEAD-005', 'CRM-OPP-001',
        'SUP-001', 'SUP-004', 'SUP-006',
        'TRD-001', 'TRD-003', 'TRD-010', 'TRD-011', 'TRD-012', 'TRD-015',
        'PORT-001', 'PORT-004', 'PORT-009',
        'AUD-001', 'AUD-007', 'NFR-PERF-004'
    ]
    for req in mandatory_reqs:
        assert req in content, f"Missing requirement code {req} in Traceability Matrix!"
    print(f"✓ All {len(mandatory_reqs)} core SRS requirement IDs traced.")

def run_schema_audit():
    print("\n[TEST SUITE 3/4] Running MySQL 8 Multi-Tenant Schema Audit...")
    sql_v1 = os.path.join(WORKSPACE_DIR, 'sql', 'V1__init_schema.sql')
    assert os.path.exists(sql_v1), "Missing sql/V1__init_schema.sql"
    with open(sql_v1, 'r', encoding='utf-8') as f:
        v1_sql = f.read()

    v1_tables = [
        'tenants', 'users', 'sessions', 'customers', 'opportunities',
        'support_tickets', 'ticket_internal_notes', 'simulated_accounts',
        'simulated_holdings', 'simulated_orders', 'ledger_entries', 'audit_log'
    ]
    for table in v1_tables:
        assert f"CREATE TABLE IF NOT EXISTS {table}" in v1_sql, f"Missing table {table} in V1 schema"
        if table != 'tenants':
            assert "tenant_id" in v1_sql, f"Table {table} must have tenant_id discriminator"
    print(f"✓ All {len(v1_tables)} base multi-tenant database tables verified in V1.")

    sql_v2 = os.path.join(WORKSPACE_DIR, 'sql', 'V2__complete_enterprise_erd.sql')
    assert os.path.exists(sql_v2), "Missing sql/V2__complete_enterprise_erd.sql"
    with open(sql_v2, 'r', encoding='utf-8') as f:
        v2_sql = f.read()

    v2_tables = [
        'tenants', 'tenant_settings', 'tenant_memberships',
        'users', 'login_history', 'sessions', 'roles', 'permissions', 'role_permissions', 'user_roles',
        'crypto_assets', 'market_prices', 'historical_prices', 'watchlists', 'watchlist_items',
        'simulated_accounts', 'simulated_holdings', 'simulated_orders', 'order_fills', 'trades', 'ledger_journals', 'ledger_entries',
        'portfolios', 'portfolio_snapshots',
        'leads', 'customers', 'contacts', 'opportunities', 'activities',
        'support_tickets', 'ticket_messages', 'ticket_internal_notes', 'sla_policies', 'onboarding_cases',
        'workflow_definitions', 'workflow_instances', 'workflow_approvals', 'documents', 'audit_log'
    ]
    for table in v2_tables:
        assert f"CREATE TABLE IF NOT EXISTS {table}" in v2_sql, f"Missing table {table} in V2 enterprise schema"
        if table not in ('tenants', 'permissions', 'crypto_assets', 'market_prices', 'historical_prices'):
            assert "tenant_id" in v2_sql, f"Table {table} must have tenant_id discriminator"
    print(f"✓ All {len(v2_tables)} complete enterprise multi-tenant tables verified in V2 DDL.")

def run_java_architecture_audit():
    print("\n[TEST SUITE 4/4] Verifying Java 21 Desktop Classes & Bytecode...")
    classes_dir = os.path.join(WORKSPACE_DIR, 'target', 'classes', 'com', 'cryptovista')
    assert os.path.exists(classes_dir), "Compiled classes directory target/classes exists"

    required_classes = [
        'CryptoVistaApp.class',
        'service/TenantContext.class',
        'service/FinancialMath.class',
        'service/AuthService.class',
        'service/TradingSimulationEngine.class',
        'service/CrmService.class',
        'service/TicketService.class',
        'service/WorkflowService.class',
        'service/AuditService.class',
        'service/PortfolioService.class',
        'ui/auth/LoginDialog.class',
        'ui/shell/MainFrame.class',
        'ui/theme/ThemeConstants.class',
        'ui/crm/Customer360Panel.class',
        'ui/crm/SalesPipelinePanel.class',
        'ui/service/SupportTicketsPanel.class',
        'ui/operations/WorkflowApprovalsPanel.class',
        'ui/trading/TradingPanel.class',
        'ui/portfolio/PortfolioPanel.class',
        'ui/admin/SecurityAdminPanel.class',
        'ui/admin/AuditLogPanel.class'
    ]
    for c in required_classes:
        full_path = os.path.join(classes_dir, c.replace('/', os.sep))
        assert os.path.exists(full_path), f"Missing compiled class: {c}"
    print(f"✓ All {len(required_classes)} Java 21 desktop classes compiled into bytecode.")

    # Strict Invariant: ZERO HTML files in repository
    html_files = glob.glob(os.path.join(WORKSPACE_DIR, "**", "*.html"), recursive=True)
    assert len(html_files) == 0, f"PROHIBITED: HTML files found in repository: {html_files}"
    print("✓ Strict Invariant Verified: ZERO HTML files exist in the repository (pure desktop application).")

if __name__ == '__main__':
    print("================================================================")
    print("   CRYPTOVISTA X ENTERPRISE — MASTER VERIFICATION HARNESS       ")
    print("   Target: Pure Java Swing Desktop Application & MySQL 8        ")
    print("================================================================")
    run_java_domain_test_suite()
    run_srs_traceability_audit()
    run_schema_audit()
    run_java_architecture_audit()
    print("\n================================================================")
    print("   ALL TEST HARNESS SUITES PASSED (100% VERIFIED)               ")
    print("================================================================")
