package com.pomodoro.pomodoro_backend.service;

import com.pomodoro.pomodoro_backend.model.Session;
import com.pomodoro.pomodoro_backend.repository.SessionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SessionService {

    @Autowired
    private SessionRepository sessionRepository;

    public List<Session> getAllSessions() {
        return sessionRepository.findAll();
    }

    public Session saveSession(Session session) {
        return sessionRepository.save(session);   
    }

    public List<Session> getSessionsByDateRange(LocalDate startDate, LocalDate endDate) {
        System.out.println("Filtering sessions from " + startDate + " to " + endDate);
        return sessionRepository.findAll().stream()
            .filter(session -> {
                // Convert Date to LocalDate
                LocalDate sessionDate = session.getDate().toInstant()
                    .atZone(ZoneId.systemDefault())
                    .toLocalDate();

                // Filter by date range
                return !sessionDate.isBefore(startDate) && !sessionDate.isAfter(endDate);
            })
            .collect(Collectors.toList());
    }
}

