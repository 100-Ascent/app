import axios from 'axios';
import React from 'react';
import {useEffect} from 'react';
import {useState} from 'react';
import {Dimensions} from 'react-native';
import {View, SafeAreaView} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import BackgroundVector from '../components/Background/BackgroundVector';
import Background from '../components/Background/StyledBackground';
import ChallengeNameWithIconCard from '../components/Cards/MyChallengeScreen_ChallengeCard';
import CheckpointCard from '../components/Cards/MyChallengeScreen_CheckpointCard';
import RewardsCard from '../components/Cards/MyChallengeScreen_RewardsCard';
import StatsCard from '../components/Cards/MyChallengeScreen_StatsCard';
import RNLoader from '../components/Loader/RNLoader';
import ThreeTabNavigator from '../components/Navigation/ThreeTabNavigator';
import ProgressBar from '../components/ProgressBar/ProgressBar';
import {AppState} from '../redux';
import {RootNavProp, RootNavRouteProps} from '../routes/RootStackParamList';
import {Colors} from '../utils/colors';

const window = Dimensions.get('window');

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
  const contextId = useSelector((state: AppState) => state.rootStore.contextId);

  const getMyJourneyData = (tracks: any) => {
    let myJourneyData = [];
    for (let id = 0; id < tracks.length; id++) {
      const checkpoint = tracks[id].checkpoints;
      for (let cpid = 0; cpid < checkpoint.length; cpid++) {
        myJourneyData.push(checkpoint[cpid]);
      }
    }
    return myJourneyData;
  };

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
        // console.log(data);
        setChallengeData(data);
        console.log(data);
        setDistanceData(data.challenge_data);
        const myJourneyData = getMyJourneyData(data.tracks);
        setJourneyData(myJourneyData);
        setLoading(false);
      })
      .catch(err => {
        console.log('error123');
        console.log(err);
      });
  };

  useEffect(() => {
    callToGetChallengeDataFromId();
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

              <ProgressBar distance={challengeData.current_distance} />
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
                journeyData={myJourneyData}
                tracks={challengeData.tracks}
                distanceData={myDistanceData}
                handleMyJourneyMilestonePressed={
                  handleMyJourneyMilestonePressed
                }
                funfact={challengeData.current_checkpoint.tid.fun_fact}
              />
            </View>
            <View style={{padding: 70}} />
          </ScrollView>
        )}
      </Background>
    </SafeAreaView>
  );
};

export default MyChallengeScreen;
