import React from 'react';
import {Text, TextStyle, View} from 'react-native';

interface Props {
  text: string;
  textColor: string;
  textStyle?: any;
  containerStyle?: any;
}

const Text10: React.FC<Props> = ({text, textColor, textStyle, containerStyle}) => {
  return (
    <View style={[containerStyle]}>
      <Text
        style={[
          {
            fontSize: 10,
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

export default Text10;
