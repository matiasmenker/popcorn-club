import React from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './navigation/TabNavigator';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import {useFonts} from "expo-font";
import { LuckiestGuy_400Regular } from "@expo-google-fonts/luckiest-guy";
import {
  Lato_100Thin,
  Lato_100Thin_Italic,
  Lato_300Light,
  Lato_300Light_Italic,
  Lato_400Regular, Lato_700Bold, Lato_700Bold_Italic, Lato_900Black, Lato_900Black_Italic
} from "@expo-google-fonts/lato";
import * as SplashScreen from 'expo-splash-screen';

const queryClient = new QueryClient();

const App = () => {

  const [loaded, error] = useFonts({
    LuckiestGuy_400Regular,
    Lato_100Thin,
    Lato_100Thin_Italic,
    Lato_300Light,
    Lato_300Light_Italic,
    Lato_400Regular,
    Lato_700Bold,
    Lato_700Bold_Italic,
    Lato_900Black,
    Lato_900Black_Italic,
  });

  React.useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
      <QueryClientProvider client={queryClient}>
        <View style={styles.container}>
          <NavigationContainer>
            <TabNavigator />
          </NavigationContainer>
        </View>
      </QueryClientProvider>
  )
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
