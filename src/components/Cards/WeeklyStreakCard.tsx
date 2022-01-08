import React from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import { Colors } from '../../utils/colors';
import Text12Normal from '../Text/Text12Normal';
import Text14 from '../Text/Text14';

interface Props {
    streak: any;
    textStyle?: any;
    borderStyle?: any;
    valueArray?: any;
    subValueArray?: any;
}

const WeeklyStreakCard: React.FC<Props> = ({ streak, textStyle, borderStyle, valueArray, subValueArray }) => {

    const displayWeek = valueArray.map((val, idx) => {
        return <View style={{
            flex: 1,
            justifyContent: 'center', alignItems: 'center',           
        }} key={idx}>
            <View style={[styles.circular, { borderColor: streak === 0 ? "#232323" : streak <= idx ? "#232323" : "#886300",  borderWidth: 2 }, borderStyle]}>
                <Text14 text={val} textColor={Colors.WHITE} textStyle={textStyle} />       
            </View>
            { subValueArray ? <View style={{ width: "100%", justifyContent: 'center', alignItems: 'center' }}>
                <Text12Normal text={subValueArray[idx]} textColor={Colors.WHITE} textStyle={{ color: Colors.TEXTDARK }} />       
            </View> : null }
        </View>
    })

    return <View style={{ flex: 1, flexDirection: 'row', marginHorizontal: 20 }}>
        {displayWeek}
    </View>
}

export default WeeklyStreakCard;

const styles= StyleSheet.create({
    circular: {
        width: 35,
        height: 35,
        borderRadius: 35,
        justifyContent: 'center',
        alignItems: 'center',                
    }
})