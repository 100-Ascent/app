import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';

import axios from 'axios';
import {useSelector} from 'react-redux';
import {AppState} from '../redux';

import Background from '../components/Background/StyledBackground';
import BackgroundVector from '../components/Background/BackgroundVector';
import ChallengeNameSubscribeCard from '../components/Cards/Challenges/Description/ChallengeNameSubscribeCard';
import CustomSwitch from '../components/SwitchComponent/CustomSwitch';

import {RootNavProp, RootNavRouteProps} from '../routes/RootStackParamList';
import {Colors} from '../utils/colors';
import CustomPopUp from '../components/PopUps/CustomPopUp';
import RNLoaderSimple from '../components/Loader/RNLoaderSimple';
import ChallengeDistanceMilestoneCity from '../components/Cards/Challenges/ChallengeDistanceMilestoneCity';
import PromoVideoCard from '../components/Cards/Challenges/Description/PromoVideoCard';
import ChallengeDescriptionCard from '../components/Cards/Challenges/Description/ChallengeDescriptionCard';
import RoadMapCard from '../components/Cards/Challenges/Description/RoadMap';
import AboutChallengeCard from '../components/Cards/Challenges/Description/AboutChallengeCard';
import CommonCard from '../components/Cards/Challenges/Description/CommonCard';
import AdditionalRewardsCard from '../components/Cards/Challenges/Description/AdditionalRewardsCard';
import PreRegister from '../components/Cards/Rewards/PreRegister';
import Icon from 'react-native-elements/dist/icons/Icon';

interface Props {
  navigation: RootNavProp<'ChallengeDescriptionScreen'>;
  route: RootNavRouteProps<'ChallengeDescriptionScreen'>;
}

const ChallengeDescriptionScreen: React.FC<Props> = ({navigation, route}) => {

  const data = route.params.data;
  const [currentTab, setTab] = useState(0);
  const [loading, setLoading] = useState(false);
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
    // navigation.navigate('MediaScreen', {
    //   data: data.roadMap,
    // });
  };

  const handleSubscribedPressed = cid => {
    setSubscribeCid(cid);
    setSubscribePopUp(true);
  };

  const rewardImageOnPress = url => {
    // navigation.navigate('MediaScreen', {
    //   data: url,
    // });
  };

  useEffect(()=>{
    navigation.setOptions({
      headerTitle: 'Challenge Description',
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
  })

  return (
    <SafeAreaView style={{flex: 1}}>
    <Background startColor={Colors.WHITE} endColor={Colors.WHITE}>
      {loading ? (
        <RNLoaderSimple />
      ) : (
        <ScrollView scrollEnabled style={{flexGrow: 1}} contentContainerStyle={{flexGrow: 1}}>

          <View style={{flex: 1 }}>
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

            <View style={{ padding: 5 }} />
            <CustomSwitch currentTab={currentTab} onPress={handleSwitch} />

            

            {currentTab === 0 ? (
              <View>                              
                <View style={styles.cityMilestoneCard}> 
                  <ChallengeDistanceMilestoneCity  cities={data.cities} distance={data.distance} milestones={data.milestones} />
                </View>

                <View style={{ marginTop: 20 }} >
                  <PromoVideoCard />
                </View>

                <View style={{ marginTop: 20 }} >
                  <ChallengeDescriptionCard description={data.longDescription} />
                </View>
                
                <View style={{ marginTop: 20 }} >
                  <RoadMapCard
                    roadMap={data.roadMap}
                    roadmapOnPressHandler={onRoadmapPressHandler}
                  />
                </View>

                <View style={{ marginTop: 20 }} >
                  <AboutChallengeCard
                    title={data.bottom_title}
                    description={data.bottom_desc}
                  />
                </View>
            </View>
            ) : (
              <View>
                <View style={{ marginTop: 20 }} >
                  <CommonCard
                    data={data.rewards[0]}
                    imageOnPress={rewardImageOnPress}
                  />
                </View>

                <View style={{ marginTop: 20 }} >
                  <CommonCard
                    data={data.rewards[1]}
                    imageOnPress={rewardImageOnPress}
                  />
                </View>

                <View style={{ marginTop: 20 }} >
                  <CommonCard
                    data={data.rewards[2]}
                    imageOnPress={rewardImageOnPress}
                  />
                </View>

                <View style={{ marginTop: 20 }} >
                  <AdditionalRewardsCard data={data.extraRewards} />
                </View>
                
                <View style={{ marginTop: 20 }} >
                  <PreRegister />
                </View>

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
          <View style={{padding: 70}}/>
          
          <CustomPopUp
            icon={<></>}
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
        </ScrollView> )}
      </Background>
    </SafeAreaView>
  );
};

export default ChallengeDescriptionScreen;

const styles = StyleSheet.create({
  cityMilestoneCard: { 
    marginTop: 30,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    paddingTop: 20, 
    paddingBottom: 0,
    elevation: 1,
    borderRadius: 10,
    backgroundColor: Colors.TEXT,
  }
})