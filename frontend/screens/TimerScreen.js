import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { saveSession, getSessionsByUser } from '../scripts/api';

function Timer({route}) {
    const modeSequence = ["work", "shortRest", "work", "longRest"];
    const { userId } = route.params;
    const [timeleft, setTimeleft] = useState(0.5 * 60);
    const [timeState, setTimerState] = useState(false);
    const [saved, setSaved] = useState(false);
    const [currentModeIndex, setCurrentModeIndex] = useState(0);
    const [sessions, setSessions] = useState([]);

    const setResetTime = (mode) => {
        switch (mode) {
            case "work":
                return 0.5 * 60;
            case "shortRest":
                return 0.1 * 60;
            case "longRest":
                return 0.2 * 60;
            default:
                return 0.5 * 60;
        }
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };


    const saveSessionWithTimezone = (session) => {
        const utcDate = new Date(session.date).toISOString();
        const sessionsWithUTC = { ...session, date: utcDate };

        return saveSession(sessionsWithUTC)
    }

    useEffect(() => {
        if (timeState && timeleft !== 0) {
            const interval = setInterval(() => {
                setTimeleft((prevTime) => prevTime - 1);
            }, 1000);
            return () => clearInterval(interval);
        } else if (timeleft === 0 && !saved) {
            setTimerState(false);
            setSaved(true);

            if (modeSequence[currentModeIndex] === "work") {
                const session = {
                    userId: userId,
                    date: new Date().toISOString().split('T')[0],
                    duration: 25,
                };
                console.log("Local Timezone: ", Intl.DateTimeFormat().resolvedOptions().timeZone);
                saveSessionWithTimezone(session)
                    .then((response) => console.log("Session saved successfully: ", response))
                    .catch((error) => console.error("Error saving session: ", error));
            }

            const nextIndex = (currentModeIndex + 1) % modeSequence.length;
            setCurrentModeIndex(nextIndex);
            setTimeleft(setResetTime(modeSequence[nextIndex]));
            setSaved(false);
        }
    }, [timeState, timeleft, saved, currentModeIndex]);

    const fetchSessions = async () => {
        try {
            const data = await getSessionsByUser(userId);
            setSessions(data);
        } catch (error) {
            console.error('Error fetching sessions:', error);
        }
    };

    useEffect(() => {
        fetchSessions();
    }, [userId]);


    return (
        <View style={styles.container}>
            <View style={styles.buttonRow}>
                <Button
                    title="Work"
                    onPress={() => {
                        setTimeleft(0.5 * 60);
                        setTimerState(false);
                        setSaved(false);
                        setCurrentModeIndex(0);
                    }}
                />
                <Button
                    title="Short Rest"
                    onPress={() => {
                        setTimeleft(0.1 * 60);
                        setTimerState(false);
                        setSaved(false);
                        setCurrentModeIndex(1);
                    }}
                />
                <Button
                    title="Long Rest"
                    onPress={() => {
                        setTimeleft(0.2 * 60);
                        setTimerState(false);
                        setSaved(false);
                        setCurrentModeIndex(3);
                    }}
                />
            </View>
            <Text style={styles.timer}>{formatTime(timeleft)}</Text>
            <View style={styles.buttonRow}>
                <Button title="Start" onPress={() => setTimerState(!timeState)} />
                <Button
                    title="Reset"
                    onPress={() => {
                        setTimeleft(setResetTime(modeSequence[currentModeIndex]));
                        setTimerState(false);
                        setSaved(false);
                    }}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#f0f0f0" },
    timer: { fontSize: 48, marginBottom: 20 },
    buttonRow: { flexDirection: "row", gap: 10, margin: 10 },
});

export default Timer;
