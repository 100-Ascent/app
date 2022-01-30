import React from 'react';
import {View} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {Colors} from '../../utils/colors';

const CustomTabBarButton = ({onPress, children, isKeyboardVisible}) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onPress}
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: isKeyboardVisible ? -10 : 30,
      }}>
      <View
        style={{
          width: 64,
          height: 64,
          borderRadius: 32,
          backgroundColor: Colors.RED,
          elevation: 5,
          borderWidth: 5,
          borderColor: Colors.ORANGE
        }}>
        {children}
      </View>
    </TouchableOpacity>
  );
};

export default CustomTabBarButton;
