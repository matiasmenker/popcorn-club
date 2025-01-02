import React, { useEffect, useRef } from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Platform,
  FlatList,
} from 'react-native';
import Card from './Card';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const CARD_WEB_WIDTH = width / 5 - 20;
const CARD_WIDTH = (width - 50) / 3;

const MoviesList = ({ movies }) => {
  const isWeb = Platform.OS === 'web';
  const flatListRef = useRef(null);
  const navigation = useNavigation();

  const scrollToTop = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({ offset: 0, animated: true });
    }
  };

  const renderWebMovies = () => {
    const rows = [];
    const data = movies.isLoading ? Array(10).fill({}) : movies.data;
    const numColumns = 5;

    for (let i = 0; i < data.length; i += numColumns) {
      const rowItems = data.slice(i, i + numColumns);

      rows.push(
        <View key={`row_${i}`} style={styles.sectionRowWeb}>
          {rowItems.map((item, index) => (
            <TouchableOpacity
              key={`movie_${index}`}
              style={styles.cardWeb}
              onPress={() =>
                navigation.navigate('MovieDetails', { movie: item })
              }
            >
              <Card
                title={item.title}
                subtitle={item.releaseDate}
                image={item.secondaryImage}
                isLoading={movies.isLoading}
                layout="horizontal"
                width={CARD_WEB_WIDTH}
              />
            </TouchableOpacity>
          ))}
        </View>
      );
    }

    return rows;
  };

  const renderMobileItem = ({ item }) => {
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

  if (isWeb) {
    return (
      <ScrollView contentContainerStyle={styles.sectionContainer}>
        {renderWebMovies(movies, navigation)}
      </ScrollView>
    );
  } else {
    return (
      <View style={styles.sectionContainer}>
        <FlatList
          ref={flatListRef}
          data={movies.isLoading ? Array(10).fill({}) : movies.data} // Show placeholders if loading
          renderItem={renderMobileItem}
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
  }
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
  sectionRowWeb: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  cardWeb: {
    flexGrow: 1,
    marginHorizontal: 0,
  },
});

export default MoviesList;
