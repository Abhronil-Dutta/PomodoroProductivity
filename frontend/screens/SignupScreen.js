import React, { useState } from "react";
import {View, Text, TextInput, Button, StyleSheet, Alert} from 'react-native';
import axios from "axios";

export default function SignupScreen({navigation}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    const handleSignUp = async () => {
        try {
            const response = await axios.post('http://153.33.8.38:8080/api/users/signup' ,  {
                username, 
                password,
            });
            Alert.alert('Success', 'Account Created successfully!!');
            navigation.navigate('Login');
        } catch (error) {
            Alert.alert('Error', 'Could not create account. Try again.')
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>SignUp</Text>
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
            <Button title='SignUp' onPress={handleSignUp} />
            <Text
                style={styles.link}
                onPress={()=> navigation.navigate('Login')}
            >Already have an account? Login</Text>
        </View>
    )
}





const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 20 },
    title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
    input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10, borderRadius: 5 },
    link: { marginTop: 15, textAlign: 'center', color: 'blue' },
});