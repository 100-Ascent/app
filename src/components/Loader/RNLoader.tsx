import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import {Colors} from '../../utils/colors';

const RNLoader = () => {
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

export default RNLoader;
