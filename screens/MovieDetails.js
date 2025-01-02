import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../styles';
import { useNavigation } from '@react-navigation/native';
import { useSearchMovie } from '../hooks/useFetchMovies';
import { formatToDecimal } from '../utils/Numbers';
import Card from '../components/Card';
import { useWatchlist } from '../context/WatchlistContext';

const { width: DEVICE_WIDTH } = Dimensions.get('window');

function MovieDetails({ route }) {
  const navigation = useNavigation();
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();

  const movieId = route.params.movie.id;
  if (!movieId) return;

  const { data, isLoading } = useSearchMovie(movieId);

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="medium" color="#ffffff" />
      </View>
    );
  } else {
    const {
      title,
      genres,
      overview,
      credits,
      vote_average,
      secondaryImage,
      runtime,
      release_date,
      poster_path,
      image,
    } = data;
    const isMovieInWatchlist = isInWatchlist(movieId);
    const cast = credits[0].cast;

    const handleWatchlist = () => {
      if (isMovieInWatchlist) {
        removeFromWatchlist(movieId);
      } else {
        addToWatchlist({
          id: movieId,
          title,
          secondaryImage,
          release_date,
          vote_average,
          poster_path,
          image,
        });
      }
    };

    const genreNames = genres.map((genre) => genre.name).join('  ·  ');

    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: secondaryImage }} style={styles.poster} />
          <LinearGradient
            colors={['transparent', colors.grey200]}
            style={styles.gradient}
          />
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color={colors.white} />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.containerGenre}>
            <Text style={styles.genreText}>{genreNames}</Text>
          </View>
          <Text style={styles.overview}>{overview}</Text>

          {runtime && vote_average > 0 && (
            <View style={styles.infoContainer}>
              <View style={styles.infoItem}>
                <Ionicons name="time" size={14} color={colors.grey100} />
                <Text style={styles.infoText}>{runtime}</Text>
              </View>
              <View style={styles.infoItem}>
                <Ionicons name="star" size={14} color={colors.grey100} />
                <Text style={styles.infoText}>
                  {formatToDecimal(vote_average)}
                </Text>
              </View>
            </View>
          )}
        </View>

        <View style={styles.containerButtons}>
          <TouchableOpacity style={styles.button} onPress={handleWatchlist}>
            <Ionicons
              name={isMovieInWatchlist ? 'heart' : 'heart-outline'}
              size={24}
              color={isMovieInWatchlist ? '#E50914' : colors.white}
            />
          </TouchableOpacity>
        </View>

        {credits.length > 0 && (
          <View style={styles.containerCredits}>
            <FlatList
              data={cast}
              renderItem={({ item, index }) => (
                <TouchableOpacity>
                  <Card
                    title={item.character}
                    subtitle={item.name}
                    image={`https://image.tmdb.org/t/p/w500/${item.profile_path}.jpg`}
                    isFirst={index === 0}
                    layout={'horizontal'}
                    width={150}
                    height={200}
                  />
                </TouchableOpacity>
              )}
              keyExtractor={(item, index) => `${index}_${item.id}`}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>
        )}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.grey200,
    paddingBottom: 25,
  },
  containerCredits: {
    paddingHorizontal: 10,
    paddingVertical: 30,
  },
  containerButtons: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    gap: 10,
  },
  button: {
    height: 60,
    borderRadius: 40,
    backgroundColor: '#2a2a2a',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 20,
  },
  buttonText: {
    color: colors.white,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  containerGenre: {
    marginBottom: 10,
  },
  genreText: {
    fontSize: 15,
    color: colors.white,
    fontWeight: 'bold',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.grey200,
  },
  imageContainer: {
    position: 'relative',
    width: DEVICE_WIDTH,
    height: 250,
  },
  poster: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 100,
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 20,
    padding: 8,
  },
  content: {
    padding: 20,
    backgroundColor: colors.grey200,
  },
  title: {
    fontSize: 40,
    color: colors.white,
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: 10,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    gap: 10,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.grey100,
    marginLeft: 5,
  },
  overview: {
    fontSize: 16,
    color: colors.grey100,
    fontWeight: '300',
    lineHeight: 22,
    textAlign: 'justify',
  },
});

export default MovieDetails;
