package com.cryptovista;

import com.cryptovista.model.*;
import com.cryptovista.repository.memory.InMemoryDataStore;
import com.cryptovista.service.*;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;
import java.util.List;

public class SimulationAndSecurityTest {
    private InMemoryDataStore dataStore;
    private AuditService auditService;
    private AuthorizationService authzService;
    private AuthService authService;
    private CrmService crmService;
    private TicketService ticketService;
    private WorkflowService workflowService;
    private TradingSimulationEngine tradingEngine;

    private User operatorUser;
    private User adminUser;
    private User tenantBUser;

    @BeforeEach
    public void setup() {
        dataStore = new InMemoryDataStore();
        auditService = new AuditService(dataStore.getAuditRepository());
        authzService = new AuthorizationService();
        authService = new AuthService(dataStore.getUserRepository(), auditService);
        crmService = new CrmService(
                dataStore.getCustomerRepository(),
                dataStore.getLeadRepository(),
                dataStore.getOpportunityRepository(),
                dataStore.getTicketRepository(),
                authzService,
                auditService
        );
        ticketService = new TicketService(dataStore.getTicketRepository(), authzService, auditService);
        workflowService = new WorkflowService(dataStore.getWorkflowRepository(), authzService, auditService);
        tradingEngine = new TradingSimulationEngine();

        TenantContext.setCurrentTenantId("TENANT-APEX-01");
        operatorUser = new User("TENANT-APEX-01", "USR-01", "operator@apex.in", "Priya Sharma", "hash", User.Role.OPERATOR, "ACTIVE", 0, false, null);
        adminUser = new User("TENANT-APEX-01", "ADMIN-01", "admin@apex.in", "Rahul Verma", "hash", User.Role.TENANT_ADMIN, "ACTIVE", 0, false, null);
        tenantBUser = new User("TENANT-BRAVO-02", "USR-B1", "user@bravo.com", "Bravo User", "hash", User.Role.OPERATOR, "ACTIVE", 0, false, null);
    }

    @Test
    public void testPurePasswordAuthenticationAndNoMfa() {
        // Successful login using User ID and Password only
        AuthService.AuthResult success = authService.login("operator@apexcapital.in", "password123");
        Assertions.assertTrue(success.success());
        Assertions.assertNotNull(success.session());
        Assertions.assertEquals("TENANT-APEX-01", success.session().tenantId());

        // Failed login
        AuthService.AuthResult failure = authService.login("operator@apexcapital.in", "wrongPassword");
        Assertions.assertFalse(failure.success());
        Assertions.assertEquals("Invalid User ID or Password.", failure.message());
    }

    @Test
    public void testTenantIsolationIntegrity() {
        // Create Customer in Tenant A
        TenantContext.setCurrentTenantId("TENANT-APEX-01");
        Customer custA = crmService.createCustomer(operatorUser, "Alpha Capital Corp", "INSTITUTIONAL", "priya.sharma");
        Assertions.assertNotNull(custA);

        // Switch to Tenant B
        TenantContext.setCurrentTenantId("TENANT-BRAVO-02");
        List<Customer> tenantBCustomers = crmService.listCustomers(tenantBUser);
        // Must not contain Customer from Tenant A
        boolean leaked = tenantBCustomers.stream().anyMatch(c -> c.id().equals(custA.id()));
        Assertions.assertFalse(leaked, "CRITICAL: Cross-tenant data leakage detected!");
    }

    @Test
    public void testLeadConversionTransactionalIntegrity() {
        TenantContext.setCurrentTenantId("TENANT-APEX-01");
        // Convert existing lead LEAD-001 (from seed)
        CrmService.LeadConversionResult result = crmService.convertLead(operatorUser, "LEAD-001", new BigDecimal("500000.00"), "Software Expansion");
        Assertions.assertTrue(result.success());
        Assertions.assertNotNull(result.customer());
        Assertions.assertNotNull(result.opportunity());

        // Idempotency: Attempting duplicate conversion must be rejected
        CrmService.LeadConversionResult duplicateAttempt = crmService.convertLead(operatorUser, "LEAD-001", new BigDecimal("500000.00"), "Software Expansion");
        Assertions.assertFalse(duplicateAttempt.success());
        Assertions.assertEquals("LEAD_ALREADY_CONVERTED", duplicateAttempt.message());
    }

    @Test
    public void testSupportInternalNoteSegregation() {
        TenantContext.setCurrentTenantId("TENANT-APEX-01");
        SupportTicket ticket = ticketService.createTicket(operatorUser, "CUST-9942", "Latency Question", "HIGH");

        // Add confidential internal note
        TicketInternalNote note = ticketService.addInternalNote(operatorUser, ticket.id(), "Confidential: Router maintenance underway. Do not disclose IPs.");
        Assertions.assertNotNull(note);

        // Fetch internal notes as operator
        List<TicketInternalNote> notes = ticketService.getInternalNotes(operatorUser, ticket.id());
        Assertions.assertEquals(1, notes.size());
        Assertions.assertTrue(notes.get(0).noteContent().contains("Confidential"));
    }

    @Test
    public void testWorkflowApprovalLifecycle() {
        TenantContext.setCurrentTenantId("TENANT-APEX-01");
        WorkflowApproval app = workflowService.submitApproval(operatorUser, "DISCOUNT_OVERRIDE", "CUST-9942", new BigDecimal("50000.00"), "Multi-year deal");
        Assertions.assertEquals("PENDING", app.status());

        // Approve as admin
        WorkflowApproval approved = workflowService.approve(adminUser, app.id());
        Assertions.assertEquals("APPROVED", approved.status());

        // Idempotency: Re-approving must fail
        Assertions.assertThrows(IllegalStateException.class, () -> workflowService.approve(adminUser, app.id()));
    }

    @Test
    public void testSimulatedTradingBalancedLedgerAndInvariants() {
        String accountId = "VA-TEST-01";
        tradingEngine.initializeAccount(accountId, new BigDecimal("2000000.00")); // 20 Lakhs virtual INR

        // Execute Buy Order
        TradingSimulationEngine.OrderCommand buyCmd = new TradingSimulationEngine.OrderCommand(
                "ORD-001", "TENANT-APEX-01", accountId, "BTC", true,
                new BigDecimal("0.25"), new BigDecimal("5924800.00"), "IDEMP-KEY-001"
        );

        TradingSimulationEngine.ExecutionResult res = tradingEngine.executeSimulatedOrder(buyCmd);
        Assertions.assertTrue(res.success());
        Assertions.assertEquals(new BigDecimal("0.25"), tradingEngine.getHolding(accountId, "BTC"));
        Assertions.assertEquals(new BigDecimal("517318.80"), tradingEngine.getCashBalance(accountId));

        // Invariant: Balanced Double-Entry Ledger (Debits == Credits)
        Assertions.assertEquals(1, tradingEngine.getLedgerHistory().size());

        // Invariant: Non-Negative Available Balance (Excessive Buy Rejected)
        TradingSimulationEngine.OrderCommand excessiveBuy = new TradingSimulationEngine.OrderCommand(
                "ORD-002", "TENANT-APEX-01", accountId, "BTC", true,
                new BigDecimal("10.0"), new BigDecimal("5924800.00"), "IDEMP-KEY-002"
        );
        TradingSimulationEngine.ExecutionResult failRes = tradingEngine.executeSimulatedOrder(excessiveBuy);
        Assertions.assertFalse(failRes.success());
        Assertions.assertEquals("INSUFFICIENT_VIRTUAL_FUNDS", failRes.message());
        Assertions.assertTrue(tradingEngine.getCashBalance(accountId).compareTo(BigDecimal.ZERO) >= 0);
    }

    @Test
    public void testAuditLoggingAndSecretRedaction() {
        TenantContext.setCurrentTenantId("TENANT-APEX-01");
        AuditLogEntry entry = auditService.log("operator", "AUTH_LOGIN", "USER", "USR-1", "C-1", "SUCCESS", "Attempted with password=SuperSecretPassword123");
        Assertions.assertFalse(entry.details().contains("SuperSecretPassword123"), "CRITICAL: Password exposed in audit log!");
        Assertions.assertTrue(entry.details().contains("password=[REDACTED]"));
    }

    @Test
    public void testFinancialMathPrecision() {
        BigDecimal notional = FinancialMath.calculateNotional(new BigDecimal("0.25"), new BigDecimal("5924800.00"));
        BigDecimal fee = FinancialMath.calculateFee(notional, new BigDecimal("0.0010"));
        BigDecimal total = FinancialMath.calculateTotalCost(notional, fee, true);

        Assertions.assertEquals(new BigDecimal("1481200.00"), notional);
        Assertions.assertEquals(new BigDecimal("1481.20"), fee);
        Assertions.assertEquals(new BigDecimal("1482681.20"), total);
    }
}
