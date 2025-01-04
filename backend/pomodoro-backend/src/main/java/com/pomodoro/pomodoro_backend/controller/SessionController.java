package com.pomodoro.pomodoro_backend.controller;

import com.pomodoro.pomodoro_backend.model.Session;
import com.pomodoro.pomodoro_backend.service.SessionService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.time.LocalDate;


@RestController
@RequestMapping("/api/sessions") // Base URL for all endpoints in this controller
public class SessionController {

    @Autowired
    private SessionService sessionService;

    // Endpoint to fetch all sessions
    @GetMapping
    public List<Session> getAllSessions() {
        return sessionService.getAllSessions();
    }

    // Endpoint to save a session
    @PostMapping
    public Session saveSession(@RequestBody Session session) {
        return sessionService.saveSession(session);
    }

    @GetMapping("/date-range")
    public List<Session> getSessionsByDateRange(
        @RequestParam("startDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
        @RequestParam("endDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
            System.out.println("Received startDate: " + startDate);
            System.out.println("Received endDate: " + endDate);
    return sessionService.getSessionsByDateRange(startDate, endDate);
}
}