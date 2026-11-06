package com.cryptovista.model;

import java.time.Instant;

public record Contact(
    String tenantId,
    String id,
    String customerId,
    String fullName,
    String email,
    String phone,
    String title,
    boolean consentGiven,
    Instant createdAt
) {
    public Contact {
        if (tenantId == null || tenantId.isBlank()) throw new IllegalArgumentException("tenantId required");
        if (id == null || id.isBlank()) throw new IllegalArgumentException("Contact id required");
        if (customerId == null || customerId.isBlank()) throw new IllegalArgumentException("customerId required");
        if (fullName == null || fullName.isBlank()) throw new IllegalArgumentException("fullName required");
        if (createdAt == null) createdAt = Instant.now();
    }
}

