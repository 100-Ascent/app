import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-elements/dist/icons/Icon';
import { SvgUri } from 'react-native-svg';
import syncNowStyles from '../../../styles/MyProfileScreen/SyncNowCard';
import {Colors} from '../../../utils/colors';
import Background from '../../Background/StyledBackground';
import Text12Normal from '../../Text/Text12Normal';
import Text16Normal from '../../Text/Text16Normal';
import Text20 from '../../Text/Text20';

interface Props {
  data: any;
  onPress?: () => void;
}

const ConnectionCard: React.FC<Props> = ({data, onPress}) => {
  //State variables

  //Async functions

  //Component functions

  return (

    <View
      style={{
        marginTop:30,
        marginHorizontal: 10
      }}>
      <TouchableOpacity style={{flexDirection: 'row', justifyContent: 'flex-end'}} activeOpacity={0.9} onPress={onPress}>
        <View style={[syncNowStyles.logoView, {top: -5, height: 90, width: 90}]}>
            <SvgUri
              width={50}
              height={50}
              uri={data.icon}
            />
        </View>
          <View style={syncNowStyles.cardContainer}>
          <Background style={{paddingVertical: 10, borderRadius: 10, elevation: 5, alignItems: 'flex-end'}} startColor={'#161616'} endColor={'#4A364E'}>
            <View style={[syncNowStyles.contentView, {height: 60, justifyContent: 'center', elevation: 100, paddingLeft: 35}]}>
              <View style={{ flexDirection: 'row', marginTop: -3 }}>
                <View>
                    <Text20 text={data.brand} textColor={Colors.GREY_LIGHT} />
                </View>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center' }}>
                <View style={{justifyContent: 'center'}}>
                  <Text12Normal
                    text={data.connected ? 'Connected' : 'Not Connected'}
                    textColor={'#ddd'}
                  />
                </View> 
                <View
                style={{
                  marginTop: 4,
                  marginLeft: 8,
                  justifyContent: 'flex-end',
                  alignItems: 'flex-start',
                }}>
                {data.connected ? (
                  <Icon
                      name="checkmark-circle-outline"
                      type="ionicon"
                      size={14}
                      color={Colors.INFO_GREEN} tvParallaxProperties={undefined}                  />
                ) : (
                  <Icon
                        name="close-circle-outline"
                        type="ionicon"
                        size={14}
                        color={Colors.POPUP_RED} tvParallaxProperties={undefined}                  />
                )}
              </View>           
              </View>
            </View>
          </Background>
          </View>
      </TouchableOpacity>
    </View>
  );
};

export default ConnectionCard;
