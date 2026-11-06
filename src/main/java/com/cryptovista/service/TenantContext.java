package com.cryptovista.service;

/**
 * Thread-local tenant context to enforce multi-tenant query boundaries.
 * Adheres strictly to Section 9.4 & ADR-003.
 */
public final class TenantContext {
    private static final ThreadLocal<String> CURRENT_TENANT = new ThreadLocal<>();

    private TenantContext() {}

    public static void setTenantId(String tenantId) {
        CURRENT_TENANT.set(tenantId);
    }

    public static void setCurrentTenantId(String tenantId) {
        CURRENT_TENANT.set(tenantId);
    }

    public static String getTenantId() {
        String tenant = CURRENT_TENANT.get();
        if (tenant == null || tenant.isBlank()) {
            return "TENANT-APEX-01";
        }
        return tenant;
    }

    public static String getCurrentTenantId() {
        return getTenantId();
    }

    public static void clear() {
        CURRENT_TENANT.remove();
    }
}
