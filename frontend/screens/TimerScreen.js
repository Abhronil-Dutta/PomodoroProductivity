import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { createSession, fetchSessionByUser } from '../scripts/api';
import { useUser } from '../UserContext';

function TimerScreen({ navigation }) {
  const { userId, settings } = useUser();
  const modeSequence = ['work', 'shortRest', 'work', 'longRest'];
  const [timeLeft, setTimeLeft] = useState(0.5 * 60);
  const [timerRunning, setTimerRunning] = useState(false);
  const [currentModeIndex, setCurrentModeIndex] = useState(0);
  const [sessions, setSessions] = useState([]);
  const [quote, setQuote] = useState('');

  const motivationalQuotes = [
    "Stay focused and never give up!",
    "You can do it!",
    "Every step counts!",
    "Never gonna give you up!",
    "Success is the sum of small efforts repeated daily.",
    "Your hard work will pay off!",
    "Push yourself because no one else is going to do it for you.",
    "Great things never come from comfort zones.",
    "Dream it. Wish it. Do it.",
    "Believe you can and you're halfway there.",
    "Don’t stop when you’re tired. Stop when you’re done.",
    "Failure is not the opposite of success; it’s part of success.",
    "Work hard in silence, let success make the noise.",
    "Success doesn’t just find you; you have to go out and get it.",
    "Don’t wait for opportunity. Create it.",
    "The harder you work for something, the greater you’ll feel when you achieve it.",
    "Dream bigger. Do bigger.",
    "Don’t downgrade your dream just to fit your reality.",
    "Do something today that your future self will thank you for.",
    "Small progress is still progress.",
    "Abhronil is the best coder",
    "Success is the best revenge.",
    "Bo Burnham is peak!",
    "Don’t watch the clock; do what it does. Keep going.",
    "Doubt kills more dreams than failure ever will.",
    "Wake up with determination. Go to bed with satisfaction.",
    "A little progress each day adds up to big results.",
    "Success is what happens after you’ve survived all your mistakes.",
    "It’s going to be hard, but hard does not mean impossible.",
    "Don’t let what you cannot do interfere with what you can do.",
    "Action is the foundational key to all success.",
    "Focus on your goal. Don’t look in any direction but ahead.",
    "Discipline is the bridge between goals and accomplishment.",
    "Motivation gets you going; discipline keeps you growing.",
    "What you get by achieving your goals is not as important as what you become by achieving your goals.",
    "Success is not for the lazy.",
    "Hard work beats talent when talent doesn’t work hard.",
    "The only way to do great work is to love what you do.",
    "Set goals. Crush them. Repeat.",
    "Try Minecraft!",
    "The key to success is to start before you are ready.",
    "Success is stumbling from failure to failure with no loss of enthusiasm.",
    "You don’t have to be great to start, but you have to start to be great.",
    "The secret to getting ahead is getting started.",
    "Don’t fear failure. Fear being in the same place next year as you are today.",
    "Every accomplishment starts with the decision to try.",
    "What the sigma?!",
    "Success is walking from failure to failure with no loss of enthusiasm.",
    "A year from now, you will wish you had started today.",
    "Do the best you can until you know better. Then when you know better, do better.",
    "Opportunities don't happen. You create them.",
    "The harder the struggle, the more glorious the triumph.",
    "Success is not how high you have climbed, but how you make a positive difference to the world.",
    "Your limitation—it’s only your imagination.",
    "Success usually comes to those who are too busy to be looking for it.",
    "Hustle until your haters ask if you’re hiring.",
    "Your success will be determined by your own confidence and fortitude.",
    "When you feel like quitting, think about why you started.",
    "Don’t wish for it. Work for it.",
    "Don’t be pushed by your problems. Be led by your dreams.",
    "You are capable of amazing things.",
    "Success is no accident. It is hard work, perseverance, learning, studying, and sacrifice.",
    "Perseverance is not a long race; it is many short races one after another.",
    "The only limit to our realization of tomorrow will be our doubts of today.",
    "Never give up. Great things take time.",
    "Fall seven times, stand up eight.",
    "Go the extra mile. It’s never crowded.",
    "Strength doesn’t come from what you can do. It comes from overcoming the things you once thought you couldn’t.",
    "Dreams don’t work unless you do.",
    "If it doesn’t challenge you, it won’t change you.",
    "Believe in yourself and all that you are. Know that there is something inside you that is greater than any obstacle.",
    "What you do today can improve all your tomorrows.",
    "Do what you can with all you have, wherever you are.",
    "Keep your eyes on the stars and your feet on the ground.",
    "Success is liking yourself, liking what you do, and liking how you do it.",
    "Success doesn’t come to you. You go to it.",
    "The secret of success is to do the common thing uncommonly well.",
    "Hardships often prepare ordinary people for an extraordinary destiny.",
    "Success is not the key to happiness. Happiness is the key to success.",
    "Quality is not an act; it is a habit.",
    "Opportunities don’t happen. You create them.",
    "Success is how high you bounce when you hit bottom.",
    "Go confidently in the direction of your dreams. Live the life you have imagined.",
    "Don’t limit your challenges. Challenge your limits.",
    "Success is nothing more than a few simple disciplines practiced every day.",
    "Don’t stop when you’re tired. Stop when you’re done.",
    "Only I can change my life. No one can do it for me.",
    "The difference between ordinary and extraordinary is that little extra.",
    "Great works are performed not by strength but by perseverance.",
    "A journey of a thousand miles begins with a single step.",
    "Do not wait to strike till the iron is hot, but make it hot by striking.",
    "Don’t be afraid to give up the good to go for the great.",
    "Success is the sum of small efforts repeated day in and day out.",
    "Act as if what you do makes a difference. It does.",
    "Keep going. Everything you need will come to you at the perfect time."
];


  const calculateTimeInSeconds = (mode) => {
    const {
      workMinutes,
      workSeconds,
      shortRestMinutes,
      shortRestSeconds,
      longRestMinutes,
      longRestSeconds
    } = settings;
    switch (mode) {
      case 'work':
        return workMinutes * 60 + workSeconds;
      case 'shortRest':
        return shortRestMinutes * 60 + shortRestSeconds;
      case 'longRest':
        return longRestMinutes * 60 + longRestSeconds;
      default:
        return workMinutes * 60 + workSeconds;
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleCreateSession = async (duration) => {
    try {
      if (!userId || isNaN(userId)) {
        Alert.alert('Error', 'Invalid user ID. Please log in again.');
        navigation.navigate('Login');
        return;
      }

      const session = {
        duration: duration,
        date: new Date().toISOString().split('T')[0],
      };

      await createSession(session, userId);
      Alert.alert('Success', 'Session saved successfully!');
      fetchSessions();
    } catch (error) {
      console.error('Error saving session:', error);
      Alert.alert('Error', 'Failed to save session.');
    }
  };

  const fetchSessions = async () => {
    try {
      console.log('Fetching sessions for userId:', userId);
      const data = await fetchSessionByUser(userId);
      setSessions(data);
    } catch (error) {
      console.error('Error fetching sessions:', error);
      Alert.alert('Error', 'Failed to fetch sessions.');
    }
  };

  useEffect(() => {
    if (timerRunning && timeLeft > 0) {
      const interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (timeLeft === 0) {
      setTimerRunning(false);
      handleCreateSession(calculateTimeInSeconds(modeSequence[currentModeIndex]) / 60);
      const nextIndex = (currentModeIndex + 1) % modeSequence.length;
      setCurrentModeIndex(nextIndex);
      setTimeLeft(calculateTimeInSeconds(modeSequence[nextIndex]));
    }
  }, [timerRunning, timeLeft]);

  useEffect(() => {
    setTimeLeft(calculateTimeInSeconds(modeSequence[currentModeIndex]));
    setQuote(motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]);
  }, [settings, currentModeIndex]);

  useEffect(() => {
    if (!userId) {
      Alert.alert('Error', 'User ID not found. Redirecting to login.');
      navigation.navigate('Login');
    } else {
      fetchSessions();
    }
  }, [userId]);

  const calculateSummary = () => {
    const totalSessions = sessions.length;
    const totalDuration = sessions.reduce((sum, session) => sum + session.duration, 0);
    return `Total Sessions: ${totalSessions}, Total Duration: ${totalDuration} mins`;
  };

  return (
    <View style={[styles.container, settings.darkMode ? styles.dark : styles.light]}>
      <Text style={[styles.quote, settings.darkMode ? styles.darkText : styles.lightText]}>{quote}</Text>
      <Text style={[styles.timer, settings.darkMode ? styles.darkText : styles.lightText]}>{formatTime(timeLeft)}</Text>
      <View style={styles.buttonRow}>
        <Button title="Start/Stop" onPress={() => setTimerRunning(!timerRunning)} />
        <Button
          title="Reset"
          onPress={() => {
            setTimerRunning(false);
            setTimeLeft(calculateTimeInSeconds(modeSequence[currentModeIndex]));
          }}
        />
      </View>
      <View style={styles.modeButtons}>
        <Button
          title="Work"
          onPress={() => {
            setCurrentModeIndex(0);
            setTimeLeft(calculateTimeInSeconds('work'));
            setTimerRunning(false);
          }}
        />
        <Button
          title="Short Rest"
          onPress={() => {
            setCurrentModeIndex(1);
            setTimeLeft(calculateTimeInSeconds('shortRest'));
            setTimerRunning(false);
          }}
        />
        <Button
          title="Long Rest"
          onPress={() => {
            setCurrentModeIndex(3);
            setTimeLeft(calculateTimeInSeconds('longRest'));
            setTimerRunning(false);
          }}
        />
      </View>
      <Text style={[styles.summary, settings.darkMode ? styles.darkText : styles.lightText]}>
        {sessions.length === 0 ? 'No sessions yet.' : calculateSummary()}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  timer: { fontSize: 48, marginBottom: 20 },
  buttonRow: { flexDirection: 'row', gap: 10, margin: 10 },
  modeButtons: { flexDirection: 'row', justifyContent: 'space-evenly', marginVertical: 20, width: '100%' },
  summary: { marginTop: 20, fontSize: 16 },
  quote: { fontSize: 18, fontStyle: 'italic', marginBottom: 20, textAlign: 'center' },
  light: { backgroundColor: '#f0f0f0' },
  dark: { backgroundColor: '#333' },
  lightText: { color: '#000' },
  darkText: { color: '#fff' },
});

export default TimerScreen;
