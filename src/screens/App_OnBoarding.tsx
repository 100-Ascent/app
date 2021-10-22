import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import {Icon} from 'react-native-elements/dist/icons/Icon';

import Screen1 from '../../assets/icons/onboarding/Screen1.svg';
import Screen2 from '../../assets/icons/onboarding/Screen2.svg';
import Screen3 from '../../assets/icons/onboarding/Screen3.svg';
import Screen4 from '../../assets/icons/onboarding/Screen4.svg';
import AppIconBW from '../../assets/icons/app-icon-bw.svg';

import {Colors} from '../utils/colors';
import globalStyles from '../styles/Global/styles';
import Text16Normal from '../components/Text/Text16Normal';

const SCREEN1_TITLE = 'Workout & Track';
const SCREEN2_TITLE = 'Explore New Places';
const SCREEN3_TITLE = 'Rewards & Surprises';
const SCREEN4_TITLE = 'Give Back to Nature';

const SCREEN1_SUBTITLE =
  'Subscribe to any challenge and start tracking your fitness activity.';
const SCREEN2_SUBTITLE =
  'We bring to you the vitual experience of visiting new cities and places on your device.';
const SCREEN3_SUBTITLE =
  "You receive an ultra precious Achiever's Medal besides lots of surprising physical & digital rewards in the hamper.";
const SCREEN4_SUBTITLE =
  'We plant a sapling and grow it into a tree for every 20% of the challenge that you complete.';

const SCREEN1_COLOR = '#29BEF0';
const SCREEN2_COLOR = '#fd8868';
const SCREEN3_COLOR = '#E3C81A';
const SCREEN4_COLOR = '#50AA4D';
const DOT_NOT_SELECTED_COLOR = 'rgba(255, 255, 255, 0.5)';

const SKIP = 'Skip';

const OnboardingScreen = ({showAppStack}) => {

  const DotComponent = ({selected}) => {
    let backgroundColor = selected ? Colors.WHITE : DOT_NOT_SELECTED_COLOR;
    return <View style={[styles.dotComponentStyle, {backgroundColor}]} />;
  };

  const NextComponent = ({isLight, ...props}) => (
    <TouchableOpacity style={{marginRight: 20}} {...props}>
      <View
        style={[ styles.nextComponentStyle, { borderColor: Colors.TEXT } ]}>
        <Icon name="chevron-thin-right" type="entypo" color={Colors.TEXT} />
      </View>
    </TouchableOpacity>
  );

  const SkipComponent = ({isLight, ...props}) => (
    <TouchableOpacity style={{marginLeft: 20}} {...props}>
      <View>
        <Text16Normal text={SKIP} textColor={Colors.TEXT} />
      </View>
    </TouchableOpacity>
  );

  return (
    <Onboarding
      NextButtonComponent={NextComponent}
      SkipButtonComponent={SkipComponent}
      DotComponent={DotComponent}
      onSkip={() => showAppStack()}
      onDone={() => showAppStack()}
      bottomBarHighlight={false}
      bottomBarHeight={80}
      titleStyles={{color: Colors.TEXT}}
      subTitleStyles={{color: Colors.TEXT}}
      pages={[
        {
          backgroundColor: SCREEN1_COLOR,
          image: (
            <View>
              <View style={[globalStyles.flexAllCenter, {marginBottom: 50}]}>
                <AppIconBW />
              </View>
              <Screen1 />
            </View>
          ),
          title: SCREEN1_TITLE,
          subtitle: SCREEN1_SUBTITLE,
        },
        {
          backgroundColor: SCREEN2_COLOR,
          image: (
            <View>
              <View style={[globalStyles.flexAllCenter, {paddingBottom: 50}]}>
                <AppIconBW />
              </View>
              <Screen2 />
            </View>
          ),
          title: SCREEN2_TITLE,
          subtitle: SCREEN2_SUBTITLE,
        },
        {
          backgroundColor: SCREEN3_COLOR,
          image: (
            <View>
              <View style={[globalStyles.flexAllCenter, {marginBottom: 50}]}>
                <AppIconBW />
              </View>
              <Screen3 />
            </View>
          ),
          title: SCREEN3_TITLE,
          subtitle: SCREEN3_SUBTITLE,
        },
        {
          backgroundColor: SCREEN4_COLOR,
          image: (
            <View>
              <View style={[globalStyles.flexAllCenter, {marginBottom: 50}]}>
                <AppIconBW />
              </View>
              <Screen4 />
            </View>
          ),
          title: SCREEN4_TITLE,
          subtitle: SCREEN4_SUBTITLE,
        },
      ]}
    />
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  dotComponentStyle: {
    width: 6,
    height: 6,
    borderRadius: 6,
    marginHorizontal: 3,
  },
  nextComponentStyle: {
    borderWidth: 2,
    padding: 5,
    borderRadius: 10,
  }
});
