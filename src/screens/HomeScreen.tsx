import React, {useContext} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Carousel from 'react-native-snap-carousel';
import HorizontalSlider from '../components/HorizontalSlider';
import MoviePoster from '../components/MoviePoster';
import useMovies from '../hooks/useMovies';
import GradientBackground from '../components/GradientBackground';

import {getImageColor} from '../helpers/colors';
import {GradientContext} from '../context/GradientContext';
import {useEffect, useCallback} from 'react';

const {width: windowWith} = Dimensions.get('window');

export const HomeScreen = () => {
  const {isLoading, nowPlaying, popular, topRated, upcoming} = useMovies();
  const {top} = useSafeAreaInsets();
  const {setMainColors} = useContext(GradientContext);

  const getPosterColors = useCallback(
    async (index: number) => {
      const movie = nowPlaying[index];
      const uri = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
      const [primary, secondary] = await getImageColor(uri);
      setMainColors({
        primary,
        secondary,
      });
    },
    [nowPlaying, setMainColors],
  );

  useEffect(() => {
    if (nowPlaying.length > 0) {
      getPosterColors(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nowPlaying]);

  if (isLoading) {
    return (
      <View style={styles.indicatorContainer}>
        <ActivityIndicator color="red" size={100} />
      </View>
    );
  }

  return (
    <GradientBackground>
      <ScrollView>
        <View style={{marginTop: top + 20}}>
          {/* Carousel  */}
          <View style={styles.carouselContainer}>
            <Carousel
              vertical={false}
              data={nowPlaying}
              renderItem={({item}: any) => <MoviePoster movie={item} />}
              sliderWidth={windowWith}
              itemWidth={300}
              inactiveSlideOpacity={0.9}
              onSnapToItem={index => getPosterColors(index)}
            />
          </View>

          {/* Popular Movies */}
          <HorizontalSlider title="Popular" movies={popular} />
          {/* Top Rated Movies */}
          <HorizontalSlider title="Top Rated" movies={topRated} />
          {/* Top Rated Movies */}
          <HorizontalSlider title="Upcoming" movies={upcoming} />
        </View>
      </ScrollView>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  carouselContainer: {height: 450},
  indicatorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
});
