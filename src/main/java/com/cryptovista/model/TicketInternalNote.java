package com.cryptovista.model;

import java.time.Instant;

/**
 * Confidential internal operator note for support cases.
 * Strictly segregated from customer-visible messages per SRS §4.8 (SUP-004) and Section 7.8.
 */
public record TicketInternalNote(
    String tenantId,
    String id,
    String ticketId,
    String authorUserId,
    String noteContent,
    Instant createdAt
) {
    public TicketInternalNote {
        if (tenantId == null || tenantId.isBlank()) throw new IllegalArgumentException("tenantId required");
        if (id == null || id.isBlank()) throw new IllegalArgumentException("Note id required");
        if (ticketId == null || ticketId.isBlank()) throw new IllegalArgumentException("ticketId required");
        if (authorUserId == null || authorUserId.isBlank()) throw new IllegalArgumentException("authorUserId required");
        if (noteContent == null || noteContent.isBlank()) throw new IllegalArgumentException("noteContent required");
        if (createdAt == null) createdAt = Instant.now();
    }
}

