package com.pomodoro.pomodoro_backend.repository;

import com.pomodoro.pomodoro_backend.model.Session;
import com.pomodoro.pomodoro_backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SessionRepository extends JpaRepository<Session, Long> {
    List<Session> findByUser(User user);
}


