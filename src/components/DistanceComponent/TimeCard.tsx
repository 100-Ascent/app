import React from 'react';
import {View} from 'react-native';
import Text14 from '../Text/Text14';
import TimeIcon from '../../../assets/icons/CalMinStepsIcon/time.svg';
import {Colors} from '../../utils/colors';

const TimeCard = ({time}) => {
  const hrs = Math.floor(time / 60);
  const min = time % 60;

  return (
    <View style={{flex: 1, flexDirection: 'row', alignItems: 'center',}}>
      <View style={{flex: 1}}>
        <TimeIcon />
      </View>
      <View style={{flex: 3, justifyContent: 'center'}}>
        <Text14
          text={hrs === 0 ? min ===0 ? `${min.toFixed(0)} min` : `${min.toFixed(2)} min` : `${hrs} hrs ${min.toFixed(0)} min`}
          textColor={Colors.TEXTDARK}
        />
      </View>
    </View>
  );
};

export default TimeCard;
