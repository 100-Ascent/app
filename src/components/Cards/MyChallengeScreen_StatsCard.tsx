import React from 'react';
<<<<<<< HEAD
import { View } from 'react-native';
import { Colors } from '../../utils/colors';
=======
import {View} from 'react-native';
import {Colors} from '../../utils/colors';
>>>>>>> 07f66b329214a0c3ad1496e9b1891bf42e51ab99
import Background from '../Background/StyledBackground';
import CircularProgressBar from '../ProgressBar/CircularProgressBar';
import Text14 from '../Text/Text14';
import Text16Normal from '../Text/Text16Normal';
import WeeklyStreakCard from './MyChallengeScreen_WeeklyStreakCard';

<<<<<<< HEAD
const StatsCard = ({ streak }) => {
=======
const StatsCard = ({streak}) => {
>>>>>>> 07f66b329214a0c3ad1496e9b1891bf42e51ab99
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
<<<<<<< HEAD
        style={[{ borderRadius: 20 }]}>
        <View style={{ flex: 1, borderRadius: 10 }}>
          <View style={{ flex: 1, alignItems: 'center', paddingVertical: 20 }}>
            <CircularProgressBar streak={streak} />
          </View>

          <View style={{ flex: 1, alignItems: 'center', paddingBottom: 10 }}>
=======
        style={[{borderRadius: 20}]}>
        <View style={{flex: 1, borderRadius: 10}}>
          <View style={{flex: 1, alignItems: 'center', paddingVertical: 20}}>
            <CircularProgressBar streak={streak} />
          </View>

          <View style={{flex: 1, alignItems: 'center', paddingVertical: 10}}>
>>>>>>> 07f66b329214a0c3ad1496e9b1891bf42e51ab99
            <WeeklyStreakCard />
          </View>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
<<<<<<< HEAD
              paddingVertical: 10,
=======
              padding: 5,
>>>>>>> 07f66b329214a0c3ad1496e9b1891bf42e51ab99
            }}>
            <Text16Normal text="Streak Continued!" textColor={Colors.TEXT1} />
          </View>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal: 10,
<<<<<<< HEAD
              paddingBottom: 20,
=======
              paddingBottom: 10,
>>>>>>> 07f66b329214a0c3ad1496e9b1891bf42e51ab99
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
