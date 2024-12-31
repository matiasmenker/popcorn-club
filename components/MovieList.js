import Card from './Card';
import {
  Dimensions,
  FlatList,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
import React, { useRef, useEffect } from 'react';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 50) / 3;

const MoviesList = ({ movies, navigation }) => {
  const flatListRef = useRef(null);

  const scrollToTop = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({ offset: 0, animated: true });
    }
  };

  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={styles.movieItem}
        onPress={() => navigation.navigate('MovieDetails', { movie: item })}
      >
        <Card
          title={item.title}
          subtitle={item.releaseDate}
          image={item.image}
          isLoading={movies.isLoading}
          layout="vertical"
          width={CARD_WIDTH}
        />
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    scrollToTop();
  }, [movies]);

  return (
    <View style={styles.sectionContainer}>
      <FlatList
        ref={flatListRef}
        data={movies.isLoading ? Array(10).fill({}) : movies.data} // Show placeholders if loading
        renderItem={renderItem}
        keyExtractor={(item, index) => {
          return movies.isLoading ? `placeholder_${index}` : `movie_${index}`;
        }}
        numColumns={3}
        columnWrapperStyle={styles.sectionRow}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  sectionRow: {
    marginBottom: 10,
  },
  listContent: {
    paddingBottom: 20,
  },
});

export default MoviesList;
