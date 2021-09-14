import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Colors} from '../../../utils/colors';
import StyledButton from '../../Button/StyledButton';
import MileStoneIcon from '../../../../assets/icons/milestone-icon.svg';
import DoubleDistanceIcon from '../../../../assets/icons/double-distance-icon.svg';
import Text24 from '../../Text/Text24';
import Text16Normal from '../../Text/Text16Normal';
import Text20 from '../../Text/Text20';
import CityCarousal from '../../Carousals/CityCarousal';
import FastImage from 'react-native-fast-image';

const CarousalCard = ({onPress, data, handleSubscribe}) => {
  return (
    <View
      style={{
        flex: 1,
        marginHorizontal: 20,
        marginTop: 5,
        backgroundColor: Colors.TEXT,
        borderRadius: 10,
        elevation: 2,
      }}>
      <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
        <View
          style={{
            height: '40%',
            flexDirection: 'row',
            borderRadius: 10,
          }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal: 10,
              marginLeft: 20,
              borderRadius: 100,
            }}>
            <FastImage
              style={{
                width: 100,
                height: 100,
                borderRadius: 100,
                borderWidth: 3,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              source={{
                uri: data.icon,
                priority: FastImage.priority.high,
              }}
              resizeMode={FastImage.resizeMode.cover}
            />
          </View>
          <View style={{flex: 3, paddingHorizontal: 20, marginTop: 20}}>
            <View style={{flex: 1, justifyContent: 'center'}}>
              <Text24 text={data.name} />
            </View>
            <View style={{flex: 1, marginRight: 15, marginTop: 15}}>
              <StyledButton
                text={'SUBSCRIBE'}
                onPress={() => handleSubscribe(data.id)}
              />
            </View>
          </View>
        </View>

        <View style={{height: '10%'}}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{flex: 1, flexDirection: 'row', marginHorizontal: 20}}>
              <View style={{}}>
                <MileStoneIcon />
              </View>
              <View style={{marginLeft: 10}}>
                <Text24
                  text={data.milestones}
                  textStyle={{fontWeight: 'bold'}}
                />
              </View>
              <View style={{marginLeft: 10, marginTop: 7}}>
                <Text16Normal text={'Milestones'} textColor={Colors.TEXTDARK} />
              </View>
            </View>
            <View style={{flex: 1, flexDirection: 'row', marginHorizontal: 20}}>
              <View style={{}}>
                <DoubleDistanceIcon />
              </View>
              <View style={{marginLeft: 10}}>
                <Text24 text={data.distance} textStyle={{fontWeight: 'bold'}} />
              </View>
              <View style={{marginLeft: 10, marginTop: 7}}>
                <Text16Normal text={'km'} textColor={Colors.TEXTDARK} />
              </View>
            </View>
          </View>
        </View>
        <View style={{height: '55%', marginTop: 10}}>
          <View style={{flex: 1, marginLeft: 15}}>
            <Text20
              text={'Cities you will explore'}
              textColor={Colors.TEXTDARK}
            />
          </View>
          <View style={{flex: 4}}>
            <CityCarousal data={data.cities} onPress={() => {}} />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CarousalCard;
