package com.pomodoro.pomodoro_backend;

import com.pomodoro.pomodoro_backend.service.UserDetailsServiceImpl;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable()) // Disable CSRF protection for simplicity in APIs
            .authorizeHttpRequests(auth -> auth
                .requestMatchers(
                    "/api/users/signup", // Public access for sign-up
                    "/api/users/login"   // Public access for login
                ).permitAll()
                .anyRequest().authenticated() // Other endpoints require authentication
            )
            .httpBasic(httpBasic -> httpBasic.disable()); // Disable HTTP Basic authentication if not needed

        return http.build();
    }



    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public UserDetailsService userDetailsService(UserDetailsServiceImpl userDetailsService) {
        return userDetailsService;
    }
}
