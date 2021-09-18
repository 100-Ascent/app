import React from 'react';
import {Image, Text, TouchableOpacity} from 'react-native';
import {View} from 'react-native';
import {Colors} from '../../utils/colors';

interface Props {
  onPress: () => void;
  data: any;
}
const ChallengeCard: React.FC<Props> = ({onPress, data}) => {
  // console.log(data);
  return (
    <View style={{}}>
      <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: Colors.BACKGROUND,
            borderRadius: 15,
          }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal: 30,
              paddingVertical: 30,
            }}>
            <Image source={{uri: data.icon}} style={{height: 50, width: 50}} />
          </View>
          <View style={{flex: 3, justifyContent: 'center'}}>
            <View style={{justifyContent: 'center'}}>
              <Text style={{color: Colors.BLACK3}}>{data.name}</Text>
            </View>
            <View style={{justifyContent: 'center', marginTop: 10}}>
              <Text style={{color: Colors.BLACK3}}>
                {data.shortDescription}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ChallengeCard;
