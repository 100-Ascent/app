import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {Colors} from '../../../utils/colors';
import React from 'react';
import Text16Normal from '../../Text/Text16Normal';
import Text18 from '../../Text/Text18';
import AsyncStorage from '@react-native-community/async-storage';
import {FONTS} from '../../../utils/constants/fonts';
import Text14 from '../../Text/Text14';

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
      <TouchableOpacity
        onPress={async () => {
          await AsyncStorage.setItem('showIntitutionCard', 'false');
          callToSetInstitutionCard();
        }}>
        <View style={{alignItems: 'flex-end', paddingRight: 10}}>
          <Text14 text={'Hide'} textColor={Colors.INFO_GREY} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={onPress}>
        <View
          style={{
            paddingHorizontal: 10,
            paddingBottom: 20,
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <View style={{ paddingHorizontal: 10 }}>
            <Text style={{fontSize: 40}}>🏛️</Text>
          </View>
          <View style={{ paddingLeft: 10, justifyContent: 'center' }}>
            <Text18
              text={'Select your Institution'}
              textColor={Colors.TEXTDARK}
              textStyle={FONTS.BOLD}
            />
          </View>
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
  },
});
