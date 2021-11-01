import React from 'react';
import {Text, View} from 'react-native';
import {Colors} from '../../utils/colors';

interface Props {
  text: string;
  textColor: string;
}

const Text28: React.FC<Props> = ({text, textColor}) => {
  return (
    <View>
      <Text style={[{fontSize: 28, color: textColor, fontFamily: 'Quicksand-SemiBold'}]}>
        {text}
      </Text>
    </View>
  );
};

export default Text28;
