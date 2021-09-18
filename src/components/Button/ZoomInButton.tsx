import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Icon} from 'react-native-elements';
import {Colors} from '../../utils/colors';

const ZoomInButton = ({zoomIn}) => {
  return (
    <View>
      <TouchableOpacity
        onPress={zoomIn}
        onLongPress={zoomIn}
        onPressIn={zoomIn}>
        <Icon name="plus" type="feather" color={Colors.TEXTDARK} size={25} />
      </TouchableOpacity>
    </View>
  );
};

export default ZoomInButton;
