import React from 'react';
import {View} from 'react-native';
import Text14 from '../Text/Text14';
import DistanceIcon from '../../../assets/icons/distance.svg';
import {Colors} from '../../utils/colors';

const DistanceTotalCard = ({data, isDistance}) => {
  return (
    <View style={{flex: 1, flexDirection: 'row', alignItems: 'center',}}>
      <View style={{flex: 1, width: 30, height: 14}}>
        <DistanceIcon />
      </View>
      <View style={{flex: 3, justifyContent: 'center'}}>
        <Text14
          text={`${data.toFixed(2)} ${isDistance ? 'km' : 'min'}`}
          textColor={Colors.TEXTDARK}
        />
      </View>
    </View>
  );
};

export default DistanceTotalCard;
