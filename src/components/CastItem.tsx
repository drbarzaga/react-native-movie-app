import React from 'react';
import {Image, Text, View, StyleSheet} from 'react-native';
import {Cast} from '../interfaces/credit';

type Props = {
  actor: Cast;
};

const CastItem = ({actor}: Props) => {
  const uri = `https://image.tmdb.org/t/p/w500${actor.profile_path}`;
  return (
    <View style={styles.container}>
      {actor.profile_path && (
        <Image
          source={{
            uri,
          }}
          style={{width: 50, height: 50, borderRadius: 10}}
        />
      )}
      <View style={styles.actorInfo}>
        <Text style={{fontSize: 16, fontFamily: 'Poppins-Regular'}}>
          {actor.name}
        </Text>
        <Text style={{fontSize: 16, fontFamily: 'Poppins-Thin'}}>
          {actor.character}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flexDirection: 'row',
    shadowColor: '#000',
    height: 50,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 7,
    elevation: 10,
    marginRight: 20,
    paddingRight: 10,
    borderRadius: 10,
  },
  actorInfo: {
    marginLeft: 10,
    marginTop: 5,
  },
});

export default CastItem;
