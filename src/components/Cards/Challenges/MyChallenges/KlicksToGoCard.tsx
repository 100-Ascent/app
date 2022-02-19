import React, {useState} from 'react';
import {View, TextInput} from 'react-native';
import {Colors} from '../../../../utils/colors';
import Text28 from '../../../Text/Text28';
import Text14 from '../../../Text/Text14';
import Text16Normal from '../../../Text/Text16Normal';
import KlicksTooltip from '../../../Tooltip/KlicksTooltip';
const KlicksToGoCard = ({distance}) => {
  return (
    <View
      style={{
        margin: 20,
        alignItems: 'center',
        elevation: 10,
        padding: 20,
        borderRadius: 10,
        borderLeftWidth: 20,
        borderColor: 'orange',
        backgroundColor: Colors.TEXT,
      }}>
      <View style={{flexDirection: 'row'}}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text28 text={100 - distance + ' '} textColor={Colors.YELLOW} />
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text16Normal text="Klicks" textColor={Colors.POPUP_RED} />
        </View>
        <View
          style={{
            justifyContent: 'center',

            marginLeft: 5,
          }}>
          <KlicksTooltip color={Colors.TEXTDARK} />
        </View>
      </View>

      <Text14 text="to go" textColor={Colors.TEXTDARK} />
    </View>
  );
};

export default KlicksToGoCard;
