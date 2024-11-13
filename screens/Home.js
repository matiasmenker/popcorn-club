import React from "react";
import { ScrollView, StyleSheet, Text, View } from 'react-native';

const Home = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.subtitle}>
          Explore and discover movies with popular lists, detailed information, and more.
        </Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Features</Text>
        <View style={styles.list}>
          <Text style={styles.listItem}>- Browse by category, such as Drama, Populars, etc.</Text>
          <Text style={styles.listItem}>- View detailed movie information, including genres, popularity, and synopsis.</Text>
          <Text style={styles.listItem}>- Save movies to your Watchlist for later.</Text>
          <Text style={styles.listItem}>- Reproduce Official Trailers for the movies.</Text>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Screens</Text>
        <View>
          <Text style={styles.listItem}><Text style={styles.bold}>Home:</Text> View trending and popular movies at a glance.</Text>
          <Text style={styles.listItem}><Text style={styles.bold}>Movies:</Text> Browse movie lists.</Text>
          <Text style={styles.listItem}><Text style={styles.bold}>Movie Detail:</Text> Explore in-depth information about a specific movie.</Text>
          <Text style={styles.listItem}><Text style={styles.bold}>Watchlist:</Text> Access your saved movies for later viewing.</Text>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Data API</Text>
        <Text style={styles.description}>
          The app utilizes the <Text style={styles.bold}>The Movie Database (TMDb)</Text> API to fetch movie data. A custom API layer has been implemented using Vercel to protect sensitive information like the API key. 
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  header: {
    alignItems: 'left',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'left',
    marginTop: 10,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#444',
    marginBottom: 10,
  },
  listItem: {
    fontSize: 16,
    color: '#555',
    marginBottom: 8,
  },
  bold: {
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
  },
  footer: {
    marginTop: 20,
    alignItems: 'left',
  },
  footerText: {
    fontSize: 16,
    color: '#555',
  },
  footerEmail: {
    fontSize: 16,
    color: '#007BFF',
    marginTop: 5,
  },
});

export default Home;
