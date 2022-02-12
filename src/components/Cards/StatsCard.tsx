import React from 'react';
import {View} from 'react-native';
import {Colors} from '../../utils/colors';
import Background from '../Background/StyledBackground';
import CircularProgressBar from '../ProgressBar/CircularProgressBar';
import Text14 from '../Text/Text14';
import Text16Normal from '../Text/Text16Normal';
import WeeklyStreakCard from './WeeklyStreakCard';

const StatsCard = ({streak, isToday}) => {
  return (
    <View
      style={{
        flex: 1,
        marginHorizontal: 10,
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: 11,
      }}>
      <Background
        startColor={Colors.CARDS_COLOR1}
        endColor={Colors.CARDS_COLOR2}
        style={[{borderRadius: 20, paddingBottom: 15}]}>
        <View style={{flex: 1, borderRadius: 10}}>
          <View style={{flex: 1, alignItems: 'center', marginTop: 20}}>
            <CircularProgressBar isToday={isToday}  streak={streak} />
          </View>

          <View style={{flex: 1, alignItems: 'center', marginTop: 20}}>
            <WeeklyStreakCard valueArray = {['1', '2', '3', '4', '5', '6', '7']} streak={streak} />
          </View>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 15,
            }}>
            <Text16Normal text="Streak Continued!" textColor={Colors.TEXT1} />
          </View>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal: 10,
              paddingBottom: 10,
              marginTop: 5,
            }}>
            <Text14
              text={`${streak === 1 ? `You are on a ${streak} day streak` : `You are on a ${streak} days streak`}`}
              textColor={Colors.TEXT2}
            />
          </View>
        </View>
      </Background>
    </View>
  );
};

export default StatsCard;
