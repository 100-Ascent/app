import React from 'react';
import { View } from "react-native";
import { Icon } from "react-native-elements/dist/icons/Icon";
import { Colors } from "../../utils/colors";
import Text20 from "../Text/Text20";


const RewardsCardHeader = () => {
    return  <View style={{
        flex: 1,
        flexDirection: 'row',
        borderColor: Colors.BLACK1,
        paddingVertical: 10
    }}>
        <View style={{ flex: 1 }}>
            <Icon name="trophy" type="ionicon" size={25} color={Colors.WHITE} />
        </View>
        <View style={{ flex: 4 }}>
            <Text20 text="Rewards" textColor={Colors.WHITE} />
        </View>
        <View style={{ flex: 1 }}>
            <Icon name="chevron-forward" type="ionicon" size={25} color={Colors.WHITE} />
        </View>
    </View>
}

export default RewardsCardHeader;