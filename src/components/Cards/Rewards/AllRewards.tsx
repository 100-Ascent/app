import {StyleSheet, View} from 'react-native';

import {Colors} from '../../../utils/colors';
import { FONTS } from '../../../utils/constants/fonts';
import FastImage from 'react-native-fast-image';
import {NO_REWARDS_TEXT} from '../../../utils/constants/constants';
import React from 'react';
import Text14 from '../../Text/Text14';
import Text16Normal from '../../Text/Text16Normal';
import {TouchableOpacity} from 'react-native-gesture-handler';

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
    <View style={{ flex: 1, marginHorizontal: 20, borderRadius: 20, paddingBottom: 5, 
      backgroundColor: data.length ===0 ? Colors.TEXT : Colors.TRANSPARENT, elevation:  data.length ===0 ? 2 : 0 }}>
      <View style={{flex: 1, paddingHorizontal: 10, paddingTop: 15}}>
        <Text16Normal text={'All Rewards'} textColor={Colors.TEXTDARK} textStyle={FONTS.BOLD} />
      </View>
      {data.length > 0 ? (
        <View style={{flex: 1, padding: 5}}>
          {rewards.map((row, idx) => {
            return (
              <View style={{ flex: 1, flexDirection: 'row' }} key={idx}>
                {row.map((val, idx2) => {                  
                  return val.is_passed && val.is_scratched ? (
                    <View key={idx2} style={[styles.rewardsCard, { 
                      backgroundColor: val.length === 0 ? Colors.TRANSPARENT : "#FFF",
                      elevation: val !== '' ? 3 : 0, 
                      marginRight: idx2 % 2 ? 0 : 10, 
                      marginLeft: idx2 % 2 ? 10 : 0
                      }]}>
                      <View style={{ marginHorizontal: 10, justifyContent: 'center', alignItems: 'center' }}>
                        {val !== '' ? (
                          <TouchableOpacity
                            onPress={() =>{      
                              console.log(idx * (rewards.length-1) + idx2)                      
                              onPress(idx * (rewards.length-1) + idx2)
                            }}>
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
                          textStyle={[FONTS.REGULAR,{textAlign: 'center'}]}
                          textColor={Colors.BLACK4}                          
                        />
                      </View>
                      
                    </View>
                  ) : <View style={[{ backgroundColor: val.length === 0 ? Colors.TRANSPARENT : "#FFF" },styles.rewardsCard]} />;
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

const styles = StyleSheet.create({
  rewardsCard: {
    flex: 1,             
    padding: 5,
    marginTop: 15,
    paddingTop: 20,
    borderRadius: 10,
  }
})
