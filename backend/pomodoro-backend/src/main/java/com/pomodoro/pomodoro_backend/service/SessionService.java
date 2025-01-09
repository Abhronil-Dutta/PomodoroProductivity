/*package com.pomodoro.pomodoro_backend.service;

import com.pomodoro.pomodoro_backend.model.Session;
import com.pomodoro.pomodoro_backend.model.User;
import com.pomodoro.pomodoro_backend.repository.SessionRepository;
import com.pomodoro.pomodoro_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SessionService {

    @Autowired
    private SessionRepository sessionRepository;

    @Autowired
    private UserRepository userRepository;

    public Session saveSession(Session session, Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        session.setUser(user);
        return sessionRepository.save(session);
    }

    public List<Session> getSessionsByUser(Long userId) {
        return sessionRepository.findByUserId(userId);
    }
}*/

