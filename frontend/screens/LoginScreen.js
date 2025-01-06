import React, { useState } from "react";
import {View, Text, TextInput, Button, StyleSheet, Alert} from 'react-native';
import axios from "axios";

export default function LoginScreen({navigation}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    const handleLogin = async () => {
        try {
            const response = await axios.post('http://153.33.8.38:8080/api/users/login' ,  {
                username, 
                password,
            });
            Alert.alert('Success', 'Logged in successfully!!!');
            navigation.navigate('Home');
        } catch (error) {
            Alert.alert('Error', 'Invalid username or password.')
        }
    }

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
            <Button title='Login' onPress={handleLogin} />
            <Text
                style={styles.link}
                onPress={()=> navigation.navigate('SignUp')}
            >Dont have an account? SignUp</Text>
        </View>
    )
}





const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 20 },
    title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
    input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10, borderRadius: 5 },
    link: { marginTop: 15, textAlign: 'center', color: 'blue' },
});