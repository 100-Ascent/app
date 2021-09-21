import axios from 'axios';
import React, {useEffect} from 'react';
import {useState} from 'react';
import {Dimensions, Image, SafeAreaView, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import BackgroundVector from '../components/Background/BackgroundVector';
import Background from '../components/Background/StyledBackground';
import ActiveChallengeCard from '../components/Cards/ChallengeScreen/AllChallenge_ActiveChallenge';
import CarousalCard from '../components/Cards/ChallengeScreen/AllChallenge_CarousalCard';
import CompletedChallenge from '../components/Cards/ChallengeScreen/AllChallenge_CompletedChallenge';
import NoActiveChallengeCard from '../components/Cards/ChallengeScreen/AllChallenge_NoActiveChallengeCard';
import ChallengeCardCarousal from '../components/Carousals/ChallengeCardCarousal';
import RNLoader from '../components/Loader/RNLoader';
import Text20 from '../components/Text/Text20';
import {AppState} from '../redux';
import {RootNavProp} from '../routes/RootStackParamList';
import {Colors} from '../utils/colors';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height * 0.45;

const images = [
  'https://www.omipharma.vn/files/banner/2020-07/xit-chong-nang-lishan-nhat-ban-spf-50-pa-huong-tinh-dau-thien-nhien.jpg',
  'https://www.omipharma.vn/files/banner/2020-06/omi-pharma-thau-hieu-hon-moi-ngay.jpg',
  'https://www.omipharma.vn/files/banner/2020-06/omi-pharma-thau-hieu-nhu-cau-dan-dau-lua-chon.jpg',
];
interface Props {
  navigation: RootNavProp<'AllChallengesScreen'>;
}

const ViewAllChallenges: React.FC<Props> = ({navigation}) => {
  const dispatch = useDispatch();
  const contextId = useSelector((state: AppState) => state.rootStore.contextId);
  const [loading, setLoading] = useState<Boolean>(true);
  const [listOfChallenges, setListOfChallenges] = useState([]);
  const [activeChallenge, setActiveChallenge] = useState([]);
  const [completedChallenge, setCompletedChallenge] = useState([]);
  const [allChallenge, setAllChallenge] = useState([]);
  const getChallengeData = () => {
    axios
      .get('/api/challenge', {
        headers: {
          'X-CONTEXT-ID': contextId,
        },
      })
      .then(res => {
        const allChallenge = res.data.data[0].remainingList;
        console.log(res.data.data[0]);
        setAllChallenge(allChallenge);
        setActiveChallenge(res.data.data[0].subsList);
        setCompletedChallenge(res.data.data[0].completedList);
        setLoading(false);
      })
      .catch(err => {
        console.log('error on get my challenges');
        console.log(err);
      });
  };

  useEffect(() => {
    getChallengeData();
  }, []);

  const handleSubscribe = cid => {
    axios
      .get('/api/challenge/subscribed/' + cid, {
        headers: {
          'X-CONTEXT-ID': contextId,
        },
      })
      .then(res => {
        setLoading(true);
        getChallengeData();
      })
      .catch(err => {
        console.log('error');
        console.log(err);
      });
  };

  const onChallengePress = item => {
    navigation.navigate('ChallengeDescriptionScreen', {data: item});
  };

  const handleActiveChallengePressed = (data: any) => {
    const cid = data.id;
    navigation.navigate('MyChallengeScreen', {
      data: data,
      challengeId: cid,
    });
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Background startColor={Colors.TEXT} endColor={Colors.TEXT}>
        {!loading ? (
          <ScrollView
            style={{flexGrow: 1}}
            contentContainerStyle={{flexGrow: 1}}>
            <View style={{flex: 1}}>
              <BackgroundVector />
              <View>
                {allChallenge.length !== 0 &&
                completedChallenge.length === 0 ? (
                  <ChallengeCardCarousal
                    allChallenge={allChallenge}
                    wrapStyle={{width: width, height: height}}
                    onPress={onChallengePress}
                    handleSubscribe={handleSubscribe}
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
          </ScrollView>
        ) : (
          <RNLoader />
        )}
      </Background>
    </SafeAreaView>
  );
};

export default ViewAllChallenges;
