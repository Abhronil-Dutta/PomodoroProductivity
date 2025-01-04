package com.pomodoro.pomodoro_backend.repository;

import com.pomodoro.pomodoro_backend.model.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SessionRepository extends JpaRepository<Session, Integer> {
    // JpaRepository already provides common methods like save, findById, findAll, etc.
}

