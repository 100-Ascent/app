import React from 'react';
import {Dimensions, Image, View} from 'react-native';

const BackgroundVector = () => {
  return (
    <View style={{position: 'absolute', top: -120, zIndex: 0}}>
      <Image
        source={require('../../../assets/background-icons/BGVector.png')}
        style={{
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height,
        }}
      />
    </View>
  );
};

export default BackgroundVector;
