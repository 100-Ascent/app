import React, {useEffect, useState} from 'react';
import {RootNavProp, RootNavRouteProps} from '../routes/RootStackParamList';
import {SafeAreaView, View} from 'react-native';
import {setCurrentValues, setJourneyIndex} from '../redux/action';
import {useDispatch, useSelector} from 'react-redux';

import {AMSTERDAM} from '../utils/constants/versions';
import {AppState} from '../redux';
import Background from '../components/Background/StyledBackground';
import BackgroundVector from '../components/Background/BackgroundVector';
import ChallengeNameWithIconCard from '../components/Cards/Challenges/MyChallenges/ChallengeNameWithIconCard';
import CheckpointCard from '../components/Cards/Challenges/MyChallenges/CheckpointCard';
import {Colors} from '../utils/colors';
import FloatingActionButton from '../components/Button/FloatingActionButton';
import LinearGradient from 'react-native-linear-gradient';
import { NavigationDrawerStructure } from '../routes/AppStack';
import NewRewardsMilestonePopUp from '../components/PopUps/NewRewardsMilestonePopUp';
import ProgressBar from '../components/ProgressBar/ProgressBar';
import RNLoader from '../components/Loader/RNLoader';
import RNLoaderSimple from '../components/Loader/RNLoaderSimple';
import RewardsCard from '../components/Cards/Rewards/RewardsCard';
import {ScrollView} from 'react-native-gesture-handler';
import StatsCard from '../components/Cards/StatsCard';
import ThreeTabNavigator from '../components/SwitchComponent/ThreeTabNavigator';
import axios from 'axios';
import { useIsFocused } from '@react-navigation/native';

interface Props {
  navigation: RootNavProp<'MyChallengeScreen'>;
  route: RootNavRouteProps<'MyChallengeScreen'>;
}

const MyChallengeScreen: React.FC<Props> = ({navigation, route}) => {
  const data = route.params.data;
  const [challengeData, setChallengeData] = useState<any>([]);
  const [myJourneyData, setJourneyData] = useState([]);
  const [myDistanceData, setDistanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tracksData, setTracksData] = useState([]);

  const [newRewardsMilestone, setNewRewardsMilestone] = useState({});
  const [showPopUp, setShowPopUp] = useState(false);

  const contextId = useSelector((state: AppState) => state.rootStore.contextId);
  const currentDistance = useSelector(
    (state: AppState) => state.rootStore.currentValue.distance,
  );
  const isFocused = useIsFocused();
 
  const dispatch = useDispatch();

  const callToGetChallengeDataFromId = async () => {
    setLoading(true);
    const cid = route.params.challengeId;
    await axios
      .get('/api/challenge/' + cid, {
        headers: {
          'X-CONTEXT-ID': contextId,
        },
      })
      .then(res => {
        let data = res.data.data;
        dispatch( setCurrentValues({ distance: data.current_distance, index: data.current_track_index }),
        );

        dispatch(setJourneyIndex({index: data.user_journey_index}));
        setChallengeData(data);
        setDistanceData(data.challenge_data);
        setLoading(false);
      })
      .catch(err => {
        console.log('error123');
        console.log(err);
      });
  };

  const callToGetTracksData = async () => {
    const cid = route.params.challengeId;
    await axios
      .get('/api/tracks/' + cid, {
        headers: {
          'X-CONTEXT-ID': contextId,
        },
      })
      .then(res => {
        let data = res.data.data;
        setTracksData(data);
      })
      .catch(err => {
        console.log('error123');
        console.log(err);
      });
  };

  const callToGetUserJourneyData = async () => {
    const cid = route.params.challengeId;
    await axios
      .get('/api/challenge/' + cid + '/journey', {
        headers: {
          'X-CONTEXT-ID': contextId,
        },
      })
      .then(res => {
        let data = res.data.data;
        setJourneyData(data);
      })
      .catch(err => {
        console.log('error123');
        console.log(err);
      });
  };

  const callToGetNewRewardsMilestone = async () => {
    const cid = route.params.challengeId;
    await axios
      .get('/api/challenge/new/updates/' + cid, {
        headers: {
          'X-CONTEXT-ID': contextId,
        },
      })
      .then(res => {
        let data = res.data.data;
        if(data.checkpoints.length>0 || data.rewards.length>0 ){
          setNewRewardsMilestone(data);
          setShowPopUp(true);
        }
      })
      .catch(err => {
        console.log('error123');
        console.log(err);
      });
  }

  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'My Journey',
      headerTitleStyle: {fontFamily: 'Quicksand-Bold'},
      headerTitleContainerStyle: {alignItems: 'center'},
      headerRight: () => <View style={{marginRight: 0}} />,
      headerLeft: () => <NavigationDrawerStructure navigationProps={navigation} />,
    });
    callToGetChallengeDataFromId();    
    callToGetTracksData();
    callToGetUserJourneyData();
    callToGetNewRewardsMilestone();
  }, [isFocused]);

  const onCheckpointPressed = () => {
    navigation.navigate('CheckpointMilestoneScreen', {
      data: challengeData.current_checkpoint,
      current_distance: challengeData.current_distance,
      total_distance: challengeData.total_distance,
    });
  };

  const onViewDetailsPressed = () => {
    navigation.navigate('ChallengeDescriptionScreen', {data: data});
  };

  const handleMyJourneyMilestonePressed = data => {
    navigation.navigate('CheckpointMilestoneScreen', {
      data: data,
      current_distance: challengeData.current_distance,
      total_distance: challengeData.total_distance,
    });
  };

  const handleRewardsPressed = () => {
    navigation.navigate('RewardsScreen', {
      data: challengeData.rewards,
      name: challengeData.name,
      icon: challengeData.icon,
    });
  };

  const onPopUpClose= () => {
    setShowPopUp(false)
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <Background startColor={Colors.TEXT} endColor={Colors.TEXT}>
        {loading ? (
          <RNLoaderSimple />
        ) : (
          <View style={{flex: 1}}>
            <ScrollView scrollEnabled style={{flexGrow: 1}}>
              <View style={{ flex: 1 }}>
                <BackgroundVector />
                <View style={{padding: 5}} />

                <ChallengeNameWithIconCard
                  onViewDetailsPressed={onViewDetailsPressed}
                  name={data.name}
                  icon={data.icon}
                />

                {/* <View style={{ marginTop: 20, marginHorizontal: 10 }}>
                  <StatsCard streak={challengeData.streak} isToday={challengeData.is_today_streak} />
                </View> */}
                
                <View style={{ marginTop: 20, marginHorizontal: 20 }}>
                  <CheckpointCard
                    checkpoint={challengeData.current_checkpoint}
                    onCheckpointPressed={onCheckpointPressed}
                  />
                </View>

                <View style={{ marginTop: 20, marginHorizontal: 20, elevation: 5 }}>
                  <ProgressBar distance={currentDistance} />
                </View>

                <View style={{ marginTop: 20, marginHorizontal: 20, elevation: 5 }}>
                  <RewardsCard
                    rewards={challengeData.rewards}
                    onPress={handleRewardsPressed}
                  />
                </View>

               
                <View style={{ marginTop: 20}}>
                  <ThreeTabNavigator
                    userLocation={{
                      latitude: challengeData.user_lat,
                      longitude: challengeData.user_long,
                    }}
                    journeyData={myJourneyData}
                    userJourneyIndex={challengeData.user_journey_index}
                    tracksCoordinates={tracksData}
                    tracks={challengeData.tracks}
                    distanceData={myDistanceData}
                    handleMyJourneyMilestonePressed={
                      handleMyJourneyMilestonePressed
                    }
                    funfact={challengeData.current_checkpoint.tid.fun_fact}
                    distance={challengeData.current_distance}
                    callToGetChallengeDataFromId={callToGetChallengeDataFromId}
                  />
                </View>
              </View>
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                colors={[
                  challengeData.current_checkpoint.tid.fun_fact_start_color,
                  challengeData.current_checkpoint.tid.fun_fact_end_color,
                ]}>
                <View style={{padding: 50}} />
              </LinearGradient>
            </ScrollView>
            <NewRewardsMilestonePopUp 
              checkpoints={newRewardsMilestone['checkpoints']} 
              rewards={newRewardsMilestone['rewards']} 
              visible={showPopUp} 
              onClose={onPopUpClose}
            />
          </View>
        )}
      </Background>
    </SafeAreaView>
  );
};

export default MyChallengeScreen;
