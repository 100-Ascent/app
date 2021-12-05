import moment from 'moment';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-elements/dist/icons/Icon';
import FastImage from 'react-native-fast-image';
import syncNowStyles from '../../styles/MyProfileScreen/SyncNowCard';
import { Colors } from '../../utils/colors';
import Background from '../Background/StyledBackground';
import Text12Normal from '../Text/Text12Normal';
import Text20 from '../Text/Text20';

const SyncNowButton = ({ data, token, handleRedirectToConnect, handleSyncData, isConnected }) => {
  
    return  <View
    style={{
      marginTop: 15,
      marginHorizontal: 10
    }}>
    <TouchableOpacity style={{flexDirection: 'row', justifyContent: 'flex-end'}} activeOpacity={0.9} onPress={isConnected ? handleSyncData: handleRedirectToConnect}>
      <View style={syncNowStyles.logoView}>
          { isConnected ? <FastImage
                style={{
                  width: 60,
                  height: 60,
                }}
                source={{
                  uri: data.icon,
                  priority: FastImage.priority.high,
                }}
                resizeMode={FastImage.resizeMode.cover}
            /> : <Icon name="fitness" type="ionicon" size={45} color={Colors.POPUP_RED} tvParallaxProperties={undefined} />}
      </View>
        <View style={syncNowStyles.cardContainer}>            
        <Background style={{paddingVertical: 10, borderRadius: 10, elevation: 5, alignItems: 'flex-end'}} startColor={'#161616'} endColor={'#4A364E'}>
          <View style={syncNowStyles.contentView}>
            <View style={{ flexDirection: 'row' }}>
              <View>
                  <Text20 text={ isConnected ? data.display_name + " Sync Now" : "No Active Connection"} textColor={Colors.GREY_LIGHT} />
              </View>
              {/* <View style={{ paddingLeft: 10, justifyContent: 'flex-end' }}>
                  <Icon name="refresh-ccw" type="feather" size={20} color={Colors.GREY_LIGHT} tvParallaxProperties={undefined} />
              </View> */}
            </View>
            <View style={{flexDirection: 'row' }}>
              <View style={{justifyContent: 'center'}}>
                <Text12Normal
                  text={ !isConnected ? 
                    "Connect Now to sync your fitness data" : 
                    "Last Sync: " + ( data.last_sync_date ? new Date(data.last_sync_date).toLocaleString() : "No data synced yet" )}
                  textColor={'#ddd'}
                />
              </View>            
            </View>
            <View style={{ flex: 1, display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', paddingRight: 20, marginTop: 20, width: '100%'}}>
              <View style={{marginHorizontal: 10, justifyContent: 'flex-end' }}>
                  { isConnected ? <Icon name="refresh-ccw" type="feather" size={12} color={Colors.GREY_LIGHT} tvParallaxProperties={undefined} /> : null }
                </View>
                <Text12Normal
                  text={ isConnected ? "Available Syncs: " + data.sync_count : "" }
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