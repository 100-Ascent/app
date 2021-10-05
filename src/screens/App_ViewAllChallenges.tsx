import React, {useEffect, useState} from 'react';
import {SafeAreaView, View} from 'react-native';

import {AppState} from '../redux';
import axios from 'axios';
import {ScrollView} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';

import ActiveChallengeCard from '../components/Cards/ChallengeScreen/AllChallenge_ActiveChallenge';
import Background from '../components/Background/StyledBackground';
import BackgroundVector from '../components/Background/BackgroundVector';
import ChallengeCardCarousal from '../components/Carousals/ChallengeCardCarousal';
import CompletedChallenge from '../components/Cards/ChallengeScreen/AllChallenge_CompletedChallenge';
import NoActiveChallengeCard from '../components/Cards/ChallengeScreen/AllChallenge_NoActiveChallengeCard';
import RNLoader from '../components/Loader/RNLoader';
import Text20 from '../components/Text/Text20';

import {RootNavProp} from '../routes/RootStackParamList';
import {Colors} from '../utils/colors';
import {HEIGHT, WIDTH} from '../utils/constants';
import globalStyles from '../styles/Global/styles';
import CustomPopUp from '../components/PopUps/CustomPopUp';

const width = WIDTH;
const height = HEIGHT * 0.45;

interface Props {
  navigation: RootNavProp<'AllChallengesScreen'>;
}

const ViewAllChallenges: React.FC<Props> = ({navigation}) => {
  const contextId = useSelector((state: AppState) => state.rootStore.contextId);
  const [activeChallenge, setActiveChallenge] = useState([]);
  const [allChallenge, setAllChallenge] = useState([]);
  const [completedChallenge, setCompletedChallenge] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [subscribePopUp, setSubscribePopUp] = useState<boolean>(false);
  const [toSubscribeCid, setSubscribeCid] = useState('');

  useEffect(() => {
    getChallengeData();
  }, []);

  const getChallengeData = () => {
    axios
      .get('/api/challenge', {
        headers: {
          'X-CONTEXT-ID': contextId,
        },
      })
      .then(res => {
        const allChallenge = res.data.data[0].remainingList;
        setAllChallenge(allChallenge);
        setActiveChallenge(res.data.data[0].subsList);
        setCompletedChallenge(res.data.data[0].completedList);
        setLoading(false);
      })
      .catch(err => {
        console.log('Error on get my challenges');
        console.log(err);
      });
  };

  const handleSubscribe = () => {
    setSubscribePopUp(false);
    setLoading(true);
    axios
      .get('/api/challenge/subscribed/' + toSubscribeCid, {
        headers: {
          'X-CONTEXT-ID': contextId,
        },
      })
      .then(res => {
        getChallengeData();
      })
      .catch(err => {
        console.log('error');
        console.log(err);
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

  return (
    <SafeAreaView style={globalStyles.flex}>
      <Background startColor={Colors.TEXT} endColor={Colors.TEXT}>
        {!loading ? (
          <ScrollView
            style={{flexGrow: 1}}
            contentContainerStyle={{flexGrow: 1}}>
            <View style={globalStyles.flex}>
              <BackgroundVector />
              <View>
                {allChallenge.length !== 0 &&
                completedChallenge.length === 0 ? (
                  <ChallengeCardCarousal
                    allChallenge={allChallenge}
                    wrapStyle={{width: width, height: height}}
                    onPress={onChallengePress}
                    handleSubscribe={handleSubscribedPressed}
                  />
                ) : null}
              </View>

              <View style={{marginTop: 20}}>
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
        ) : (
          <RNLoader />
        )}
      </Background>
    </SafeAreaView>
  );
};

export default ViewAllChallenges;
