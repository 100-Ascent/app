import { CALLBACK_URL, MERCHANT_ID } from '../utils/constants/constants';
import { CREATE_ORDER, USER_DETAILS, USER_DETAILS_UPDATE } from '../utils/apis/endpoints';
import { Keyboard, SafeAreaView, ScrollView, StyleSheet, ToastAndroid, View } from 'react-native';
import React, { useEffect, useState } from 'react'
import {RootNavProp, RootNavRouteProps} from '../routes/RootStackParamList';
import { useDispatch, useSelector } from 'react-redux';

import AllInOneSDKManager from 'paytm_allinone_react-native';
import { AppState } from '../redux';
import Background from '../components/Background/StyledBackground';
import ChallengeNameWithIconCard from '../components/Cards/Challenges/MyChallenges/ChallengeNameWithIconCard';
import { Colors } from '../utils/colors';
import CouponCodeCard from '../components/Cards/Payment/CouponCodeCard';
import DeliveryAddressCard from '../components/Cards/Payment/DeliveryAddressCard';
import Icon from 'react-native-elements/dist/icons/Icon';
import PayNowWithSummaryCard from '../components/Cards/Payment/PayNowWithSummaryCard';
import RNLoaderSimple from '../components/Loader/RNLoaderSimple';
import ReturnPolicyCard from '../components/Cards/Payment/ReturnPolicyCard';
import SummaryCard from '../components/Cards/Payment/SummaryCard';
import axios from 'axios';
import { setData } from '../redux/action';

interface Props{
navigation:RootNavProp<'PaymentScreen'>;
route: RootNavRouteProps<"PaymentScreen">;
}

const PaymentScreen: React.FC<Props> = ({navigation, route}) => {

  const data = route.params.data;
  const paymentSummaryList = data.payment_summary_list;
  const total = data.amount;
  const contextId = useSelector((state: AppState) => state.rootStore.contextId);
  const user = useSelector((state: AppState) => state.rootStore.user);

  //State variables
  const [ loading, setLoading ] = useState(false);
  const [address, setAddress] = useState({});
  const [isAddressConfirmed, setAddressConfirmed] = useState(false);
  
  const isAddressComplete = user['address'].length > 0 || user['city'].length > 0 ||
  user['state'].length > 0 || user['country'].length > 0 || user['pincode'].length > 0;

  const [isPayButtonDisabled, setPayButtonDisabled] = useState(!isAddressComplete);


  const headers = { headers: { 'X-CONTEXT-ID': contextId } };
  
  const dispatch = useDispatch();
  
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
          {"available": true, "point": "Entry to the journey"},
          {"available": true, "point": "An Achiever's Medal"},
          {"available": true, "point": "7 Virtual postcards along the way"},
          {"available": false, "point": "Track Progress on mobile app"},
          {"available": false, "point": "Digital certificate of completion"},
      ]
  }

  const policy = {
      "header": "7 days return policy",
      "description": "You can opt to get a full refund within 7 days of purchase, no questions asked",
      "link": "www.google.com"
  }

  const intializePaytmTransaction = (orderId: string, txnToken: string) => {

    AllInOneSDKManager.startTransaction(
            orderId,
            MERCHANT_ID,
            txnToken,
            total.toString(),
            "https://securegw-stage.paytm.in/theia/paytmCallback?ORDER_ID=" + orderId,
            true,
            true,
            ""
        )
        .then((result) => {
            console.log(result);
        })
        .catch((err) => {
            console.log("errrrrrrrrrrr");
            console.log(err);
        });
  }

  const onPayPress = async () => {
    await axios.get(CREATE_ORDER + data.id)
      .then(res=>{
        if(res.data.success){
          const orderId = res.data.order_id;
          const txnToken = res.data.data.body.txnToken;
          console.log(orderId);
          console.log(txnToken);
          intializePaytmTransaction(orderId, txnToken);
        }else{
          ToastAndroid.show("Something went wrong!", ToastAndroid.SHORT);
        }
      })
      .catch(err=>{
        console.log(err);
      });
  }

  const callToGetUserDetails = async () => {
    await axios
        .get(USER_DETAILS, headers)
        .then(async res => {
            const data = res.data.data;
            dispatch(setData(data));
        })
        .catch(err => {
            console.log('failed in user data');
            console.log(err);
        });
  };

  const handleSetAddress = (data) => {
    setAddress(data);    
  }

  const onConfirmAddress = async () => {
   await axios
      .post(USER_DETAILS_UPDATE, address, headers)
      .then(async res => {
        if(res.data.success){
          callToGetUserDetails();        
          setAddressConfirmed(true);
          setPayButtonDisabled(false);
        }else{
          ToastAndroid.show("Something went wrong! Try again later", ToastAndroid.SHORT);
        }       
      })
      .catch(err => {
        console.log('failed');
        console.log(err);
      });
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
                <ChallengeNameWithIconCard showViewDetails={false} name={data.name} icon={data.backgroundImage} />
                <View style={{ marginTop: 20 }}>
                    <SummaryCard data={summary} />
                </View>
                <View style={{ marginTop: 20 }}>
                    <ReturnPolicyCard policy={policy} />
                </View>
                <View style={{ marginTop: 20 }}>
                    <CouponCodeCard />
                </View>    
                <View style={{ marginTop: 20 }}>
                    <DeliveryAddressCard 
                      isAddressConfirmed={isAddressConfirmed} 
                      handleAddressConfirmed={()=>setAddressConfirmed(false)}
                      handleAddress={handleSetAddress} 
                      onConfirmAddress={onConfirmAddress} 
                    />
                </View>                
            </View>     
            <View style={{ padding: 80 }} />    
        </ScrollView>
        { !isKeyboardVisible ? <View style={styles.fixedCard}>
            <PayNowWithSummaryCard 
              summary={paymentSummaryList}
              total={total} 
              isDisabled={isPayButtonDisabled} 
              onPress={onPayPress}             
            />
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