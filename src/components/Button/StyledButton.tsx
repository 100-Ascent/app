import React from 'react';
import {ViewStyle} from 'react-native';
import {TouchableOpacity, View} from 'react-native';
import {Colors} from '../../utils/colors';
import Text16Normal from '../Text/Text16Normal';

interface Props {
  onPress: () => void;
  text: string;
  buttonStyle?: ViewStyle;
  textStyle?: any;
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
      <TouchableOpacity
        activeOpacity={0.9}
        disabled={disabled}
        onPress={onPress}>
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
          <Text16Normal
            text={text}
            textColor={Colors.TEXT}
            textStyle={textStyle}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default StyledButton;
