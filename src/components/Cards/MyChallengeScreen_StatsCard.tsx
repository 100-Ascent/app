import React from 'react';
import { View } from 'react-native';
import { Colors } from '../../utils/colors';
import Background from '../Background/StyledBackground';
import CircularProgressBar from '../ProgressBar/CircularProgressBar';
import Text14 from '../Text/Text14';
import Text16Normal from '../Text/Text16Normal';
import WeeklyStreakCard from './MyChallengeScreen_WeeklyStreakCard';

const StatsCard = ({ streak }) => {
  return (
    <View
      style={{
        flex: 1,
        marginHorizontal: 15,
        borderRadius: 20,
        shadowColor: '#0E1320',
        shadowOffset: {
          width: 0,
          height: 5,
        },
        shadowOpacity: 0.6,
        shadowRadius: 20,

        elevation: 11,
      }}>
      <Background
        startColor={Colors.CARDS_COLOR1}
        endColor={Colors.CARDS_COLOR2}
        style={[{ borderRadius: 20 }]}>
        <View style={{ flex: 1, borderRadius: 10 }}>
          <View style={{ flex: 1, alignItems: 'center', paddingVertical: 20 }}>
            <CircularProgressBar streak={streak} />
          </View>

          <View style={{ flex: 1, alignItems: 'center', paddingVertical: 10 }}>
            <WeeklyStreakCard />
          </View>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              padding: 5,
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
            }}>
            <Text14
              text={`You are on a ${streak} day streak`}
              textColor={Colors.TEXT2}
            />
          </View>
        </View>
      </Background>
    </View>
  );
};

export default StatsCard;
