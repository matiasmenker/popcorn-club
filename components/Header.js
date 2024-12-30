import React from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../styles';

const Header = ({ showBackButton, showSearch }) => {
  const navigation = useNavigation();

  const createTwoButtonAlert = () =>
    Alert.alert(
      'Search Movie',
      'We should be able to search a movie in the next version',
      [
        {
          text: 'Ok',
          style: 'ok',
        },
      ]
    );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContainer}>
        {showBackButton && (
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.iconButton}
          >
            <Ionicons name="arrow-back" size={24} color={colors.white} />
          </TouchableOpacity>
        )}
        {!showBackButton && (
          <>
            <View style={styles.centerContainer}>
              <Image
                source={require('../assets/logo.webp')}
                style={styles.logo}
                resizeMode="contain"
              />
              <Text style={styles.logoText}>POPCORN CLUB</Text>
            </View>
            {showSearch && (
              <TouchableOpacity
                onPress={() => navigation.navigate('Search')}
                style={styles.iconButton}
              >
                <Ionicons name="search" size={24} color={colors.grey100} />
              </TouchableOpacity>
            )}
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: colors.grey400,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: Platform.OS === 'ios' ? 60 : 80,
    paddingHorizontal: 10,
  },
  iconButton: {
    padding: 8,
  },
  centerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 35,
    height: 35,
    marginRight: 5,
    marginTop: -4,
  },
  logoText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.white,
    fontFamily: 'LuckiestGuy_400Regular',
  },
});

export default Header;
