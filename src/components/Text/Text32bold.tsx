import React from 'react';
import {Text, View} from 'react-native';

interface Props {
  text: string;
  textColor: string;
}

const Text32bold: React.FC<Props> = ({text, textColor}) => {
  return (
    <View>
      <Text style={[{fontSize: 36, color: textColor, fontFamily: 'Quicksand', fontWeight:'bold'}]}>
        {text}
      </Text>
    </View>
  );
};

export default Text32bold;