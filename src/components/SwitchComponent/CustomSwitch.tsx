import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Colors} from '../../utils/colors';
import Text16Normal from '../Text/Text16Normal';

const CustomSwitch = ({currentTab, onPress}) => {
  return (
    <View style={{flex: 1, flexDirection: 'row', marginTop: 20}}>
      <View style={{flex: 1, marginLeft: 20}}>
        <TouchableOpacity onPress={onPress}>
          <View
            style={{
              backgroundColor:
                currentTab === 0 ? Colors.CARDS_COLOR1 : Colors.TRANSPARENT,
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: 10,
            }}>
            <Text16Normal
              text={'Description'}
              textColor={currentTab === 0 ? Colors.TEXT : Colors.TEXTDARK}
            />
          </View>
        </TouchableOpacity>
      </View>
      <View style={{flex: 1, marginRight: 20}}>
        <TouchableOpacity onPress={onPress}>
          <View
            style={{
              backgroundColor:
                currentTab === 1 ? Colors.CARDS_COLOR1 : Colors.TRANSPARENT,
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: 10,
            }}>
            <Text16Normal
              text={'Rewards'}
              textColor={currentTab === 1 ? Colors.TEXT : Colors.TEXTDARK}
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomSwitch;
