import React from 'react';
import {Text, Button, StyleSheet, View, Image} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import {RootNavProp} from '../routes/RootStackParamList';
interface Props {
  navigation: RootNavProp<'OnboardingScreen'>;
}
const OnboardingScreen: React.FC<Props> = ({navigation}) => {
  return (
    <Onboarding
      onSkip={() => navigation.replace('AllChallengesScreen')}
      onDone={() => navigation.navigate('AllChallengesScreen')}
      pages={[
        {
          backgroundColor: '#29BEF0',
          image: <Image source={require('../../assets/icons/Screen1.png')} />,
          title: 'Workout & Track',
          subtitle:
            'Subscribe to any challenge and start tracking your fitness activity.',
        },
        {
          backgroundColor: '#fd8868',
          image: <Image source={require('../../assets/icons/Screen2.svg')} />,
          title: 'Explore New Places',
          subtitle:
            'We bring to you the vitual experience of visiting new cities and places on your device.',
        },
        {
          backgroundColor: '#E3C81A',
          image: <Image source={require('../../assets/icons/Screen3.svg')} />,
          title: 'Rewards & Surprises',
          subtitle:
            "You receive an ultra precious  Achiever's Medal besides lots of surprising physical & digital rewards in the hamper.",
        },
        {
          backgroundColor: '#50AA4D',
          image: <Image source={require('../../assets/icons/Screen4.svg')} />,
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