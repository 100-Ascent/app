import React from 'react';
import {Text, TextStyle, View} from 'react-native';
import {Colors} from '../../utils/colors';

interface Props {
  text: string;
  textColor: string;
  textStyle?: TextStyle;
}

const Text14: React.FC<Props> = ({text, textColor, textStyle}) => {
  return (
    <View>
      <Text
        style={[
          {
            fontSize: 14,
            color: textColor,
            textAlign: 'left',
            fontFamily: 'Quicksand',
          },
          textStyle,
        ]}>
        {text}
      </Text>
    </View>
  );
};

export default Text14;
