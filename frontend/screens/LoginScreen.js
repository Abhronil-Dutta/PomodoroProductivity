import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useUser } from '../UserContext';
import { login, signup } from '../scripts/api';

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setUserId } = useUser();

  const handleLogin = async () => {
    try {
        console.log('Sending login request...');
        const user = await login(username, password);
        if (!user.id) {
            throw new Error('No userId returned from server.');
        }
        setUserId(user.id);
        Alert.alert('Success', 'Logged in successfully!');
        navigation.navigate('Home', { userId: user.id });
    } catch (error) {
        console.error('Login failed:', error.message || error);
        Alert.alert('Error', error.message || 'Invalid username or password.');
    }
  };

  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Login" onPress={handleLogin} />
      <Text style={styles.link} onPress={() => navigation.navigate('SignUp')}>
        Don't have an account? Sign Up
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10, borderRadius: 5 },
  link: { marginTop: 15, textAlign: 'center', color: 'blue' },
});
