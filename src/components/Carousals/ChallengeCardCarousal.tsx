import React from 'react';
import {useState} from 'react';
import {Dimensions, ScrollView, StyleSheet, Text, View} from 'react-native';
import {Colors} from '../../utils/colors';
import CarousalCard from '../Cards/ChallengeScreen/AllChallenge_CarousalCard';

interface Props {
  wrapStyle?: any;
  onPress: (val: Object) => void;
  allChallenge: Object[];
  handleSubscribe: (cid: string) => void;
}
const ChallengeCardCarousal: React.FC<Props> = ({
  wrapStyle,
  onPress,
  allChallenge,
  handleSubscribe,
}) => {
  const [active, setActive] = useState(0);
  const change = nativeEvent => {
    if (nativeEvent) {
      const slide = Math.ceil(
        nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width,
      );
      if (slide !== active) {
        setActive(slide);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={{flex: 1, marginTop: 15}}>
        <ScrollView
          onScroll={({nativeEvent}) => change(nativeEvent)}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          horizontal
          style={[wrapStyle]}>
          {allChallenge.map((val, index) => (
            <View key={index} style={[wrapStyle, {paddingBottom: 5}]}>
              <CarousalCard
                onPress={() => onPress(val)}
                data={val}
                handleSubscribe={handleSubscribe}
              />
            </View>
          ))}
        </ScrollView>
        <View style={[styles.wrapDot]}>
          {allChallenge.map((e, index) => (
            <Text
              key={index}
              style={active === index ? styles.dotActive : styles.dot}>
              ●
            </Text>
          ))}
        </View>
        <View style={{flex: 6}}></View>
      </View>
    </View>
  );
};

export default ChallengeCardCarousal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapDot: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  dot: {
    margin: 3,
    color: '#888',
  },
  dotActive: {
    margin: 3,
    color: 'black',
  },
});
