import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {Colors} from '../../utils/colors';
import Text20 from '../Text/Text20';
import FastImage from 'react-native-fast-image';
import Text28 from '../Text/Text28';
import Text16Bold from '../Text/Text16Bold';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import CalorieCard from '../DistanceComponent/CalorieCard';
import TimeCard from '../DistanceComponent/TimeCard';
import FootCard from '../DistanceComponent/FootCard';
import DistanceTotalCard from '../DistanceComponent/DistanceTotalCard';
import FitnessCard from '../DistanceComponent/FitnessCard';
import CommentCard from '../DistanceComponent/CommentCard';
import Text16Normal from '../Text/Text16Normal';

const DistanceCard = ({data, onRightPress, onLeftPress, current, total}) => {
  return (
    <View style={{flex: 1}}>
      <View
        style={{
          flex: 1,
          marginHorizontal: 20,
          borderRadius: 10,
          backgroundColor: Colors.TEXT,
          paddingHorizontal: 20,
          paddingVertical: 10,
          elevation: 10,
        }}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <View style={{flex: 1}}>
            <View
              style={{
                justifyContent: 'center',
                alignContent: 'center',
              }}>
              <View
                style={{
                  borderRadius: 80,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <FastImage
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 80,
                    borderWidth: 2,
                    borderColor: Colors.POPUP_GREY,
                  }}
                  source={{
                    uri: data.activity.icon,
                    priority: FastImage.priority.high,
                  }}
                  resizeMode={FastImage.resizeMode.cover}
                />
              </View>
            </View>
          </View>
          <View style={{flex: 1, paddingLeft: 10}}>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <View style={{justifyContent: 'center'}}>
                <Text28 text={data.distance + ' '} textColor={Colors.YELLOW} />
              </View>
              <View style={{justifyContent: 'center', marginTop: 7}}>
                <Text16Normal text="Klicks" textColor={Colors.POPUP_RED} />
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  marginTop: 10,
                  marginLeft: 5,
                }}>
                <Icon name="help-circle-outline" type="ionicon" size={14} />
              </View>
            </View>
            <View style={{flex: 1}}>
              <View style={{justifyContent: 'center'}}>
                <Text16Bold
                  text={data.activity.name}
                  textColor={Colors.TEXTDARK}
                />
              </View>
            </View>
          </View>
          <View style={{flex: 1}}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'flex-end',
              }}>
              <View style={{}}>
                <Icon name="edit" type="material-icons" />
              </View>
              <View style={{}}>
                <Icon name="delete" type="MaterialIcons" color={'#AF3F34'} />
              </View>
            </View>
            <View style={{flex: 1, alignItems: 'flex-end'}}>
              <Icon name="share" />
            </View>
          </View>
        </View>
        <View style={{padding: 15}} />
        <View style={{flex: 1, marginHorizontal: 10, marginVertical: 7}}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <CalorieCard calorie={data.calorie} />
            <TimeCard time={data.min} />
          </View>
        </View>
        <View style={{flex: 1, marginHorizontal: 10, marginVertical: 7}}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <FootCard steps={data.steps} />
            <DistanceTotalCard data={data.data} isDistance={data.is_distance} />
          </View>
        </View>
        <View style={{flex: 1, marginHorizontal: 10, marginVertical: 7}}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <FitnessCard isGoogleFit={false} />
            <View style={{flex: 1}} />
          </View>
        </View>
        <View style={{flex: 1, marginHorizontal: 10, marginVertical: 7}}>
          <CommentCard comment={data.comment} />
        </View>
        <View
          style={{
            flex: 1,
            marginHorizontal: 10,
            marginVertical: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <TouchableOpacity disabled={current === 0} onPress={onLeftPress}>
              <View style={{justifyContent: 'center'}}>
                <Icon
                  name="chevron-thin-left"
                  type="entypo"
                  color={current === 0 ? Colors.BLACK5 : '#333333'}
                />
              </View>
            </TouchableOpacity>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginHorizontal: 10,
              }}>
              <Text16Normal text={current + 1} textColor={Colors.TEXTDARK} />
              <Text16Normal text={'/'} textColor={Colors.TEXTDARK} />
              <Text16Normal text={total} textColor={Colors.TEXTDARK} />
            </View>
            <TouchableOpacity
              disabled={current === total - 1}
              onPress={onRightPress}>
              <View style={{justifyContent: 'center'}}>
                <Icon
                  name="chevron-thin-right"
                  type="entypo"
                  color={current === total - 1 ? Colors.BLACK5 : '#333333'}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default DistanceCard;
