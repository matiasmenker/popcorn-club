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
  } = props;
  const isHorizontal = layout === 'horizontal';
  const cardWidth = isHorizontal ? 300 : CARD_WIDTH;
  const cardHeight = 180;

  return isLoading ? (
    <ShimmerPlaceholder
      LinearGradient={LinearGradient}
      width={cardWidth}
      height={cardHeight}
      shimmerColors={['#1e1e1e', '#2c2c2c', '#1e1e1e']}
      style={[styles.loader, isFirst && styles.firstCard]}
    />
  ) : (
    <View
      style={[
        styles.container,
        { width: cardWidth, height: cardHeight },
        isFirst && styles.firstCard,
      ]}
    >
      <ImageBackground
        source={{ uri: image }}
        style={styles.imageBackground}
        imageStyle={styles.imageStyle}
      >
        {isHorizontal && (title || subtitle) && (
          <View style={styles.textContainer}>
            {title && <Text style={styles.title}>{title}</Text>}
            {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
          </View>
        )}
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  loader: {
    borderRadius: 15,
    marginHorizontal: 10,
  },
  container: {
    borderRadius: 15,
    overflow: 'hidden',
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  firstCard: {
    marginLeft: 15,
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  imageStyle: {
    borderRadius: 15,
  },
  textContainer: {
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, .2)',
    paddingHorizontal: 10,
    justifyContent: 'flex-end',
  },
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
});

export default Card;
