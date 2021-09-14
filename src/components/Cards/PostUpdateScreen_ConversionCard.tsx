import React from 'react';
import { View } from 'react-native';
import { Colors } from '../../utils/colors';
import Text14 from '../Text/Text14';

const ConversionCard = () => {
    return <View style={{ marginHorizontal: 20, backgroundColor: Colors.DARK_LINEARGRADIENT1, padding: 20, borderRadius: 10 }}>
        <Text14 text="52km"/>
    </View>
}

export default ConversionCard;