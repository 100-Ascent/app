import React from 'react';
import {Text, View} from 'react-native';
import {Colors} from '../../utils/colors';

interface Props {
  text: string;
  textColor: string;
  textStyle?: any
}

const Text18: React.FC<Props> = ({text, textColor, textStyle}) => {
  return (
    <View>
      <Text style={[{fontSize: 18, color: textColor, fontFamily: 'Quicksand-Regular'}, textStyle]}>
        {text}
      </Text>
    </View>
  );
};

export default Text18;
