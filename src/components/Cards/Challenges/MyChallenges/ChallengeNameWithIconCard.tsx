import {TouchableOpacity, View} from 'react-native';

import {Colors} from '../../../../utils/colors';
import FastImage from 'react-native-fast-image';
import React from 'react';
import Text16Underline from '../../../Text/Text16Underline';
import Text28 from '../../../Text/Text28';

const ChallengeNameWithIconCard = ({name, icon, onViewDetailsPressed}) => {
  return (
    <View style={{ marginHorizontal: 20, marginTop: 10, flexDirection: 'row'}}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 10,
        }}>
        <View style={{ borderWidth: 3, borderRadius: 100, padding: 3 }}>
          <FastImage
            style={{width: 100, height: 100, borderRadius: 100}}
            source={{
              uri: icon,
              priority: FastImage.priority.high,
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
        </View>
      </View>
      <View style={{flex: 3, marginLeft: 20}}>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Text28 text={name} textColor={Colors.TEXTDARK} />
        </View>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <TouchableOpacity onPress={onViewDetailsPressed}>
            <Text16Underline text="View Details" textColor={Colors.INFO_GREY} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ChallengeNameWithIconCard;
