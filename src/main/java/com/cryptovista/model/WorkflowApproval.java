package com.cryptovista.model;

import java.math.BigDecimal;
import java.time.Instant;

public record WorkflowApproval(
    String tenantId,
    String id,
    String taskType,
    String requesterUserId,
    String customerId,
    BigDecimal requestedValue,
    String status,
    String justification,
    String decisionByUserId,
    Instant decisionAt,
    Instant createdAt
) {
    public WorkflowApproval {
        if (tenantId == null || tenantId.isBlank()) throw new IllegalArgumentException("tenantId required");
        if (id == null || id.isBlank()) throw new IllegalArgumentException("Approval id required");
        if (taskType == null) taskType = "DISCOUNT_OVERRIDE";
        if (status == null) status = "PENDING";
        if (createdAt == null) createdAt = Instant.now();
    }
}

