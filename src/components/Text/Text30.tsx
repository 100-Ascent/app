import React from 'react';
import {Text, View} from 'react-native';

interface Props {
  text: string;
  textColor: string;
}

const Text30: React.FC<Props> = ({text, textColor}) => {
  return (
    <View>
      <Text style={[{fontSize: 30, color: textColor, fontFamily: 'Quicksand-Bold'}]}>
        {text}
      </Text>
    </View>
  );
};

export default Text30;