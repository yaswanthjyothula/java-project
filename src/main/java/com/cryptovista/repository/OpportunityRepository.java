package com.cryptovista.repository;

import com.cryptovista.model.Opportunity;
import java.util.List;
import java.util.Optional;

public interface OpportunityRepository {
    Opportunity save(Opportunity opportunity);
    Optional<Opportunity> findById(String tenantId, String id);
    List<Opportunity> findByCustomerId(String tenantId, String customerId);
    List<Opportunity> findAll(String tenantId);
}

