import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import ShareIcon from '../../../assets/icons/share-icon.svg';

interface Props {
  onPress?: ()=> void;
}

const ShareButton: React.FC<Props> = ({ onPress }) => {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <View
        style={{
          backgroundColor: '#111426',
          marginHorizontal: 5,
          paddingHorizontal: 5,
          paddingVertical: 11,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 10,
        }}>
        <ShareIcon />
      </View>
    </TouchableOpacity>
  );
};

export default ShareButton;
