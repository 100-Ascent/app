import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-elements/dist/icons/Icon';
import {Colors} from '../../../utils/colors';
import Text14 from '../../Text/Text14';
import Text20 from '../../Text/Text20';
import FastImage from 'react-native-fast-image';

const AdditionalRewardsCard = ({data}) => {
  let rewards = [];
  let temp = [];
  for (let i = 0; i < data.length; i++) {
    if (i % 3 === 0 && i !== 0) {
      rewards.push(temp);
      temp = [];
      temp.push(data[i]);
    } else {
      temp.push(data[i]);
    }
  }
  if (temp.length !== 3) {
    temp.push('');
    if (temp.length === 2) {
      temp.push('');
    }
  }
  rewards.push(temp);

  return (
    <View
      style={{
        flex: 1,
        marginHorizontal: 15,
        backgroundColor: Colors.CARDS_COLOR2,
        borderRadius: 10,
        padding: 10,
      }}>
      <TouchableOpacity activeOpacity={0.8} onPress={() => {}}>
        <View
          style={{
            flex: 1,
          }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              borderColor: Colors.BLACK1,
              paddingVertical: 10,
            }}>
            <View style={{flex: 1}}>
              <Icon
                name="trophy"
                type="ionicon"
                size={25}
                color={Colors.WHITE}
              />
            </View>
            <View style={{flex: 4}}>
              <Text20 text="Additional Rewards" textColor={Colors.WHITE} />
            </View>
          </View>
        </View>

        <View style={{flex: 1}}>
          {rewards.map((row, idx) => {
            return (
              <View
                style={{flex: 1, flexDirection: 'row', marginTop: 10}}
                key={idx}>
                {row.map((val, idx2) => {
                  return (
                    <View style={{flex: 1}} key={idx2}>
                      <View
                        style={{
                          marginHorizontal: 10,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        {val !== '' ? (
                          <View
                            style={{
                              borderRadius: 70,
                              borderWidth: 1,
                              borderColor: Colors.ORANGE,
                              padding: 7,
                            }}>
                            <FastImage
                              style={{width: 70, height: 70, borderRadius: 70}}
                              source={{
                                uri: val.icon,
                                priority: FastImage.priority.high,
                              }}
                              resizeMode={FastImage.resizeMode.cover}
                            />
                          </View>
                        ) : null}
                      </View>
                      <View
                        style={{
                          flex: 1,
                          justifyContent: 'center',
                          alignItems: 'center',
                          paddingHorizontal: 10,
                          marginTop: 10,
                        }}>
                        <Text14 text={val.title} textColor={Colors.BLACK4} />
                      </View>
                    </View>
                  );
                })}
              </View>
            );
          })}

          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: 15,
            }}>
            <Text20 text={'Coming Soon!'} textColor={Colors.BLACK4} />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default AdditionalRewardsCard;
