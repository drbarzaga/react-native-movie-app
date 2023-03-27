import React from 'react';
import {Movie} from '../interfaces/movie';
import {View, StyleSheet, Text, FlatList} from 'react-native';
import MoviePoster from './MoviePoster';

type Props = {
  title?: string;
  movies: Movie[];
};

const HorizontalSlider = ({title, movies}: Props) => {
  return (
    <View
      style={[
        styles.popularMoviesContainer,
        title
          ? {...styles.popularMoviesContainer, height: 260}
          : {...styles.popularMoviesContainer, height: 220},
      ]}>
      {title && <Text style={styles.titleText}>{title}</Text>}
      <FlatList
        data={movies}
        initialNumToRender={7}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}: any) => (
          <MoviePoster movie={item} width={140} height={200} />
        )}
        showsHorizontalScrollIndicator={false}
        horizontal
      />
    </View>
  );
};

const styles = StyleSheet.create({
  titleText: {
    fontSize: 25,
    fontFamily: 'Poppins-Regular',
    marginLeft: 10,
    marginBottom: 5,
  },
  popularMoviesContainer: {
    height: 260,
  },
});

export default HorizontalSlider;
