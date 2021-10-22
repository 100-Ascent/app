import React, {useEffect, useState} from 'react';
import {SafeAreaView, View} from 'react-native';
import {RootNavProp} from '../routes/RootStackParamList';

import globalStyles from '../styles/Global/styles';
import LandingIcon from '../../assets/background-icons/no-active-challenge.svg';

interface Props {
  navigation: RootNavProp<'AllChallengesScreen'>;
}

const ViewAllChallenges: React.FC<Props> = ({navigation}) => {
  return (
    <SafeAreaView style={globalStyles.flex}>
      <View style={[globalStyles.flex, globalStyles.flexAllCenter]}>
        <LandingIcon />
      </View>
    </SafeAreaView>
  );
};

export default ViewAllChallenges;
