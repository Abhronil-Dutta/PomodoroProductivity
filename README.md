# Pomodoro Productivity Timer App
A **React Native** and **Spring Boot** based mobile app designed to implement the **Pomodoro Technique**, allowing users to enhance productivity, manage sessions, and track progress with personalized timers and motivational quotes.

## Features
**Customizable Timers:** Adjust work, short rest, and long rest durations in minutes and seconds.
**User Authentication:** Secure signup and login functionality using a MySQL database and Spring Boot backend.
**Motivational Quotes:** Display uplifting quotes to keep users inspired.
**Session Tracking:** Log and retrieve past productivity sessions with date and duration.
**Dark/Light Mode:** Switch between modes for enhanced accessibility.
**Settings Screen**: Modify timer settings and theme preferences dynamically.
## Technologies Used
### Frontend
**React Native:** Built the user interface and handled state using Context API.
**React Navigation:** Implemented navigation between screens (e.g., Login, Timer, Settings).
**Axios:** Simplified HTTP requests to the backend.
### Backend
**Spring Boot:** Developed RESTful APIs for user and session management.
**MySQL:** Stored user data and session history securely.
### Tools
**Node.js:** React Native environment setup.
**Gradle:** Dependency management for the Spring Boot backend.
**Postman:** API testing and debugging.
**Android Studio**: Emulated the app for testing.
## Installation
### Prerequisites
**Node.js and npm:** For React Native setup.
**Java JDK 17 or higher:** For Spring Boot backend.
**MySQL:** Database setup.
### Steps
#### Clone the repository:

`git clone https://github.com/Abhronil-Dutta/PomodoroProductivity.git
cd pomodoro-timer-app`

#### Install dependencies:

**Frontend:**

`cd frontend
npm install`

**Backend: Ensure you have Gradle installed, then:**

`cd backend
cd pomodoro-backend
gradle build`

#### Run the backend server:

Update the application.properties file in backend/src/main/resources/ with your MySQL credentials.
**Start the server:**

`gradle bootRun`

#### Run the mobile app:

Ensure your emulator or physical device is ready.
**Start the app:**

`npx react-native run-android`


## API Endpoints

### User API
| Method | Endpoint           | Description            |
|--------|--------------------|------------------------|
| POST   | /api/users/signup  | Signup a new user      |
| POST   | /api/users/login   | Login an existing user |

### Session API
| Method | Endpoint                  | Description                 |
|--------|---------------------------|-----------------------------|
| POST   | /api/sessions             | Add a new session for the user |
| GET    | /api/sessions/user/{id}   | Fetch sessions by user ID   |

## License and Copyright
This project is licensed under the MIT License. You are free to use, modify, and distribute this code under the terms of the license.

Copyright (c) 2025 Abhronil Dutta

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
