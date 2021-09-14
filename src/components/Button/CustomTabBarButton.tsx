import React from 'react';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Colors } from '../../utils/colors';

const CustomTabBarButton = ({ onPress, children }) => {

  return <TouchableOpacity activeOpacity={1} onPress={onPress} style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 30 }}>
    <View style={{
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: Colors.RED,
      elevation: 5
    }}>
      {children}
    </View>
  </TouchableOpacity>
}

export default CustomTabBarButton;