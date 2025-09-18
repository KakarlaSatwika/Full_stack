package com.bus.bookmybus.service;

import com.bus.bookmybus.model.User;
import com.bus.bookmybus.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository repo;

    public User register(User u) { return repo.save(u); }

    public boolean login(String username, String password) {
        Optional<User> userOpt = repo.findByUsername(username);
        return userOpt.map(u -> u.getPassword().equals(password)).orElse(false);
    }
}
