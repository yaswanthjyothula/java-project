package com.cryptovista.repository;

import com.cryptovista.model.Customer;
import java.util.List;
import java.util.Optional;

public interface CustomerRepository {
    Customer save(Customer customer);
    Optional<Customer> findById(String tenantId, String id);
    List<Customer> findAll(String tenantId);
    Optional<Customer> findByName(String tenantId, String name);
    boolean delete(String tenantId, String id);
}

