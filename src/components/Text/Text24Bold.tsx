import React from 'react';
import {Text, TextStyle, View} from 'react-native';
import {Colors} from '../../utils/colors';

interface Props {
  text: string;
  textColor?: string;
  textStyle?: any;
  containerStyle?: any;
}

const Text24Bold: React.FC<Props> = ({text, textColor, textStyle, containerStyle}) => {
  return (
    <View style={[containerStyle]}>
      <Text
        style={[
          {fontSize: 24, color: textColor, fontFamily: 'Quicksand-Bold'},
          textStyle,
        ]}>
        {text}
      </Text>
    </View>
  );
};

export default Text24Bold;
