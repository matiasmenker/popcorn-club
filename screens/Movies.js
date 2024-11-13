import Layout from "../components/Layout";
import { Alert, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { getMovies } from "../services/data";
import { boxShadow, colors } from "../styles";
import { FontAwesome6 } from '@expo/vector-icons';

function Movies({ navigation }) {
  const movies = getMovies();


  const createWatchlistAlert = () =>
    Alert.alert(
      'Add movie to your Watchlist',
    );

  return (
    <Layout>
      {movies.map((movie) => {
        return (
          <TouchableOpacity
            key={movie.id}
            style={styles.container}
            onPress={() => navigation.navigate("MovieDetails", movie)}
          >
              <View style={styles.details}>
                <Text style={styles.title}>{movie.title}</Text>
                <FontAwesome6 name="heart" color={colors.primary} size={20}             
                onPress={() => createWatchlistAlert()}
                />
              </View>
          </TouchableOpacity>
        );
      })}
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    ...boxShadow,
    padding: 20,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  details: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    color: colors.text,
    fontWeight: '00'
  },
  watchlist: {
    padding: 8,
  }
});

export default Movies;
