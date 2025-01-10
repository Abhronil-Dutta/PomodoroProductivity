import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import TimerScreen from './screens/TimerScreen';
import { UserProvider } from './UserContext';
import SettingsScreen from './screens/SettingsScreen';
import { Button } from 'react-native';

const Stack = createStackNavigator();

export default function App() {
  return (
    <UserProvider>
      <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignupScreen} />
        <Stack.Screen
            name="Home"
            component={TimerScreen}
            options={({ navigation }) => ({
              headerRight: () => (
                <Button title="Settings" onPress={() => navigation.navigate('Settings')} />
              ),
            })}
          />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    </UserProvider>
    
  );
}
