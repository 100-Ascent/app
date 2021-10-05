import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {View, SafeAreaView} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import {ScrollView} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {AppState} from '../redux';

import Background from '../components/Background/StyledBackground';
import BackgroundVector from '../components/Background/BackgroundVector';
import ChallengeNameWithIconCard from '../components/Cards/MyChallengeScreen_ChallengeCard';
import CheckpointCard from '../components/Cards/MyChallengeScreen_CheckpointCard';
import ProgressBar from '../components/ProgressBar/ProgressBar';
import RewardsCard from '../components/Cards/MyChallengeScreen_RewardsCard';
import RNLoader from '../components/Loader/RNLoader';
import StatsCard from '../components/Cards/MyChallengeScreen_StatsCard';
import ThreeTabNavigator from '../components/Navigation/ThreeTabNavigator';

import {RootNavProp, RootNavRouteProps} from '../routes/RootStackParamList';
import {Colors} from '../utils/colors';
import {setCurrentValues} from '../redux/action';

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
  const contextId = useSelector((state: AppState) => state.rootStore.contextId);
  const currentDistance = useSelector(
    (state: AppState) => state.rootStore.currentValue.distance,
  );
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
        dispatch(
          setCurrentValues({
            distance: data.current_distance,
            index: data.current_track_index,
          }),
        );
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

  useEffect(() => {
    callToGetChallengeDataFromId();
    callToGetTracksData();
    callToGetUserJourneyData();
  }, []);

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

  return (
    <SafeAreaView style={{flex: 1}}>
      <Background startColor={Colors.TEXT} endColor={Colors.TEXT}>
        {loading ? (
          <RNLoader />
        ) : (
          <ScrollView scrollEnabled style={{flexGrow: 1}}>
            <View style={{flex: 1}}>
              <BackgroundVector />
              <View style={{padding: 5}} />

              <ChallengeNameWithIconCard
                onViewDetailsPressed={onViewDetailsPressed}
                name={data.name}
                icon={data.icon}
              />

              <View style={{padding: 15}} />

              <StatsCard streak={challengeData.streak} />
              <View style={{padding: 10}} />

              <ProgressBar distance={currentDistance} />
              <View style={{padding: 10}} />

              <RewardsCard
                rewards={challengeData.rewards}
                onPress={handleRewardsPressed}
              />
              <View style={{padding: 10}} />

              <CheckpointCard
                checkpoint={challengeData.current_checkpoint}
                onCheckpointPressed={onCheckpointPressed}
              />
              <View style={{padding: 10}} />

              <ThreeTabNavigator
                userLocation={{
                  latitude: challengeData.user_lat,
                  longitude: challengeData.user_long,
                }}
                journeyData={myJourneyData}
                tracksCoordinates={tracksData}
                tracks={challengeData.tracks}
                distanceData={myDistanceData}
                handleMyJourneyMilestonePressed={
                  handleMyJourneyMilestonePressed
                }
                funfact={challengeData.current_checkpoint.tid.fun_fact}
                distance={challengeData.current_distance}
              />
            </View>

            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={['#026E8D', '#308FD7']}>
              <View style={{padding: 50}} />
            </LinearGradient>
          </ScrollView>
        )}
      </Background>
    </SafeAreaView>
  );
};

export default MyChallengeScreen;
