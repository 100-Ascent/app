import {Colors} from '../../utils/colors';
import FastImage from 'react-native-fast-image';
import {ScrollView as GestureHandlerScrollView} from 'react-native-gesture-handler';
import React from 'react';
import Text14 from '../Text/Text14';
import {TouchableOpacity} from 'react-native';
import {View} from 'react-native';

const CityCarousal = ({onPress, data}) => {
  
  const rewards = data.map((val, idx) => {
    return (
      <View style={{ flex: 1, paddingHorizontal: 5 }} key={idx}>
        <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
          <View style={{ alignItems: 'center' }}>
            <View style={{ marginHorizontal: 5, borderWidth: 2, borderColor: Colors.BLACK2, borderRadius: 60, padding: 3 }}>
              <FastImage 
                style={{ width: 60, height: 60, borderRadius: 60 }}
                source={{ uri: val.icon, priority: FastImage.priority.high }}
                resizeMode={FastImage.resizeMode.cover}
              />
            </View>
          </View>
          <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 5 }}>
            <Text14 text={val.name} textColor={Colors.TEXTDARK} textStyle={{ textAlign: 'center' }} />
          </View>
        </TouchableOpacity>
      </View>
    );
  });

  return (
    <View style={{flex: 1}}>
      <GestureHandlerScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={5}
        nestedScrollEnabled
        style={{paddingLeft: 10}}
        onScroll={() => {}}>
        {rewards}
        <View style={{padding: 5}} />
      </GestureHandlerScrollView>
    </View>
  );
};

export default CityCarousal;
