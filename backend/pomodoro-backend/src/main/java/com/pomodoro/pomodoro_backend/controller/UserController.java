package com.pomodoro.pomodoro_backend.controller;

import com.pomodoro.pomodoro_backend.model.User;
import com.pomodoro.pomodoro_backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/signup")
    public User signUp(@RequestBody Map<String, String> payload) { // Use @RequestBody if you're sending JSON
        String username = payload.get("username");
        String password = payload.get("password");
        return userService.signUp(username, password);
    }

    @PostMapping("/login")
    public User logIn(@RequestBody Map<String, String> payload) {
        String username = payload.get("username");
        String password = payload.get("password");
        return userService.logIn(username, password);
    }
}

