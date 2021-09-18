import React from 'react';
import { View } from 'react-native';
import { Colors } from '../../../utils/colors';
import Text14 from '../../Text/Text14';
import Text16Normal from '../../Text/Text16Normal';
import HamperIcon from '../../../../assets/icons/reward-hamper-icon.svg';

const HamperCard = () => {
  return (
    <View
      style={{
        marginHorizontal: 20,
        flex: 10,
        elevation: 2,
        marginTop: 10,
        borderRadius: 10,
        backgroundColor: Colors.TEXT,
      }}>
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 10,
          }}>
          <HamperIcon />
        </View>
        <View style={{ flex: 3 }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text16Normal
              textColor={Colors.TEXTDARK}
              text={'Custom Hamper For You'}
            />
          </View>
          <View
            style={{
              borderWidth: 1,
              marginHorizontal: 20,
              borderColor: '#C9C9C9',
            }}
          />
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text14 textColor={Colors.BLACK2} text={'Coming Soon...'} />
          </View>
        </View>
      </View>
    </View>
  );
};

export default HamperCard;
