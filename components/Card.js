import React from 'react';
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import { colors } from '../styles';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width / 3;

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

const Card = (props) => {
  const {
    image,
    title,
    subtitle,
    isFirst,
    isLoading,
    layout = 'vertical',
    width = layout === 'horizontal' ? 300 : CARD_WIDTH,
    height = 180,
  } = props;
  const cardWidth = width;
  const cardHeight = height;

  return isLoading ? (
    <ShimmerPlaceholder
      LinearGradient={LinearGradient}
      width={cardWidth}
      height={cardHeight}
      shimmerColors={styles.loader.shimmerColors}
      style={[styles.loader.base, isFirst && styles.loader.firstCard]}
    />
  ) : (
    <View
      style={[
        styles.container.base,
        { width: cardWidth, height: cardHeight },
        layout === 'horizontal'
          ? styles.container.horizontal
          : styles.container.vertical,
        isFirst && styles.container.firstCard,
      ]}
    >
      <ImageBackground
        source={{ uri: image }}
        style={styles.imageBackground.base}
        imageStyle={styles.imageBackground.imageStyle}
      >
        {layout === 'horizontal' && (title || subtitle) && (
          <View style={styles.textContainer}>
            {title && <Text style={styles.text.title}>{title}</Text>}
            {subtitle && <Text style={styles.text.subtitle}>{subtitle}</Text>}
          </View>
        )}
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  loader: {
    base: {
      borderRadius: 15,
      marginHorizontal: 5,
    },
    shimmerColors: ['#1e1e1e', '#2c2c2c', '#1e1e1e'],
    firstCard: {
      marginLeft: 15,
    },
  },
  container: {
    base: {
      borderRadius: 15,
      overflow: 'hidden',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 6,
      elevation: 8,
    },
    firstCard: {
      marginLeft: 15,
    },
    horizontal: {
      marginHorizontal: 8,
    },
    vertical: {
      marginHorizontal: 5,
    },
  },
  imageBackground: {
    base: {
      flex: 1,
      justifyContent: 'flex-end',
    },
    imageStyle: {
      borderRadius: 15,
    },
  },
  textContainer: {
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, .1)',
    paddingHorizontal: 10,
    justifyContent: 'flex-end',
  },
  text: {
    title: {
      color: colors.white,
      fontSize: 16,
      fontFamily: 'Lato_700Bold',
    },
    subtitle: {
      color: '#ccc',
      fontSize: 14,
      marginBottom: 10,
      fontFamily: 'Lato_400Regular',
    },
  },
});

export default Card;
