import React from 'react';
import {Dimensions, Image, View} from 'react-native';
import {StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import BackgroundSVGIcon from '../../../assets/background-icons/background-svg-icon.svg';

type Props = {
  children: JSX.Element;
  startColor: string;
  endColor: string;
  style?: any;
};

const Background = ({children, startColor, endColor, style}: Props) => {
  return (
    <LinearGradient
      colors={[startColor, endColor]}
      style={[styles.linearGradient, style]}>
      {children}
    </LinearGradient>
  );
};

export default Background;

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    flexGrow: 1,
  },
});
