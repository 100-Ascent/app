import React, {useRef, useState} from 'react';
import {SafeAreaView, ScrollView, Text, View} from 'react-native';
import BackgroundVector from '../components/Background/BackgroundVector';
import Background from '../components/Background/StyledBackground';
import ChallengeNameSubscribeCard from '../components/Cards/ChallengeDescriptionCards/ChallengeNameSubscribeCard';
import {RootNavProp, RootNavRouteProps} from '../routes/RootStackParamList';
import {Colors} from '../utils/colors';
import HamperCard from '../components/Cards/RewardsScreen/CustomHamperCard';
import RewardsUnlocked from '../components/Cards/RewardsScreen/RewardsUnlocked';
import AllRewards from '../components/Cards/RewardsScreen/AllRewards';
import NewRewardPopUp from '../components/PopUps/NewRewardPopUp';
import PreRegister from '../components/Cards/RewardsScreen/PreRegister';

interface Props {
  navigation: RootNavProp<'RewardsScreen'>;
  route: RootNavRouteProps<'RewardsScreen'>;
}
const RewardsScreen: React.FC<Props> = ({navigation, route}) => {
  let explosion = useRef(null);
  const data = route.params.data;
  const challengeName = route.params.name;
  const challengeIcon = route.params.icon;
  const [visible, setVisible] = useState(false);
  const [idx, setCurrentIdx] = useState(1);
  const [isRevealed, setRevealed] = useState(false);

  const handleCancel = () => {
    explosion.current = null;
    setRevealed(false);
    setVisible(false);
  };

  const handleNewRewardPressed = idx => {
    setCurrentIdx(idx);
    setVisible(true);
  };

  const setRef = (ref: React.MutableRefObject<any>) => {
    explosion.current = ref;
    return explosion;
  };

  const onHandleRevealPressed = () => {
    console.log('starting');
    explosion.current.start();
    setRevealed(true);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Background startColor={Colors.TEXT} endColor={Colors.TEXT}>
        <ScrollView scrollEnabled style={{flexGrow: 1}}>
          <View style={{flex: 1}}>
            <BackgroundVector />
            <View style={{padding: 10}} />
            <ChallengeNameSubscribeCard
              name={challengeName}
              icon={challengeIcon}
              shouldShowButtons={false}
              shouldShowTitle={true}
            />

            <View style={{padding: 5}} />
            <HamperCard />

            <View style={{padding: 5}} />
            <PreRegister />
            <View style={{padding: 10}} />
            <RewardsUnlocked onPress={handleNewRewardPressed} />
            <View style={{padding: 10}} />

            <AllRewards data={data} />
            <NewRewardPopUp
              visible={visible}
              onCancel={handleCancel}
              onHandleRevealPressed={onHandleRevealPressed}
              rewardIndex={idx}
              setRef={setRef}
              explosion={explosion}
              isRevealed={isRevealed}
            />
          </View>
          <View style={{padding: 100}} />
        </ScrollView>
      </Background>
    </SafeAreaView>
  );
};

export default RewardsScreen;
