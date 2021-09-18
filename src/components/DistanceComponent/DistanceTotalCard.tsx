import React from 'react';
import {View} from 'react-native';
import Text14 from '../Text/Text14';
import DistanceIcon from '../../../assets/icons/distance.svg';
import {Colors} from '../../utils/colors';

const DistanceTotalCard = ({data, isDistance}) => {
  return (
    <View style={{flex: 1, flexDirection: 'row'}}>
      <View style={{flex: 1}}>
        <DistanceIcon />
      </View>
      <View style={{flex: 3, justifyContent: 'center'}}>
        <Text14
          text={`${data} ${isDistance ? 'km' : 'min'}`}
          textColor={Colors.TEXTDARK}
        />
      </View>
    </View>
  );
};

export default DistanceTotalCard;
