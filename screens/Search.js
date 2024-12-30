import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  FlatList,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../styles';

const Search = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch movies from an API
  const fetchMovies = async (query) => {
    setIsLoading(true);
    setError(null);
    setMovies([]);

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=YOUR_API_KEY&query=${query}`
      );
      const data = await response.json();

      if (data.results) {
        setMovies(data.results);
      } else {
        setError('No movies found.');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      fetchMovies(searchQuery.trim());
    }
  };

  const renderMovieItem = ({ item }) => (
    <TouchableOpacity
      style={styles.movieItem}
      onPress={() => navigation.navigate('MovieDetails', { movie: item })}
    >
      <Image
        source={{
          uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
        }}
        style={styles.movieImage}
      />
      <Text style={styles.movieTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Row for Back Button and Search */}
      <View style={styles.searchRow}>
        {/* Back Button */}

        {/* Search Input with Search Icon */}
        <View style={styles.searchContainer}>
          <TouchableOpacity onPress={handleSearch} style={styles.iconButton}>
            <Ionicons name="search" size={20} color={colors.white} />
          </TouchableOpacity>
          <TextInput
            style={styles.searchInput}
            placeholder="Search movies..."
            placeholderTextColor={colors.grey100}
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearch}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity
              onPress={() => setSearchQuery('')}
              style={styles.iconButton}
            >
              <Ionicons name="close" size={20} color={colors.white} />
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.cancelButton}>Cancel</Text>
        </TouchableOpacity>
      </View>

      {/* Loading Indicator */}
      {isLoading && <ActivityIndicator size="large" color="#ffffff" />}

      {/* Error Message */}
      {error && !isLoading && <Text style={styles.errorText}>{error}</Text>}

      {/* Movie List */}
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderMovieItem}
        contentContainerStyle={styles.movieList}
        ListEmptyComponent={
          !isLoading &&
          !error && (
            <Text style={styles.emptyText}>
              Search for movies to display them here.
            </Text>
          )
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  cancelButton: {
    color: '#fff',
    fontSize: 14,
    marginLeft: 5,
    paddingVertical: 8,
    paddingHorizontal: 5,
    fontWeight: 'bold',
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    marginTop: Platform.OS === 'ios' ? 60 : 80,
  },
  iconButton: {
    padding: 0,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2a2a2a',
    borderRadius: 6,
    paddingHorizontal: 8,
  },
  searchInput: {
    flex: 1,
    color: '#fff',
    fontSize: 14,
    paddingVertical: 8,
    paddingHorizontal: 5,
    height: 40,
  },
  movieList: {
    paddingBottom: 16,
  },
  movieItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#1f1f1f',
    borderRadius: 8,
    padding: 8,
  },
  movieImage: {
    width: 60,
    height: 90,
    borderRadius: 4,
    marginRight: 12,
  },
  movieTitle: {
    color: '#fff',
    fontSize: 14,
    flexShrink: 1,
  },
  errorText: {
    color: colors.grey100,
    textAlign: 'center',
    marginTop: 16,
  },
  emptyText: {
    color: '#ccc',
    textAlign: 'center',
    marginTop: 16,
  },
});

export default Search;
