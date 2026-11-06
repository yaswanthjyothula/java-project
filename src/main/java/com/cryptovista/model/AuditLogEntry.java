package com.cryptovista.model;

import java.time.Instant;

public record AuditLogEntry(
    long id,
    String tenantId,
    String actor,
    String action,
    String entityType,
    String entityId,
    String correlationId,
    String result,
    String details,
    Instant createdAt
) {
    public AuditLogEntry {
        if (tenantId == null || tenantId.isBlank()) throw new IllegalArgumentException("tenantId required");
        if (actor == null || actor.isBlank()) throw new IllegalArgumentException("actor required");
        if (action == null || action.isBlank()) throw new IllegalArgumentException("action required");
        if (result == null) result = "SUCCESS";
        if (createdAt == null) createdAt = Instant.now();
    }
}

