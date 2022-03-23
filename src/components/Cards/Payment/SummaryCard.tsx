import { StyleSheet, View } from 'react-native';

import { Colors } from '../../../utils/colors';
import { FONTS } from '../../../utils/constants/fonts';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import React from 'react'
import Text14 from '../../Text/Text14';
import Text16Normal from '../../Text/Text16Normal';
import Text30 from '../../Text/Text30';

interface Props{
    data: Object;
    currency: string
}

const SummaryCard: React.FC<Props> = ({ data, currency }) => {

//State variables

//Async functions

//Component functions

return <View style={styles.container}>
    <View style={styles.price}>
        <Text30 text={currency} textColor={Colors.INFO_GREY} containerStyle={{ paddingHorizontal: 5 }}/>
        <Text30 text={data["discountedPrice"]} textColor={Colors.TEXTDARK} />
        <Text16Normal 
            text={currency + data["originalPrice"]} 
            textColor={Colors.POPUP_RED} 
            containerStyle={{ paddingTop: 7, paddingLeft: 7 }} 
            textStyle={{ textDecorationLine: 'line-through', textDecorationStyle: 'solid' }}
        />        
    </View>
    <View style={styles.pointContainer}>
        {
            data["benefits"].map((val, idx) =>{
                return <View style={{ flexDirection: 'row', paddingVertical: 3 }}>
                    <View style={{ paddingHorizontal: 15 }}>
                        { val.available ?  
                            <Icon name="check" type='ionicons' color={Colors.INFO_GREEN} /> :  
                            <Icon name="cross" type='entypo' color={Colors.POPUP_RED} />
                        }
                    </View>
                    <View>
                        <Text14 text={val.point} textColor={Colors.TEXTDARK} textStyle={FONTS.REGULAR} />
                    </View>
                </View>
            })
        }
    </View>
   
</View>;
}

export default SummaryCard;

const styles = StyleSheet.create({
    container: { 
        elevation: 3,
        backgroundColor: Colors.TEXT,
        marginHorizontal: 20, 
        borderRadius: 20, 
    },
    price: {
        flexDirection: 'row',
        paddingHorizontal: 15,
        paddingTop: 10,
    }, 
    pointContainer: {
        marginVertical: 15,
        marginLeft: 10
    }
})