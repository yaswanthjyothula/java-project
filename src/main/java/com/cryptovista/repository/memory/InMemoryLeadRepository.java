package com.cryptovista.repository.memory;

import com.cryptovista.model.Lead;
import com.cryptovista.repository.LeadRepository;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

public class InMemoryLeadRepository implements LeadRepository {
    private final Map<String, Lead> leads = new ConcurrentHashMap<>();

    private String key(String tenantId, String id) {
        return tenantId + ":" + id;
    }

    @Override
    public Lead save(Lead lead) {
        leads.put(key(lead.tenantId(), lead.id()), lead);
        return lead;
    }

    @Override
    public Optional<Lead> findById(String tenantId, String id) {
        return Optional.ofNullable(leads.get(key(tenantId, id)));
    }

    @Override
    public Optional<Lead> findByEmail(String tenantId, String email) {
        return leads.values().stream()
                .filter(l -> l.tenantId().equals(tenantId) && l.email().equalsIgnoreCase(email))
                .findFirst();
    }

    @Override
    public List<Lead> findAll(String tenantId) {
        return leads.values().stream()
                .filter(l -> l.tenantId().equals(tenantId))
                .sorted(Comparator.comparing(Lead::createdAt).reversed())
                .collect(Collectors.toList());
    }
}

