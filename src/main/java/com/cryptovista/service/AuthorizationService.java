package com.cryptovista.service;

import com.cryptovista.model.User;

/**
 * RBAC and ABAC authorization evaluator.
 * Adheres to SRS §4.4 (IAM-001 through IAM-009).
 */
public class AuthorizationService {
    public void checkPermission(User user, String requiredPermission) {
        if (user == null) {
            throw new SecurityException("UNAUTHENTICATED: User principal is null");
        }

        // Validate Tenant Match
        String currentTenant = TenantContext.getTenantId();
        if (!user.tenantId().equals(currentTenant)) {
            throw new SecurityException("CROSS_TENANT_DENIAL: User tenant " + user.tenantId() + " does not match active context " + currentTenant);
        }

        // Validate Role Permissions
        if (!user.role().hasPermission(requiredPermission)) {
            throw new SecurityException("ACCESS_DENIED: Role " + user.role() + " lacks required permission " + requiredPermission);
        }
    }

    public boolean isAuthorized(User user, String requiredPermission) {
        try {
            checkPermission(user, requiredPermission);
            return true;
        } catch (SecurityException e) {
            return false;
        }
    }
}

