package com.cryptovista.repository.memory;

import com.cryptovista.model.WorkflowApproval;
import com.cryptovista.repository.WorkflowRepository;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

public class InMemoryWorkflowRepository implements WorkflowRepository {
    private final Map<String, WorkflowApproval> approvals = new ConcurrentHashMap<>();

    private String key(String tenantId, String id) {
        return tenantId + ":" + id;
    }

    @Override
    public WorkflowApproval save(WorkflowApproval approval) {
        approvals.put(key(approval.tenantId(), approval.id()), approval);
        return approval;
    }

    @Override
    public Optional<WorkflowApproval> findById(String tenantId, String id) {
        return Optional.ofNullable(approvals.get(key(tenantId, id)));
    }

    @Override
    public List<WorkflowApproval> findAll(String tenantId) {
        return approvals.values().stream()
                .filter(a -> a.tenantId().equals(tenantId))
                .sorted(Comparator.comparing(WorkflowApproval::createdAt).reversed())
                .collect(Collectors.toList());
    }

    @Override
    public List<WorkflowApproval> findPending(String tenantId) {
        return approvals.values().stream()
                .filter(a -> a.tenantId().equals(tenantId) && "PENDING".equalsIgnoreCase(a.status()))
                .sorted(Comparator.comparing(WorkflowApproval::createdAt).reversed())
                .collect(Collectors.toList());
    }
}
