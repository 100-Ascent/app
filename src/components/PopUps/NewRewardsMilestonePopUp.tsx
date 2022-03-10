import {Dimensions, Modal, StyleSheet} from 'react-native';

import CityCarousal from '../Carousals/CityCarousal';
import {Colors} from '../../utils/colors';
import { FONTS } from '../../utils/constants/fonts';
import FastImage from 'react-native-fast-image';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import NameIconCarousal from '../Carousals/NameIconCarousal';
import React from 'react';
import StyledButton from '../Button/StyledButton';
import Text16Normal from '../Text/Text16Normal';
import Text20 from '../Text/Text20';
import {View} from 'react-native';

interface Props {
    visible: boolean;
    checkpoints: any;
    rewards: any;
    onClose: any;
}

const NewRewardsMilestonePopUp: React.FC<Props> = ({visible, checkpoints, rewards, onClose}) => {
  return (
    <Modal visible={visible} onRequestClose={onClose} transparent>
      <View style={styles.container}>
        <View style={styles.subContainer}>

          <View style={styles.cross}>
            <Text20 
              text='Congratulations!' 
              textColor={Colors.TEXTDARK} 
              textStyle={FONTS.BOLD} 
              containerStyle={{ width: "95%", alignItems: 'center' }} 
            />
            <View style={{ width: "5%", alignItems: 'flex-end' }}>
              <Icon name="cross" type="entypo" onPress={onClose} size={20} />
            </View>
          </View>
          
          { 
            checkpoints.length > 0 ? 
              <Text16Normal
                text={"Checkpoints Unlocked"} 
                textColor={Colors.TEXTDARK} 
                textStyle={FONTS.SEMIBOLD} 
                containerStyle={{ paddingHorizontal: 20, marginTop: 15 }} 
              /> : null 
          }

          <View style={{ minHeight: checkpoints.length > 0 ? 120 : 0, marginTop: 15 }}>
            <NameIconCarousal onPress={()=>{}} data={checkpoints}/>
          </View>

          { 
            rewards.length > 0 ? 
              <Text16Normal
                text={"Rewards Unlocked"} 
                textColor={Colors.TEXTDARK} 
                textStyle={FONTS.SEMIBOLD} 
                containerStyle={{paddingHorizontal: 20 }} 
              /> : null
          }

          <View style={{ minHeight: rewards.length > 0 ? 120 : 0, marginTop: 15 }}>
            <NameIconCarousal onPress={()=>{}} data={rewards}/>
          </View>
          <View style={styles.buttonContainer}>
            <StyledButton text={"OK"} onPress={onClose}  />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default NewRewardsMilestonePopUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000aa',
    justifyContent: 'center',
  },
  subContainer: {
    backgroundColor: Colors.WHITE,
    marginHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 30,
  },
  cross: {
    flexDirection: 'row',
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  buttonContainer: {
    marginTop: 10,
    marginBottom: 20,
    paddingHorizontal: 30,  
  }
});
