import React from 'react';
import {View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Colors} from '../../../utils/colors';
import {NO_REWARDS_TEXT} from '../../../utils/constants';
import Text14 from '../../Text/Text14';
import Text16Normal from '../../Text/Text16Normal';

const AllRewards = ({data, isRewardToUnlock, onPress}) => {
  let rewards = [];
  let temp = [];
  for (let i = 0; i < data.length; i++) {
    if (i % 2 === 0 && i !== 0) {
      rewards.push(temp);
      temp = [];
      temp.push(data[i]);
    } else {
      temp.push(data[i]);
    }
  }

  if (temp.length !== 2) {
    temp.push('');
    if (temp.length === 1) {
      temp.push('');
    }
  }
  rewards.push(temp);

  return (
    <View
      style={{
        flex: 1,
        marginHorizontal: 20,
        backgroundColor: Colors.TEXT,
        borderRadius: 10,
        elevation: 2,
        paddingBottom: 5,
      }}>
      <View style={{flex: 1, paddingHorizontal: 20, paddingTop: 15}}>
        <Text16Normal text={'All Rewards'} textColor={Colors.TEXTDARK} />
      </View>
      {data.length > 0 ? (
        <View style={{flex: 1, padding: 5}}>
          {rewards.map((row, idx) => {
            return (
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                }}
                key={idx}>
                {row.map((val, idx2) => {
                  return val.is_passed && val.is_scratched ? (
                    <View
                      style={{
                        flex: 1,
                        elevation: val !== '' ? 1 : 0,
                        backgroundColor: Colors.TEXT,
                        marginHorizontal: 15,
                        padding: 5,
                        marginTop: 15,
                      }}
                      key={idx2}>
                      <View
                        style={{
                          marginHorizontal: 10,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        {val !== '' ? (
                          <TouchableOpacity
                            onPress={() =>
                              onPress(idx * rewards.length + idx2)
                            }>
                            <View
                              style={{
                                borderRadius: 70,
                                borderWidth: 1,
                                borderColor: Colors.ORANGE,
                                padding: 7,
                              }}>
                              <FastImage
                                style={{
                                  width: 70,
                                  height: 70,
                                  borderRadius: 70,
                                }}
                                source={{
                                  uri: val.icon,
                                  priority: FastImage.priority.high,
                                }}
                                resizeMode={FastImage.resizeMode.cover}
                              />
                            </View>
                          </TouchableOpacity>
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
                        <Text14
                          text={val.title}
                          textStyle={{textAlign: 'center'}}
                          textColor={Colors.BLACK4}
                        />
                      </View>
                    </View>
                  ) : null;
                })}
              </View>
            );
          })}
        </View>
      ) : (
        <View style={{flex: 1, padding: 5}}>
          <View style={{padding: 10}}>
            <Text16Normal text={NO_REWARDS_TEXT} textColor={Colors.BLACK1} />
          </View>
        </View>
      )}
    </View>
  );
};

export default AllRewards;
