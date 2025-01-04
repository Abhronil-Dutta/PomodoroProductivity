import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Timer from './scripts/Timer.js';

const App = () => {
  return (
    <Timer />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  
  },
});

export default App;
