import {TouchableOpacity, View} from 'react-native';

import {Colors} from '../../../utils/colors';
import FastImage from 'react-native-fast-image';
import React from 'react';
import Text16Normal from '../../Text/Text16Normal';
import Text20 from '../../Text/Text20';
import TrophyIcon from '../../../../assets/icons/challenge-trophy-icon.svg';
import { shadowStyles } from '../../../styles/Global/styles';

const CompletedChallenge = ({data, onPress}) => {
  const completedChallengeList = data.map((val, idx) => {
    return (
      <TouchableOpacity activeOpacity={0.7} onPress={()=>onPress(val)}>
      <View
        style={[ shadowStyles.shadowElevation1, {
          borderRadius: 10,
          backgroundColor: '#EEEEEE',
          flexDirection: 'row',
          marginTop: 15,
        }]}
        key={idx}>
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
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <View
            style={{
              padding: 10,
              borderRadius: 50,
              backgroundColor: Colors.TEXT,
            }}>
            <TrophyIcon />
          </View>
        </View>
      </View>
      </TouchableOpacity>
    );
  });
  return (
    <View
      style={[ shadowStyles.shadowElevation1, {
        flex: 1,
        elevation: 1,
        borderRadius: 10,
        paddingBottom: 20,
        marginHorizontal: 5,
        backgroundColor: Colors.TEXT,
      }]}>
      <View style={{flex: 1, paddingTop: 20, paddingHorizontal: 20}}>
        <Text20 text={'Completed Challenges'} textColor={Colors.TEXTDARK} />
      </View>
      <View style={{flex: 1, paddingVertical: 10, paddingHorizontal: 20}}>
        {completedChallengeList}
      </View>
    </View>
  );
};

export default CompletedChallenge;
