import React from 'react'
import { Switch, View } from 'react-native';
import { isIOS } from 'react-native-elements/dist/helpers';
import { Colors } from '../../../utils/colors';
import Text12Normal from '../../Text/Text12Normal';
import Text16Normal from '../../Text/Text16Normal';

const ToggleCard = ({data , toggleSwitch}) => {
    return <View style={{ backgroundColor: Colors.TEXT, elevation: 3, borderRadius: 10, paddingBottom: 20 }}>
      {data.map((val, idx) => {
        return (
          <View key={idx}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                marginHorizontal: 30,
                paddingTop: 20,
                paddingHorizontal: 0
              }}>
              <View style={{ flex: 3, }}>
                <View>
                  <Text16Normal
                    text={val.name}
                    textColor={Colors.TEXTDARK} />
                </View>
                <View>
                  <Text12Normal
                    text={val.description}
                    textColor={Colors.TEXTDARK} />
                </View>
              </View>
              <View style={[{ flex: 1 }, isIOS? { alignItems: 'flex-end' } : { } ]}>
                <View>
                  <Switch
                    trackColor={{ false: Colors.BLACK2, true: Colors.POPUP_RED }}
                    thumbColor={val.active ? '#f4f3f4' : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={()=>toggleSwitch(val.group,idx)}
                    value={val.active}
                  />
                </View>
              </View>
            </View>
          </View>
        );
      })}
    </View>;
  }

export default ToggleCard;