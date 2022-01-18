import React from 'react';
import {Text, TextStyle, View} from 'react-native';

interface Props {
  text: string;
  textColor: string;
  textStyle?: any;
}

const Text12Normal: React.FC<Props> = ({text, textColor, textStyle}) => {
  return (
    <View>
      <Text
        style={[
          {
            fontSize: 12,
            color: textColor,
            textAlign: 'left',
            fontFamily: 'Quicksand-Regular',
          },
          textStyle,
        ]}>
        {text}
      </Text>
    </View>
  );
};

export default Text12Normal;
