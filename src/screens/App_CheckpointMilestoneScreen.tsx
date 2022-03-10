import {Dimensions, SafeAreaView, ScrollView, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {RootNavProp, RootNavRouteProps} from '../routes/RootStackParamList';

import AscendedRemainingDistanceCard from '../components/Cards/Challenges/CheckpointMilestone/AscendedRemainingDistanceCard';
import Background from '../components/Background/StyledBackground';
import {Colors} from '../utils/colors';
import Icon from 'react-native-elements/dist/icons/Icon';
import ImageCarousal from '../components/Carousals/ImageCarousal';
import RewardsPopUp from '../components/PopUps/RewardsPopUp';
import RewardsUnlockedCard from '../components/Cards/Challenges/CheckpointMilestone/RewardsUnlocked';
import Text14 from '../components/Text/Text14';
import Text20 from '../components/Text/Text20';

interface Props {
  navigation: RootNavProp<'CheckpointMilestoneScreen'>;
  route: RootNavRouteProps<'CheckpointMilestoneScreen'>;
}

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height * 0.25;

const CheckpointMilestoneScreen: React.FC<Props> = ({navigation, route}) => {
  const [visible, setVisible] = useState(false);
  const [reward, setReward] = useState({});
  const checkpointData = route.params.data;
  const isLast = checkpointData.isLast;
  const current_distance = route.params.current_distance;
  const total_distance = route.params.total_distance;

  const handleRewardPressed = item => {
    setReward(item);
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const imageOnPress = url => {
    // navigation.navigate('MediaScreen', {
    //   data: url,
    // });
  };  

  useEffect(()=>{
    navigation.setOptions({
      headerTitle: 'Milestone',
      headerTitleStyle: {fontFamily: 'Quicksand-Bold'},
      headerTitleContainerStyle: {alignItems: 'center'},
      headerRight: () => <View style={{marginRight: 0}} />,
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
    )});
  },[]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <Background startColor={Colors.WHITE} endColor={Colors.WHITE}>
        <ScrollView style={{flexGrow: 1}}>
          <View style={{flex: 1}}>
            <View style={{flex: 1}}>
              <ImageCarousal
                data={checkpointData.images}
                wrapStyle={{width: width, height: height}}
                onPressImageHandler={imageOnPress}
              />
              <View style={{flex: 1}}>
                <View style={{padding: 20}}>
                  <Text20
                    text={checkpointData.name}
                    textColor={Colors.TEXTDARK}
                  />
                </View>
                <View style={{paddingHorizontal: 20}}>
                  <Text14
                    text={checkpointData.description}
                    textColor={Colors.TEXTDARK}
                  />
                </View>
              </View>
              <View style={{padding: 15}} />
              {/* {checkpointData.rewards && checkpointData.rewards.length !== 0 ? (
                <RewardsUnlockedCard
                  rewards={checkpointData.rewards}
                  onPress={handleRewardPressed}
                />
              ) : null} */}
              <View style={{marginTop: 20}}>
                <AscendedRemainingDistanceCard
                  current={current_distance}
                  total={total_distance}
                />
              </View>
            </View>
            <RewardsPopUp data={reward} visible={visible} onClose={onClose} />
          </View>
          <View style={{padding: 100}} />
        </ScrollView>
      </Background>
    </SafeAreaView>
  );
};

export default CheckpointMilestoneScreen;
