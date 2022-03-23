import {ScrollView, StyleSheet, View} from 'react-native';

import {Colors} from '../../utils/colors';
import FastImage from 'react-native-fast-image';
import FunFactCard from '../Cards/Challenges/MyChallenges/FunFactCard';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import React from 'react';
import RewardsPopUp from '../PopUps/RewardsPopUp';
import Text14 from '../Text/Text14';
import {TouchableOpacity} from 'react-native';
import {useState} from 'react';

const JourneySliderComponent = ({
  colorArray,
  data,
  onPress,
  funfact,
  fun_fact_start_color,
  fun_fact_end_color,
  journeyIndex,
}) => {

  const [isRewardPopUpVisible, setIsRewardPopUpVisible] = useState(false);
  const [rewardData, setRewardData] = useState({});

  const handleRewardsPressed = item => {
    setRewardData(item);
    setIsRewardPopUpVisible(true);
  };

  let cards = (
    <View style={{flexDirection: 'row', paddingTop: 30}}>
      {data.map((item, idx) => {
        return (
          <View style={[styles.card, {flex: 1, flexDirection: 'row'}]} key={idx}>
            <View style={{flex: 1}} />
            <View style={{flex: 2, alignItems: 'center'}}>
              <View style={{ flex: 1, paddingHorizontal: 20 }} >
                <TouchableOpacity
                  disabled={item.order > journeyIndex}
                  activeOpacity={item.order <= journeyIndex ? 1 : 0.5}
                  onPress={() =>
                    item.type === 'checkpoint'
                      ? onPress(item)
                      : handleRewardsPressed(item)
                  }>
                  <View
                    style={{
                      elevation: 10,
                      borderWidth: 3,
                      borderColor: colorArray[0],
                      padding: 3,
                      borderRadius: 90,
                      backgroundColor:
                        item.order <= journeyIndex
                          ? Colors.BLACK5
                          : Colors.TRANSPARENT,
                      opacity: item.order <= journeyIndex ? 1 : 0.2,
                    }}>
                    <FastImage
                      style={{
                        width: 90,
                        height: 90,
                        borderRadius: 90,
                      }}
                      source={{
                        uri: item.images[0],
                        priority: FastImage.priority.high,
                      }}
                      resizeMode={FastImage.resizeMode.cover}
                    />
                  </View>
                </TouchableOpacity>
              </View>
              <View style={{flex: 1, paddingVertical: 20}}>
                <Text14 text={item.name} textColor={Colors.BLACK1} />
              </View>
            </View>
            <View
              style={{
                alignItems: 'center',
                // marginTop: 10,
                paddingTop: 30,
              }}>
              {idx !== data.length - 1 ? (
                <Icon
                  name="arrow-long-right"
                  type="entypo"
                  size={30}
                  color={Colors.ORANGE}
                />
              ) : null}
            </View>
          </View>
        );
      })}
    </View>
  );

  return <>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} >
        {cards}
        <View style={{ padding: 20 }} />
      </ScrollView>

      <RewardsPopUp
        data={rewardData}
        visible={isRewardPopUpVisible}
        onClose={() => setIsRewardPopUpVisible(false)}
      />

      <FunFactCard
        fact={funfact}
        startColor={fun_fact_start_color}
        endColor={fun_fact_end_color}
      />
    </>
};

const styles = StyleSheet.create({
  card: {
    justifyContent: 'center',
  },
});

export default JourneySliderComponent;
