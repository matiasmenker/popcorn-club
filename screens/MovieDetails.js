import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

function MovieDetails({ route }) {
  const { title, genres, overview, popularity, vote, releaseDate, image } = route.params;
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: image }}
          style={styles.poster}
        />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        {genres && (
          <Text style={styles.text}>
            {genres.map((genre) => genre.name).join(', ')}
          </Text>
        )}
        <Text style={styles.text}>Release Date: {releaseDate}</Text>
        <Text style={styles.text}>Popularity: {popularity}</Text>
        <Text style={styles.text}>Rating: {vote}/10</Text>
        <Text style={styles.text}>Trailer</Text>
        <Text style={styles.sectionHeader}>Overview</Text>
        <Text style={styles.overview}>{overview}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f4f4f4',
  },
  imageContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex', 
    marginTop: 20
  },
  poster: {
    width: 250, 
    height: 200,
    borderRadius: 10,
    resizeMode: 'scale',
    backgroundColor: 'grey'
  },
  content: {
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: '#444',
    textAlign: 'center',
    marginBottom: 10,
  },
  genres: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 10,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    marginBottom: 10,
    
  },
  overview: {
    fontSize: 16,
    color: '#666',
    lineHeight: 22,
    textAlign: 'justify',
  },
});

export default MovieDetails;