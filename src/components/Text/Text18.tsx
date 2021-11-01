import React from 'react';
import {Text, View} from 'react-native';
import {Colors} from '../../utils/colors';

interface Props {
  text: string;
  textColor: string;
}

const Text18: React.FC<Props> = ({text, textColor}) => {
  return (
    <View>
      <Text style={[{fontSize: 18, color: textColor, fontFamily: 'Quicksand-Regular'}]}>
        {text}
      </Text>
    </View>
  );
};

export default Text18;
