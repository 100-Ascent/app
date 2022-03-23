import {Colors} from '../../utils/colors';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {View} from 'react-native';

const CustomTabBarButton = ({onPress, children, showTabBarButton}) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onPress}
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: showTabBarButton ? 30 : -10,
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
