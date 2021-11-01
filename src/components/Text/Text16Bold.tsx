import React from 'react';
import {Text, View} from 'react-native';
import {Colors} from '../../utils/colors';

interface Props {
  text: string;
  textColor: string;
}

const Text16Bold: React.FC<Props> = ({text, textColor}) => {
  return (
    <View>
      <Text
        style={[
          {
            fontSize: 16,
            fontWeight: 'bold',
            color: textColor,
            fontFamily: 'Quicksand-Bold',
          },
        ]}>
        {text}
      </Text>
    </View>
  );
};

export default Text16Bold;
