import React from 'react';
import {View} from 'react-native';
import Text14 from '../Text/Text14';
import CalorieIcon from '../../../assets/icons/CalMinStepsIcon/calorie.svg';
import {Colors} from '../../utils/colors';

const CalorieCard = ({calorie}) => {
  return (
    <View style={{flex: 1, flexDirection: 'row', alignItems: 'center',}}>
      <View style={{flex: 1}}>
        <CalorieIcon />
      </View>
      <View style={{flex: 3, justifyContent: 'center'}}>
        <Text14 text={`${calorie / 1000} kCal.`} textColor={Colors.TEXTDARK} />
      </View>
    </View>
  );
};

export default CalorieCard;
