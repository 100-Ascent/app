import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-elements/dist/icons/Icon';
import {Colors} from '../../utils/colors';

interface Props {
  onPress: () => void;
}

const FloatingActionButton: React.FC<Props> = ({onPress}) => {
  //State variables

  //Async functions

  //Component functions

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={{
        borderWidth: 1,
        borderColor: Colors.TRANSPARENT,
        alignItems: 'center',
        justifyContent: 'center',
        width: 65,
        height: 65,
        backgroundColor: Colors.POPUP_RED,
        borderRadius: 100,
        elevation: 5,
      }}>
      <Icon name="plus" type="ant-design" size={30} color={Colors.TEXT} />
    </TouchableOpacity>
  );
};

export default FloatingActionButton;
