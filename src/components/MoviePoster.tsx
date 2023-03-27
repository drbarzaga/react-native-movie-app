import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Movie} from '../interfaces/movie';

type Props = {
  movie: Movie;
  width?: number;
  height?: number;
};

const MoviePoster = ({movie, width = 300, height = 420}: Props) => {
  const navigation = useNavigation();

  if (!movie) {
    return null;
  }

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={{width, height, marginHorizontal: 8}}
      onPress={() => navigation.navigate('DetailScreen', movie)}>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          }}
          style={styles.image}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    borderRadius: 18,
  },
  imageContainer: {
    flex: 1,
    borderRadius: 18,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 7,

    elevation: 10,
  },
});

export default MoviePoster;
