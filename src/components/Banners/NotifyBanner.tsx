import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-elements/dist/icons/Icon';
import { Colors } from '../../utils/colors';
import Text12Bold from '../Text/Text12Bold';

interface Props{
    text: string,
    onPress?: ()=> void,
}

const NotifyBanner: React.FC<Props> = ({ text, onPress }) => {

//State variables

//Async functions

//Component functions

return <View style={styles.emailNotVerifiedBanner}>
    <Icon name="warning" size={14} color="#E4252D" style={{marginRight: 5}} />
    <TouchableOpacity onPress={onPress}>
        <Text12Bold text={text} textColor={Colors.TEXTDARK} textStyle={{textDecorationLine: 'underline'}} />
    </TouchableOpacity>
</View>
}

export default NotifyBanner;

const styles = StyleSheet.create({
    emailNotVerifiedBanner: {
      backgroundColor: '#F9EEA0',
      borderRadius: 5,
      width: '100%',
      marginBottom: 20,
      marginTop: -10,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 7,
    }
  })