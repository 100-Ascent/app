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
import PaymentPopUp from '../components/PopUps/PaymentPopUp';
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
  const summary = data.summary;
  const currency = data.currency;
  const policy = data.policy;
  const total = data.amount;
  const contextId = useSelector((state: AppState) => state.rootStore.contextId);
  const user = useSelector((state: AppState) => state.rootStore.user);

  //State variables
  const [ loading, setLoading ] = useState(false);
  const [buttonLoading,setButtonLoading] = useState(false);
  const [address, setAddress] = useState({});
  const [isAddressConfirmed, setAddressConfirmed] = useState(false);
  const [showPaymentPopUp, setShowPaymentPopup] = useState(false);
  const [status, setStatus] = useState("FALURE"); 
  const [orderId, setOrderId] = useState("");
  const isAddressComplete = user['address'].length > 0 || user['city'].length > 0 ||
  user['state'].length > 0 || user['country'].length > 0 || user['pincode'].length > 0;

  const [isPayButtonDisabled, setPayButtonDisabled] = useState(!isAddressConfirmed);


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


  const callToSubscribeToChallenge = async(orderId) => {
      setButtonLoading(true);
      await axios
        .get("/api/challenge/check/order/" + orderId, headers)
        .then(res=>{
          console.log(res.data);          
          if(res.data.success){ 
            setButtonLoading(false);        
            navigation.replace('AfterPaymentScreen', { name: data.name, icon:data.icon, image: data.image  });
          }else{
            setButtonLoading(false);
          }
        })
        .catch(err=>{
          setButtonLoading(false);
        })      
  }


  const intializePaytmTransaction = (orderId: string, txnToken: string) => {

    AllInOneSDKManager.startTransaction(
            orderId,
            MERCHANT_ID,
            txnToken,
            total.toString(),
            CALLBACK_URL + orderId,
            true,
            true,
            ""
        )
        .then((result) => {
            if(result.STATUS === "TXN_SUCCESS"){
              setStatus("SUCCESS");
              setShowPaymentPopup(true);
            }else if(result.RESPCODE === "141"){ 
              setStatus("CANCELLED");
              setShowPaymentPopup(true);
            }else{
              setStatus("ERROR");
              setShowPaymentPopup(true);     
            }
        })
        .catch((err) => {
            console.log("errrrrrrrrrrr");
            console.log(err);
            setStatus("FAILURE");
            setShowPaymentPopup(true);      
        });
  }

  const handleRedirectionAfterPayment = () => {
    if(status === "SUCCESS"){
      callToSubscribeToChallenge(orderId);
    } else if(status==="ERROR"){
      navigation.pop();
    }else{
      setShowPaymentPopup(false);      
    }
  }

  const onPayPress = async () => {
    
    await axios.get(CREATE_ORDER + data.id)
      .then(res=>{
        if(res.data.success){
          const orderId = res.data.data.order_id;
          setOrderId(orderId);
          const txnToken = res.data.data.txnToken;
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
                <ChallengeNameWithIconCard showViewDetails={false} name={data.name} image={{images: [data.image]}} icon={data.icon} />
                <View style={{ marginTop: 20 }}>
                    <SummaryCard currency={currency} data={summary} />
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
              currency={currency}
              total={total} 
              isDisabled={isPayButtonDisabled} 
              onPress={onPayPress}             
            />
        </View> : null }
        {
          showPaymentPopUp ? <PaymentPopUp status={status} onPress={handleRedirectionAfterPayment} buttonLoading={buttonLoading} /> : null
        }
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