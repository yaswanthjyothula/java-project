package com.cryptovista.repository.memory;

import com.cryptovista.model.Opportunity;
import com.cryptovista.repository.OpportunityRepository;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

public class InMemoryOpportunityRepository implements OpportunityRepository {
    private final Map<String, Opportunity> opportunities = new ConcurrentHashMap<>();

    private String key(String tenantId, String id) {
        return tenantId + ":" + id;
    }

    @Override
    public Opportunity save(Opportunity opp) {
        opportunities.put(key(opp.tenantId(), opp.id()), opp);
        return opp;
    }

    @Override
    public Optional<Opportunity> findById(String tenantId, String id) {
        return Optional.ofNullable(opportunities.get(key(tenantId, id)));
    }

    @Override
    public List<Opportunity> findByCustomerId(String tenantId, String customerId) {
        return opportunities.values().stream()
                .filter(o -> o.tenantId().equals(tenantId) && o.customerId().equals(customerId))
                .collect(Collectors.toList());
    }

    @Override
    public List<Opportunity> findAll(String tenantId) {
        return opportunities.values().stream()
                .filter(o -> o.tenantId().equals(tenantId))
                .sorted(Comparator.comparing(Opportunity::createdAt).reversed())
                .collect(Collectors.toList());
    }
}

