package com.cryptovista.repository.memory;

import com.cryptovista.model.User;
import com.cryptovista.repository.UserRepository;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

public class InMemoryUserRepository implements UserRepository {
    private final Map<String, User> users = new ConcurrentHashMap<>();

    private String key(String tenantId, String id) {
        return tenantId + ":" + id;
    }

    @Override
    public User save(User user) {
        users.put(key(user.tenantId(), user.id()), user);
        return user;
    }

    @Override
    public Optional<User> findById(String tenantId, String id) {
        return Optional.ofNullable(users.get(key(tenantId, id)));
    }

    @Override
    public Optional<User> findByEmail(String tenantId, String email) {
        return users.values().stream()
                .filter(u -> u.tenantId().equals(tenantId) && u.email().equalsIgnoreCase(email))
                .findFirst();
    }

    @Override
    public Optional<User> findByEmailGlobal(String email) {
        return users.values().stream()
                .filter(u -> u.email().equalsIgnoreCase(email))
                .findFirst();
    }

    @Override
    public List<User> findAll(String tenantId) {
        return users.values().stream()
                .filter(u -> u.tenantId().equals(tenantId))
                .collect(Collectors.toList());
    }
}

