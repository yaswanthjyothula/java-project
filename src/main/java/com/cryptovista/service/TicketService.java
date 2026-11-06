package com.cryptovista.service;

import com.cryptovista.model.SupportTicket;
import com.cryptovista.model.TicketInternalNote;
import com.cryptovista.model.User;
import com.cryptovista.repository.TicketRepository;

import java.time.Duration;
import java.time.Instant;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.UUID;

/**
 * Service & SLA Management Service.
 * Implements ticket routing, SLA calculations, and strict segregation
 * of confidential internal operator notes per SRS §4.8 (SUP-004 & SUP-006).
 */
public class TicketService {
    private final TicketRepository ticketRepository;
    private final AuthorizationService authorizationService;
    private final AuditService auditService;

    public TicketService(TicketRepository ticketRepository, AuthorizationService authorizationService, AuditService auditService) {
        this.ticketRepository = ticketRepository;
        this.authorizationService = authorizationService;
        this.auditService = auditService;
    }

    public SupportTicket createTicket(User actor, String customerId, String subject, String priority) {
        authorizationService.checkPermission(actor, "TICKET_MANAGE");
        String tenantId = TenantContext.getTenantId();

        String id = "TK-" + UUID.randomUUID().toString().substring(0, 6).toUpperCase();
        Instant now = Instant.now();
        Instant slaDue = "HIGH".equalsIgnoreCase(priority) ? now.plusSeconds(7200) : now.plusSeconds(14400); // 2h or 4h

        SupportTicket ticket = new SupportTicket(
                tenantId,
                id,
                customerId,
                id,
                subject,
                priority != null ? priority : "NORMAL",
                "OPEN",
                actor.id(),
                slaDue,
                now
        );

        ticketRepository.saveTicket(ticket);
        auditService.log(actor.email(), "TICKET_CREATE", "TICKET", ticket.id(), null, "SUCCESS", "Created ticket " + subject);
        return ticket;
    }

    public TicketInternalNote addInternalNote(User actor, String ticketId, String noteContent) {
        // Internal notes strictly restricted to authorized operators
        authorizationService.checkPermission(actor, "NOTE_INTERNAL");
        String tenantId = TenantContext.getTenantId();

        // Verify ticket exists in active tenant
        ticketRepository.findTicketById(tenantId, ticketId)
                .orElseThrow(() -> new NoSuchElementException("TICKET_NOT_FOUND: " + ticketId));

        String noteId = "NOTE-" + UUID.randomUUID().toString().substring(0, 8);
        TicketInternalNote note = new TicketInternalNote(
                tenantId,
                noteId,
                ticketId,
                actor.email(),
                noteContent,
                Instant.now()
        );

        ticketRepository.saveInternalNote(note);
        auditService.log(actor.email(), "TICKET_INTERNAL_NOTE_ADD", "TICKET", ticketId, null, "SUCCESS", "Appended confidential operator note");
        return note;
    }

    public List<TicketInternalNote> getInternalNotes(User actor, String ticketId) {
        authorizationService.checkPermission(actor, "NOTE_INTERNAL");
        return ticketRepository.findInternalNotesByTicketId(TenantContext.getTenantId(), ticketId);
    }

    public long calculateSlaRemainingSeconds(SupportTicket ticket) {
        Instant now = Instant.now();
        if (ticket.slaDueAt() == null || now.isAfter(ticket.slaDueAt())) {
            return 0; // Breached or expired
        }
        return Duration.between(now, ticket.slaDueAt()).getSeconds();
    }

    public List<SupportTicket> listTickets() {
        return ticketRepository.findAllTickets(TenantContext.getTenantId());
    }
}

