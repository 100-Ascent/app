import React, {Component} from 'react';
import {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import FastImage from 'react-native-fast-image';
import {Colors} from '../../../utils/colors';
import {SUBSCRIBE_TO_CHALLENGE} from '../../../utils/constants/constants';
import StyledButton from '../../Button/StyledButton';
import Text16Bold from '../../Text/Text16Bold';
import Text16Normal from '../../Text/Text16Normal';

interface Props {
  challenges: any;
  getSelectedChallenge: any;
  handleSubscribeToAChallenge: any;
}
const SubscribedChallengeListCard: React.FC<Props> = ({
  getSelectedChallenge,
  challenges,
  handleSubscribeToAChallenge,
}) => {
  const [selectedChallenge, setSelectedChallenge] = useState(0);

  const challengeList = challenges.map((val, idx) => {
    return (
      <View
        style={{
          flex: 1,
          marginHorizontal: 20,
          borderWidth: selectedChallenge === idx ? 0 : 1,
          borderColor:
            selectedChallenge === idx ? Colors.TRANSPARENT : '#D9D9D9',
          borderRadius: 10,
          marginTop: 15,
          backgroundColor:
            selectedChallenge === idx ? Colors.BLACK5 : Colors.TEXT,
        }}
        key={idx}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            setSelectedChallenge(idx);
            getSelectedChallenge(idx);
          }}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{flex: 1, padding: 10}}>
              <FastImage
                style={{width: 60, height: 60, borderRadius: 60}}
                source={{
                  uri: val.icon,
                  priority: FastImage.priority.high,
                }}
                resizeMode={FastImage.resizeMode.cover}
              />
            </View>
            <View style={{flex: 2, justifyContent: 'center'}}>
              <Text16Normal text={val.name} textColor={Colors.TEXTDARK} />
            </View>
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <View
                style={{
                  padding: selectedChallenge === idx ? 5 : 10,
                  borderRadius: 50,
                  borderWidth: 1,
                  borderColor:
                    selectedChallenge === idx ? Colors.TRANSPARENT : '#D9D9D9',
                  backgroundColor:
                    selectedChallenge === idx ? Colors.GREEN : Colors.TEXT,
                }}>
                {selectedChallenge === idx ? (
                  <Icon name="check" size={15} color={Colors.TEXT} />
                ) : null}
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  });
  return (
    <View
      style={{
        backgroundColor: Colors.TEXT,
        borderRadius: 10,
        elevation: 2,
      }}>
      <View style={{flex: 1, paddingHorizontal: 20, paddingTop: 20}}>
        <Text16Normal text="Adding Klicks To" textColor={Colors.TEXTDARK} />
      </View>
      <View style={{flex: 1, paddingBottom: 30}}>
        {challenges.length !== 0 ? (
          challengeList
        ) : (
          <View
            style={{
              flex: 1,
              marginHorizontal: 20,
              paddingTop: 20,
            }}>
            <View style={{flex: 1, alignItems: 'center'}}>
              <Text16Normal
                text={SUBSCRIBE_TO_CHALLENGE}
                textColor={Colors.BLACK4}
              />
            </View>
            <View style={{flex: 1, marginHorizontal: 30, marginTop: 15}}>
              <StyledButton
                text="Subscribe to Challenge"
                onPress={handleSubscribeToAChallenge}
              />
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

export default SubscribedChallengeListCard;
