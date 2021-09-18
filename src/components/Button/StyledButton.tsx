import React from 'react';
<<<<<<< HEAD
import {TextProps, ViewStyle} from 'react-native';
=======
import {ViewStyle} from 'react-native';
>>>>>>> 07f66b329214a0c3ad1496e9b1891bf42e51ab99
import {TouchableOpacity, View} from 'react-native';
import {Colors} from '../../utils/colors';
import Text16Normal from '../Text/Text16Normal';

interface Props {
  onPress: () => void;
  text: string;
  buttonStyle?: ViewStyle;
<<<<<<< HEAD
  textStyle?: TextProps;
=======
  textStyle?: any;
>>>>>>> 07f66b329214a0c3ad1496e9b1891bf42e51ab99
  disabled?: boolean;
}

const StyledButton: React.FC<Props> = ({
  onPress,
  text,
  buttonStyle,
  disabled = false,
  textStyle,
}) => {
  return (
    <View>
<<<<<<< HEAD
      <TouchableOpacity disabled={disabled} onPress={onPress}>
=======
      <TouchableOpacity
        activeOpacity={0.9}
        disabled={disabled}
        onPress={onPress}>
>>>>>>> 07f66b329214a0c3ad1496e9b1891bf42e51ab99
        <View
          style={[
            {
              backgroundColor: disabled ? Colors.BLACK3 : Colors.BUTTON_DARK,
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: 10,
            },
            buttonStyle,
          ]}>
<<<<<<< HEAD
          <Text16Normal text={text} textColor={Colors.TEXT} />
=======
          <Text16Normal
            text={text}
            textColor={Colors.TEXT}
            textStyle={textStyle}
          />
>>>>>>> 07f66b329214a0c3ad1496e9b1891bf42e51ab99
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default StyledButton;
