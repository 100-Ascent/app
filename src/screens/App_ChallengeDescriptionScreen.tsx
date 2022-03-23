import React, {useEffect, useState} from 'react';
import {RootNavProp, RootNavRouteProps} from '../routes/RootStackParamList';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';

import AboutChallengeCard from '../components/Cards/Challenges/Description/AboutChallengeCard';
import AdditionalRewardsCard from '../components/Cards/Challenges/Description/AdditionalRewardsCard';
import {AppState} from '../redux';
import Background from '../components/Background/StyledBackground';
import BackgroundVector from '../components/Background/BackgroundVector';
import ChallengeDescriptionCard from '../components/Cards/Challenges/Description/ChallengeDescriptionCard';
import ChallengeDistanceMilestoneCity from '../components/Cards/Challenges/ChallengeDistanceMilestoneCity';
import ChallengeNameSubscribeCard from '../components/Cards/Challenges/Description/ChallengeNameSubscribeCard';
import {Colors} from '../utils/colors';
import CommonCard from '../components/Cards/Challenges/Description/CommonCard';
import CustomPopUp from '../components/PopUps/CustomPopUp';
import CustomSwitch from '../components/SwitchComponent/CustomSwitch';
import Icon from 'react-native-elements/dist/icons/Icon';
import PreRegister from '../components/Cards/Rewards/PreRegister';
import PromoVideoCard from '../components/Cards/Challenges/Description/PromoVideoCard';
import RNFS from 'react-native-fs';
import RNLoaderSimple from '../components/Loader/RNLoaderSimple';
import RoadMapCard from '../components/Cards/Challenges/Description/RoadMap';
import { SUBSCRIBE_CHALLENGE } from '../utils/apis/endpoints';
import Share from 'react-native-share';
import SubscribeToChallenge from '../../assets/modal-icons/notification-icon.svg';
import ViewShot from 'react-native-view-shot';
import axios from 'axios';
import {useSelector} from 'react-redux';

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
  const ref = React.useRef<ViewShot | null>(null);
  
  const handleSwitch = () => {
    const tab = 1 - currentTab;
    setTab(tab);
  };

  const handleSubscribe = async () => {
    await axios
      .get(SUBSCRIBE_CHALLENGE + data.id, {
        headers: { 'X-CONTEXT-ID': contextId }
      })
      .then(res => {
        setSubscribePopUp(false);
        navigation.pop();
      })
      .catch(err => {
        setSubscribePopUp(false);
        console.log('error in subscribing to challenge');
        console.log(err);
      });
  };

  const onRoadmapPressHandler = () => {
    // navigation.navigate('MediaScreen', {
    //   data: data.roadMap,
    // });
  };

  const handleSubscribedPressed = () => {
    if(data.amount === 0){
      setSubscribeCid(data.id);
      setSubscribePopUp(true);
    }else{
      navigation.navigate('PaymentScreen', { data: data });
    }    
  };

  const rewardImageOnPress = url => {
    // navigation.navigate('MediaScreen', {
    //   data: url,
    // });
  };


  const onShare = () => {
    captureScreenshot();    
  };

  const captureScreenshot = () => {
    ref.current.capture().then(uri => {
      RNFS.readFile(uri, 'base64').then(res => {
        let urlString = 'data:image/jpeg;base64,' + res;
        let options = {
          title: '100 Ascent',
          message: 'Hi, checkout my recent activity on 100 Ascent app (https://100ascent.com)',
          url: urlString,
          type: 'image/jpeg',
        };
        Share.open(options)
          .then(res => {
            
          })
          .catch(err => {

          });
      });
    });
  };

  useEffect(()=>{
    navigation.setOptions({
      headerTitle: 'Journey Description',
      headerTitleContainerStyle: {alignItems: 'center'},
      headerTitleStyle: {fontFamily: 'Quicksand-Bold'},
      headerRight: () => <View style={{marginRight: 0 }}/>,
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
  },[])
  return (
    <SafeAreaView style={{flex: 1}}>
    <Background startColor={Colors.WHITE} endColor={Colors.WHITE}>
      {loading ? <RNLoaderSimple /> : 
        <ScrollView scrollEnabled style={{flexGrow: 1}} contentContainerStyle={{flexGrow: 1}}>
        <ViewShot style={{ backgroundColor: Colors.WHITE, borderRadius: 10 }} ref={ref} options={{format: 'jpg', quality: 0.9}}>
          <View style={{flex: 1 }}>
            <BackgroundVector />
            
            <View style={{padding: 10}} />
            <ChallengeNameSubscribeCard
              shouldShowButtons={!data.is_subscribed}
              shouldShowTitle={true}
              name={data.name}
              icon={data.icon}
              image={{images: [data.image]}}
              cid={data.id}
              playlist={data.playlist}
              handleSubscribe={handleSubscribedPressed}
              onSharePress={onShare}
            />

            <View style={{ padding: 5 }} />
            <CustomSwitch currentTab={currentTab} onPress={handleSwitch} />
            
            {currentTab === 0 ? (
              <>         
                                    
                <ViewShot
                  style={{ backgroundColor: Colors.TEXT, borderRadius: 10, marginHorizontal: 20, marginTop: 20 }}
                  ref={ref}
                  options={{format: 'jpg', quality: 0.9}}>    
                  <View style={styles.cityMilestoneCard}>            
                  <ChallengeDistanceMilestoneCity  cities={data.cities} distance={data.distance} milestones={data.milestones} />
                </View>
                </ViewShot>
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
            </>
            ) : (
              <>
                {
                  data.rewards.map((val,idx)=>{
                    return <View style={{ marginTop: 20 }} key={idx} >
                      <CommonCard data={val} imageOnPress={rewardImageOnPress} />
                    </View>
                  })
                }

                <View style={{ marginTop: 20 }} >
                  <AdditionalRewardsCard data={data.extraRewards} />
                </View>
                
                <View style={{ marginTop: 20 }} >
                  <PreRegister />
                </View>

              </>
            )}

            <View style={{ padding: 5 }}/>
            <ChallengeNameSubscribeCard
              shouldShowButtons={!data.is_subscribed}
              shouldShowTitle={false}
              name={data.name}
              icon={data.icon}
              cid={data.id}
              playlist={data.playlist}
              image={{images: [data.image]}}
              handleSubscribe={handleSubscribedPressed}
              onSharePress={onShare}
            />
          </View>
          <View style={{padding: 70}}/>
          </ViewShot>
          
          <CustomPopUp
            icon={<SubscribeToChallenge/>}
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
        }
      </Background>
    </SafeAreaView>
  );
};

export default ChallengeDescriptionScreen;

const styles = StyleSheet.create({
  cityMilestoneCard: { 
    paddingHorizontal: 10,
    paddingTop: 20, 
    paddingBottom: 0,
    elevation: 3,
    borderRadius: 10,
    backgroundColor: Colors.TEXT,
  }
})