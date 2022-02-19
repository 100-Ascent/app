import React, {useEffect, useState} from 'react';
import {SafeAreaView, View} from 'react-native';

import {AppState} from '../redux';
import axios from 'axios';
import {ScrollView} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';

import Background from '../components/Background/StyledBackground';
import BackgroundVector from '../components/Background/BackgroundVector';
import ActiveChallengeCard from '../components/Cards/Challenges/ActiveChallenge';
import ChallengeCardCarousal from '../components/Carousals/ChallengeCardCarousal';
import CompletedChallenge from '../components/Cards/Challenges/CompletedChallenge';
import NoActiveChallengeCard from '../components/Cards/Challenges/NoActiveChallengeCard';
import Text20 from '../components/Text/Text20';

import {RootNavProp} from '../routes/RootStackParamList';
import {Colors} from '../utils/colors';
import {HEIGHT, SUBSCRIBE_TO_CHALLENGE, WIDTH} from '../utils/constants/constants';
import CustomPopUp from '../components/PopUps/CustomPopUp';
import {useIsFocused} from '@react-navigation/native';
import {NavigationDrawerStructure} from '../routes/AppStack';
import RNLoaderSimple from '../components/Loader/RNLoaderSimple';
import SubscribeToChallengeIcon from '../../assets/modal-icons/notification-icon.svg';
import { CHALLENGE_DATA, SUBSCRIBE_CHALLENGE } from '../utils/apis/endpoints';

const width = WIDTH-30;

interface Props {
  navigation: RootNavProp<'JourneyScreen'>;
}

const JourneyScreen: React.FC<Props> = ({navigation}) => {
  const contextId = useSelector((state: AppState) => state.rootStore.contextId);
  const [activeChallenge, setActiveChallenge] = useState([]);
  const [allChallenge, setAllChallenge] = useState([]);
  const [completedChallenge, setCompletedChallenge] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [subscribePopUp, setSubscribePopUp] = useState<boolean>(false);
  const [toSubscribeCid, setSubscribeCid] = useState('');
  const isFocused = useIsFocused();

  const getChallengeData = async () => {
    setLoading(true);
    await axios.get(CHALLENGE_DATA, {
        headers: {
          'X-CONTEXT-ID': contextId,
        },
      })
      .then(res => {
        
        let allChallenge = res.data.data[0].remainingList;
        let activeChallenge = res.data.data[0].subsList;
        if (activeChallenge.length == 1) {
          navigation.navigate('MyChallengeScreen', {
            data: activeChallenge[0],
            challengeId: activeChallenge[0].id,
          });
        } else {
          navigation.setOptions({
            headerLeft: () => (
              <NavigationDrawerStructure navigationProps={navigation} />
            ),
          });
          setAllChallenge(allChallenge);
          setActiveChallenge(activeChallenge);
          setCompletedChallenge(res.data.data[0].completedList);
          setLoading(false);
        }
      })
      .catch(err => {
        console.log('Error on get my challenges');
        console.log(err);
      });
  };

  const handleSubscribe = async () => {
    setSubscribePopUp(false);
    setLoading(true);
    await axios
      .get(SUBSCRIBE_CHALLENGE + toSubscribeCid, {
        headers: {
          'X-CONTEXT-ID': contextId,
        },
      })
      .then(res => {
        getChallengeData();
      })
      .catch(err => {
        console.log('Error subscribing to challenge');
        console.log(err);
        setLoading(false);
      });
  };

  const handleSubscribedPressed = cid => {
    setSubscribeCid(cid);
    setSubscribePopUp(true);
  };

  const handleActiveChallengePressed = (data: any) => {
    const cid = data.id;
    navigation.navigate('MyChallengeScreen', {
      data: data,
      challengeId: cid,
    });
  };

  const onChallengePress = item => {
    navigation.navigate('ChallengeDescriptionScreen', {data: item});
  };

  useEffect(() => {
    getChallengeData();
    navigation.setOptions({
      headerTitle: 'Challenges',
      headerTitleStyle: {fontFamily: 'Quicksand-Bold'},
      headerTitleContainerStyle: {alignItems: 'center'},
      headerRight: () => <View style={{marginRight: 0}} />,
      headerLeft: () => <View style={{marginLeft: 0}} />,
    });
  }, [isFocused]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <Background startColor={Colors.WHITE} endColor={Colors.WHITE}>
        {loading ? (
          <RNLoaderSimple />
        ) : (
          <ScrollView
            scrollEnabled
            style={{flexGrow: 1}}
            contentContainerStyle={{flexGrow: 1}}>
            <View style={{flex: 1, paddingHorizontal: 15 }}>
              <BackgroundVector />

              <View>
                {allChallenge.length !== 0 &&
                completedChallenge.length === 0 ? (
                  <ChallengeCardCarousal
                    allChallenge={allChallenge}
                    wrapStyle={{width: width }}
                    onPress={onChallengePress}
                    handleSubscribe={handleSubscribedPressed}
                  />
                ) : null}
              </View>

              <View style={{marginTop: 100}}>
                <View style={{paddingLeft: 20}}>
                  <Text20
                    text="Active Challenges"
                    textColor={Colors.TEXTDARK}
                  />
                </View>
                {activeChallenge.length !== 0 ? (
                  <ActiveChallengeCard
                    data={activeChallenge}
                    onPress={handleActiveChallengePressed}
                  />
                ) : (
                  <NoActiveChallengeCard />
                )}
                <View style={{padding: 30}} />
                <View style={{}}>
                  {completedChallenge.length !== 0 ? (
                    <CompletedChallenge
                      data={completedChallenge}
                      onPress={onChallengePress}
                    />
                  ) : (
                    <View></View>
                  )}
                </View>
              </View>
            </View>
            <View style={{margin: 70}} />
            <CustomPopUp
              icon={<SubscribeToChallengeIcon/>}
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
        )}
      </Background>
    </SafeAreaView>
  );
};

export default JourneyScreen;
