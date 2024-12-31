import React, { useState, useEffect } from 'react';
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
import { useQuery } from '@tanstack/react-query';
import { formatToDecimal } from '../utils/Numbers';
import { getYear } from '../utils/Date';
import { useSearchMovies } from '../hooks/useFetchMovies';

const Search = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery.trim());
    }, 500);

    return () => clearTimeout(handler);
  }, [searchQuery]);

  const {
    data: movies = [],
    isLoading,
    isSuccess,
  } = useSearchMovies(debouncedQuery);

  const renderMovieItem = ({ item }) => {
    if (!item.title) return null;
    return (
      <TouchableOpacity
        style={styles.movieItem}
        onPress={() => navigation.navigate('MovieDetails', { movie: item })}
      >
        <Image
          source={{
            uri:
              item.image ||
              `https://image.tmdb.org/t/p/w500${item.poster_path}`,
          }}
          style={styles.movieImage}
        />
        <View style={styles.movieDetails}>
          <Text style={styles.movieTitle}>{item.title}</Text>
          <Text style={styles.movieDate}>{getYear(item.release_date)}</Text>
          <Text style={styles.moviePopularity}>
            {formatToDecimal(item.vote_average < 5 ? 5 : item.vote_average)}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchRow}>
        <View style={styles.searchContainer}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="search" size={20} color={colors.white} />
          </TouchableOpacity>
          <TextInput
            style={styles.searchInput}
            placeholder="Search movies..."
            placeholderTextColor={colors.grey100}
            value={searchQuery}
            onChangeText={setSearchQuery}
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

      {isLoading && (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="medium" color="#ffffff" />
        </View>
      )}

      {!isLoading && !debouncedQuery && (
        <View style={styles.centerContainer}>
          <Text style={styles.emptyText}>Start searching for movies</Text>
        </View>
      )}

      {!isLoading && debouncedQuery && movies.length === 0 && (
        <View style={styles.centerContainer}>
          <Text style={styles.emptyText}>No results found</Text>
          <Text style={styles.emptySubText}>
            Try searching for another movie
          </Text>
        </View>
      )}

      {isSuccess && movies.length > 0 && (
        <FlatList
          data={movies}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderMovieItem}
          contentContainerStyle={styles.movieList}
        />
      )}
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
    flexGrow: 1,
    paddingBottom: 16,
  },
  movieItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    padding: 8,
  },
  movieImage: {
    width: 60,
    height: 90,
    marginRight: 12,
    borderRadius: 4,
  },
  movieDetails: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    alignContent: 'flex-start',
  },
  movieTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  movieDate: {
    color: colors.grey100,
    fontSize: 15,
    marginTop: 4,
  },
  moviePopularity: {
    marginTop: 4,
    backgroundColor: '#E50914',
    paddingVertical: 4,
    paddingHorizontal: 5,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    marginTop: 10,
  },
  emptySubText: {
    color: colors.grey100,
    fontSize: 14,
    textAlign: 'center',
  },
});

export default Search;
