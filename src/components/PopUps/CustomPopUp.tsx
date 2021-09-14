import React from 'react';
import {Modal, View} from 'react-native';
import {Colors} from '../../utils/colors';
import DeleteModalIcon from '../../../assets/modal-icons/delete-modal-icon.svg';
import {Text} from 'react-native';
import Text16Normal from '../Text/Text16Normal';
import Text24 from '../Text/Text24';
import PopUpButton from '../Button/PopUpButton';

const CustomPopUp = () => {
  return (
    <Modal
      style={{margin: 20}}
      visible={false}
      onRequestClose={() => {}}
      transparent>
      <View style={{flex: 1, backgroundColor: '#000000aa'}}>
        <View style={{flex: 2}} />
        <View
          style={{
            position: 'relative',
            flex: 3,
            backgroundColor: Colors.WHITE,
            marginHorizontal: 30,
            borderRadius: 20,
          }}>
          <View style={{position: 'absolute', left: 40, top: -80}}>
            <DeleteModalIcon />
          </View>
          <View style={{flex: 2}}></View>
          <View style={{flex: 1, alignItems: 'center', paddingTop: 15}}>
            <Text24 text="Confirm Delete" />
            <View style={{marginTop: 5}}>
              <Text16Normal
                text="Do you really want to delete?"
                textColor={Colors.TEXTDARK}
              />
            </View>
          </View>
          <View style={{flex: 1, alignItems: 'center'}}>
            <PopUpButton text="CONFIRM" isCancelable={true} cancelText="NO" />
          </View>
        </View>
        <View style={{flex: 2}} />
      </View>
    </Modal>
  );
};
export default CustomPopUp;
