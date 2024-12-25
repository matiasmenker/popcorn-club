import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { colors } from '../styles';

const Layout = ({ children, paddingVertical = 20, paddingHorizontal = 15 }) => {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View
        style={{
          paddingVertical,
          paddingHorizontal,
        }}
      >
        {children}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.grey200,
  },
  contentContainer: {
    flexGrow: 1,
  },
});

export default Layout;
