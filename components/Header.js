import React from 'react';
import { Text, View, Image, StyleSheet, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../styles';

const Header = ({ showBackButton }) => {
  const navigation = useNavigation();

  const createTwoButtonAlert = () =>
    Alert.alert(
      'Search Movie',
      'We should be able to search a movie in the next version',
      [
        {
          text: 'Ok',
          style: 'ok',
        }
      ]
    );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContainer}>
        { showBackButton && <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
          <Ionicons name="arrow-back" size={24} color={colors.primary} />
        </TouchableOpacity>}
        {!showBackButton && <>
          <View style={styles.centerContainer}>
            <Image
              source={require('../assets/logo.webp')}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.logoText}>Popcorn Club</Text>
          </View>
          <TouchableOpacity onPress={createTwoButtonAlert} style={styles.iconButton}>
            <Ionicons name="search" size={24} color={colors.primary} />
          </TouchableOpacity>
        </>}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: colors.white,
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: 60,
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
    width: 40,
    height: 40,
    marginRight: 5,
  },
  logoText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
  },
});

export default Header;