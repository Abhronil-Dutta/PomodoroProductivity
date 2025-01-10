package com.pomodoro.pomodoro_backend.controller;

import com.pomodoro.pomodoro_backend.model.Session;
import com.pomodoro.pomodoro_backend.model.User;
import com.pomodoro.pomodoro_backend.repository.SessionRepository;
import com.pomodoro.pomodoro_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/sessions")
public class SessionController {

    @Autowired
    private SessionRepository sessionRepository;

    @Autowired
    private UserRepository userRepository;

    @PostMapping
    public ResponseEntity<String> addSession(@RequestBody Session session, @RequestParam Long userId) {
        if (userId == null || userId <= 0) {
            return ResponseEntity.badRequest().body("Invalid userId");
        }

        Optional<User> user = userRepository.findById(userId);
        if (user.isEmpty()) {
            return ResponseEntity.badRequest().body("User not found");
        }

        session.setUser(user.get());
        session.setDate(new Date());
        sessionRepository.save(session);

        return ResponseEntity.ok("Session added successfully");
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Session>> getSessionsByUser(@PathVariable Long userId) {
        Optional<User> user = userRepository.findById(userId);
        if (user.isEmpty()) {
            return ResponseEntity.badRequest().body(null);
        }

        List<Session> sessions = sessionRepository.findByUser(user.get());
        return ResponseEntity.ok(sessions);
    }
    
}

