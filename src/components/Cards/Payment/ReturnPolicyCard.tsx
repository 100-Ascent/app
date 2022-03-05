import { StyleSheet, View } from 'react-native';

import { Colors } from '../../../utils/colors';
import { FONTS } from '../../../utils/constants/fonts';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import React from 'react'
import Text14 from '../../Text/Text14';
import Text16Normal from '../../Text/Text16Normal';
import Text18 from '../../Text/Text18';
import Text30 from '../../Text/Text30';

interface Props{
    policy: Object
}

const ReturnPolicyCard: React.FC<Props> = ({ policy }) => {

//State variables

//Async functions

//Component functions

return <View style={styles.container}>
    <View style={styles.icon}>
        <Icon name="replay" type='material-icons' color={Colors.POPUP_RED} size={40} />
    </View>
    <View style={styles.contentContainer}>
        <View style={styles.header}>
            <Text16Normal text={policy["header"]} textColor={Colors.TEXTDARK} textStyle={FONTS.BOLD}  />
        </View>
        <View style={styles.description}>
            <Text14 text={policy["description"]} textColor={Colors.TEXTDARK} textStyle={[FONTS.REGULAR]}  />
        </View>
        <View style={styles.moreDetails}>
            <Text14 text={"More Details"} textColor={Colors.TEXTDARK} textStyle={[FONTS.SEMIBOLD, {textDecorationLine: 'underline'} ]} />
        </View>
    </View>
   
</View>;
}

export default ReturnPolicyCard;

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.TEXT,
        marginHorizontal: 20, 
        borderRadius: 20, 
        flexDirection:'row',
    },
    icon: {
        width: '20%',
        justifyContent: 'center',
        alignItems: 'center'
    }, 
    contentContainer: {
        width: '80%',
        paddingVertical: 10,
    },
    header: {

    },
    description: {
        paddingVertical: 4,
    },
    moreDetails: {
        paddingVertical: 4
    }
})