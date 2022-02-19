import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import SpotifyIcon from '../../../assets/icons/spotify-icon.svg';

const SpotifyButton = ({onPress}) => {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <View
        style={{
          backgroundColor: '#111426',
          padding: 9,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 10,
        }}>
        <SpotifyIcon />
      </View>
    </TouchableOpacity>
  );
};

export default SpotifyButton;
