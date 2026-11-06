package com.cryptovista.repository;

import com.cryptovista.model.AuditLogEntry;
import java.util.List;

public interface AuditRepository {
    AuditLogEntry append(AuditLogEntry entry);
    List<AuditLogEntry> findRecentByTenant(String tenantId, int limit);
}

