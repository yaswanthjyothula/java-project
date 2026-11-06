package com.cryptovista.model;

import java.time.Instant;

public record Tenant(
    String id,
    String name,
    String tier,
    String status,
    Instant createdAt
) {
    public Tenant {
        if (id == null || id.isBlank()) throw new IllegalArgumentException("Tenant ID cannot be empty");
        if (name == null || name.isBlank()) throw new IllegalArgumentException("Tenant name cannot be empty");
        if (tier == null) tier = "ENTERPRISE";
        if (status == null) status = "ACTIVE";
        if (createdAt == null) createdAt = Instant.now();
    }
}

