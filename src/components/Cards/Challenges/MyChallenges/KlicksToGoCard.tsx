import React, {useState} from 'react';
import {TextInput, View} from 'react-native';

import {Colors} from '../../../../utils/colors';
import KlicksTooltip from '../../../Tooltip/KlicksTooltip';
import Text14 from '../../../Text/Text14';
import Text16Normal from '../../../Text/Text16Normal';
import Text28 from '../../../Text/Text28';
import Text30 from '../../../Text/Text30';

const KlicksToGoCard = ({distance}) => {
  return (
    <View
      style={{
        marginHorizontal: 20,
        marginTop: 20,
        alignItems: 'center',
        elevation: 10,
        paddingVertical: 15,
        borderRadius: 10,
        borderLeftWidth: 20,
        borderColor: 'orange',
        backgroundColor: Colors.TEXT,
      }}>
      <View style={{flexDirection: 'row'}}>
        <View style={{ justifyContent: 'center' }}>
          <Text30 text={100 - distance + ' '} textColor={Colors.YELLOW} />
        </View>
        <View style={{ justifyContent: 'flex-end', paddingBottom: 4, marginLeft: -3 }}>
          <Text16Normal text="Klicks" textColor={Colors.POPUP_RED} />
        </View>
        <View style={{ justifyContent: 'flex-end', paddingBottom: 4, marginLeft: 5 }}>
          <KlicksTooltip color={Colors.TEXTDARK} />
        </View>
      </View>

      <Text16Normal text="to go" textColor={Colors.TEXTDARK} />
    </View>
  );
};

export default KlicksToGoCard;
