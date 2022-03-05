import {Text, View, ViewStyle} from 'react-native';

import { Colors } from '../../utils/colors';
import React from 'react';

interface Props {
  text: string;
  textColor: string;
  textStyle?: any;
  containerStyle?: ViewStyle;
}

const Text14: React.FC<Props> = ({text, textColor = Colors.TEXTDARK, textStyle, containerStyle}) => {
  return (
    <View style={[containerStyle]}>
      <Text
        style={[
          {
            fontSize: 14,
            color: textColor,
            fontFamily: 'Quicksand-Light',
          },
          textStyle,
        ]}>
        {text}
      </Text>
    </View>
  );
};

export default Text14;
