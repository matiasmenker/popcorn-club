import { StyleSheet, Text } from 'react-native';
import React from 'react';
import { colors } from '../styles';

const Title = ({ children }) => {
  return <Text style={styles.title}>{children}</Text>;
};

const styles = StyleSheet.create({
  title: {
    color: colors.white,
    fontSize: 15,
    fontFamily: 'Lato_900Black',
  },
});

export default Title;
