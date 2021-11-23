import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-elements/dist/icons/Icon';
import {Colors} from '../../../utils/colors';
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
        borderWidth: 1,
        borderRadius: 10,
        marginTop: 15,
        marginHorizontal: 10,
      }}>
      <TouchableOpacity activeOpacity={0.6} onPress={onPress}>
        <View style={{elevation: 1, flexDirection: 'row'}}>
          <View style={{flex: 2, paddingVertical: 10}}><Icon name={data.icon} type="ionicon" size={50} /></View>
          <View style={{flex: 4, paddingVertical: 10, flexDirection: 'column'}}>
            <View>
              <Text20 text={data.brand} textColor={Colors.BLACK1} />
            </View>
            <View style={{flexDirection: 'row', paddingVertical: 4}}>
              <View style={{justifyContent: 'center'}}>
                <Text16Normal
                  text={data.connected ? 'Connected' : 'Not Connected'}
                  textColor={Colors.BLACK1}
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
                    size={18}
                    color={Colors.INFO_GREEN}
                  />
                ) : (
                  <Icon
                    name="close-circle-outline"
                    type="ionicon"
                    size={18}
                    color={Colors.POPUP_RED}
                  />
                )}
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ConnectionCard;
