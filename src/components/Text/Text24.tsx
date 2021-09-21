import React from 'react';
<<<<<<< HEAD
import {Text, TextStyle, View} from 'react-native';
import {Colors} from '../../utils/colors';
=======
import { Text, TextStyle, View } from 'react-native';
import { Colors } from '../../utils/colors';
>>>>>>> 4c1567f4d5d598f304006891a5626a5201cd6661

interface Props {
  text: string;
  textColor?: string;
  textStyle?: TextStyle;
}

<<<<<<< HEAD
const Text24: React.FC<Props> = ({text, textColor, textStyle}) => {
=======
const Text24: React.FC<Props> = ({ text, textColor, textStyle }) => {
>>>>>>> 4c1567f4d5d598f304006891a5626a5201cd6661
  return (
    <View>
      <Text
        style={[
<<<<<<< HEAD
          {fontSize: 24, color: textColor, fontFamily: 'Quicksand'},
=======
          { fontSize: 24, color: textColor, fontFamily: 'Quicksand' },
>>>>>>> 4c1567f4d5d598f304006891a5626a5201cd6661
          textStyle,
        ]}>
        {text}
      </Text>
    </View>
  );
};

export default Text24;
