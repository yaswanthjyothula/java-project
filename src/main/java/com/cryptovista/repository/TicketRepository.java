package com.cryptovista.repository;

import com.cryptovista.model.SupportTicket;
import com.cryptovista.model.TicketInternalNote;
import java.util.List;
import java.util.Optional;

public interface TicketRepository {
    SupportTicket saveTicket(SupportTicket ticket);
    Optional<SupportTicket> findTicketById(String tenantId, String id);
    List<SupportTicket> findTicketsByCustomerId(String tenantId, String customerId);
    List<SupportTicket> findAllTickets(String tenantId);

    // Internal notes (strictly isolated per SUP-004)
    TicketInternalNote saveInternalNote(TicketInternalNote note);
    List<TicketInternalNote> findInternalNotesByTicketId(String tenantId, String ticketId);
}

