import React, {useState} from 'react';
import {View, TextInput} from 'react-native';
import {Colors} from '../../../utils/colors';
import StyledButton from '../../Button/StyledButton';
import Text28 from '../../Text/Text28';
import Text14 from '../../Text/Text14';
import {Icon} from 'react-native-elements/dist/icons/Icon';
const KlicksToGoCard = ({data, current}) => {
  console.log(data);
  return (
    <View
      style={{
        margin: 20,
        alignItems: 'center',
        elevation: 4,
        padding: 40,
        borderRadius: 10,
        borderLeftWidth: 10,
        borderColor: 'orange',
        backgroundColor: Colors.TEXT,
      }}>
      <View style={{flexDirection: 'row'}}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text28 text={100 - data.distance + ' '} textColor={Colors.YELLOW} />
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text28 text="Klicks" textColor={Colors.POPUP_RED} />
        </View>
      </View>
      <Text14 text="to go" textColor={Colors.TEXTDARK} />
    </View>
  );
};

export default KlicksToGoCard;
