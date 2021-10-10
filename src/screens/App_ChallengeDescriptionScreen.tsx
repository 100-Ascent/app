import React, {useState} from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';

import axios from 'axios';
import {useSelector} from 'react-redux';
import {AppState} from '../redux';

import AboutChallengeCard from '../components/Cards/ChallengeDescriptionCards/AboutChallengeCard';
import AdditionalRewardsCard from '../components/Cards/ChallengeDescriptionCards/AdditionalRewardsCard';
import Background from '../components/Background/StyledBackground';
import BackgroundVector from '../components/Background/BackgroundVector';
import ChallengeCityAndDistanceCard from '../components/Cards/ChallengeDescriptionCards/ChallengeCityAndDistanceCard';
import ChallengeDescriptionCard from '../components/Cards/ChallengeDescriptionCards/ChallengeDescriptionCard';
import ChallengeNameSubscribeCard from '../components/Cards/ChallengeDescriptionCards/ChallengeNameSubscribeCard';
import CommonCard from '../components/Cards/Common/CommonCard';
import CustomSwitch from '../components/Switch/CustomSwitch';
import PreRegister from '../components/Cards/RewardsScreen/PreRegister';
import PromoVideoCard from '../components/Cards/ChallengeDescriptionCards/PromoVideoCard';
import RoadMapCard from '../components/Cards/ChallengeDescriptionCards/ChallengeDescriptionScreen_RoadMapCard';

import {RootNavProp, RootNavRouteProps} from '../routes/RootStackParamList';
import {Colors} from '../utils/colors';
import CustomPopUp from '../components/PopUps/CustomPopUp';

interface Props {
  navigation: RootNavProp<'ChallengeDescriptionScreen'>;
  route: RootNavRouteProps<'ChallengeDescriptionScreen'>;
}

const ChallengeDescriptionScreen: React.FC<Props> = ({navigation, route}) => {
  const data = route.params.data;
  const [currentTab, setTab] = useState(0);
  const contextId = useSelector((state: AppState) => state.rootStore.contextId);
  const [subscribePopUp, setSubscribePopUp] = useState<boolean>(false);
  const [toSubscribeCid, setSubscribeCid] = useState('');
  const handleSwitch = () => {
    const tab = 1 - currentTab;
    setTab(tab);
  };

  const handleSubscribe = async () => {
    await axios
      .get('/api/challenge/subscribed/' + data.id, {
        headers: {
          'X-CONTEXT-ID': contextId,
        },
      })
      .then(res => {
        setSubscribePopUp(false);
        navigation.navigate('DataLoaderScreen');
      })
      .catch(err => {
        console.log('error in subscribing to challenge');
        console.log(err);
      });
  };

  const onRoadmapPressHandler = () => {
    navigation.navigate('MediaScreen', {
      data: data.roadMap,
    });
  };

  const handleSubscribedPressed = cid => {
    setSubscribeCid(cid);
    setSubscribePopUp(true);
  };

  const rewardImageOnPress = url => {
    navigation.navigate('MediaScreen', {
      data: url,
    });
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <Background startColor={Colors.TEXT} endColor={Colors.TEXT}>
        <ScrollView style={{flexGrow: 1}}>
          <View style={{flex: 1}}>
            <BackgroundVector />
            <View style={{padding: 10}} />
            <ChallengeNameSubscribeCard
              shouldShowButtons={!data.is_subscribed}
              shouldShowTitle={true}
              name={data.name}
              icon={data.icon}
              cid={data.id}
              playlist={data.playlist}
              handleSubscribe={handleSubscribedPressed}
            />

            <CustomSwitch currentTab={currentTab} onPress={handleSwitch} />
            {currentTab === 0 ? (
              <View>
                <View style={{padding: 10}} />

                <ChallengeCityAndDistanceCard
                  data={data.cities}
                  distance={data.distance}
                  milestones={data.milestones}
                />
                <View style={{padding: 10}} />
                <PromoVideoCard />
                <View style={{padding: 10}} />
                <ChallengeDescriptionCard description={data.longDescription} />
                <View style={{padding: 10}} />

                <RoadMapCard
                  roadMap={data.roadMap}
                  roadmapOnPressHandler={onRoadmapPressHandler}
                />

                <View style={{padding: 10}} />
                <AboutChallengeCard
                  title={data.bottom_title}
                  description={data.bottom_desc}
                />
              </View>
            ) : (
              <View>
                <View style={{padding: 10}} />
                <CommonCard
                  data={data.rewards[0]}
                  imageOnPress={rewardImageOnPress}
                />
                <View style={{padding: 10}} />
                <CommonCard
                  data={data.rewards[1]}
                  imageOnPress={rewardImageOnPress}
                />
                <View style={{padding: 10}} />
                <CommonCard
                  data={data.rewards[2]}
                  imageOnPress={rewardImageOnPress}
                />
                <View style={{padding: 10}} />
                <AdditionalRewardsCard data={data.extraRewards} />
                <View style={{padding: 10}} />
                <PreRegister />
              </View>
            )}
            <ChallengeNameSubscribeCard
              shouldShowButtons={!data.is_subscribed}
              shouldShowTitle={false}
              name={data.name}
              icon={data.icon}
              cid={data.id}
              playlist={data.playlist}
              handleSubscribe={handleSubscribe}
            />
          </View>
          <View style={{padding: 100}}></View>
          <CustomPopUp
            isCancelable={true}
            cancelText={'Cancel'}
            description={'Do you really want to subscribe?'}
            header={'Confirm Subscription'}
            oKText={'Subscribe'}
            visible={subscribePopUp}
            onCancel={() => {
              setSubscribeCid('');
              setSubscribePopUp(false);
            }}
            onOk={handleSubscribe}
          />
        </ScrollView>
      </Background>
    </SafeAreaView>
  );
};

export default ChallengeDescriptionScreen;
