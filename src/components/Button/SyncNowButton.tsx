import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-elements/dist/icons/Icon';
import { Colors } from '../../utils/colors';
import Text12Normal from '../Text/Text12Normal';
import Text20 from '../Text/Text20';

const SyncNowButton = ({ data }) => {

    return  <View
    style={{
      borderWidth: 1,
      borderRadius: 10,
      marginTop: 15,
      marginHorizontal: 10,
      backgroundColor: Colors.TEXT
    }}>
    <TouchableOpacity activeOpacity={0.6} onPress={()=>{}}>
      <View style={{ flexDirection: 'row',}}>
        <View style={{flex: 1, paddingVertical: 10 , justifyContent: 'center' }}>
            <Icon name={data.icon} type="ionicon" size={50} color={Colors.INFO_YELLOW} />
            </View>
        <View style={{flex: 3, paddingVertical: 10, flexDirection: 'column'}}>
          <View style={{ flexDirection: 'row' }}>
            <View>
                <Text20 text={data.brand + " Sync Now"} textColor={Colors.BLACK1} />
            </View>
            <View style={{ paddingLeft: 10, justifyContent: 'flex-end' }}>
                <Icon name="refresh-ccw" type="feather" size={20} />
            </View>
          </View>
          <View style={{flexDirection: 'row' }}>
            <View style={{justifyContent: 'center'}}>
              <Text12Normal
                text={"Last Sync: " + data.date}
                textColor={Colors.BLACK1}
              />
            </View>            
          </View>
          <View style={{ flex: 1, alignItems: 'flex-end', paddingRight: 10, marginTop: 20}}>
              <Text12Normal
                text={"Available Syncs: " + 2}
                textColor={Colors.BLACK1}
              />
            </View>
        </View>
      </View>
    </TouchableOpacity>
  </View>

}

export default SyncNowButton;