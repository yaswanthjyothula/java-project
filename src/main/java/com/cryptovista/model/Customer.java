package com.cryptovista.model;

import java.time.Instant;

public record Customer(
    String tenantId,
    String id,
    String customerNumber,
    String name,
    String type,
    String lifecycleStage,
    int healthScore,
    String ownerUserId,
    Instant createdAt
) {
    public Customer {
        if (tenantId == null || tenantId.isBlank()) throw new IllegalArgumentException("tenantId required");
        if (id == null || id.isBlank()) throw new IllegalArgumentException("Customer id required");
        if (name == null || name.isBlank()) throw new IllegalArgumentException("Customer name required");
        if (customerNumber == null) customerNumber = "CUST-" + id;
        if (type == null) type = "INSTITUTIONAL";
        if (lifecycleStage == null) lifecycleStage = "ACTIVE_ENTERPRISE";
        if (healthScore < 0 || healthScore > 100) healthScore = 85;
        if (createdAt == null) createdAt = Instant.now();
    }
}

