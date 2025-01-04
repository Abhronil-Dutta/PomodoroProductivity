import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { saveSession, getSessionsByDateRange } from './api';

function Timer() {
    const [timeleft, setTimeleft] = useState(0.5 * 60);
    const [timeState, setTimerState] = useState(false);
    const [saved, setSaved] = useState(false); 
    const [currentmode, setcurrentmode] = useState("work");

    useEffect(() => {
        if (timeState && timeleft !== 0) {
            const interval = setInterval(() => {
                setTimeleft((prevTime) => prevTime - 1);
            }, 1000);

            return () => clearInterval(interval);
        } else if (timeleft === 0 && !saved) {
            setTimerState(false);
            setSaved(true); // Prevent saving multiple times
            
            const session = {
                userId: 1,
                date: new Date().toISOString().split('T')[0],
                duration: 30,
            };

            saveSession(session)
                .then((response) => console.log('Session saved successfully: ', response))
                .catch((error) => console.error('Error saving session: ', error));
        }
    }, [timeState, timeleft, saved]);

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    const fetchData = async () => {
        const startDate = '2024-07-01';
        const endDate = '2025-01-05';

        try {
            const session = await getSessionsByDateRange(startDate, endDate);
            console.log('Fetched sessions: ', session);
        } catch (error) {
            console.error('Error fetching sessions: ', error);
        }
    };


    const setResetTime = (currentmode) => {
        if (currentmode === "work") {
            return 25 * 60;
        } else if (currentmode === "shortRest") {
            return 5 * 60;
        } else if (currentmode === "longRest") {
            return 10 * 60;
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.buttonRow}>
                <Button title="Work" 
                    onPress={() => {
                        setTimeleft(25 * 60);
                        setTimerState(false);
                        setSaved(false);
                        setcurrentmode("work");
                    }}
                />
                <Button title="Short Rest" 
                    onPress={() => {
                        setTimeleft(5 * 60);
                        setTimerState(false);
                        setSaved(false);
                        setcurrentmode("shortRest");
                    }}
                />
                <Button title="Long Rest" 
                    onPress={() => {
                        setTimeleft(10 * 60);
                        setTimerState(false);
                        setSaved(false);
                        setcurrentmode("longRest");
                    }}
                />
            </View>
            <Text style={styles.timer}>{formatTime(timeleft)}</Text>
            <View style={styles.buttonRow}>
                <Button title="Start" onPress={() => setTimerState(!timeState)} />
                <Button 
                    title='Reset' 
                    onPress={() => { 
                        setTimeleft(setResetTime(currentmode)); 
                        setTimerState(false); 
                        setSaved(false); // Reset the saved flag
                    }} 
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f0f0f0' },
    timer: { fontSize: 48, marginBottom: 20 },
    buttonRow: { flexDirection: 'row', gap: 10, margin: 10 },
});

export default Timer;
