import React from 'react';
import { SectionList, Text, StyleSheet, View } from 'react-native';
import { useFetchMovies } from '../hooks/useFetchMovies';
import MoviesCarousel from '../components/MoviesCarousel';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { colors } from '../styles';
import Title from '../components/Title';

const Home = ({ navigation }) => {
  const upcomingMovies = useFetchMovies('upcoming');
  const popularMovies = useFetchMovies('popular');
  const topRatedMovies = useFetchMovies('top_rated');

  const sections = [
    { title: 'Coming Soon', data: [upcomingMovies], layout: 'horizontal' },
    { title: 'Popular', data: [popularMovies], layout: 'vertical' },
    { title: 'Top Rated', data: [topRatedMovies], layout: 'vertical' },
  ];

  const renderSectionHeader = ({ section: { title } }) => (
    <View style={styles.sectionHeader}>
      <Title>{title}</Title>
    </View>
  );

  const renderItem = ({ item, section }) => (
    <View style={styles.sectionContainer}>
      <MoviesCarousel
        movies={item}
        layout={section.layout}
        navigation={navigation}
      />
    </View>
  );

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={['top']}>
        <SectionList
          sections={sections}
          keyExtractor={(item, index) => `${item}-${index}`}
          renderSectionHeader={renderSectionHeader}
          stickySectionHeadersEnabled={false}
          renderItem={renderItem}
          contentContainerStyle={styles.container}
        />
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
    marginBottom: 10,
  },
  sectionHeader: {
    paddingTop: 15,
    paddingBottom: 10,
    paddingHorizontal: 15,
  },
});

export default Home;
