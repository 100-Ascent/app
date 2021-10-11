import React from 'react';
import { View } from 'react-native';
import { Icon } from 'react-native-elements';
import ShowcaseStyles from '../../../styles/ShowcaseScreen/styles';
import { Colors } from '../../../utils/colors';
import Text20 from '../../Text/Text20';
import Text24 from '../../Text/Text24';

interface Props {

}

const BadgesEarnedCard: React.FC<Props> = () => {
	return(
		<View style={ShowcaseStyles.overall1}>
			<View style={ShowcaseStyles.overall2}>
				<Text20 text={"Badges Earned"} textColor={Colors.HEADING}/>
				<View style={{marginLeft: 'auto', alignItems:'center'}}>
					<Icon style={{ marginLeft: 'auto'}} size={36} name="chevron-right" type="material-icons"/>
				</View>
				
			</View>

		</View>
	)
}

export default BadgesEarnedCard;