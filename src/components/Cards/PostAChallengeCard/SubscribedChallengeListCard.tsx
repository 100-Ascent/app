import {ToastAndroid, TouchableOpacity, View} from 'react-native';

import {Colors} from '../../../utils/colors';
import FastImage from 'react-native-fast-image';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import React from 'react';
import {SUBSCRIBE_TO_CHALLENGE} from '../../../utils/constants/constants';
import StyledButton from '../../Button/StyledButton';
import Text16Normal from '../../Text/Text16Normal';

interface Props {
  selectedDate: any;
  challenges: any;
  handleSubscribeToAChallenge?: any;
  handleSelectedChallenges?: (idx: number) => void,
}

const SubscribedChallengeListCard: React.FC<Props> = ({
  selectedDate,
  challenges,
  handleSubscribeToAChallenge,
  handleSelectedChallenges,
}) => {

  const challengeList = challenges.map((val, idx) => {
    const isDisabled = new Date(selectedDate) < new Date(val.date_joined);
    return (
      <View key={idx} style={{  flex: 1, marginHorizontal: 20, borderRadius: 10, marginTop: 15,
          borderWidth: isDisabled? 1 : val.is_attach || val.isSelected ? 0 : 1,
          borderColor: val.is_attach ||  val.isSelected ? Colors.TRANSPARENT : '#D9D9D9',
          backgroundColor: isDisabled ? Colors.INFO_GREY_LIGHT : val.is_attach || val.isSelected ? Colors.BLACK5 : Colors.TEXT,
        }}>
        <TouchableOpacity disabled={isDisabled} activeOpacity={0.8} onPress={() => { handleSelectedChallenges(idx) }}>
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
              <View style={{ borderRadius: 50, borderWidth: 1,
                  padding: isDisabled ? 5 : val.is_attach || val.isSelected ? 5 :  10,
                  borderColor: isDisabled ? '#D9D9D9' : val.is_attach || val.isSelected ? Colors.TRANSPARENT : '#D9D9D9',
                  backgroundColor: isDisabled ? Colors.INFO_GREY_LIGHT : val.is_attach || val.isSelected ? Colors.GREEN : Colors.TEXT,
                }}>
                { isDisabled ?  <Icon name="cross" type='entypo' size={15} color={Colors.POPUP_RED} /> : val.is_attach || val.isSelected ? (
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
