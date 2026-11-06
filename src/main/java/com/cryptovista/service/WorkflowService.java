package com.cryptovista.service;

import com.cryptovista.model.User;
import com.cryptovista.model.WorkflowApproval;
import com.cryptovista.repository.WorkflowRepository;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.UUID;

/**
 * Enterprise Workflow & Multi-Tier Approvals Service.
 * Implements discount exceptions, role elevation, and approval auditability
 * per SRS §4.10 (WF-001 through WF-007).
 */
public class WorkflowService {
    private final WorkflowRepository workflowRepository;
    private final AuthorizationService authorizationService;
    private final AuditService auditService;

    public WorkflowService(WorkflowRepository workflowRepository, AuthorizationService authorizationService, AuditService auditService) {
        this.workflowRepository = workflowRepository;
        this.authorizationService = authorizationService;
        this.auditService = auditService;
    }

    public WorkflowApproval submitApproval(User actor, String taskType, String customerId, BigDecimal requestedValue, String justification) {
        String tenantId = TenantContext.getTenantId();
        String id = "APP-" + UUID.randomUUID().toString().substring(0, 6).toUpperCase();

        WorkflowApproval approval = new WorkflowApproval(
                tenantId,
                id,
                taskType != null ? taskType : "DISCOUNT_OVERRIDE",
                actor.email(),
                customerId,
                requestedValue != null ? requestedValue : BigDecimal.ZERO,
                "PENDING",
                justification != null ? justification : "Standard business justification",
                null,
                null,
                Instant.now()
        );

        workflowRepository.save(approval);
        auditService.log(actor.email(), "WORKFLOW_APPROVAL_SUBMIT", "WORKFLOW", approval.id(), null, "SUCCESS", "Submitted " + taskType);
        return approval;
    }

    public synchronized WorkflowApproval approve(User actor, String approvalId) {
        // Approvals require elevated administrator authority
        authorizationService.checkPermission(actor, "ALL");
        String tenantId = TenantContext.getTenantId();

        WorkflowApproval existing = workflowRepository.findById(tenantId, approvalId)
                .orElseThrow(() -> new NoSuchElementException("APPROVAL_NOT_FOUND: " + approvalId));

        if (!"PENDING".equalsIgnoreCase(existing.status())) {
            throw new IllegalStateException("IDEMPOTENT_REJECTION: Approval " + approvalId + " is already " + existing.status());
        }

        WorkflowApproval updated = new WorkflowApproval(
                existing.tenantId(),
                existing.id(),
                existing.taskType(),
                existing.requesterUserId(),
                existing.customerId(),
                existing.requestedValue(),
                "APPROVED",
                existing.justification(),
                actor.email(),
                Instant.now(),
                existing.createdAt()
        );

        workflowRepository.save(updated);
        auditService.log(actor.email(), "WORKFLOW_APPROVE", "WORKFLOW", approvalId, null, "SUCCESS", "Approved " + existing.taskType());
        return updated;
    }

    public synchronized WorkflowApproval reject(User actor, String approvalId, String reason) {
        authorizationService.checkPermission(actor, "ALL");
        String tenantId = TenantContext.getTenantId();

        WorkflowApproval existing = workflowRepository.findById(tenantId, approvalId)
                .orElseThrow(() -> new NoSuchElementException("APPROVAL_NOT_FOUND: " + approvalId));

        if (!"PENDING".equalsIgnoreCase(existing.status())) {
            throw new IllegalStateException("IDEMPOTENT_REJECTION: Approval " + approvalId + " is already " + existing.status());
        }

        WorkflowApproval updated = new WorkflowApproval(
                existing.tenantId(),
                existing.id(),
                existing.taskType(),
                existing.requesterUserId(),
                existing.customerId(),
                existing.requestedValue(),
                "REJECTED: " + reason,
                existing.justification(),
                actor.email(),
                Instant.now(),
                existing.createdAt()
        );

        workflowRepository.save(updated);
        auditService.log(actor.email(), "WORKFLOW_REJECT", "WORKFLOW", approvalId, null, "REJECTED", "Rejected " + existing.taskType() + " reason: " + reason);
        return updated;
    }

    public List<WorkflowApproval> listPending() {
        return workflowRepository.findPending(TenantContext.getTenantId());
    }
}

