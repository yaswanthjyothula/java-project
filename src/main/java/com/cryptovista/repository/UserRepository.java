package com.cryptovista.repository;

import com.cryptovista.model.User;
import java.util.List;
import java.util.Optional;

public interface UserRepository {
    User save(User user);
    Optional<User> findById(String tenantId, String id);
    Optional<User> findByEmail(String tenantId, String email);
    Optional<User> findByEmailGlobal(String email);
    List<User> findAll(String tenantId);
}

