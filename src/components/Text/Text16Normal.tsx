import React from 'react';
import { Text, View } from 'react-native';
import { Colors } from '../../utils/colors';

interface Props {
  text: string;
  textColor: string;
  textStyle?: any;
}

const Text16Normal: React.FC<Props> = ({ text, textColor, textStyle }) => {
  return (
    <View>
      <Text
        style={[
          { fontSize: 16, color: textColor, fontFamily: 'Quicksand' },
          textStyle,
        ]}>
        {text}
      </Text>
    </View>
  );
};

export default Text16Normal;
