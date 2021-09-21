<<<<<<< HEAD
import React, {useCallback} from 'react';
import {Alert, Linking, View} from 'react-native';
=======
import React, { useCallback } from 'react';
import { Alert, Linking, View } from 'react-native';
>>>>>>> 4c1567f4d5d598f304006891a5626a5201cd6661
import SpotifyButton from '../../Button/SpotifyButton';
import ShareButton from '../../Button/ShareButton';

import StyledButton from '../../Button/StyledButton';
import FastImage from 'react-native-fast-image';
import Text28 from '../../Text/Text28';
<<<<<<< HEAD
import {Colors} from '../../../utils/colors';
import axios from 'axios';
import {AppState} from '../../../redux';
import {useSelector} from 'react-redux';
=======
import { Colors } from '../../../utils/colors';
import axios from 'axios';
import { AppState } from '../../../redux';
import { useSelector } from 'react-redux';
>>>>>>> 4c1567f4d5d598f304006891a5626a5201cd6661

interface Props {
  name: string;
  icon: string;
  shouldShowButtons: boolean;
<<<<<<< HEAD
=======
  shouldShowTitle: boolean;
>>>>>>> 4c1567f4d5d598f304006891a5626a5201cd6661
  cid?: string;
  playlist?: string;
  handleSubscribe?: () => void;
}

const ChallengeNameSubscribeCard: React.FC<Props> = ({
  name,
  icon,
  shouldShowButtons,
<<<<<<< HEAD
=======
  shouldShowTitle,
>>>>>>> 4c1567f4d5d598f304006891a5626a5201cd6661
  cid,
  playlist,
  handleSubscribe,
}) => {
<<<<<<< HEAD
  const OpenURLButton = ({url}) => {
=======
  const OpenURLButton = ({ url }) => {
>>>>>>> 4c1567f4d5d598f304006891a5626a5201cd6661
    const handlePress = useCallback(async () => {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert(`Don't know how to open this URL: ${url}`);
      }
    }, [url]);

    return (
<<<<<<< HEAD
      <View style={{flex: 1, marginLeft: 5, justifyContent: 'center'}}>
=======
      <View style={{ flex: 1, marginLeft: 5, justifyContent: 'center' }}>
>>>>>>> 4c1567f4d5d598f304006891a5626a5201cd6661
        <SpotifyButton onPress={handlePress} />
      </View>
    );
  };

<<<<<<< HEAD
  return (
    <View style={{flex: 1, marginHorizontal: 20}}>
      <View style={{flex: 1}}>
        <View style={{flex: 1, flexDirection: 'row'}}>
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
              style={{width: 100, height: 100, borderRadius: 100}}
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
        <View style={{flex: 1}}></View>
      </View>

      {shouldShowButtons ? (
        <View style={{flex: 1, flexDirection: 'row', marginTop: 20}}>
          <View style={{flex: 4, justifyContent: 'center'}}>
            <StyledButton text="SUBSCRIBE" onPress={() => handleSubscribe()} />
          </View>
          <OpenURLButton url={playlist} />
          <View style={{flex: 1, justifyContent: 'center'}}>
            <ShareButton />
          </View>
        </View>
      ) : null}
=======

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

>>>>>>> 4c1567f4d5d598f304006891a5626a5201cd6661
    </View>
  );
};

export default ChallengeNameSubscribeCard;
