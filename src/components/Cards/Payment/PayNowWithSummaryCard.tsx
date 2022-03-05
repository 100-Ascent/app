import React, { useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { Colors } from '../../../utils/colors';
import { FONTS } from '../../../utils/constants/fonts';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import Text14 from '../../Text/Text14';
import Text16Normal from '../../Text/Text16Normal';
import Text18 from '../../Text/Text18';
import Text30 from '../../Text/Text30';

interface Props{
    summary: Object,
    isDisabled: boolean;
    onPress: ()=> void;
}

const PayNowWithSummaryCard: React.FC<Props> = ({ summary, isDisabled, onPress }) => {

//State variables
const [isExpanded, setIsExpanded] = useState(false);
//Async functions

//Component functions

return <View style={styles.container}>
    <View style={styles.expandableContainer}>
        <TouchableOpacity activeOpacity={0.6} onPress={()=> setIsExpanded(!isExpanded)} >
            <View style={[styles.summary, { paddingBottom: isDisabled ? 0 : 15 }]}>
                <Text16Normal text={"Summary"} textColor={Colors.TEXTDARK} textStyle={FONTS.SEMIBOLD} />
                <Icon type="material" name={ isExpanded ? "expand-more": "expand-less" } color={Colors.INFO_GREEN} size={25} />
            </View>
        </TouchableOpacity>
        <View style={styles.expandedContainer} >
            {
                isExpanded ? summary['payments'].map((val,idx)=>{
                    return ( 
                    <View style={styles.listContainer}>
                        <Text14 
                            text={val.name} 
                            textColor={Colors.TEXTDARK} 
                            textStyle={FONTS.REGULAR} 
                            containerStyle={{  width: '60%' }} 
                        />
                        <View style={styles.paymentValues}>
                            { 
                                val.type !== "coupon" ? <Text14 text={val.originalPrice} textColor={Colors.POPUP_RED} textStyle={FONTS.REGULAR} /> : null 
                            }
                            <Text14 
                                text={val.discountedPrice} 
                                textColor={ val.type === "coupon" ? Colors.BLUE : Colors.TEXTDARK}
                                 containerStyle={{ paddingLeft: val.type !== "coupon" ? 10 : 0 }} 
                                 textStyle={FONTS.REGULAR} 
                            />
                        </View>
                    </View>
                )}) : null 
            }
            { 
                isExpanded ? <View style={[styles.grandTotal,{ paddingBottom : isDisabled? 0 : 10 }]}>
                    <Text16Normal text={"Grand Total"} textColor={Colors.TEXTDARK} textStyle={FONTS.SEMIBOLD} />
                    <Text16Normal text={summary['total']} textColor={Colors.TEXTDARK} textStyle={FONTS.SEMIBOLD} />
                </View> : null 
            }
        </View>
        { isDisabled ? <View style={styles.error}>       
            <Icon type="material-icons" name={ "info" } color={Colors.INFO_YELLOW} size={20} />
            <Text14 
                text={"Please confirm address to proceed"} 
                textColor={Colors.TEXTDARK} 
                containerStyle={{ paddingLeft: 7 }} 
                textStyle={FONTS.REGULAR}
            />
        </View> : null }
    </View>
    <TouchableOpacity activeOpacity={0.8} onPress={onPress} disabled={isDisabled}>
        <View style={[styles.payNowContainer, { backgroundColor: isDisabled? "#A5A5A5" : Colors.POPUP_RED } ]}>
            <Text18 text={"Pay " + summary['total']} textColor={Colors.TEXT} textStyle={FONTS.SEMIBOLD} />
        </View>
    </TouchableOpacity>
</View>;
}

export default PayNowWithSummaryCard;

const styles = StyleSheet.create({
    container: { 
        elevation: 10,
        backgroundColor: Colors.TEXT,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    expandableContainer: {
        backgroundColor: Colors.TEXT,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    summary: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 15,
        paddingHorizontal: 15
    },
    error: {
        flexDirection: 'row',
        paddingTop: 10,
        paddingBottom: 10,
        paddingHorizontal: 15,
    },
    expandedContainer: {
    },
    payNowContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15
    },
    listContainer: { 
        flexDirection: 'row', 
        marginHorizontal: 15,
        paddingTop: 3
    },
    paymentValues: { 
        flexDirection: 'row', 
        justifyContent: 'flex-end', 
        width: '40%',
    },
    grandTotal: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 20,
        paddingHorizontal: 15
    }
})