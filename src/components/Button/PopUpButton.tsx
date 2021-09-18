import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Colors} from '../../utils/colors';
import Text16Normal from '../Text/Text16Normal';

interface Props {
  text: string;
  isCancelable: boolean;
  cancelText?: string;
<<<<<<< HEAD
}
const PopUpButton: React.FC<Props> = ({text, isCancelable, cancelText}) => {
=======
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
>>>>>>> 07f66b329214a0c3ad1496e9b1891bf42e51ab99
  return (
    <View style={{flex: 1}}>
      <View style={{flexDirection: 'row'}}>
        {isCancelable ? (
          <View>
            <TouchableOpacity
              activeOpacity={0.9}
<<<<<<< HEAD
              style={{borderRadius: 20, elevation: 2}}>
=======
              style={{borderRadius: 20, elevation: 2}}
              onPress={onCancel}>
>>>>>>> 07f66b329214a0c3ad1496e9b1891bf42e51ab99
              <View
                style={{
                  paddingVertical: 15,
                  paddingHorizontal: 50,
                  backgroundColor: Colors.POPUP_GREY,
                  borderRadius: 20,
                }}>
                <Text16Normal text={cancelText} textColor={Colors.TEXT} />
              </View>
            </TouchableOpacity>
          </View>
        ) : null}
        <View style={{marginLeft: 20}}>
          <TouchableOpacity
            activeOpacity={0.9}
<<<<<<< HEAD
            style={{borderRadius: 20, elevation: 2}}>
=======
            style={{borderRadius: 20, elevation: 2}}
            onPress={onOk}>
>>>>>>> 07f66b329214a0c3ad1496e9b1891bf42e51ab99
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
