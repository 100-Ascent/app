import React, {useEffect, useRef, useState} from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';

import BackgroundVector from '../components/Background/BackgroundVector';
import Background from '../components/Background/StyledBackground';
import NewRewardPopUp from '../components/PopUps/NewRewardPopUp';

import {RootNavProp, RootNavRouteProps} from '../routes/RootStackParamList';
import {Colors} from '../utils/colors';
import axios from 'axios';
import {useSelector} from 'react-redux';
import {AppState} from '../redux';
import RewardsPopUp from '../components/PopUps/RewardsPopUp';
import ChallengeNameSubscribeCard from '../components/Cards/Challenges/Description/ChallengeNameSubscribeCard';
import PreRegister from '../components/Cards/Rewards/PreRegister';
import RewardsUnlocked from '../components/Cards/Challenges/CheckpointMilestone/RewardsUnlocked';
import Icon from 'react-native-elements/dist/icons/Icon';
import HamperCard from '../components/Cards/Rewards/CustomHamperCard';
import AllRewards from '../components/Cards/Rewards/AllRewards';

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
  const [toUnlockRewardsArray, setToUnlockRewards] = useState([]);
  const [scratchedReward, setScratchedRewards] = useState([]);

  const [allRewardIdx, setAllRewardIdx] = useState(0);
  const [rewardVisible, setRewardVisible] = useState(false);
  const contextId = useSelector((state: AppState) => state.rootStore.contextId);

  const getToUnlockRewards = () => {
    const data = route.params.data;
    let arr = [];
    let scratchedReward = [];
    for (let idx = 0; idx < data.length; idx++) {
      if (data[idx].is_passed && !data[idx].is_scratched) {
        arr.push(data[idx]);
      } else if (data[idx].is_passed && data[idx].is_scratched) {
        scratchedReward.push(data[idx]);
      }
    }
    setToUnlockRewards(arr);
    setScratchedRewards(scratchedReward);
  };

  const handleCancel = () => {
    explosion.current = null;
    let toUnlockArray = [...toUnlockRewardsArray];
    toUnlockArray.splice(idx - 1, 1);
    setToUnlockRewards(toUnlockArray);
    setRevealed(false);
    setVisible(false);
  };

  const handleNewRewardPressed = idx => {
    setCurrentIdx(idx);
    setVisible(true);
  };

  const handleAllRewardPressed = idx => {
    setAllRewardIdx(idx);
    setRewardVisible(true);
  };

  const onHandleRevealPressed = async index => {
    await axios
      .get('/api/reward/scratch/' + toUnlockRewardsArray[index - 1].id, {
        headers: {
          'X-CONTEXT-ID': contextId,
        },
      })
      .then(res => {
        console.log(res.data.data);
        explosion.current.start();
        let reward = [...scratchedReward];
        let toUnlockArray = [...toUnlockRewardsArray];
        let updatedReward = toUnlockArray[index - 1];
        updatedReward.is_scratched = true;
        reward.push(updatedReward);
        setScratchedRewards(reward);
        setRevealed(true);
      })
      .catch(err => {
        console.log('error123');
        console.log(err);
        setRevealed(false);
      });
  };

  const setRef = (ref: React.MutableRefObject<any>) => {
    explosion.current = ref;
    return explosion;
  };

  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Rewards',
      headerTitleContainerStyle: {alignItems: 'center'},
      headerTitleStyle: {fontFamily: 'Quicksand-Bold'},
      headerRight: () => <View style={{marginRight: 0}}/>,
      headerLeft: () => (
        <View style={{marginLeft: 10}}>
          <Icon
            name="arrow-back"
            type="ionicons"
            size={30}
            onPress={() => navigation.pop()}
            tvParallaxProperties={undefined}
          />
        </View>
      ),
    });
    getToUnlockRewards();
  }, []);
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

            <View style={{ marginTop: 20 }}>
              <HamperCard />
            </View>

            <View style={{ marginTop: 20 }}>
              <PreRegister />
            </View>

            <View style={{ marginTop: toUnlockRewardsArray.length > 0 ? 20 : 0 }}>
              {toUnlockRewardsArray.length > 0 ? (
                <RewardsUnlocked
                  rewards={toUnlockRewardsArray}
                  onPress={handleNewRewardPressed}
                />
              ) : null}
            </View>

            <View style={{ marginTop: 20 }}>
              {toUnlockRewardsArray.length > 0 &&
              scratchedReward.length === 0 ? null : (
                <AllRewards
                  data={scratchedReward}
                  isRewardToUnlock={toUnlockRewardsArray.length !== 0}
                  onPress={handleAllRewardPressed}
                />
              )}
            </View>

            {scratchedReward.length > 0 ? (
              <RewardsPopUp
                data={scratchedReward[allRewardIdx]}
                visible={rewardVisible}
                onClose={() => setRewardVisible(!rewardVisible)}
              />
            ) : null}

              <NewRewardPopUp
                visible={visible}
                onCancel={handleCancel}
                onHandleRevealPressed={onHandleRevealPressed}
                rewardIndex={idx}
                setRef={setRef}
                explosion={explosion}
                isRevealed={isRevealed}
                toUnlockRewardsArray={toUnlockRewardsArray}
              />
          </View>
          <View style={{padding: 100}} />
        </ScrollView>
      </Background>
    </SafeAreaView>
  );
};

export default RewardsScreen;
