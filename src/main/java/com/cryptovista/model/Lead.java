package com.cryptovista.model;

import java.time.Instant;

public record Lead(
    String tenantId,
    String id,
    String leadNumber,
    String fullName,
    String company,
    String email,
    String status,
    String source,
    int score,
    String ownerUserId,
    Instant createdAt
) {
    public Lead {
        if (tenantId == null || tenantId.isBlank()) throw new IllegalArgumentException("tenantId required");
        if (id == null || id.isBlank()) throw new IllegalArgumentException("Lead id required");
        if (fullName == null || fullName.isBlank()) throw new IllegalArgumentException("Lead fullName required");
        if (leadNumber == null) leadNumber = "LEAD-" + id;
        if (status == null) status = "NEW";
        if (source == null) source = "WEBSITE_INQUIRY";
        if (createdAt == null) createdAt = Instant.now();
    }
}

