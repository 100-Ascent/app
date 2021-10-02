import React from 'react';
import { View } from 'react-native';
import ShowcaseStyles from '../../../styles/ShowcaseScreen/styles';
import { Colors } from '../../../utils/colors';
import Text20 from '../../Text/Text20';
import Text24 from '../../Text/Text24';

interface Props {

}

const SubscribedChallengesCard: React.FC<Props> = () => {
	return(
		<View style={ShowcaseStyles.overall1}>
			<View style={ShowcaseStyles.overall2}>
				<Text20 text={"Subscribed Challenges"} textColor={Colors.HEADING}/>
			</View>

		</View>
	)
}

export default SubscribedChallengesCard;