import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import { colors } from '../styles';
import { useWatchlist } from '../context/WatchlistContext';
import React from 'react';
import { getYear } from '../utils/Date';
import { formatToDecimal } from '../utils/Numbers';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

function Watchlist() {
  const navigation = useNavigation();
  const { watchlist, removeFromWatchlist } = useWatchlist();

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
        <View style={styles.movieRemove}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => removeFromWatchlist(item.id)}
          >
            <Ionicons name="trash" size={20} color={colors.grey100} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {watchlist.length > 0 ? (
        <FlatList
          data={watchlist}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderMovieItem}
          contentContainerStyle={styles.movieList}
        />
      ) : (
        <View style={styles.centerContainer}>
          <Text style={styles.emptyText}>Your Watchlist is Empty</Text>
          <Text style={styles.emptySubText}>
            Add movies to your watchlist to view them here
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.grey200,
    paddingHorizontal: 15,
    paddingVertical: 10,
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
  movieRemove: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    alignContent: 'flex-end',
  },
  button: {
    width: 50,
    height: 50,
    borderRadius: 40,
    backgroundColor: '#2a2a2a',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
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

export default Watchlist;
