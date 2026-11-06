package com.cryptovista.repository.memory;

import com.cryptovista.model.AuditLogEntry;
import com.cryptovista.repository.AuditRepository;

import java.util.*;
import java.util.concurrent.atomic.AtomicLong;
import java.util.stream.Collectors;

public class InMemoryAuditRepository implements AuditRepository {
    private final List<AuditLogEntry> auditLogs = Collections.synchronizedList(new ArrayList<>());
    private final AtomicLong auditIdGen = new AtomicLong(1000);

    @Override
    public AuditLogEntry append(AuditLogEntry entry) {
        AuditLogEntry stored = new AuditLogEntry(
                auditIdGen.incrementAndGet(),
                entry.tenantId(),
                entry.actor(),
                entry.action(),
                entry.entityType(),
                entry.entityId(),
                entry.correlationId(),
                entry.result(),
                entry.details(),
                entry.createdAt()
        );
        auditLogs.add(stored);
        return stored;
    }

    @Override
    public List<AuditLogEntry> findRecentByTenant(String tenantId, int limit) {
        synchronized (auditLogs) {
            return auditLogs.stream()
                    .filter(a -> a.tenantId().equals(tenantId))
                    .sorted(Comparator.comparing(AuditLogEntry::createdAt).reversed())
                    .limit(limit)
                    .collect(Collectors.toList());
        }
    }
}
