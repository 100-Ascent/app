import React from 'react';
import {View} from 'react-native';
import MileStoneIcon from '../../../../assets/icons/milestone-icon.svg';
import DoubleDistanceIcon from '../../../../assets/icons/double-distance-icon.svg';
import CityCarousal from '../../Carousals/CityCarousal';

import Text24 from '../../Text/Text24';
import Text16Normal from '../../Text/Text16Normal';
import {Colors} from '../../../utils/colors';
import Text20 from '../../Text/Text20';

const ChallengeCityAndDistanceCard = ({data, distance, milestones}) => {
  return (
    <View
      style={{
        flex: 1,
        marginHorizontal: 20,
        backgroundColor: Colors.TEXT,
        padding: 10,
        borderRadius: 10,
        elevation: 1,
      }}>
      <View style={{paddingTop: 10}}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <View style={{flex: 1, flexDirection: 'row', marginHorizontal: 20}}>
            <View style={{}}>
              <MileStoneIcon />
            </View>
            <View style={{marginLeft: 10}}>
              <Text24 text={milestones} />
            </View>
            <View style={{marginLeft: 10, marginTop: 8}}>
              <Text16Normal text={'Milestones'} textColor={Colors.TEXTDARK} />
            </View>
          </View>
          <View style={{flex: 1, flexDirection: 'row', marginHorizontal: 20}}>
            <View style={{}}>
              <DoubleDistanceIcon />
            </View>
            <View style={{marginLeft: 10}}>
              <Text24 text={distance} />
            </View>
            <View style={{marginLeft: 10, marginTop: 8}}>
              <Text16Normal text={'km'} textColor={Colors.TEXTDARK} />
            </View>
          </View>
        </View>
      </View>
      <View style={{marginTop: 10}}>
        <View style={{flex: 1, marginLeft: 15}}>
          <Text20
            text={'Cities you will explore'}
            textColor={Colors.TEXTDARK}
          />
        </View>
        <View style={{flex: 3, marginTop: 15}}>
          <CityCarousal data={data} onPress={() => {}} />
        </View>
      </View>
    </View>
  );
};

export default ChallengeCityAndDistanceCard;
