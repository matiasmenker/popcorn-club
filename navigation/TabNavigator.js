import React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome6 } from '@expo/vector-icons';
import HomeStack from './HomeStack';
import MoviesStack from './MoviesStack';
import WatchlistStack from './WatchlistStack';

import { colors } from '../styles';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {

    return (
    <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: true,
          tabBarActiveTintColor: colors.primary,
          tabBarStyle: {
            height: Platform.OS === 'ios' ? 80 : 60,
            paddingBottom: Platform.OS === 'ios' ? 25 : 10,
            paddingTop: Platform.OS === 'ios' ? 10 : 10,
            borderTopColor: colors.border,
          },
          tabBarLabelStyle: {
            fontSize: 10,
          },
          unmountOnBlur: true
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeStack}
          options={{
            headerShown: false,
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (
              <FontAwesome6 name="house" color={color} size={20} />
            ),
          }}
        />
        <Tab.Screen
          name="Movies"
          component={MoviesStack}
          options={{
            headerShown: false,
            tabBarLabel: 'Movies',
            tabBarIcon: ({ color, size }) => (
              <FontAwesome6 name="film" color={color} size={20} />
            ),
          }}
        />
        <Tab.Screen
          name="Watchlist"
          component={WatchlistStack}
          options={{
            headerShown: false,
            tabBarLabel: 'Watchlist',
            tabBarIcon: ({ color, size }) => (
              <FontAwesome6 name="heart-circle-plus" color={color} size={20} />
            ),
          }}
        />
      </Tab.Navigator>
      )
}

export default TabNavigator;