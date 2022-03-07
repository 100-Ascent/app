import React, { useEffect, useState } from 'react'
import {RootNavProp, RootNavRouteProps} from '../routes/RootStackParamList';
import { ScrollView, StyleSheet, View } from 'react-native';

import { AppState } from '../redux';
import ChallengeNameWithIconCard from '../components/Cards/Challenges/MyChallenges/ChallengeNameWithIconCard';
import { Colors } from '../utils/colors';
import { FONTS } from '../utils/constants/fonts';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import PaymentPopUp from '../components/PopUps/PaymentPopUp';
import StyledButton from '../components/Button/StyledButton';
import Text16Normal from '../components/Text/Text16Normal';
import Text18 from '../components/Text/Text18';
import { useSelector } from 'react-redux';

interface Props{
navigation:RootNavProp<'AfterPaymentScreen'>;
route: RootNavRouteProps<"AfterPaymentScreen">;
}

const AfterPaymentScreen: React.FC<Props> = ({navigation, route}) => {

    //State variables
    const name = route.params.name;
    const icon = route.params.icon; 
    const [showPaymentPopUp, setShowPaymentPopup] = useState(false);
    const user = useSelector((state: AppState) => state.rootStore.user);
    //Async functions

    //Component functions
    useEffect(()=>{
        navigation.setOptions({
            headerTitle: 'Subscribed!',
            headerTitleContainerStyle: {alignItems: 'center'},
            headerTitleStyle: {fontFamily: 'Quicksand-Bold'},
            headerRight: () => <View style={{marginRight: 0 }}/>,
            headerLeft: () => <View style={{marginLeft: 0}}/>
          });   
    },[]);

return <ScrollView scrollEnabled style={{flexGrow: 1}} contentContainerStyle={{flexGrow: 1}} keyboardShouldPersistTaps="handled" >
        <View style={{ flex: 1 }}>
            
            <View style={{ height: '80%' }}>
                <ChallengeNameWithIconCard showViewDetails={false} name={name} icon={icon} />
                <View style={styles.subscribed}>
                    <Icon name="checkmark-circle" type='ionicon' size={25} color={Colors.SUCCESS_GREEN} />
                    <Text18 
                        text={"Subscribed to Journey"} 
                        textColor={Colors.TEXTDARK} 
                        textStyle={FONTS.SEMIBOLD} 
                        containerStyle={{ paddingLeft: 10 }} 
                    />
                </View>
                <StyledButton 
                    text={"Go to Journey"} 
                    onPress={()=> navigation.replace('JourneyScreen')}
                    textStyle={FONTS.SEMIBOLD}
                    buttonStyle={{ marginHorizontal: 30, marginTop: 20, borderRadius: 10, backgroundColor: Colors.SUCCESS_GREEN }}
                />
            </View>
            <View style={{ height: '20%' }}>
            <View style={styles.successful}>
                    <Icon name="checkmark-circle" type='ionicon' size={25} color={Colors.SUCCESS_GREEN} />
                    <Text18 
                        text={"Payment Successful"} 
                        textColor={Colors.TEXTDARK} 
                        textStyle={FONTS.REGULAR} 
                        containerStyle={{ paddingLeft: 10 }} 
                    />
                </View>
                <View style={styles.description}>
                    <Text16Normal 
                        text={"The receipt has been sent to "}
                        textColor={Colors.TEXTDARK}  
                        textStyle={[{ textAlign : 'center' },FONTS.REGULAR]} 
                    />
                    <Text16Normal text={user['email']} textColor={Colors.TEXTDARK}  textStyle={FONTS.SEMIBOLD} />
                </View>
            </View>
        </View>
        {
            showPaymentPopUp ? <PaymentPopUp status={"SUCCESS"} onPress={()=> setShowPaymentPopup(false)} /> : null
        }
    </ScrollView>
}

export default AfterPaymentScreen;

const styles = StyleSheet.create({
    subscribed : { 
        justifyContent: 'center', 
        marginTop: 25, 
        flexDirection: 'row' 
    },
    successful: { 
        backgroundColor: "#EBFFF4",
        marginHorizontal: 30,
        paddingLeft: 15,
        paddingVertical: 5,
        borderRadius: 10,
        marginTop: 25, 
        flexDirection: 'row' 
    },
    description: {
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 20,
    },
})