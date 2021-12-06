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
  icon: any,
  isCloseButton?: boolean;
  closeButtonPress?: ()=>void;
  isDescriptionLong?: boolean;
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
  isDescriptionLong = false
}) => {
  return (
    <Modal
      style={{margin: 20}}
      visible={visible}
      onRequestClose={onCancel}      
      transparent>
      <View style={{flex: 1, backgroundColor: '#000000aa'}}>
        <View style={{flex: 2}} />
        <View
          style={{
            position: 'relative',
            flex: 4,
            backgroundColor: Colors.WHITE,
            marginHorizontal: 30,
            borderRadius: 20,
          }}>
          <View style={{position: 'absolute', left: 40, top: -80}}>
            {icon}
          </View>
          <View style={{flex: 4}}></View>
          <View style={{flex: 2, alignItems: 'center', paddingTop: 30}}>
            <Text20 text={header} textColor={Colors.TEXTDARK} />
            <View style={{marginTop: 5, paddingHorizontal: 10 }}>
              { !isDescriptionLong ? <Text16Normal text={description} textStyle={{ textAlign: 'center' }} textColor={Colors.TEXTDARK} /> :
              <Text14 text={description} textStyle={{ textAlign: 'center' }} textColor={Colors.TEXTDARK} /> } 
            </View>
          </View>
          <View style={{flex: 2, alignItems: 'center'}}>
            <PopUpButton
              text={oKText}
              isCancelable={isCancelable}
              cancelText={cancelText}
              onCancel={onCancel}
              onOk={onOk}
            />
          </View>   
          { isCloseButton ? <View style={{flex: 1, alignItems: 'center'}}>
            <TouchableOpacity activeOpacity={0.3} onPress={closeButtonPress}>
              <View>
                <Text14 textColor={Colors.TEXTDARK} text={"Close"}/>
              </View>
            </TouchableOpacity>
            </View> :null }   
        </View>
        <View style={{flex: 2}} />
      </View>
    </Modal>
  );
};
export default CustomPopUp;
