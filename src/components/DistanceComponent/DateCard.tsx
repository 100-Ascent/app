import React from 'react';
import {View} from 'react-native';
import Text14 from '../Text/Text14';
import Calendar from '../../../assets/icons/calendar.svg';
import {Colors} from '../../utils/colors';

const DateCard = ({date}) => {
  // var st = date;
  // var pattern = /(\d{2})\/(\d{2})\/(\d{4})/;
  // var dt = new Date(st.replace(pattern,'$3-$2-$1'));
  return (
    <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start'}}>
      <View style={{flex: 1, width: 30, height: 25, marginLeft: -3}}>
        <Calendar />
      </View>
      <View style={{flex: 7, justifyContent: 'flex-start'}}>
        <Text14
          text={new Date(date).toLocaleString()}
          textColor={Colors.TEXTDARK}
        />
      </View>
    </View>
  );
};

export default DateCard;
