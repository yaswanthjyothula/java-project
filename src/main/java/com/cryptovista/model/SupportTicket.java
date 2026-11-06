package com.cryptovista.model;

import java.time.Instant;

public record SupportTicket(
    String tenantId,
    String id,
    String customerId,
    String ticketNumber,
    String subject,
    String priority,
    String status,
    String assignedUserId,
    Instant slaDueAt,
    Instant createdAt
) {
    public SupportTicket {
        if (tenantId == null || tenantId.isBlank()) throw new IllegalArgumentException("tenantId required");
        if (id == null || id.isBlank()) throw new IllegalArgumentException("Ticket id required");
        if (customerId == null || customerId.isBlank()) throw new IllegalArgumentException("customerId required");
        if (subject == null || subject.isBlank()) throw new IllegalArgumentException("subject required");
        if (ticketNumber == null) ticketNumber = "TK-" + id;
        if (priority == null) priority = "NORMAL";
        if (status == null) status = "OPEN";
        if (createdAt == null) createdAt = Instant.now();
        if (slaDueAt == null) slaDueAt = createdAt.plusSeconds(14400); // 4 hours default
    }
}

