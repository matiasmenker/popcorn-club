import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import Header from '../components/Header';

const Stack = createNativeStackNavigator();

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="HomeStack"
      component={Home}
      options={{
        header: () => <Header />,
      }}
    />
  </Stack.Navigator>
);

export default HomeStack;
