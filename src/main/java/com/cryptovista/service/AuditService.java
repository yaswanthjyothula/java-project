package com.cryptovista.service;

import com.cryptovista.model.AuditLogEntry;
import com.cryptovista.repository.AuditRepository;

import java.time.Instant;
import java.util.List;
import java.util.regex.Pattern;

/**
 * Immutable audit logger with automatic secret redaction.
 * Adheres to SRS §4.18 (AUD-001 through AUD-007).
 */
public class AuditService {
    private final AuditRepository auditRepository;
    private static final Pattern SENSITIVE_PATTERN = Pattern.compile("(?i)(password|secret|totp|token)=[^,;\\s]+");

    public AuditService(AuditRepository auditRepository) {
        this.auditRepository = auditRepository;
    }

    public AuditLogEntry log(String actor, String action, String entityType, String entityId, String correlationId, String result, String details) {
        String tenantId = TenantContext.getTenantId();
        String safeDetails = redactSensitiveInfo(details);

        AuditLogEntry entry = new AuditLogEntry(
                0,
                tenantId,
                actor != null ? actor : "system",
                action,
                entityType != null ? entityType : "RESOURCE",
                entityId != null ? entityId : "UNKNOWN",
                correlationId != null ? correlationId : "CORR-" + System.currentTimeMillis(),
                result != null ? result : "SUCCESS",
                safeDetails,
                Instant.now()
        );
        return auditRepository.append(entry);
    }

    public List<AuditLogEntry> getRecentLogs(int limit) {
        return auditRepository.findRecentByTenant(TenantContext.getTenantId(), limit);
    }

    private String redactSensitiveInfo(String input) {
        if (input == null) return "";
        return SENSITIVE_PATTERN.matcher(input).replaceAll("$1=[REDACTED]");
    }
}

