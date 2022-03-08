import {Alert, Linking, StyleSheet, View} from 'react-native';
import React, {useCallback} from 'react';

import {Colors} from '../../../../utils/colors';
import FastImage from 'react-native-fast-image';
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

  return (
    <View style={{ marginHorizontal: 20 }}>
      { 
        shouldShowTitle ? (
          <View style={{ flexDirection: 'row'}}>
            <View style={styles.imageBorder}>
              <FastImage style={styles.image}
                source={{ uri: icon, priority: FastImage.priority.high }}
                resizeMode={FastImage.resizeMode.cover}
              />
            </View>
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
    </View>
  );
};

export default ChallengeNameSubscribeCard;

const styles = StyleSheet.create({
  imageBorder : {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 4,
    justifyContent: 'center',
    alignItems: 'center'
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
