import React, { useEffect, useState } from 'react';
import Orientation from 'react-native-orientation';
import {Image, Modal, TouchableOpacity, View} from 'react-native';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import FastImage from 'react-native-fast-image';
import ImageViewer from 'react-native-image-zoom-viewer';
import {RootNavProp, RootNavRouteProps} from '../routes/RootStackParamList';
import styles from '../styles/Global/styles';
import { HEIGHT } from '../utils/constants';

interface Props {
  navigation: RootNavProp<'MediaScreen'>;
  route: RootNavRouteProps<'MediaScreen'>;
}
const MediaScreen: React.FC<Props> = ({navigation, route}) => {
  const roadmap = route.params.data;
  const [landscapeMode, setLandscapeMode] = useState(false);

  const ChangeToLandscape = () => {
    setLandscapeMode(true);
    Orientation.unlockAllOrientations(); 
    Orientation.lockToLandscape();
  }

  const ChangeToPotrait = () => {
    setLandscapeMode(false);
    Orientation.unlockAllOrientations(); 
    Orientation.lockToPortrait();
  }
  
  return (
    <Modal visible={true} transparent={true} onRequestClose={() => navigation.pop()}> 
    <View style={{flexDirection: 'row'}}>
      <View style={{marginLeft: 10, paddingVertical:10}}>
          <Icon
            name="arrow-back"
            type="ionicons"
            size={30}
            onPress={() => {navigation.pop(); ChangeToPotrait;}}
          />
          
      </View>
      <View style={{flex:1}}></View>
      <View style={{marginRight:10, paddingVertical:10,}}>
          <Icon
            name="fullscreen"
            type="material-icons"
            size={30}
            onPress={landscapeMode ? ChangeToPotrait : ChangeToLandscape }
          />
      </View>
    </View>
    <ImageViewer imageUrls={[{url:roadmap}]} />
    </Modal>
  );
};

export default MediaScreen;



function componentDidMount() {
  throw new Error('Function not implemented.');
}
// {/* <View
// style={{
//   width: '100%',
//   height: '100%',
//   justifyContent: 'center',
// }}>
// {/* <FastImage
//   style={{
//     height: 200,
//     borderRadius: 10,
//     marginHorizontal: 20,
//   }}
//   source={{
//     uri: roadmap,
//     priority: FastImage.priority.high,
//   }}
//   resizeMode={FastImage.resizeMode.contain}
// /> */}


// </View> */}