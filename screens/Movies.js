import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';
import { useFetchMovies } from '../hooks/useFetchMovies';
import React, { useState } from 'react';
import CategoryPicker from '../components/CategoryPicker';
import { colors } from '../styles';
import MoviesList from '../components/MovieList';

const Movies = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const movies = useFetchMovies(
    `categories?id=${selectedCategories.join(',')}`
  );
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={['top']}>
        <CategoryPicker
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
        />
        <MoviesList movies={movies} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.grey200,
  },
});

export default Movies;
