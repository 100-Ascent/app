import React from 'react';
import {SafeAreaView, ScrollView, Text, View} from 'react-native';
import BackgroundVector from '../components/Background/BackgroundVector';
import Background from '../components/Background/StyledBackground';
import ChallengeNameSubscribeCard from '../components/Cards/ChallengeDescriptionCards/ChallengeNameSubscribeCard';
import {RootNavProp, RootNavRouteProps} from '../routes/RootStackParamList';
import {Colors} from '../utils/colors';
import HamperCard from '../components/Cards/RewardsScreen/CustomHamperCard';
import RewardsUnlocked from '../components/Cards/RewardsScreen/RewardsUnlocked';
import AllRewards from '../components/Cards/RewardsScreen/AllRewards';

interface Props {
  navigation: RootNavProp<'RewardsScreen'>;
  route: RootNavRouteProps<'RewardsScreen'>;
}
const RewardsScreen: React.FC<Props> = ({navigation, route}) => {
  const data = route.params.data;
  const challengeName = route.params.name;
  const challengeIcon = route.params.icon;
  return (
    <SafeAreaView style={{flex: 1}}>
      <Background startColor={Colors.TEXT} endColor={Colors.TEXT}>
        <ScrollView scrollEnabled style={{flexGrow: 1}}>
          <View style={{flex: 1}}>
            <BackgroundVector />
            <ChallengeNameSubscribeCard
              name={challengeName}
              icon={challengeIcon}
              shouldShowButtons={false}
            />

            <View style={{padding: 5}} />
            <HamperCard />

            <View style={{padding: 10}} />
            <RewardsUnlocked />

            <View style={{padding: 10}} />
            <AllRewards data={data} />
          </View>
          <View style={{padding: 100}} />
        </ScrollView>
      </Background>
    </SafeAreaView>
  );
};

export default RewardsScreen;
