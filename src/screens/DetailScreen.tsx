import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {
  Image,
  Text,
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {RootStackParams} from '../navigation/Navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import useMovieDetails from '../hooks/useMovieDetails';
import MovieDetails from '../components/MovieDetails';
import {TouchableOpacity} from 'react-native-gesture-handler';

interface Props extends StackScreenProps<RootStackParams, 'DetailScreen'> {}

const {height: screenHeight} = Dimensions.get('screen');

const DetailScreen = ({route, navigation}: Props) => {
  const movie = route.params;

  const {isLoading, detail, cast} = useMovieDetails(movie.id);

  const uri = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  return (
    <ScrollView>
      <View style={styles.imageContainer}>
        <View style={styles.imageBorder}>
          <Image
            source={{
              uri,
            }}
            style={styles.posterImage}
          />
        </View>
      </View>

      <View style={styles.marginContainer}>
        <Text style={styles.subTitleText}>{movie.original_title}</Text>
        <Text style={styles.titleText}>{movie.title}</Text>
      </View>

      {isLoading ? (
        <ActivityIndicator size={50} color="grey" style={{marginTop: 20}} />
      ) : (
        <MovieDetails detail={detail!} cast={cast} />
      )}

      {/* Back Button */}
      <View style={styles.backButton}>
        <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
          <Icon name="arrow-back-outline" color="grey" size={30} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    width: '100%',
    height: screenHeight * 0.7,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 7,
    elevation: 10,
    borderBottomEndRadius: 50,
    borderBottomStartRadius: 50,
  },
  imageBorder: {
    flex: 1,
    overflow: 'hidden',
    borderBottomEndRadius: 50,
    borderBottomStartRadius: 50,
  },
  posterImage: {
    flex: 1,
  },
  marginContainer: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  titleText: {
    fontSize: 20,
    fontFamily: 'Poppins-Regular',
  },
  subTitleText: {
    fontSize: 18,
    fontFamily: 'Poppins-Thin',
  },
  backButton: {
    position: 'absolute',
    zIndex: 999,
    elevation: 9,
    top: 35,
    left: 10,
    backgroundColor: 'white',
    borderRadius: 50,
    padding: 8,
  },
});

export default DetailScreen;
