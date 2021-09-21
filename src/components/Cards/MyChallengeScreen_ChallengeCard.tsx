import React from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import {Colors} from '../../utils/colors';
import Text16Normal from '../Text/Text16Normal';
import Text28 from '../Text/Text28';
import FastImage from 'react-native-fast-image';
import Text16Underline from '../Text/Text16Underline';

const ChallengeNameWithIconCard = ({name, icon, onViewDetailsPressed}) => {
  return (
    <View style={{flex: 1, marginHorizontal: 15, flexDirection: 'row'}}>
      <View
        style={{
          flex: 2,
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 10,
        }}>
        <View style={{borderWidth: 3, borderRadius: 100, padding: 3}}>
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
            <Text16Underline text="View Details" textColor={Colors.TEXT3} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ChallengeNameWithIconCard;
