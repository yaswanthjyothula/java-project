package com.cryptovista.service;

import com.cryptovista.repository.memory.InMemoryDataStore;
import java.math.BigDecimal;

/**
 * Central Service Registry providing singleton access to the
 * trusted service boundaries for the Swing application and API layer.
 */
public final class ServiceRegistry {
    private static final ServiceRegistry INSTANCE = new ServiceRegistry();

    private final InMemoryDataStore dataStore;
    private final AuditService auditService;
    private final AuthorizationService authorizationService;
    private final AuthService authService;
    private final CrmService crmService;
    private final TicketService ticketService;
    private final WorkflowService workflowService;
    private final TradingSimulationEngine tradingEngine;
    private final MarketDataService marketDataService;
    private final PortfolioService portfolioService;

    private ServiceRegistry() {
        this.dataStore = new InMemoryDataStore();
        this.auditService = new AuditService(dataStore.getAuditRepository());
        this.authorizationService = new AuthorizationService();
        this.authService = new AuthService(dataStore.getUserRepository(), auditService);
        this.crmService = new CrmService(
                dataStore.getCustomerRepository(),
                dataStore.getLeadRepository(),
                dataStore.getOpportunityRepository(),
                dataStore.getTicketRepository(),
                authorizationService,
                auditService
        );
        this.ticketService = new TicketService(dataStore.getTicketRepository(), authorizationService, auditService);
        this.workflowService = new WorkflowService(dataStore.getWorkflowRepository(), authorizationService, auditService);
        this.tradingEngine = new TradingSimulationEngine();
        this.marketDataService = new MarketDataService();
        this.portfolioService = new PortfolioService(tradingEngine, marketDataService);

        // Bootstrap default virtual account for simulated trading
        this.tradingEngine.initializeAccount("VA-88392", new BigDecimal("10000000.00"));
    }

    public static ServiceRegistry getInstance() {
        return INSTANCE;
    }

    public InMemoryDataStore getDataStore() { return dataStore; }
    public AuditService getAuditService() { return auditService; }
    public AuthorizationService getAuthorizationService() { return authorizationService; }
    public AuthService getAuthService() { return authService; }
    public CrmService getCrmService() { return crmService; }
    public TicketService getTicketService() { return ticketService; }
    public WorkflowService getWorkflowService() { return workflowService; }
    public TradingSimulationEngine getTradingEngine() { return tradingEngine; }
    public MarketDataService getMarketDataService() { return marketDataService; }
    public PortfolioService getPortfolioService() { return portfolioService; }
}
