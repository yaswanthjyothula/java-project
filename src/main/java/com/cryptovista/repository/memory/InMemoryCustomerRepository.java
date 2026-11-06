package com.cryptovista.repository.memory;

import com.cryptovista.model.Customer;
import com.cryptovista.repository.CustomerRepository;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

public class InMemoryCustomerRepository implements CustomerRepository {
    private final Map<String, Customer> customers = new ConcurrentHashMap<>();

    private String key(String tenantId, String id) {
        return tenantId + ":" + id;
    }

    @Override
    public Customer save(Customer customer) {
        customers.put(key(customer.tenantId(), customer.id()), customer);
        return customer;
    }

    @Override
    public Optional<Customer> findById(String tenantId, String id) {
        return Optional.ofNullable(customers.get(key(tenantId, id)));
    }

    @Override
    public List<Customer> findAll(String tenantId) {
        return customers.values().stream()
                .filter(c -> c.tenantId().equals(tenantId))
                .sorted(Comparator.comparing(Customer::createdAt).reversed())
                .collect(Collectors.toList());
    }

    @Override
    public Optional<Customer> findByName(String tenantId, String name) {
        return customers.values().stream()
                .filter(c -> c.tenantId().equals(tenantId) && c.name().equalsIgnoreCase(name))
                .findFirst();
    }

    @Override
    public boolean delete(String tenantId, String id) {
        return customers.remove(key(tenantId, id)) != null;
    }
}
