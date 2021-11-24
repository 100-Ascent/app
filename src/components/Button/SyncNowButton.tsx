import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-elements/dist/icons/Icon';
import FastImage from 'react-native-fast-image';
import { SvgUri } from 'react-native-svg';
import syncNowStyles from '../../styles/MyProfileScreen/SyncNowCard';
import { Colors } from '../../utils/colors';
import Background from '../Background/StyledBackground';
import Text12Normal from '../Text/Text12Normal';
import Text20 from '../Text/Text20';

const SyncNowButton = ({ data, token}) => {
    return  <View
    style={{
      marginTop: 15,
      marginHorizontal: 10
    }}>
    <TouchableOpacity style={{flexDirection: 'row', justifyContent: 'flex-end'}} activeOpacity={0.9} onPress={()=>{}}>
      <View style={syncNowStyles.logoView}>
          <SvgUri
            width={50}
            height={50}
            uri={data.icon}
          />
      </View>
        <View style={syncNowStyles.cardContainer}>
          {/* <View style={{flex: 3, paddingVertical: 10, flexDirection: 'column'}}> */}
            
        <Background style={{paddingVertical: 10, borderRadius: 10, elevation: 5, alignItems: 'flex-end'}} startColor={'#161616'} endColor={'#4A364E'}>
          <View style={syncNowStyles.contentView}>
            <View style={{ flexDirection: 'row' }}>
              <View>
                  <Text20 text={data.brand + " Sync Now"} textColor={Colors.GREY_LIGHT} />
              </View>
              {/* <View style={{ paddingLeft: 10, justifyContent: 'flex-end' }}>
                  <Icon name="refresh-ccw" type="feather" size={20} color={Colors.GREY_LIGHT} tvParallaxProperties={undefined} />
              </View> */}
            </View>
            <View style={{flexDirection: 'row' }}>
              <View style={{justifyContent: 'center'}}>
                <Text12Normal
                  text={"Last Sync: " + data.date}
                  textColor={'#ddd'}
                />
              </View>            
            </View>
            <View style={{ flex: 1, display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', paddingRight: 20, marginTop: 20, width: '100%'}}>
              <View style={{marginHorizontal: 10, justifyContent: 'flex-end' }}>
                    <Icon name="refresh-ccw" type="feather" size={12} color={Colors.GREY_LIGHT} tvParallaxProperties={undefined} />
                </View>
                <Text12Normal
                  text={"Available Syncs: " + 2}
                  textColor={Colors.GREY_LIGHT}
                />
            </View>
          </View>
        </Background>
        </View>
    </TouchableOpacity>
  </View>

}

export default SyncNowButton;