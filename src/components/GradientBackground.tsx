import React, {useContext} from 'react';
import {StyleSheet, View, Animated} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {GradientContext} from '../context/GradientContext';
import {useEffect} from 'react';
import useFade from '../hooks/useFade';

type Props = {
  children: JSX.Element | JSX.Element[];
};

const GradientBackground = ({children}: Props) => {
  const {colors, prevColors, setMainColors} = useContext(GradientContext);
  const {fadeIn, fadeOut} = useFade();

  useEffect(() => {
    fadeIn(() => {
      setMainColors(colors);
      fadeOut();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [colors]);

  return (
    <View style={{flex: 1}}>
      <LinearGradient
        colors={[prevColors.primary, prevColors.secondary, 'white']}
        style={{...StyleSheet.absoluteFillObject}}
        start={{x: 0.1, y: 0.1}}
        end={{x: 0.5, y: 0.5}}
      />
      <Animated.View
        style={{...StyleSheet.absoluteFillObject, backgroundColor: 'red'}}>
        <LinearGradient
          colors={[colors.primary, colors.secondary, 'white']}
          style={{...StyleSheet.absoluteFillObject}}
          start={{x: 0.1, y: 0.1}}
          end={{x: 0.5, y: 0.5}}
        />
      </Animated.View>
      {children}
    </View>
  );
};

export default GradientBackground;
