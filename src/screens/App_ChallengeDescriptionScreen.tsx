import React from 'react';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import Background from '../components/Background/StyledBackground';
import RoadMapCard from '../components/Cards/ChallengeDescriptionCards/ChallengeDescriptionScreen_RoadMapCard';
import AboutChallengeCard from '../components/Cards/ChallengeDescriptionCards/AboutChallengeCard';
import {RootNavProp, RootNavRouteProps} from '../routes/RootStackParamList';
import {Colors} from '../utils/colors';
import ChallengeDescriptionCard from '../components/Cards/ChallengeDescriptionCards/ChallengeDescriptionCard';
import ChallengeCityAndDistanceCard from '../components/Cards/ChallengeDescriptionCards/ChallengeCityAndDistanceCard';
import ChallengeNameSubscribeCard from '../components/Cards/ChallengeDescriptionCards/ChallengeNameSubscribeCard';
import {useState} from 'react';
import CustomSwitch from '../components/Switch/CustomSwitch';
import CommonCard from '../components/Cards/Common/CommonCard';
import AdditionalRewardsCard from '../components/Cards/ChallengeDescriptionCards/AdditionalRewardsCard';
import {Image} from 'react-native';
import BackgroundVector from '../components/Background/BackgroundVector';
import axios from 'axios';
import {AppState} from '../redux';
import {useSelector} from 'react-redux';

interface Props {
  navigation: RootNavProp<'ChallengeDescriptionScreen'>;
  route: RootNavRouteProps<'ChallengeDescriptionScreen'>;
}

const ChallengeDescriptionScreen: React.FC<Props> = ({navigation, route}) => {
  const [currentTab, setTab] = useState(0);
  const data = route.params.data;
  const handleSwitch = () => {
    const tab = 1 - currentTab;
    setTab(tab);
  };

  const contextId = useSelector((state: AppState) => state.rootStore.contextId);
  const handleSubscribe = () => {
    axios
      .get('/api/challenge/subscribed/' + data.id, {
        headers: {
          'X-CONTEXT-ID': contextId,
        },
      })
      .then(res => {
        console.log(res.data);
        navigation.popToTop();
      })
      .catch(err => {
        console.log('error in subscribing to challenge');
        console.log(err);
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
              name={data.name}
              icon={data.icon}
              cid={data.id}
              playlist={data.playlist}
              handleSubscribe={handleSubscribe}
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

                <ChallengeDescriptionCard description={data.longDescription} />
                <View style={{padding: 10}} />

                <RoadMapCard roadMap={data.roadMap} />
                <View style={{padding: 10}} />
                <AboutChallengeCard description={data.shortDescription} />
              </View>
            ) : (
              <View>
                <View style={{padding: 10}} />
                <CommonCard data={data.rewards[0]} />
                <View style={{padding: 10}} />
                <CommonCard data={data.rewards[1]} />
                <View style={{padding: 10}} />
                <CommonCard data={data.rewards[2]} />
                <View style={{padding: 10}} />
                <AdditionalRewardsCard data={data.extraRewards} />
              </View>
            )}
          </View>
          <View style={{padding: 100}}></View>
        </ScrollView>
      </Background>
    </SafeAreaView>
  );
};

export default ChallengeDescriptionScreen;
