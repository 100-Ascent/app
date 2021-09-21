import React from 'react';
import {Text, TextStyle, View} from 'react-native';
import {Colors} from '../../utils/colors';

interface Props {
  text: string;
  textColor?: string;
  textStyle?: TextStyle;
}

const Text24: React.FC<Props> = ({text, textColor, textStyle}) => {
  return (
    <View>
      <Text
        style={[
          {fontSize: 24, color: textColor, fontFamily: 'Quicksand'},
          textStyle,
        ]}>
        {text}
      </Text>
    </View>
  );
};

export default Text24;
