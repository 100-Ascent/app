import {Dimensions, Modal, StyleSheet} from 'react-native';
import {NavigationRouteContext, useNavigation} from '@react-navigation/core';

import {Colors} from '../../utils/colors';
import { FONTS } from '../../utils/constants/fonts';
import {HEIGHT} from '../../utils/constants/constants';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import ImageCarousal from '../Carousals/ImageCarousal';
import React from 'react';
import ShareButton from '../../components/Button/ShareButton';
import Text16Normal from '../Text/Text16Normal';
import Text20 from '../Text/Text20';
import {View} from 'react-native';

const width = Dimensions.get('window').width - 100;
const height = Dimensions.get('window').height * 0.3;

interface Props {
  visible: boolean;
  onClose: () => void;
  data: any;
}

const RewardsPopUp: React.FC<Props> = ({visible, onClose, data}) => {
  const navigation = useNavigation();
  const onPress = () => {
    onClose();
    navigation.navigate('MediaScreen', {
      data: data.images[0],
    });
  };
  return (
    <Modal visible={visible} onRequestClose={onClose} transparent>
      <View style={styles.container}>
        <View style={styles.subContainer}>
          <View style={styles.cross}>
            <View style={{flex: 2, alignItems: 'flex-end'}}>
              <Icon name="cross" type="entypo" onPress={onClose} size={30} />
            </View>
          </View>
          <View style={{height: HEIGHT * 0.3, backgroundColor: Colors.WHITE, alignItems: 'center'}}>
            <ImageCarousal
              data={data.images}
              wrapStyle={{width: width, height: height}}
              onPressImageHandler={onPress}
            />
          </View>
          <View style={{padding: 5}} />
          
          <Text20 
            text={data.title} 
            textColor={Colors.TEXTDARK} 
            textStyle={FONTS.BOLD} 
            containerStyle={{paddingHorizontal: 5, marginTop: 10, alignItems: 'center'}} 
          />
          <Text16Normal
            text={data.description}
            textColor={Colors.BLACK3}
            containerStyle={{paddingHorizontal: 5, alignItems: 'center', paddingTop: 5 }}
          />
          <View style={styles.buttonContainer}>
            <ShareButton onPress={()=>{}} shouldShowIcon={false} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default RewardsPopUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000aa',
    justifyContent: 'center',
  },
  subContainer: {
    backgroundColor: Colors.WHITE,
    marginHorizontal: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 30,
  },
  cross: {
    flexDirection: 'row',
    marginVertical: 10
  },
  buttonContainer: {
    marginVertical: 20,
  }
})
