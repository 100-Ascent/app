import React from 'react';
import {Text, View} from 'react-native';
import {Colors} from '../../utils/colors';

interface Props {
  text: string;
  textColor: string;
  textStyle? :any;
  containerStyle?: any;
}

const Text20: React.FC<Props> = ({text, textColor, textStyle, containerStyle}) => {
  return (
    <View style={containerStyle}>
      <Text style={[{fontSize: 20, color: textColor, fontFamily: 'Quicksand-Medium'}, textStyle]}>
        {text}
      </Text>
    </View>
  );
};

export default Text20;
