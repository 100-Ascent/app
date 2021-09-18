import React from 'react';
import {SafeAreaView, View} from 'react-native';
import Background from '../components/Background/StyledBackground';
import {Colors} from '../utils/colors';
import CommunityIcon from '../../assets/background-icons/community-icon.svg';
import Text24 from '../components/Text/Text24';
import Text16Normal from '../components/Text/Text16Normal';

const CommunityScreen = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Background startColor={Colors.WHITE} endColor={Colors.WHITE}>
        <View style={{flex: 1}}>
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}>
            <CommunityIcon />
          </View>
          <View style={{flex: 1, paddingTop: 40, alignItems: 'center'}}>
            <View>
              <Text24 text="COMING SOON!" />
            </View>
            <View style={{marginTop: 20}}>
              <Text16Normal text="Stay Tuned!" textColor={Colors.TEXT4} />
            </View>
          </View>
        </View>
      </Background>
    </SafeAreaView>
  );
};

export default CommunityScreen;
