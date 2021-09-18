import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Colors} from '../../../utils/colors';
import Text16Normal from '../../Text/Text16Normal';
import {Icon} from 'react-native-elements/dist/icons/Icon';

const ActiveChallengeCard = ({data, onPress}) => {
  console.log(data);
  const completedChallengeList = data.map((val, idx) => {
    return (
      <View
        style={{
          borderRadius: 10,
          backgroundColor: '#EEEEEE',
          flexDirection: 'row',
          marginTop: 15,
        }}
        key={idx}>
        <TouchableOpacity
          style={{flex: 1, flexDirection: 'row'}}
          onPress={() => onPress(val)}>
          <View style={{flex: 1, padding: 10}}>
            <FastImage
              style={{width: 60, height: 60, borderRadius: 60}}
              source={{
                uri: val.icon,
                priority: FastImage.priority.high,
              }}
              resizeMode={FastImage.resizeMode.cover}
            />
          </View>
          <View style={{flex: 2, justifyContent: 'center'}}>
            <Text16Normal text={val.name} textColor={Colors.TEXTDARK} />
          </View>
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <View
              style={{
                padding: 10,
                borderRadius: 50,
                //   backgroundColor: Colors.TEXT,
              }}>
              <Icon name="chevron-right" type="entypo" />
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  });
  return (
    <View
      style={{
        flex: 1,
        elevation: 1,
        borderRadius: 10,
        paddingBottom: 20,
        marginHorizontal: 20,
        marginTop: 10,
        backgroundColor: Colors.TEXT,
      }}>
      <View style={{flex: 1, paddingVertical: 10, paddingHorizontal: 20}}>
        {completedChallengeList}
      </View>
    </View>
  );
};

export default ActiveChallengeCard;
