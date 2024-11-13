import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Movies from "../screens/Movies";
import MovieDetails from "../screens/MovieDetails";
import Header from "../components/Header";

const Stack = createNativeStackNavigator();

const MoviesStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="MoviesStack"
      component={Movies}
      options={{
        header: () => <Header />,
      }}
    />
    <Stack.Screen
      name="MovieDetails"
      component={MovieDetails}
      options={({ navigation, route }) => ({
        header: () => <Header showBackButton={true} />
      })}
    />
  </Stack.Navigator>
);

export default MoviesStack;
