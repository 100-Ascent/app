import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-elements/dist/icons/Icon';
import {Colors} from '../../utils/colors';

const DefaultLocationButton = ({handleSetInitialRegion}) => {
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={handleSetInitialRegion}>
      <Icon
        name="location-arrow"
        type="font-awesome"
        color={Colors.TEXTDARK}
        size={20}
        onPress={handleSetInitialRegion}
      />
    </TouchableOpacity>
  );
};

export default DefaultLocationButton;
