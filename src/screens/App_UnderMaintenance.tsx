import React from 'react'
import { View } from 'react-native';
import {RootNavProp} from '../routes/RootStackParamList';
import UpdateAppIcon from '../../assets/modal-icons/update-app.svg';
import Text20 from '../components/Text/Text20';
import { Colors } from '../utils/colors';
import Text16Normal from '../components/Text/Text16Normal';

interface Props{

}

const UnderMaintenanceScreen: React.FC<Props> = ({}) => {

//State variables

//Async functions

//Component functions

return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: Colors.WHITE }}>
    <UpdateAppIcon/>
    <View style={{ paddingHorizontal: 20, marginTop: 30, justifyContent: 'center', alignItems: 'center' }}>
        <Text20 text={"We are currently undergoing scheduled maintenance"} textColor={Colors.TEXTDARK} textStyle={{ textAlign: 'center' }} />
    </View>
</View>;
}

export default UnderMaintenanceScreen;