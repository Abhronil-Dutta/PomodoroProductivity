import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Switch } from 'react-native';
import { useUser } from '../UserContext';

export default function SettingsScreen({ navigation }) {
  const { settings, setSettings } = useUser();
  const [workMinutes, setWorkMinutes] = useState(settings.workMinutes);
  const [workSeconds, setWorkSeconds] = useState(settings.workSeconds);
  const [shortRestMinutes, setShortRestMinutes] = useState(settings.shortRestMinutes);
  const [shortRestSeconds, setShortRestSeconds] = useState(settings.shortRestSeconds);
  const [longRestMinutes, setLongRestMinutes] = useState(settings.longRestMinutes);
  const [longRestSeconds, setLongRestSeconds] = useState(settings.longRestSeconds);
  const [darkMode, setDarkMode] = useState(settings.darkMode);

  const handleSaveSettings = () => {
    setSettings({
      workMinutes,
      workSeconds,
      shortRestMinutes,
      shortRestSeconds,
      longRestMinutes,
      longRestSeconds,
      darkMode,
    });

    alert('Settings saved successfully!');
    navigation.navigate('Home');
  };

  return (
    <View style={[styles.container, darkMode ? styles.dark : styles.light]}>
      <Text style={[styles.title, darkMode ? styles.darkText : styles.lightText]}>Settings</Text>

      {/* Work Time */}
      <Text style={darkMode ? styles.darkText : styles.lightText}>Work Time:</Text>
      <View style={styles.timeInputRow}>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={workMinutes.toString()}
          onChangeText={(text) => setWorkMinutes(Number(text))}
          placeholder="MM"
        />
        <Text style={darkMode ? styles.darkText : styles.lightText}>:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={workSeconds.toString()}
          onChangeText={(text) => setWorkSeconds(Number(text))}
          placeholder="SS"
        />
      </View>

      {/* Short Rest Time */}
      <Text style={darkMode ? styles.darkText : styles.lightText}>Short Rest Time:</Text>
      <View style={styles.timeInputRow}>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={shortRestMinutes.toString()}
          onChangeText={(text) => setShortRestMinutes(Number(text))}
          placeholder="MM"
        />
        <Text style={darkMode ? styles.darkText : styles.lightText}>:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={shortRestSeconds.toString()}
          onChangeText={(text) => setShortRestSeconds(Number(text))}
          placeholder="SS"
        />
      </View>

      {/* Long Rest Time */}
      <Text style={darkMode ? styles.darkText : styles.lightText}>Long Rest Time:</Text>
      <View style={styles.timeInputRow}>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={longRestMinutes.toString()}
          onChangeText={(text) => setLongRestMinutes(Number(text))}
          placeholder="MM"
        />
        <Text style={darkMode ? styles.darkText : styles.lightText}>:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={longRestSeconds.toString()}
          onChangeText={(text) => setLongRestSeconds(Number(text))}
          placeholder="SS"
        />
      </View>

      {/* Dark Mode */}
      <View style={styles.switchRow}>
        <Text style={darkMode ? styles.darkText : styles.lightText}>Dark Mode:</Text>
        <Switch value={darkMode} onValueChange={(value) => setDarkMode(value)} />
      </View>

      <Button title="Save" onPress={handleSaveSettings} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    margin: 5,
    borderRadius: 5,
    width: 60,
    textAlign: 'center',
  },
  timeInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  light: { backgroundColor: '#f0f0f0' },
  dark: { backgroundColor: '#333' },
  lightText: { color: '#000' },
  darkText: { color: '#fff' },
});
