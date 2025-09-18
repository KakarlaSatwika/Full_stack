package com.bus.bookmybus.controller;

import com.bus.bookmybus.dto.UserLoginRequest;
import com.bus.bookmybus.model.User;
import com.bus.bookmybus.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {

    @Autowired
    private UserService service;

    @PostMapping("/register")
    public User register(@RequestBody User u) {
        return service.register(u);
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody UserLoginRequest req) {
        boolean ok = service.login(req.getUsername(), req.getPassword());
        return ok ? ResponseEntity.ok("Login success")
                  : ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
    }
}
