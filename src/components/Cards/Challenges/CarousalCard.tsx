import {StyleSheet, TouchableOpacity, View} from 'react-native';

import ChallengeDistanceMilestoneCity from './ChallengeDistanceMilestoneCity';
import {Colors} from '../../../utils/colors';
import { FONTS } from '../../../utils/constants/fonts';
import FastImage from 'react-native-fast-image';
import React from 'react';
import { SUBSCRIBE } from '../../../utils/constants/constants';
import StyledButton from '../../Button/StyledButton';
import Text24 from '../../Text/Text24';

interface Props {
  data: any;
  handleSubscribe?: (id: any) => void;
  isSubscribed?: boolean;
  onPress: () => void;
}

const CarousalCard: React.FC<Props> = ({ onPress, data, handleSubscribe, isSubscribed }) => {
  return (
    <View style={styles.parentContainer}>
      <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={{ paddingTop: 20}}>
        <View style={styles.container}>
          <View style={styles.imageContainer}>
              <FastImage 
                style={styles.image}
                source={{ uri: data.icon, priority: FastImage.priority.high }}
                resizeMode={FastImage.resizeMode.cover}
              />
          </View>
          <View style={styles.nameContainer}>
            <Text24 text={data.name} textStyle={FONTS.SEMIBOLD} />            
            <View style={styles.buttonContainer}>
              { isSubscribed ? <View style={{ padding: 10 }} /> : 
                <StyledButton
                  text={SUBSCRIBE.toUpperCase()}
                  onPress={() => handleSubscribe(data)}
                  buttonStyle={{ marginVertical: 0, paddingVertical: 5 }}
                  textStyle={{ paddingBottom: 2 }}
                />
                }
            </View>
          </View>
        </View>
        
        <ChallengeDistanceMilestoneCity  cities={data.cities} distance={data.distance} milestones={data.milestones} />
              
      </TouchableOpacity>
    </View>
  );
};

export default CarousalCard;


const styles = StyleSheet.create({
  parentContainer: { 
    backgroundColor: Colors.TEXT, 
    borderRadius: 10,
    margin: 1
  },
  container: {
    flexDirection: 'row', 
    borderRadius: 10,
  },
  imageContainer: { 
    marginLeft: 20, 
    borderWidth: 3, 
    borderColor: Colors.BLACK2, 
    borderRadius: 100, 
    padding: 3
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 100,
    borderWidth: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameContainer: { 
    width: '60%',
    flexDirection: 'column', 
    paddingHorizontal: 20, 
  },
  buttonContainer: { 
    marginTop: 10
  },
  challengeData: {
    width: "50%", 
    flexDirection: 'row', 
    paddingLeft: 20
  }
})