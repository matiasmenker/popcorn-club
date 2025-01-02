import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Watchlist from '../screens/Watchlist';
import MovieDetails from '../screens/MovieDetails';
import Header from '../components/Header';

const Stack = createNativeStackNavigator();

const WatchlistStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="MatchlistStack"
      component={Watchlist}
      options={{
        header: () => <Header />,
      }}
    />
    <Stack.Screen
      name="MovieDetails"
      component={MovieDetails}
      options={({ navigation, route }) => ({
        header: () => <Header isEmpty={true} />,
      })}
    />
  </Stack.Navigator>
);

export default WatchlistStack;
