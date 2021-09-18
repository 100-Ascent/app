import React from 'react';
import { TouchableOpacity } from 'react-native';
import { View } from 'react-native';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { Colors } from '../../utils/colors';
import Text16Normal from '../Text/Text16Normal';

const DescriptionCard = ({ onPress }) => {
    return <View style={{ flex: 1, marginLeft: 15 }}>
        <TouchableOpacity onPress={onPress}>
        <View style={{ 
            flex: 1, 
            backgroundColor: Colors.DARK_LINEARGRADIENT1, 
            padding: 10, 
            justifyContent: 'center', 
            alignItems: 'center', 
            borderRadius: 10 ,
            flexDirection: 'row'
        }}>
            <View style={{ paddingRight: 10 }}>
                <Icon name="book" type="ant-design" color={Colors.WHITE}/>
            </View>
            <View style={{ }}>
                <Text16Normal text="Description" textColor={Colors.TEXT} />
            </View>            
        </View>
        </TouchableOpacity>
    </View>
}

export default DescriptionCard;