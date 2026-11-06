package com.cryptovista.repository;

import com.cryptovista.model.WorkflowApproval;
import java.util.List;
import java.util.Optional;

public interface WorkflowRepository {
    WorkflowApproval save(WorkflowApproval approval);
    Optional<WorkflowApproval> findById(String tenantId, String id);
    List<WorkflowApproval> findAll(String tenantId);
    List<WorkflowApproval> findPending(String tenantId);
}

