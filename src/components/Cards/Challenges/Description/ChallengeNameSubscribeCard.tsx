import {Alert, Linking, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useCallback, useState} from 'react';

import {Colors} from '../../../../utils/colors';
import FastImage from 'react-native-fast-image';
import RewardsPopUp from '../../../PopUps/RewardsPopUp';
import { SUBSCRIBE } from '../../../../utils/constants/constants';
import ShareButton from '../../../Button/ShareButton';
import SpotifyButton from '../../../Button/SpotifyButton';
import StyledButton from '../../../Button/StyledButton';
import Text28 from '../../../Text/Text28';

interface Props {
  name: string;
  icon: string;
  shouldShowButtons: boolean;
  shouldShowTitle: boolean;
  cid?: string;
  image?: any;
  playlist?: string;
  handleSubscribe?: () => void;
  onSharePress?: ()=> void;
}

const ChallengeNameSubscribeCard: React.FC<Props> = ({
  name,
  icon,
  shouldShowButtons,
  shouldShowTitle,
  cid,
  image,
  playlist,
  handleSubscribe,
  onSharePress
}) => {

  const OpenURLButton = ({url}) => {
    const handlePress = useCallback(async () => {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert(`Don't know how to open this URL: ${url}`);
      }
    }, [url]);

    return (
      <View style={{ flex: 1, marginRight: 10, justifyContent: 'center'}}>
        <SpotifyButton onPress={handlePress} />
      </View>
    );
  };

  const [showPopUp, setShowPopUp] = useState(false);
  const handlePress = () => {
    setShowPopUp(true);
  }

  return (
    <View style={{ marginHorizontal: 20 }}>
      { 
        shouldShowTitle ? (
          <View style={{ flexDirection: 'row'}}>
            <TouchableOpacity activeOpacity={0.8} onPress={handlePress}>
              <View style={styles.imageBorder}>
                <FastImage style={styles.image}
                  source={{ uri: icon, priority: FastImage.priority.high }}
                  resizeMode={FastImage.resizeMode.cover}
                />
              </View>
            </TouchableOpacity>
            <Text28 
              text={name} 
              textColor={Colors.TEXTDARK} 
              containerStyle={styles.header} 
            />
          </View>
      ) : null}

      <View style={styles.buttonContainer}>
        {
          shouldShowButtons ? (
          <View style={{flex: 4, justifyContent: 'center'}}>
            <StyledButton
              text={SUBSCRIBE.toUpperCase()}
              onPress={handleSubscribe}
              buttonStyle={{ marginVertical: 0, paddingVertical: 9, marginRight: 15 }}
              textStyle={{ paddingBottom: 2 }}
            />
          </View>
        ) : null}
        <OpenURLButton url={playlist} />
        <View style={{flex: 1, justifyContent: 'center'}}>
          <ShareButton onPress={onSharePress} />
        </View>
      </View>
      { 
        Object.keys(image).length > 0 ?
        <RewardsPopUp data={image} visible={showPopUp} onClose={()=> setShowPopUp(false)}  />
        : null 
      }
    </View>
  );
};

export default ChallengeNameSubscribeCard;

const styles = StyleSheet.create({
  imageBorder : {
    marginLeft: 10, 
    borderWidth: 3, 
    borderColor: Colors.BLACK2, 
    borderRadius: 100, 
    padding: 3
  },
  image: {
    width: 100,
    height: 100, 
    borderRadius: 100
  },
  header: {
    flex: 1,
    marginLeft: 30,
    justifyContent: 'center',
  },
  buttonContainer: {
    flex: 1, 
    flexDirection: 'row',
    marginTop: 20
  }
})
