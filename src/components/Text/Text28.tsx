import React from 'react';
import {Text, View} from 'react-native';
import {Colors} from '../../utils/colors';

interface Props {
  text: string;
  textColor?: string;
  textStyle?: any;
  containerStyle?: any;
}

const Text28: React.FC<Props> = ({text, textColor, textStyle, containerStyle}) => {
  return (
    <View style={[containerStyle]}>
      <Text style={[{fontSize: 28, color: textColor, fontFamily: 'Quicksand-SemiBold'}, textStyle]}>
        {text}
      </Text>
    </View>
  );
};

export default Text28;
