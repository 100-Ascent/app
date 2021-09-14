import React from 'react';
import {View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Colors} from '../../../utils/colors';
import Text14 from '../../Text/Text14';
import Text16Normal from '../../Text/Text16Normal';

const AllRewards = ({data}) => {
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
      <View style={{flex: 1}}>
        {rewards.map((row, idx) => {
          return (
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                paddingVertical: 10,
              }}
              key={idx}>
              {row.map((val, idx2) => {
                return (
                  <View
                    style={{
                      flex: 1,
                      elevation: val !== '' ? 1 : 0,
                      backgroundColor: Colors.TEXT,
                      marginHorizontal: 15,
                      padding: 5,
                    }}
                    key={idx2}>
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
                      <Text14
                        text={val.title}
                        textStyle={{textAlign: 'center'}}
                        textColor={Colors.BLACK4}
                      />
                    </View>
                  </View>
                );
              })}
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default AllRewards;
