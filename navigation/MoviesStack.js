import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Movies from '../screens/Movies';
import MovieDetails from '../screens/MovieDetails';
import Header from '../components/Header';
import Search from '../screens/Search';
import { colors } from '../styles';
import { LinearGradient } from 'expo-linear-gradient';

const Stack = createNativeStackNavigator();

const MoviesStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="MoviesStack"
      component={Movies}
      options={{
        header: () => <Header showSearch={true} />,
      }}
    />
    <Stack.Screen
      name="MovieDetails"
      component={MovieDetails}
      options={{
        header: () => <Header isEmpty={true} />,
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

export default MoviesStack;
