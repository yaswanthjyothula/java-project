package com.cryptovista.service;

import com.cryptovista.model.*;
import com.cryptovista.repository.*;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;
import java.util.*;

/**
 * Enterprise CRM Service.
 * Implements Customer 360, Duplicate Review, and Transactional Lead Conversion
 * per SRS §4.5 & §4.6.
 */
public class CrmService {
    private final CustomerRepository customerRepository;
    private final LeadRepository leadRepository;
    private final OpportunityRepository opportunityRepository;
    private final TicketRepository ticketRepository;
    private final AuthorizationService authorizationService;
    private final AuditService auditService;

    public record Customer360Record(
            Customer customer,
            List<Opportunity> opportunities,
            List<SupportTicket> openTickets,
            int healthScore
    ) {}

    public record LeadConversionResult(
            boolean success,
            String message,
            Customer customer,
            Opportunity opportunity
    ) {}

    public CrmService(
            CustomerRepository customerRepository,
            LeadRepository leadRepository,
            OpportunityRepository opportunityRepository,
            TicketRepository ticketRepository,
            AuthorizationService authorizationService,
            AuditService auditService
    ) {
        this.customerRepository = customerRepository;
        this.leadRepository = leadRepository;
        this.opportunityRepository = opportunityRepository;
        this.ticketRepository = ticketRepository;
        this.authorizationService = authorizationService;
        this.auditService = auditService;
    }

    public synchronized Customer createCustomer(User actor, String name, String type, String owner) {
        authorizationService.checkPermission(actor, "CRM_MANAGE");
        String tenantId = TenantContext.getTenantId();

        // Duplicate check (CRM-CUS-006)
        Optional<Customer> existing = customerRepository.findByName(tenantId, name);
        if (existing.isPresent()) {
            throw new IllegalArgumentException("DUPLICATE_CUSTOMER: Account with name '" + name + "' already exists");
        }

        String id = "CUST-" + (1000 + customerRepository.findAll(tenantId).size() + 1);
        Customer customer = new Customer(
                tenantId,
                id,
                "AC-" + id,
                name,
                type != null ? type : "INSTITUTIONAL",
                "ACTIVE_ENTERPRISE",
                85,
                owner != null ? owner : actor.id(),
                Instant.now()
        );

        customerRepository.save(customer);
        auditService.log(actor.email(), "CUSTOMER_CREATE", "CUSTOMER", customer.id(), null, "SUCCESS", "Created enterprise customer " + name);
        return customer;
    }

    public synchronized LeadConversionResult convertLead(User actor, String leadId, BigDecimal estimatedValue, String oppTitle) {
        authorizationService.checkPermission(actor, "LEAD_CONVERT");
        String tenantId = TenantContext.getTenantId();

        Lead lead = leadRepository.findById(tenantId, leadId)
                .orElseThrow(() -> new NoSuchElementException("LEAD_NOT_FOUND: " + leadId));

        if ("CONVERTED".equalsIgnoreCase(lead.status())) {
            // Idempotent: duplicate conversion blocked (CRM-LEAD-006)
            return new LeadConversionResult(false, "LEAD_ALREADY_CONVERTED", null, null);
        }

        // 1. Create or match Customer
        String custName = lead.company() != null && !lead.company().isBlank() ? lead.company() : lead.fullName() + " (Ind)";
        Customer customer = customerRepository.findByName(tenantId, custName)
                .orElseGet(() -> {
                    String newCustId = "CUST-" + UUID.randomUUID().toString().substring(0, 8);
                    Customer created = new Customer(tenantId, newCustId, "AC-" + newCustId, custName, "ENTERPRISE", "ONBOARDING", 90, actor.id(), Instant.now());
                    return customerRepository.save(created);
                });

        // 2. Create Opportunity
        String oppId = "OPP-" + UUID.randomUUID().toString().substring(0, 8);
        Opportunity opp = new Opportunity(
                tenantId,
                oppId,
                customer.id(),
                oppTitle != null ? oppTitle : "Enterprise Software License - " + custName,
                "QUALIFICATION",
                estimatedValue != null ? estimatedValue : BigDecimal.ZERO,
                60,
                LocalDate.now().plusMonths(1),
                Instant.now()
        );
        opportunityRepository.save(opp);

        // 3. Mark Lead as Converted
        Lead updatedLead = new Lead(
                lead.tenantId(),
                lead.id(),
                lead.leadNumber(),
                lead.fullName(),
                lead.company(),
                lead.email(),
                "CONVERTED",
                lead.source(),
                100,
                actor.id(),
                lead.createdAt()
        );
        leadRepository.save(updatedLead);

        // 4. Log audit event
        auditService.log(actor.email(), "LEAD_CONVERT", "LEAD", lead.id(), null, "SUCCESS",
                "Converted lead " + lead.fullName() + " into Customer " + customer.id() + " and Opportunity " + opp.id());

        return new LeadConversionResult(true, "LEAD_CONVERTED_SUCCESSFULLY", customer, opp);
    }

    public Customer360Record getCustomer360(User actor, String customerId) {
        String tenantId = TenantContext.getTenantId();
        Customer customer = customerRepository.findById(tenantId, customerId)
                .orElseThrow(() -> new NoSuchElementException("CUSTOMER_NOT_FOUND: " + customerId));

        List<Opportunity> opps = opportunityRepository.findByCustomerId(tenantId, customerId);
        List<SupportTicket> tickets = ticketRepository.findTicketsByCustomerId(tenantId, customerId);

        return new Customer360Record(customer, opps, tickets, customer.healthScore());
    }

    public List<Customer> listCustomers(User actor) {
        return customerRepository.findAll(TenantContext.getTenantId());
    }

    public List<Lead> listLeads(User actor) {
        return leadRepository.findAll(TenantContext.getTenantId());
    }

    public Lead createLead(User actor, String fullName, String company, String email, String source) {
        authorizationService.checkPermission(actor, "CRM_MANAGE");
        String tenantId = TenantContext.getTenantId();
        String id = "LEAD-" + UUID.randomUUID().toString().substring(0, 8);
        Lead lead = new Lead(
                tenantId,
                id,
                "LN-" + id,
                fullName,
                company,
                email,
                "QUALIFIED",
                source != null ? source : "DIRECT_SALES",
                75,
                actor.id(),
                Instant.now()
        );
        leadRepository.save(lead);
        auditService.log(actor.email(), "LEAD_CREATE", "LEAD", lead.id(), null, "SUCCESS", "Created lead " + fullName);
        return lead;
    }
}

