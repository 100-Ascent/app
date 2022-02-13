import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {Colors} from '../../../utils/colors';
import React from 'react';
import Text16Normal from '../../Text/Text16Normal';
import Text18 from '../../Text/Text18';
import AsyncStorage from '@react-native-community/async-storage';
import {FONTS} from '../../../utils/constants/fonts';
import Text14 from '../../Text/Text14';
import Text12Normal from '../../Text/Text12Normal';
import FastImage from 'react-native-fast-image';

interface Props {
  onPress: () => void;
  callToSetInstitutionCard: () => void;
}

const JoinInstitutionCard: React.FC<Props> = ({
  onPress,
  callToSetInstitutionCard,
}) => {
  //State variables

  //Async functions

  //Component functions

  return (
    <View style={styles.cardStyle}>
      <TouchableOpacity onPress={onPress}>
        <View
          style={{
            paddingHorizontal: 10,
            paddingTop: 10,
            paddingBottom: 5,
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <View style={{ paddingHorizontal: 10, width: '25%' }}>
            {/* <Text style={{fontSize: 40}}>🏢</Text> */}
          </View>
          <View style={{ position: 'absolute', bottom: -37, left: -20, zIndex: -1, paddingHorizontal: 10 }}>
            <FastImage 
              source={require("../../../../assets/icons/Rewards/building.png")}
              style={{ width: 100, height: 100 }}
            />
          </View>
          <View style={{ paddingLeft: 10, justifyContent: 'center', width: '70%'}}>
            <Text18
              text={'Select your Institution'}
              textColor={Colors.TEXTDARK}
              textStyle={FONTS.BOLD}
            />
            <View style={{marginTop: 5}}>
              <Text12Normal containerStyle={{justifyContent: 'center'}} text={"You'll be automatically added to your institute's leaderboard."} textColor={Colors.BLACK2}/>
            </View>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={async () => {
          await AsyncStorage.setItem('showIntitutionCard', 'false');
          callToSetInstitutionCard();
        }}>
        <View style={{alignItems: 'flex-end', paddingRight: 15, paddingBottom: 5, paddingTop: 10}}>
          <Text12Normal text={'Hide this Card'} textColor={Colors.INFO_GREY} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default JoinInstitutionCard;

const styles = StyleSheet.create({
  cardStyle: {
    backgroundColor: Colors.TEXT,
    marginHorizontal: 15,
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    overflow: 'hidden'
  },
});
