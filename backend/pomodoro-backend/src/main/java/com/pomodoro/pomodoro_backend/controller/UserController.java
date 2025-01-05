package com.pomodoro.pomodoro_backend.controller;

import com.pomodoro.pomodoro_backend.model.User;
import com.pomodoro.pomodoro_backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/signup")
    public User signUp(@RequestParam String username, @RequestParam String password) {
        return userService.signUp(username, password);
    }

    @PostMapping("/login")
    public User logIn(@RequestParam String username, @RequestParam String password) {
        return userService.logIn(username, password);
    }
}

