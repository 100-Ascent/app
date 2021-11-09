import React from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import { Colors } from '../../utils/colors';
import Text14 from '../Text/Text14';

interface Props {
    streak: any;
}

const WeeklyStreakCard: React.FC<Props> = ({ streak }) => {

    const today = new Date().getDay();
    const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    const displayWeek = daysOfWeek.map((val, idx) => {
        return <View style={{
            flex: 1,
            justifyContent: 'center', alignItems: 'center',            
        }}>
            <View style={[styles.circular , { borderColor: today < idx ? "#232323" : "#886348",  borderWidth: 2, }]}>
                <Text14 text={val} textColor={Colors.WHITE} />       
            </View>
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