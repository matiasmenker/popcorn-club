import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import Header from '../components/Header';
import MovieDetails from '../screens/MovieDetails';
import Search from '../screens/Search';

const Stack = createNativeStackNavigator();

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="HomeStack"
      component={Home}
      options={{
        header: () => <Header showSearch={true} />,
      }}
    />
    <Stack.Screen
      name="MovieDetails"
      component={MovieDetails}
      options={{
        header: () => <Header showBackButton={true} />,
      }}
    />
    <Stack.Screen
      name="Search"
      component={Search}
      options={({ navigation, route }) => ({
        header: () => null,
      })}
    />
  </Stack.Navigator>
);

export default HomeStack;
