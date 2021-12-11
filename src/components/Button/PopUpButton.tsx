import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Colors} from '../../utils/colors';
import Text16Normal from '../Text/Text16Normal';

interface Props {
  text: string;
  isCancelable: boolean;
  cancelText?: string;
  onOk?: () => void;
  onCancel?: () => void;
}
const PopUpButton: React.FC<Props> = ({
  text,
  isCancelable,
  cancelText,
  onOk,
  onCancel,
}) => {
  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <View style={{flexDirection: 'row',  }}>
        {isCancelable ? (
          <View>
            <TouchableOpacity
              activeOpacity={0.9}
              style={{borderRadius: 20, elevation: 2}}
              onPress={onCancel}>
              <View
                style={{
                  paddingVertical: 15,
                  paddingHorizontal: 25,
                  backgroundColor: Colors.POPUP_GREY,
                  borderRadius: 20,
                }}>
                <Text16Normal text={cancelText} textColor={Colors.TEXT} />
              </View>
            </TouchableOpacity>
          </View>
        ) : null}
        <View style={{marginLeft: isCancelable ? 20: 0 }}>
          <TouchableOpacity
            activeOpacity={0.9}
            style={{borderRadius: 20, elevation: 2}}
            onPress={onOk}>
            <View
              style={{
                paddingVertical: 15,
                paddingHorizontal: 25,
                backgroundColor: Colors.POPUP_RED,
                borderRadius: 20,
              }}>
              <Text16Normal text={text} textColor={Colors.TEXT} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default PopUpButton;
