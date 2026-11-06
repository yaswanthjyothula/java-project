package com.cryptovista.model;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;

public record Opportunity(
    String tenantId,
    String id,
    String customerId,
    String title,
    String stage,
    BigDecimal value,
    int probability,
    LocalDate expectedClose,
    Instant createdAt
) {
    public Opportunity {
        if (tenantId == null || tenantId.isBlank()) throw new IllegalArgumentException("tenantId required");
        if (id == null || id.isBlank()) throw new IllegalArgumentException("Opportunity id required");
        if (customerId == null || customerId.isBlank()) throw new IllegalArgumentException("customerId required");
        if (title == null || title.isBlank()) throw new IllegalArgumentException("title required");
        if (stage == null) stage = "QUALIFICATION";
        if (value == null) value = BigDecimal.ZERO;
        if (expectedClose == null) expectedClose = LocalDate.now().plusMonths(1);
        if (createdAt == null) createdAt = Instant.now();
    }
}

