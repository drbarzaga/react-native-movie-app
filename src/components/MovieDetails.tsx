import React from 'react';
import {FlatList, Text, View} from 'react-native';
import {MovieFullDetail} from '../interfaces/movie';
import {Cast} from '../interfaces/credit';
import Icon from 'react-native-vector-icons/Ionicons';
import currencyFormatter from 'currency-formatter';
import CastItem from './CastItem';

type Props = {
  detail: MovieFullDetail;
  cast: Cast[];
};

const MovieDetails = ({detail, cast}: Props) => {
  return (
    <View style={{marginTop: 10}}>
      {/* Details */}
      <View style={{flexDirection: 'row'}}>
        <View style={{marginHorizontal: 20}}>
          <Icon name="star-outline" color="grey" size={16} />
        </View>
        <Text>{detail.vote_average}</Text>
        <Text> - {detail.genres.map(genre => genre.name).join(' | ')}</Text>
      </View>

      {/* History */}
      <View style={{marginHorizontal: 20}}>
        <Text
          style={{fontSize: 20, marginTop: 10, fontFamily: 'Poppins-Regular'}}>
          History
        </Text>
        <Text
          style={{
            fontSize: 15,
            fontFamily: 'Poppins-Light',
            textAlign: 'justify',
          }}>
          {detail.overview}
        </Text>
      </View>

      {/* Budget */}
      <View style={{marginHorizontal: 20}}>
        <Text
          style={{fontSize: 20, marginTop: 10, fontFamily: 'Poppins-Regular'}}>
          Budget
        </Text>
        <Text
          style={{
            fontSize: 15,
            fontFamily: 'Poppins-Light',
            textAlign: 'justify',
          }}>
          {currencyFormatter.format(detail.budget, {code: 'USD'})}
        </Text>
      </View>

      {/* Cast */}
      <View style={{marginTop: 10, marginHorizontal: 20}}>
        <Text
          style={{fontSize: 20, marginTop: 10, fontFamily: 'Poppins-Regular'}}>
          Actors
        </Text>
        {/* {cast.map(item => (
          <CastItem key={item.id} actor={item} />
        ))} */}
        <FlatList
          data={cast}
          horizontal
          initialNumToRender={7}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => <CastItem key={item.id} actor={item} />}
          showsHorizontalScrollIndicator={false}
          style={{marginTop: 10, height: 50}}
        />
      </View>
    </View>
  );
};

export default MovieDetails;
