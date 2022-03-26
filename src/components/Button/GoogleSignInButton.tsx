import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Colors} from '../../utils/colors';
import Text16Normal from '../Text/Text16Normal';
import GoogleIcon from '../../../assets/icons/google-icon.svg';
import { shadowStyles } from '../../styles/Global/styles';

interface Props {
  onPress: () => void;
}

const GoogleSignInButton: React.FC<Props> = ({onPress}) => {
  //State variables

  //Async functions

  //Component functions

  return (
    <View style={ shadowStyles.shadowElevation3}>
      <TouchableOpacity
        activeOpacity={0.8}
        disabled={false}
        onPress={onPress}
        style={{
          overflow: 'hidden',
          backgroundColor: Colors.TEXT,
          borderRadius: 10,
          elevation: 3,
        }}>
        <View
          style={[
            {
              backgroundColor: Colors.TEXT,
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: 10,
              flexDirection: 'row',
            },
          ]}>
          <View style={{}}>
            <GoogleIcon />
          </View>
          <View style={{paddingLeft: 10}}>
            <Text16Normal
              text={'Sign in with Google'}
              textColor={Colors.TEXTDARK}
              textStyle={{fontFamily: 'Quicksand-SemiBold'}}
            />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default GoogleSignInButton;
