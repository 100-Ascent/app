import React from 'react';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import globalStyles from '../../../styles/global/styles';
import Background from '../../Background/StyledBackground';
import Km from '../../../../assets/icons/ShowCase/km.svg';
import FireWhite from '../../../../assets/icons/ShowCase/FireWhite.svg';
import ClockWhite from '../../../../assets/icons/ShowCase/ClockWhite.svg';
import StepsWhite from '../../../../assets/icons/ShowCase/StepsWhite.svg';
import Text20 from '../../Text/Text20';
import { Colors } from '../../../utils/colors';
import Text16Normal from '../../Text/Text16Normal';
import ShowcaseStyles from '../../../styles/ShowcaseScreen/styles';

interface Props {
	startColor: string;
	endColor: string;
	iconIndex: number;
	value: any;
	text: string;
}
const Stats:React.FC<Props> = ({startColor, endColor, iconIndex, value, text }) => {
	const getIcon = iconIndex => {
		switch(iconIndex){
			case 1:
				return <Km/>;
			case 2:
				return <FireWhite/>;
			case 3:
				return <StepsWhite/>;
			case 4:
				return <ClockWhite/>;		

		}
	};
	return(
		<View	style={ShowcaseStyles.stats1}>
		<Background
		style={{borderRadius: 10}}
		startColor={startColor}
		endColor={endColor}>
				<TouchableOpacity	activeOpacity={0.9}>
						<View style={[{flexDirection:'row'}, globalStyles.flex]}>
							<View style={[ShowcaseStyles.iconStyle, globalStyles.flexColumnAlignCenter]}>
								{getIcon(iconIndex)}
							</View>
							<View style={ShowcaseStyles.textStyle}>
								<Text20 text={value} textColor={Colors.TEXT} />
								<Text16Normal text={text} textColor={Colors.TEXT}/>
							</View>
						</View>                        
				</TouchableOpacity>
		</Background>
		</View>
	)
}

export default Stats;