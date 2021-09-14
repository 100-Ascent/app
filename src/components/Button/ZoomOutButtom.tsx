import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Icon} from 'react-native-elements';
import {Colors} from '../../utils/colors';

const ZoomOutButton = ({zoomOut}) => {
  return (
    <View>
      <TouchableOpacity
        onPress={zoomOut}
        onLongPress={zoomOut}
        onPressIn={zoomOut}>
        <Icon name="minus" type="feather" color={Colors.TEXTDARK} size={25} />
      </TouchableOpacity>
    </View>
  );
};

export default ZoomOutButton;
