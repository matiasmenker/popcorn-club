import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import {
  Dimensions,
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
} from 'react-native';
import { useFetchMovies } from '../hooks/useFetchMovies';
import React, { useState } from 'react';
import CategoryPicker from '../components/CategoryPicker';
import Card from '../components/Card';
import { colors } from '../styles';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width / 2 - 20;

const MoviesSectionScreen = ({ categories }) => {
  const movies = useFetchMovies(`categories?id=${categories.join(',')}`);

  const renderItem = ({ item, index }) => (
    <Card
      title={item.title}
      subtitle={item.releaseDate}
      image={item.image}
      isLoading={movies.isLoading}
      layout="vertical"
      width={CARD_WIDTH}
      height={230}
    />
  );

  return (
    <View style={styles.sectionContainer}>
      <FlatList
        data={movies.isLoading ? Array(10).fill({}) : movies.data} // Show placeholders if loading
        renderItem={renderItem}
        keyExtractor={(item, index) => {
          return movies.isLoading ? `placeholder_${index}` : `movie_${index}`;
        }}
        numColumns={2}
        columnWrapperStyle={styles.sectionRow}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const Movies = ({ navigation, route }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={['top']}>
        <CategoryPicker
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
        />
        <MoviesSectionScreen categories={selectedCategories} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.grey200,
  },
  sectionContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 15,
  },
  sectionRow: {
    marginBottom: 10,
  },
  listContent: {
    paddingBottom: 20,
  },
});

export default Movies;
