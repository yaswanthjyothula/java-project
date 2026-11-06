package com.cryptovista.repository.memory;

import com.cryptovista.model.SupportTicket;
import com.cryptovista.model.TicketInternalNote;
import com.cryptovista.repository.TicketRepository;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

public class InMemoryTicketRepository implements TicketRepository {
    private final Map<String, SupportTicket> tickets = new ConcurrentHashMap<>();
    private final Map<String, List<TicketInternalNote>> internalNotes = new ConcurrentHashMap<>();

    private String key(String tenantId, String id) {
        return tenantId + ":" + id;
    }

    @Override
    public SupportTicket saveTicket(SupportTicket ticket) {
        tickets.put(key(ticket.tenantId(), ticket.id()), ticket);
        return ticket;
    }

    @Override
    public Optional<SupportTicket> findTicketById(String tenantId, String id) {
        return Optional.ofNullable(tickets.get(key(tenantId, id)));
    }

    @Override
    public List<SupportTicket> findTicketsByCustomerId(String tenantId, String customerId) {
        return tickets.values().stream()
                .filter(t -> t.tenantId().equals(tenantId) && t.customerId().equals(customerId))
                .sorted(Comparator.comparing(SupportTicket::createdAt).reversed())
                .collect(Collectors.toList());
    }

    @Override
    public List<SupportTicket> findAllTickets(String tenantId) {
        return tickets.values().stream()
                .filter(t -> t.tenantId().equals(tenantId))
                .sorted(Comparator.comparing(SupportTicket::createdAt).reversed())
                .collect(Collectors.toList());
    }

    @Override
    public TicketInternalNote saveInternalNote(TicketInternalNote note) {
        String k = key(note.tenantId(), note.ticketId());
        internalNotes.computeIfAbsent(k, _k -> Collections.synchronizedList(new ArrayList<>())).add(note);
        return note;
    }

    @Override
    public List<TicketInternalNote> findInternalNotesByTicketId(String tenantId, String ticketId) {
        String k = key(tenantId, ticketId);
        List<TicketInternalNote> list = internalNotes.get(k);
        return list == null ? Collections.emptyList() : new ArrayList<>(list);
    }
}
