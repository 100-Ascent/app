import React from 'react';
import {Modal, TouchableOpacity, View} from 'react-native';
import {Colors} from '../../utils/colors';
import Text16Normal from '../Text/Text16Normal';
import PopUpButton from '../Button/PopUpButton';
import Text20 from '../Text/Text20';
import Text14 from '../Text/Text14';

interface Props {
  cancelText?: string;
  description?: string;
  header?: string;
  isCancelable?: boolean;
  onCancel?: () => void;
  onOk: () => void;
  oKText?: string;
  visible: boolean;
  icon: any;
  isCloseButton?: boolean;
  closeButtonPress?: () => void;
  isDescriptionLong?: boolean;
  descriptionOptional?: string;
}

const CustomPopUp: React.FC<Props> = ({
  cancelText,
  description,
  header,
  isCancelable,
  onCancel,
  onOk,
  oKText,
  visible,
  icon,
  isCloseButton,
  closeButtonPress,
  descriptionOptional = '',
  isDescriptionLong = false,
}) => {
  return (
    <Modal
      style={{margin: 20}}
      visible={visible}
      onRequestClose={onCancel}
      transparent>
      <View
        style={{
          flex: 1,
          backgroundColor: '#000000aa',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            backgroundColor: Colors.WHITE,
            width: '85%',
            borderRadius: 20,
            paddingBottom: !isCancelable && !isCloseButton ? 10 : 0,
          }}>
          <View
            style={{
              zIndex: 10,
              marginTop: -60,
              borderWidth: 0,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {icon}
            <View style={{alignItems: 'center'}}>
              <View style={{marginTop: 20}}>
                <Text20 text={header} textColor={Colors.TEXTDARK} />
              </View>

              <View style={{ marginTop: 5, paddingHorizontal: 10 }}>
                {!isDescriptionLong ? (
                  <Text16Normal
                    text={description}
                    textStyle={{textAlign: 'center'}}
                    textColor={Colors.TEXTDARK}
                  />
                ) : (
                  <Text14
                    text={description}
                    textStyle={{textAlign: 'center'}}
                    textColor={Colors.TEXTDARK}
                  />
                )}
              </View>
              <View
                style={{
                  paddingHorizontal: descriptionOptional?.length > 0 ? 10 : 0,
                }}>
                {descriptionOptional?.length ===
                0 ? null : isDescriptionLong ? (
                  <Text14
                    text={descriptionOptional}
                    textStyle={{textAlign: 'center'}}
                    textColor={Colors.TEXTDARK}
                  />
                ) : (
                  <Text16Normal
                    text={descriptionOptional}
                    textStyle={{
                      textAlign: 'center',
                      fontFamily: 'Quicksand-SemiBold',
                    }}
                    textColor={Colors.TEXTDARK}
                  />
                )}
              </View>
            </View>

            <View style={{alignItems: 'center', marginTop: 20 }}>
              <PopUpButton
                text={oKText}
                isCancelable={isCancelable}
                cancelText={cancelText}
                onCancel={onCancel}
                onOk={onOk}
              />
            </View>

            {isCloseButton ? (
              <View
                style={{alignItems: 'center', marginTop: 10, marginBottom: 10}}>
                <TouchableOpacity
                  activeOpacity={0.3}
                  onPress={closeButtonPress}>
                  <View>
                    <Text14
                      textColor={Colors.TEXTDARK}
                      text={'Close'}
                      textStyle={{fontFamily: 'Quicksand-SemiBold'}}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            ) : null}
            <View style={{padding: 5}} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CustomPopUp;
