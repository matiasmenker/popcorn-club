import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Text,
} from 'react-native';
import Layout from '../components/Layout';
import Card from '../components/Card';
import Title from '../components/Title';
import { formatDate } from '../utils/Date';
import { useFetchMovies } from '../hooks/useFetchMovies';
import { colors } from '../styles';

const MOVIES_LOADER = [1, 2, 3, 4, 5, 6];

const MoviesSection = ({ title, layout = 'vertical', name }) => {
  const movies = useFetchMovies(name);
  return (
    <View style={styles.sectionContainer}>
      <View style={styles.titleContainer}>
        <Title>{title}</Title>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Details', { category: name })}
        >
          <Text style={styles.buttonText}>Show all</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={movies.isSuccess ? movies.data : MOVIES_LOADER}
        renderItem={({ item, index }) =>
          movies.isSuccess ? (
            <Card
              title={item.title}
              subtitle={
                layout === 'horizontal'
                  ? formatDate(item.releaseDate)
                  : undefined
              }
              image={layout === 'horizontal' ? item.secondaryImage : item.image}
              isFirst={index === 0}
              layout={layout}
            />
          ) : (
            <Card isLoading={true} isFirst={index === 0} layout={layout} />
          )
        }
        keyExtractor={(item, index) =>
          movies.isSuccess ? `${index}_${item.id}` : `loading_${index}`
        }
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const Home = () => {
  return (
    <Layout paddingHorizontal={0}>
      <View>
        <MoviesSection
          title="Coming Soon"
          name="upcoming"
          layout="horizontal"
        />
        <MoviesSection title="Popular" name="popular" layout="vertical" />
        <MoviesSection title="Top Rated" name="top_rated" layout="vertical" />
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginBottom: 25,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 10,
    paddingHorizontal: 15,
  },
  button: {
    backgroundColor: 'transparent',
    borderRadius: 8,
    paddingVertical: 6,
  },
  buttonText: {
    color: colors.grey100,
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default Home;
