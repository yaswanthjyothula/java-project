package com.cryptovista.repository.memory;

import com.cryptovista.model.*;
import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;

/**
 * Thread-safe multi-tenant in-memory data store coordinator.
 * Holds individual dedicated repositories for customers, leads, opportunities,
 * tickets, workflows, audits, and users with zero method signature collisions.
 */
public class InMemoryDataStore {

        private final InMemoryCustomerRepository customerRepo = new InMemoryCustomerRepository();
        private final InMemoryLeadRepository leadRepo = new InMemoryLeadRepository();
        private final InMemoryOpportunityRepository opportunityRepo = new InMemoryOpportunityRepository();
        private final InMemoryTicketRepository ticketRepo = new InMemoryTicketRepository();
        private final InMemoryWorkflowRepository workflowRepo = new InMemoryWorkflowRepository();
        private final InMemoryAuditRepository auditRepo = new InMemoryAuditRepository();
        private final InMemoryUserRepository userRepo = new InMemoryUserRepository();

        public InMemoryDataStore() {
                seedInitialEnterpriseData();
        }

        public InMemoryCustomerRepository getCustomerRepository() {
                return customerRepo;
        }

        public InMemoryLeadRepository getLeadRepository() {
                return leadRepo;
        }

        public InMemoryOpportunityRepository getOpportunityRepository() {
                return opportunityRepo;
        }

        public InMemoryTicketRepository getTicketRepository() {
                return ticketRepo;
        }

        public InMemoryWorkflowRepository getWorkflowRepository() {
                return workflowRepo;
        }

        public InMemoryAuditRepository getAuditRepository() {
                return auditRepo;
        }

        public InMemoryUserRepository getUserRepository() {
                return userRepo;
        }

        private void seedInitialEnterpriseData() {
                String tenant = "TENANT-APEX-01";

                // Seed Default Users
                userRepo.save(new User(
                                tenant,
                                "USR-001",
                                "operator@apexcapital.in",
                                "Apex Operator",
                                "$2a$12$e8Y5M59HwE7x7d/n1c6x2.O3Pz0K9D0X9F4Q5V6A7B8C9D0E1F2G3",
                                User.Role.OPERATOR,
                                "ACTIVE",
                                0,
                                false,
                                Instant.now().minusSeconds(86400 * 30)));

                userRepo.save(new User(
                                tenant,
                                "USR-ADMIN",
                                "admin@apexcapital.in",
                                "Apex Administrator",
                                "$2a$12$e8Y5M59HwE7x7d/n1c6x2.O3Pz0K9D0X9F4Q5V6A7B8C9D0E1F2G3",
                                User.Role.TENANT_ADMIN,
                                "ACTIVE",
                                0,
                                false,
                                Instant.now().minusSeconds(86400 * 60)));

                // Seed Customers
                customerRepo.save(new Customer(
                                tenant, "CUST-001", "CUST-8021", "Bharat Digital Custody Pvt Ltd",
                                "INSTITUTIONAL", "ACTIVE_ENTERPRISE",
                                94, "USR-001", Instant.now().minusSeconds(86400 * 45)));
                customerRepo.save(new Customer(
                                tenant, "CUST-002", "CUST-8022", "Deccan Algorithmic Fund LLP",
                                "INSTITUTIONAL", "ACTIVE_ENTERPRISE",
                                88, "USR-001", Instant.now().minusSeconds(86400 * 20)));
                customerRepo.save(new Customer(
                                tenant, "CUST-003", "CUST-8023", "Zenith Family Office Advisors",
                                "WEALTH", "ONBOARDING",
                                76, "USR-001", Instant.now().minusSeconds(86400 * 5)));

                // Seed Leads
                leadRepo.save(new Lead(
                                tenant, "LEAD-001", "LEAD-101", "Vikram Malhotra",
                                "Malhotra Family Office", "vikram@malhotrawealth.in",
                                "QUALIFIED", "WEBSITE_INQUIRY", 85, "USR-001", Instant.now().minusSeconds(86400 * 7)));
                leadRepo.save(new Lead(
                                tenant, "LEAD-002", "LEAD-102", "Ananya Deshmukh",
                                "Deccan Fintech Labs", "ananya@deccanfintech.com",
                                "NEW", "REFERRAL", 65, "USR-001", Instant.now().minusSeconds(86400 * 2)));

                // Seed Opportunities
                opportunityRepo.save(new Opportunity(
                                tenant, "OPP-001", "CUST-001",
                                "Enterprise Market Data Feed Integration",
                                "PROPOSAL", new BigDecimal("1250000.00"), 75,
                                LocalDate.now().plusDays(30), Instant.now().minusSeconds(86400 * 15)));
                opportunityRepo.save(new Opportunity(
                                tenant, "OPP-002", "CUST-002",
                                "Algorithmic Simulated Execution Gateway",
                                "NEGOTIATION", new BigDecimal("2800000.00"), 90,
                                LocalDate.now().plusDays(14), Instant.now().minusSeconds(86400 * 10)));

                // Seed Tickets
                ticketRepo.saveTicket(new SupportTicket(
                                tenant, "TCK-001", "CUST-001", "TCK-1094",
                                "Simulated matching engine latency spike on ETH limit orders",
                                "HIGH", "IN_PROGRESS",
                                "USR-001", Instant.now().plusSeconds(3600 * 4), Instant.now().minusSeconds(7200)));
                ticketRepo.saveTicket(new SupportTicket(
                                tenant, "TCK-002", "CUST-002", "TCK-1095",
                                "Periodic ledger audit export request for Q3 virtual settlements",
                                "NORMAL", "OPEN",
                                "USR-001", Instant.now().plusSeconds(3600 * 18), Instant.now().minusSeconds(3600)));

                // Seed Internal Note
                ticketRepo.saveInternalNote(new TicketInternalNote(
                                tenant, "NOTE-001", "TCK-001", "USR-001",
                                "Investigated network latency: issue was caused by internal mock randomizer buffer limit. Applied fix to memory cache.",
                                Instant.now().minusSeconds(3000)));

                // Seed Approvals
                workflowRepo.save(new WorkflowApproval(
                                tenant, "WFA-001", "COMMERCIAL_DISCOUNT",
                                "USR-001", "CUST-002", new BigDecimal("420000.00"),
                                "PENDING", "Commercial 15% discount exception for Deccan Algorithmic Fund",
                                null, null, Instant.now().minusSeconds(14400)));

                // Seed Audit Logs
                auditRepo.append(new AuditLogEntry(
                                1L, tenant, "operator@apexcapital.in", "AUTHENTICATED",
                                "SESSION", "SES-001", "CORR-883", "SUCCESS",
                                "Single-step user ID and password session established",
                                Instant.now().minusSeconds(3600)));
        }
}
