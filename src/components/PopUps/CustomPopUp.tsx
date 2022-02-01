import React from 'react';
import {Modal, TouchableOpacity, View, StyleSheet} from 'react-native';

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
      <View style={styles.container}>
        <View
          style={[
            styles.visiblePopup,
            {paddingBottom: !isCancelable && !isCloseButton ? 10 : 0},
          ]}>
          <View style={styles.contentContainer}>
            {icon}
            <View style={styles.content}>
              <View style={styles.heading}>
                <Text20 text={header} textColor={Colors.TEXTDARK} />
              </View>

              <View style={{marginTop: 5, paddingHorizontal: 10 }}>
                {  description?.length === 0 ? null : !isDescriptionLong ? (
                  <Text16Normal
                    text={description}
                    textStyle={styles.centeredText}
                    textColor={Colors.TEXTDARK}
                  />
                ) : (
                  <Text14
                    text={description}
                    textStyle={styles.centeredText}
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
                    textStyle={styles.centeredText}
                    textColor={Colors.TEXTDARK}
                  />
                ) : (
                  <Text16Normal
                    text={descriptionOptional}
                    textStyle={[
                      styles.centeredText,
                      {
                        fontFamily: 'Quicksand-SemiBold',
                      },
                    ]}
                    textColor={Colors.TEXTDARK}
                  />
                )}
              </View>
            </View>

            <View style={{alignItems: 'center', marginTop: 20}}>
              <PopUpButton
                text={oKText}
                isCancelable={isCancelable}
                cancelText={cancelText}
                onCancel={onCancel}
                onOk={onOk}
              />
            </View>

            {isCloseButton ? (
              <View style={{alignItems: 'center', marginVertical: 10}}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000aa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  visiblePopup: {
    backgroundColor: Colors.WHITE,
    width: '85%',
    borderRadius: 20,
  },
  contentContainer: {
    zIndex: 10,
    marginTop: -60,
    borderWidth: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {alignItems: 'center'},
  heading: {marginTop: 20, paddingHorizontal: 10 },
  centeredText: {textAlign: 'center'},
});

export default CustomPopUp;
