import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { boxShadow, colors } from '../styles';

function Watchlist({ navigation }) {
  const movies = [];
  return (
    <View>
      {movies &&
        movies.length > 0 &&
        movies.map((movie, index) => {
          if (index > 5 && index < 10) {
            return (
              <TouchableOpacity
                key={movie.id}
                style={styles.container}
                onPress={() => navigation.navigate('MovieDetails', movie)}
              >
                <View>
                  <Text style={styles.title}>{movie.title}</Text>
                </View>
              </TouchableOpacity>
            );
          }
        })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...boxShadow,
    padding: 20,
    marginBottom: 10,
    alignItems: 'left',
  },
  title: {
    fontSize: 16,
    color: colors.text,
    fontWeight: '00',
  },
});

export default Watchlist;
