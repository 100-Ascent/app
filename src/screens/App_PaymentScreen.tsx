import { Keyboard, SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react'

import Background from '../components/Background/StyledBackground';
import ChallengeNameWithIconCard from '../components/Cards/Challenges/MyChallenges/ChallengeNameWithIconCard';
import { Colors } from '../utils/colors';
import CouponCodeCard from '../components/Cards/Payment/CouponCodeCard';
import DeliveryAddressCard from '../components/Cards/Payment/DeliveryAddressCard';
import Icon from 'react-native-elements/dist/icons/Icon';
import PayNowWithSummaryCard from '../components/Cards/Payment/PayNowWithSummaryCard';
import RNLoaderSimple from '../components/Loader/RNLoaderSimple';
import ReturnPolicyCard from '../components/Cards/Payment/ReturnPolicyCard';
import {RootNavProp} from '../routes/RootStackParamList';
import SummaryCard from '../components/Cards/Payment/SummaryCard';

interface Props{
navigation:RootNavProp<'PaymentScreen'>;
}

const PaymentScreen: React.FC<Props> = ({navigation}) => {

//State variables
const [ loading, setLoading ] = useState(false);
const [isPayButtonDisabled, setPayButtonDisabled] = useState(false);

const [isKeyboardVisible, setKeyboardVisible] = useState(false);

 useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

const summary = {
    "discountedPrice": 999,
    "originalPrice": "Rs 2499",
    "currency": "Rs",
    "benefits": [
        {"available": true, "point": "Entry to the journey" },
        {"available": true, "point": "An Achiever's Medal" },
        {"available": true, "point": "7 Virtual postcards along the way" },
        {"available": false, "point": "Track Progress on mobile app" },
        {"available": false, "point": "Digital certificate of completion" },
    ]
}

const policy = {
    "header": "7 days return policy",
    "description": "You can opt to get a full refund within 7 days of purchase, no questions asked",
    "link": "www.google.com"
}

const paymentData = {
    "total": "₹799.00",
    "payments" : [
        { "name": "The Great Indian Trail", "originalPrice": "₹2499.00", "discountedPrice": "₹999.00", "type": "normal" },
        { "name": "Coupon-(ABRACADABRA)", "originalPrice": "₹2499.00", "discountedPrice": "-₹200.00", "type": "coupon" },
        { "name": "Shipping", "originalPrice": "₹2499.00", "discountedPrice": "Free", "type": "normal" }
    ]
}

//Async functions
    const onPayPress = () => {
        // Add paytm integration here
    }

//Component functions
useEffect(()=>{
    navigation.setOptions({
      headerTitle: 'Pay Now',
      headerTitleContainerStyle: {alignItems: 'center'},
      headerTitleStyle: {fontFamily: 'Quicksand-Bold'},
      headerRight: () => <View style={{marginRight: 0 }}/>,
      headerLeft: () => (
        <View style={{marginLeft: 10}}>
          <Icon
            name="arrow-back"
            type="ionicons"
            size={30}
            onPress={() => navigation.pop()}
            tvParallaxProperties={undefined}
          />
        </View>
      ),
    });
  },[])

return <SafeAreaView style={{flex: 1}}>
<Background startColor={Colors.WHITE} endColor={Colors.WHITE}>
  {loading ? <RNLoaderSimple /> : <>
        <ScrollView scrollEnabled style={{flexGrow: 1}} contentContainerStyle={{flexGrow: 1}} keyboardShouldPersistTaps="handled" >
            <View style={{flex: 1 }}>
                <ChallengeNameWithIconCard showViewDetails={false} name={"The Great Indian Trail"} icon={"ASDASDA"} />
                <View style={{ marginTop: 30 }}>
                    <SummaryCard data={summary} />
                </View>
                <View style={{ marginTop: 20 }}>
                    <ReturnPolicyCard policy={policy} />
                </View>
                <View style={{ marginTop: 20 }}>
                    <CouponCodeCard />
                </View>    
                <View style={{ marginTop: 20 }}>
                    <DeliveryAddressCard />
                </View>                
            </View>     
            <View style={{ padding: 80 }} />    
        </ScrollView>
        { !isKeyboardVisible ? <View style={styles.fixedCard}>
            <PayNowWithSummaryCard summary={paymentData} isDisabled={isPayButtonDisabled} onPress={onPayPress} />
        </View> : null }
    </>
}
</Background>
</SafeAreaView>
}

export default PaymentScreen;
const styles = StyleSheet.create({
    fixedCard : { 
        position: 'absolute', 
        width: '100%', 
        bottom: 0, 
        backgroundColor: Colors.TEXT, 
        elevation: 5, 
        borderTopRightRadius: 20, 
        borderTopLeftRadius: 20 
    }
})