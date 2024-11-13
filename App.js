import React from 'react';
import {
  View,
  StyleSheet,
  StatusBar
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './navigation/TabNavigator';

const App = () => (
  <View style={styles.container}>
    <NavigationContainer>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      <TabNavigator />
    </NavigationContainer>
  </View>
);

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});