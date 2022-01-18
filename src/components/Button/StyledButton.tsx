import React from 'react';
import {ActivityIndicator, ViewStyle} from 'react-native';
import {TouchableOpacity, View} from 'react-native';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import {Colors} from '../../utils/colors';
import Text16Normal from '../Text/Text16Normal';

interface Props {
  onPress: () => void;
  text: string;
  buttonStyle?: ViewStyle;
  textStyle?: any;
  disabled?: boolean;
  loading?: boolean;
}

const StyledButton: React.FC<Props> = ({
  onPress,
  text,
  buttonStyle,
  disabled = false,
  textStyle,
  loading = false,
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
          {loading ? <ActivityIndicator size="small" color={Colors.TEXT} /> : <Text16Normal
            text={text}
            textColor={Colors.TEXT}
            textStyle={textStyle}
          />}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default StyledButton;
