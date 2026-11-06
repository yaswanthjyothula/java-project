package com.cryptovista.model;

import java.time.Instant;
import java.util.Set;

/**
 * Immutable Enterprise User entity.
 * Authentication model: User ID and Password only. Zero MFA/OTP.
 */
public record User(
    String tenantId,
    String id,
    String email,
    String fullName,
    String passwordHash,
    Role role,
    String status,
    int failedLogins,
    boolean isLocked,
    Instant createdAt
) {
    public enum Role {
        TENANT_ADMIN(Set.of("ALL")),
        OPERATOR(Set.of("CRM_MANAGE", "LEAD_CONVERT", "OPPORTUNITY_MANAGE", "TRADE_SIMULATE", "TICKET_MANAGE", "NOTE_INTERNAL", "VIEW_NAV", "AUDIT_VIEW")),
        SALES_REP(Set.of("CRM_MANAGE", "LEAD_CONVERT", "OPPORTUNITY_MANAGE")),
        SUPPORT_AGENT(Set.of("TICKET_MANAGE", "NOTE_INTERNAL")),
        ANALYST(Set.of("VIEW_MARKET", "TRADE_SIMULATE", "VIEW_NAV", "EXPORT_REPORT")),
        AUDITOR(Set.of("VIEW_ALL_READONLY", "AUDIT_VIEW"));

        private final Set<String> permissions;
        Role(Set<String> permissions) { this.permissions = permissions; }
        public boolean hasPermission(String perm) {
            return permissions.contains("ALL") || permissions.contains(perm);
        }
    }

    public User {
        if (tenantId == null || tenantId.isBlank()) throw new IllegalArgumentException("tenantId required");
        if (id == null || id.isBlank()) throw new IllegalArgumentException("User id required");
        if (email == null || email.isBlank()) throw new IllegalArgumentException("User email required");
        if (role == null) role = Role.OPERATOR;
        if (status == null) status = "ACTIVE";
        if (createdAt == null) createdAt = Instant.now();
    }
}
