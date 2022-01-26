import React from 'react';
import {Text, View} from 'react-native';

interface Props {
  text: string;
  textColor: string;
  textStyle?: object;
  containerStyle?: object;
}

const Text16Bold: React.FC<Props> = ({text, textColor, textStyle = {}, containerStyle = {}}) => {
  return (
    <View style={[containerStyle]}>
      <Text
        style={
          [{
            fontSize: 16,
            color: textColor,
            fontFamily: 'Quicksand-Bold',
          }, textStyle]
        }>
        {text}
      </Text>
    </View>
  );
};

export default Text16Bold;
