import { FlatList, Platform, TouchableOpacity } from 'react-native';
import Card from './Card';
import { formatDate } from '../utils/Date';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const MOVIES_LOADER = [1, 2, 3, 4, 5, 6];

const MoviesCarousel = ({ layout = 'vertical', movies }) => {
  const navigation = useNavigation();
  const isWeb = Platform.OS === 'web';
  return (
    <FlatList
      data={movies.isSuccess ? movies.data : MOVIES_LOADER}
      renderItem={({ item, index }) =>
        movies.isSuccess ? (
          <TouchableOpacity
            onPress={() => navigation.navigate('MovieDetails', { movie: item })}
          >
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
              {...(isWeb && { width: 200, height: 300 })}
            />
          </TouchableOpacity>
        ) : (
          <Card isLoading={true} isFirst={index === 0} layout={layout} />
        )
      }
      keyExtractor={(item, index) =>
        movies.isSuccess ? `${index}_${item.id}` : `loading_${index}`
      }
      horizontal
      showsHorizontalScrollIndicator={false}
      initialNumToRender={7}
      maxToRenderPerBatch={4}
    />
  );
};

export default MoviesCarousel;
