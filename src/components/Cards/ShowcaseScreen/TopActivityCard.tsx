import React from 'react'
import { View } from 'react-native'
import FastImage from 'react-native-fast-image';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ShowcaseStyles from '../../../styles/ShowcaseScreen/styles';
import { Colors } from '../../../utils/colors';
import Text16Normal from '../../Text/Text16Normal';
import Text20 from '../../Text/Text20';
import Text24 from '../../Text/Text24';

interface Props {

}

const TopActivityCard: React.FC<Props> = () => {
	return(
		<View style={ShowcaseStyles.overall1}>
			<View style={ShowcaseStyles.overall2}>
				<Text20 text={"Top Activity"} textColor={Colors.HEADING}/>
			</View>

			<View style={ShowcaseStyles.paddingSpace} />
			
			<View style={ShowcaseStyles.activityRow}>
				<View style={ShowcaseStyles.activityRow}>
					<TouchableOpacity style={{
                borderWidth: 3,
                borderColor: '#E74C3C',
                borderRadius: 60,
								padding: 3,}}>
						<FastImage
						style={ShowcaseStyles.activityImage}
						source={{
								uri: 'https://unsplash.it/400/400?image=1',
								priority: FastImage.priority.high,
						}}
						resizeMode={FastImage.resizeMode.contain}
						/>
					</TouchableOpacity>
					<View style={ShowcaseStyles.activityText}>
						<Text20 text={"Cycling"} textColor={Colors.HEADING}/>
						<Text16Normal text={"420 km cycled in the last 43 days"} textColor={Colors.TEXT2}/>
					</View>
				</View>			
			</View>
			<View style={ShowcaseStyles.paddingSpace} />
		</View>
	)
}
export default TopActivityCard;