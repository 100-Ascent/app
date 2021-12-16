import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import {Colors} from '../../utils/colors';
import LottieView from 'lottie-react-native';
import {WIDTH} from '../../utils/constants/constants';

const RNLoaderSimple = () => {
  return (
    <View style={{flex: 1, backgroundColor: Colors.WHITE}}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ActivityIndicator size="large" color={Colors.POPUP_RED} />
      </View>
    </View>
  );
};

export default RNLoaderSimple;
