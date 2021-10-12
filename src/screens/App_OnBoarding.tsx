import React from 'react';
import {Text, Button, StyleSheet, View, Image} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';

const OnboardingScreen = () => {
  return (
    <Onboarding
      pages={[
        {
          backgroundColor: '#29BEF0',
          image: (
            <Image
              source={require('../../assets/icons/onboarding/Screen1.png')}
            />
          ),
          title: 'Workout & Track',
          subtitle:
            'Subscribe to any challenge and start tracking your fitness activity.',
        },
        {
          backgroundColor: '#fd8868',
          image: (
            <Image
              source={require('../../assets/icons/onboarding/Screen2.png')}
            />
          ),
          title: 'Explore New Places',
          subtitle:
            'We bring to you the vitual experience of visiting new cities and places on your device.',
        },
        {
          backgroundColor: '#E3C81A',
          image: (
            <Image
              source={require('../../assets/icons/onboarding/Screen3.png')}
            />
          ),
          title: 'Rewards & Surprises',
          subtitle:
            "You receive an ultra precious  Achiever's Medal besides lots of surprising physical & digital rewards in the hamper.",
        },
        {
          backgroundColor: '#50AA4D',
          image: (
            <Image
              source={require('../../assets/icons/onboarding/Screen4.png')}
            />
          ),
          title: 'Give Back to Nature',
          subtitle:
            'We plant a sapling and grow it into a tree for every 20% of the challenge that you complete.',
        },
      ]}
    />
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
