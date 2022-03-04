import {StyleSheet, View} from 'react-native';

import {Colors} from '../../utils/colors';
import { FONTS } from '../../utils/constants/fonts';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import LinearGradient from 'react-native-linear-gradient';
import React from 'react';
import Text14 from '../Text/Text14';
import Text16Normal from '../Text/Text16Normal';
import Text20 from '../Text/Text20';

const ProgressBar = ({distance}) => {
  
  const isCompleted = false;
  
  return <View>
      <View style={styles.container}>
        <View style={{flex: 1}}>
          <Icon name="location-sharp" type="ionicon" size={30} color={Colors.WHITE} />
        </View>
        <View style={{flex: 4}}>
          <Text20 text="Distance Covered" textColor={Colors.WHITE} />
        </View>
      </View>

      <View style={styles.progressBarContainer}>
        <LinearGradient 
          colors={[ "#E06627", "#F0AF46" ]} 
          useAngle angle={60} 
          style={[styles.progress, { width: `${distance}%`, borderBottomRightRadius: isCompleted ? 10 : 0, }]}>
          {  distance >= 20 ? <Text16Normal text={`${distance} klicks`} textColor={Colors.TEXT} textStyle={FONTS.SEMIBOLD} /> : null }
        </LinearGradient>

          { distance < 20 ? <Text14 text={`${distance} klicks`} textColor={Colors.TEXT} containerStyle={{paddingLeft: 10}} /> : null }
      </View>
    </View>
};

export default ProgressBar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    borderWidth: 0,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: Colors.CARDS_COLOR2,
    paddingVertical: 15,
  },
  progressBarContainer: {
    flex: 1,
    borderWidth: 0,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderColor: Colors.BLACK1,
    backgroundColor: Colors.CARDS_COLOR1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  progress: {    
    // backgroundColor: '#E06627',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 10,
    borderWidth: 0,    
  }
}) 
