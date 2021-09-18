import React from 'react';
import {Dimensions, Modal} from 'react-native';
import {View} from 'react-native';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import {Colors} from '../../utils/colors';
<<<<<<< HEAD
import ImageCarousal from '../Carousals/ImageCarousal';
=======
import {HEIGHT} from '../../utils/constants';
import ImageCarousal from '../Carousals/ImageCarousal';
import Text14 from '../Text/Text14';
>>>>>>> 07f66b329214a0c3ad1496e9b1891bf42e51ab99

import Text16Normal from '../Text/Text16Normal';
import Text20 from '../Text/Text20';

const width = Dimensions.get('window').width - 80;
const height = Dimensions.get('window').height * 0.3;

interface Props {
  visible: boolean;
  onClose: () => void;
  data: any;
}

const RewardsPopUp: React.FC<Props> = ({visible, onClose, data}) => {
  return (
<<<<<<< HEAD
    <Modal
      style={{margin: 20}}
      visible={visible}
      onRequestClose={onClose}
      transparent>
      <View style={{flex: 1, backgroundColor: '#000000aa'}}>
        <View
          style={{
            flex: 1,
            backgroundColor: Colors.WHITE,
            marginHorizontal: 20,
            marginVertical: 40,
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderRadius: 20,
=======
    <Modal visible={visible} onRequestClose={onClose} transparent>
      <View
        style={{
          flex: 1,
          backgroundColor: '#000000aa',
          justifyContent: 'center',
        }}>
        <View
          style={{
            backgroundColor: Colors.WHITE,
            marginHorizontal: 20,
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderRadius: 5,
>>>>>>> 07f66b329214a0c3ad1496e9b1891bf42e51ab99
          }}>
          <View style={{flexDirection: 'row', marginVertical: 10}}>
            <View style={{flex: 3, alignItems: 'flex-end'}}>
              <Text20 text="Rewards" textColor={Colors.TEXTDARK} />
            </View>
            <View style={{flex: 2, alignItems: 'flex-end'}}>
              <Icon name="cross" type="entypo" onPress={onClose} />
            </View>
          </View>
<<<<<<< HEAD
          <View style={{flex: 1}}>
=======
          <View style={{height: HEIGHT * 0.3, backgroundColor: Colors.WHITE}}>
>>>>>>> 07f66b329214a0c3ad1496e9b1891bf42e51ab99
            <ImageCarousal
              data={data.images}
              wrapStyle={{width: width, height: height}}
            />
          </View>
<<<<<<< HEAD
          <View style={{padding: 20}} />
          <View style={{flex: 2}}>
=======
          <View style={{padding: 5}} />
          <View style={{marginBottom: 25}}>
>>>>>>> 07f66b329214a0c3ad1496e9b1891bf42e51ab99
            <View style={{paddingHorizontal: 5, paddingVertical: 15}}>
              <Text20 text={data.title} textColor={Colors.TEXTDARK} />
            </View>
            <View style={{paddingHorizontal: 5}}>
              <Text16Normal
                text={data.description + '!'}
                textColor={Colors.TEXTDARK}
              />
            </View>
<<<<<<< HEAD

            {/* <View style={{paddingHorizontal: 5}}>
              <Text14
                text={data.checkpoint.description}
                textColor={Colors.TEXTDARK}
              />
            </View> */}
=======
>>>>>>> 07f66b329214a0c3ad1496e9b1891bf42e51ab99
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default RewardsPopUp;
