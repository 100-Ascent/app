import React, { useState } from 'react';
import {Image, ImageBackground, TouchableOpacity, View} from 'react-native';
import ShowcaseStyles from '../../../styles/ShowcaseScreen/styles';
import { Colors } from '../../../utils/colors';
import Text20 from '../../Text/Text20';
import Text24 from '../../Text/Text24';
import Fire from '../../../../assets/icons/ShowCase/Fire.svg';
import Text32bold from '../../Text/Text32bold';
import Text30 from '../../Text/Text30';

interface Props{
}

const LongestStreakCard: React.FC<Props> = () => {
	const startDate = "21 June 2021";
	const endDate = '10 Jan 2022';
	const totalDays = '203';
	return (
		<View style={ShowcaseStyles.overall1}>
			<View style={ShowcaseStyles.overall2}>
				<Text20 text={"Longest Streak"} textColor={Colors.HEADING}/>
			</View>
			<View style={ShowcaseStyles.paddingSpace2}/>
			
			<View style={ShowcaseStyles.overall2}>
				<Text20 text={startDate+" - "+endDate} textColor={Colors.TEXTDARK}/>
			</View>
			<View style={ShowcaseStyles.paddingSpace2}/>
			<View style={ShowcaseStyles.overall2}>
				<Fire/>
				<View style={{paddingHorizontal:20}}>
					<Text30 text={totalDays+' Days'} textColor={Colors.TEXTDARK}/>
				</View>
				
			</View>
			<View style={ShowcaseStyles.paddingSpace}/>
		</View>
	)
}
export default LongestStreakCard;