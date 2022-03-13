import {Dimensions, Modal, StyleSheet} from 'react-native';
import {NavigationRouteContext, useNavigation} from '@react-navigation/core';

import {Colors} from '../../utils/colors';
import { FONTS } from '../../utils/constants/fonts';
import {HEIGHT} from '../../utils/constants/constants';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import ImageCarousal from '../Carousals/ImageCarousal';
import RNFS from 'react-native-fs';
import React from 'react';
import Share from 'react-native-share';
import ShareButton from '../../components/Button/ShareButton';
import Text16Normal from '../Text/Text16Normal';
import Text20 from '../Text/Text20';
import {View} from 'react-native';
import ViewShot from 'react-native-view-shot';

const width = Dimensions.get('window').width - 85;
const height = Dimensions.get('window').height * 0.3;

interface Props {
  visible: boolean;
  onClose: () => void;
  data: any;
}

const RewardsPopUp: React.FC<Props> = ({visible, onClose, data}) => {
  
  const ref = React.useRef<ViewShot | null>(null);
  const captureScreenshot = () => {
    ref.current.capture().then(uri => {
      RNFS.readFile(uri, 'base64').then(res => {
        let urlString = 'data:image/jpeg;base64,' + res;
        let options = {
          title: '100 Ascent',
          message: 'Hi, checkout my recent activity on 100 Ascent app (https://100ascent.com)',
          url: urlString,
          type: 'image/jpeg',
        };
        Share.open(options)
          .then(res => {
            
          })
          .catch(err => {

          });
      });
    });
  };
  
  console.log(data);
  return (
    <Modal visible={visible} onRequestClose={onClose} transparent>
      <View style={styles.container}>
        <View style={styles.subContainer}>
          <ViewShot 
            style={{ backgroundColor: Colors.WHITE, paddingHorizontal: 10, borderRadius: 30 }} 
            ref={ref} 
            options={{format: 'jpg', quality: 0.9}}>   
          <View style={styles.cross}>
            <View style={{flex: 2, alignItems: 'flex-end'}}>
              <Icon name="cross" type="entypo" onPress={onClose} size={30} />
            </View>
          </View>
          <View style={{height: HEIGHT * 0.3, backgroundColor: Colors.WHITE, alignItems: 'center'}}>
            <ImageCarousal
              data={data.images}
              wrapStyle={{width: width, height: height}}
              onPressImageHandler={()=>{}}
            />
          </View>
          <View style={{padding: 5}} />
          
          { data.title?.length > 0 ? <Text20 
            text={data.title} 
            textColor={Colors.TEXTDARK} 
            textStyle={FONTS.BOLD} 
            containerStyle={{paddingHorizontal: 5, marginTop: 10, alignItems: 'center'}} 
          /> : null }
          { data.description?.length > 0 ? <Text16Normal
            text={data.description}
            textColor={Colors.TEXTDARK}
            containerStyle={{paddingHorizontal: 5, alignItems: 'center', paddingTop: 5 }}
          /> : null }
          </ViewShot>
          { data.title?.length > 0 || data.description?.length > 0 ?  <View style={styles.buttonContainer}>
            <ShareButton onPress={captureScreenshot} shouldShowIcon={false} />
          </View> : <View style={styles.buttonContainer}/> }
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
    borderRadius: 0,
  },
  subContainer: {
    backgroundColor: Colors.WHITE,
    marginHorizontal: 20,
    paddingHorizontal: 5,
    paddingVertical: 10,
    borderRadius: 30,
  },
  cross: {
    flexDirection: 'row',
    marginTop: 5,
    marginBottom: 10
  },
  buttonContainer: {
    marginVertical: 20,
    marginHorizontal: 30
  }
})
