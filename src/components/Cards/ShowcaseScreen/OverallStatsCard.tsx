import React from 'react';
import {Image, ImageBackground, TouchableOpacity, View} from 'react-native';
import globalStyles from '../../../styles/Global/styles';
import {Colors} from '../../../utils/colors';
import Background from '../../Background/StyledBackground';
import Text24 from '../../Text/Text24';
import Stats from './Stats';
import ShowcaseStyles from '../../../styles/ShowcaseScreen/styles';
import Text16Normal from '../../Text/Text16Normal';
import Text32bold from '../../Text/Text32bold';
import Text20 from '../../Text/Text20';
interface Props {

}
const OverallStats: React.FC<Props> = () => {
    return(
        <View style={ShowcaseStyles.overall1}>            
            <View style={ShowcaseStyles.overall2}>
                <Text20 text={"Overall Stats"} textColor={Colors.HEADING}/>
            </View>           

            <View style={ShowcaseStyles.overallRow}>
            <Stats 
            startColor='#3378DF'  
            endColor='#22467B' 
            iconIndex={1}
            value="69"
            text='km travelled'/>

            <Stats 
            startColor='#F0AF46'  
            endColor='#E06627' 
            iconIndex={2}
            value="4320"
            text='cal. burnt'/>
            </View>

            <View style={ShowcaseStyles.overallRow}>
            <Stats 
            startColor='#34CE27'  
            endColor='#23861A' 
            iconIndex={3}
            value="42069"
            text='steps walked'/>

            <Stats 
            startColor='#DF3333'  
            endColor='#7B2222' 
            iconIndex={4}
            value="43"
            text='hrs spent'/>
            </View>

            <View style={ShowcaseStyles.paddingSpace} />
            <View style={{padding:10,marginHorizontal:20, alignItems:'center'}}>
            {/* <View style={{position: 'absolute', top: -120, zIndex: 0}}>
            <Image
                source={require('../../../assets/icons/ShowCase/TreesBG.svg')}
                style={{
            
                }}
            />
            </View> */}
                <Text16Normal text={"Trees Planted"} textColor={Colors.TEXT2}/>
                <Text32bold text={'420'} textColor={Colors.TEXT2}/>
            </View>
        </View>
    )
}

export default OverallStats;