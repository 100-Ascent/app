import React from 'react';
import {View} from 'react-native';
import Icon from 'react-native-elements/dist/icons/Icon';
import {Colors} from '../../../utils/colors';
import Text16Normal from '../../Text/Text16Normal';
import Text20 from '../../Text/Text20';
import Text28 from '../../Text/Text28';
import KlicksTooltip from '../../Tooltip/KlicksTooltip';

const AscendedRemainingDistanceCard = ({current, total}) => {
  return (
    <View
      style={{
        flex: 1,
        marginHorizontal: 15,
        borderRadius: 10,
        flexDirection: 'row',
        elevation: 8,
        shadowColor: Colors.BLACK1,
        shadowRadius: 10,
        shadowOffset: {
          height: 10,
          width: 10,
        },
      }}>
      <View
        style={{
          flex: 1,
          backgroundColor: Colors.BLUE,
          borderTopLeftRadius: 10,
          borderBottomLeftRadius: 10,
          alignItems: 'center',
        }}>
        <View style={{flex: 1, marginVertical: 10}}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{justifyContent: 'center'}}>
              <Text28 text={current + ' '} textColor={Colors.YELLOW} />
            </View>
            <View style={{justifyContent: 'center', marginTop: 5}}>
              <Text20 text="Klicks" textColor={Colors.YELLOW} />
            </View>
            <View
              style={{justifyContent: 'center', marginTop: 10, marginLeft: 5}}>
              <KlicksTooltip color={Colors.TEXT} />
            </View>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}>
            <Text16Normal text="ascended" textColor={Colors.TEXT} />
          </View>
        </View>
      </View>
      <View
        style={{
          flex: 1,
          backgroundColor: Colors.WHITE,
          borderTopRightRadius: 10,
          borderBottomRightRadius: 10,
          alignItems: 'center',
        }}>
        <View style={{flex: 1, marginVertical: 10}}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{justifyContent: 'center'}}>
              <Text28 text={total - current + ' '} textColor={Colors.YELLOW} />
            </View>
            <View style={{justifyContent: 'center', marginTop: 5}}>
              <Text20 text="Klicks" textColor={Colors.YELLOW} />
            </View>
            <View
              style={{justifyContent: 'center', marginTop: 10, marginLeft: 5}}>
              <KlicksTooltip color={Colors.TEXTDARK} />
            </View>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}>
            <Text16Normal text="remaining" textColor={Colors.TEXTDARK} />
          </View>
        </View>
      </View>
    </View>
  );
};

export default AscendedRemainingDistanceCard;
