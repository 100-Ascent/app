import {Text, View} from 'react-native';

import React from 'react';

interface Props {
  text: string;
  textColor: string;
  containerStyle? : any;
}

const Text30: React.FC<Props> = ({text, textColor, containerStyle}) => {
  return (
    <View style={[containerStyle]}>
      <Text style={[{fontSize: 30, color: textColor, fontFamily: 'Quicksand-Bold'}]}>
        {text}
      </Text>
    </View>
  );
};

export default Text30;