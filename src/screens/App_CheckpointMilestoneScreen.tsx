import React from 'react';
import {useState} from 'react';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Icon from 'react-native-elements/dist/icons/Icon';
import Background from '../components/Background/StyledBackground';
import AscendedRemainingDistanceCard from '../components/Cards/CheckpointMilestoneScreen/AscendedRemainingDistanceCard';
import RewardsUnlockedCard from '../components/Cards/CheckpointMilestoneScreen/CheckpointMilestoneScreen_RewardsUnlocked';

import ImageCarousal from '../components/Carousals/ImageCarousal';
import RewardsPopUp from '../components/PopUps/RewardsPopUp';
import Text14 from '../components/Text/Text14';
import Text20 from '../components/Text/Text20';
import {RootNavProp, RootNavRouteProps} from '../routes/RootStackParamList';
import {Colors} from '../utils/colors';

interface Props {
  navigation: RootNavProp<'CheckpointMilestoneScreen'>;
  route: RootNavRouteProps<'CheckpointMilestoneScreen'>;
}

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height * 0.25;

const CheckpointMilestoneScreen: React.FC<Props> = ({navigation, route}) => {
  const [visible, setVisible] = useState(false);
  const checkpointData = route.params.data;
  const current_distance = route.params.current_distance;
  const total_distance = route.params.total_distance;
  const onClose = () => {
    setVisible(false);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Background startColor={Colors.WHITE} endColor={Colors.WHITE}>
        <ScrollView style={{flexGrow: 1}}>
          <View style={{flex: 1}}>
            <View style={{flex: 1}}>
              <ImageCarousal
                data={checkpointData.images}
                wrapStyle={{width: width, height: height}}
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
              <RewardsUnlockedCard
                rewards={checkpointData.rewards}
                onPress={() => setVisible(true)}
              />
              <View style={{marginTop: 20}}>
                <AscendedRemainingDistanceCard
                  current={current_distance}
                  total={total_distance}
                />
              </View>
            </View>
            {/* <RewardsPopUp
              data={checkpointData.rewards}
              visible={visible}
              onClose={onClose}
            /> */}
          </View>
          <View style={{padding: 100}} />
        </ScrollView>
      </Background>
    </SafeAreaView>
  );
};

export default CheckpointMilestoneScreen;
