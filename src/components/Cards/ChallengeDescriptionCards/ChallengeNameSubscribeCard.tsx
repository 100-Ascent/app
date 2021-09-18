import React, { useCallback } from 'react';
import { Alert, Linking, View } from 'react-native';
import SpotifyButton from '../../Button/SpotifyButton';
import ShareButton from '../../Button/ShareButton';

import StyledButton from '../../Button/StyledButton';
import FastImage from 'react-native-fast-image';
import Text28 from '../../Text/Text28';
import { Colors } from '../../../utils/colors';
import axios from 'axios';
import { AppState } from '../../../redux';
import { useSelector } from 'react-redux';

interface Props {
  name: string;
  icon: string;
  shouldShowButtons: boolean;
  shouldShowTitle: boolean;
  cid?: string;
  playlist?: string;
  handleSubscribe?: () => void;
}

const ChallengeNameSubscribeCard: React.FC<Props> = ({
  name,
  icon,
  shouldShowButtons,
  shouldShowTitle,
  cid,
  playlist,
  handleSubscribe,
}) => {
  const OpenURLButton = ({ url }) => {
    const handlePress = useCallback(async () => {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert(`Don't know how to open this URL: ${url}`);
      }
    }, [url]);

    return (
      <View style={{ flex: 1, marginLeft: 5, justifyContent: 'center' }}>
        <SpotifyButton onPress={handlePress} />
      </View>
    );
  };


  return (
    <View style={{ flex: 1, marginHorizontal: 20 }}>
      {shouldShowTitle ? (
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <View
              style={{
                width: 110,
                height: 110,
                borderRadius: 55,
                borderWidth: 4,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <FastImage
                style={{ width: 100, height: 100, borderRadius: 100 }}
                source={{
                  uri: icon,
                  priority: FastImage.priority.high,
                }}
                resizeMode={FastImage.resizeMode.cover}
              />
            </View>
            <View
              style={{
                flex: 1,
                marginHorizontal: 15,
                marginLeft: 30,
                justifyContent: 'center',
              }}>
              <Text28 text={name} textColor={Colors.TEXTDARK} />
            </View>
          </View>
          <View style={{ flex: 1 }}></View>
        </View>
      ) : null}

      <View style={{ flex: 1, flexDirection: 'row', marginTop: 20 }}>
        {shouldShowButtons ? (
          <View style={{ flex: 4, justifyContent: 'center' }}>
            <StyledButton text="SUBSCRIBE" onPress={handleSubscribe} />
          </View>
        ) : null}
        <OpenURLButton url={playlist} />
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <ShareButton />
        </View>
      </View>

    </View>
  );
};

export default ChallengeNameSubscribeCard;
