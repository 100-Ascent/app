import React from 'react'
import { View } from 'react-native'
import FastImage from 'react-native-fast-image';
import { TouchableOpacity } from 'react-native-gesture-handler';
import globalStyles from '../../../styles/Global/styles';
import ShowcaseStyles from '../../../styles/ShowcaseScreen/styles';
import { Colors } from '../../../utils/colors';
import Text16Normal from '../../Text/Text16Normal';
import Text24 from '../../Text/Text24';
import Text28 from '../../Text/Text28';

interface Props {
    name: string;
    image: string;
    date: string;
}

const UserImageandName: React.FC<Props> = ({
    name,
    image,
    date,
}) => {
    return(
        <View style={globalStyles.flexAllCenter}>
            <View
                style={ShowcaseStyles.viewCard1}>
                <View 
                    style={ShowcaseStyles.viewCard2}>
                    <TouchableOpacity>
                        <FastImage
                        style={ShowcaseStyles.userImage}
                        source={{
                            uri: 'https://unsplash.it/400/400?image=1',
                            priority: FastImage.priority.high,
                        }}
                        resizeMode={FastImage.resizeMode.contain}
                        />
                    </TouchableOpacity>
                    <View style={{padding: 5}} />
                    <Text24 text={name} textColor={Colors.TEXTDARK}/>
                    <Text16Normal text={"Member Since "+ date} textColor={Colors.TEXT2}/>
                </View>

            </View>
            
        </View>
    )
}

export default UserImageandName;