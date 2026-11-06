package com.cryptovista.repository;

import com.cryptovista.model.Lead;
import java.util.List;
import java.util.Optional;

public interface LeadRepository {
    Lead save(Lead lead);
    Optional<Lead> findById(String tenantId, String id);
    List<Lead> findAll(String tenantId);
    Optional<Lead> findByEmail(String tenantId, String email);
}

