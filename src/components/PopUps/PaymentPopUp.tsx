import { Modal, StyleSheet, View } from 'react-native';

import { AppState } from '../../redux';
import { Colors } from '../../utils/colors';
import { FONTS } from '../../utils/constants/fonts';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { PROCEED } from '../../utils/constants/constants';
import React from 'react'
import StyledButton from '../Button/StyledButton';
import Text16Normal from '../Text/Text16Normal';
import Text20 from '../Text/Text20';
import { useSelector } from 'react-redux';

interface Props{
    onPress: ()=>void;
    status: string;
    buttonLoading?: any;
}

const PaymentPopUp: React.FC<Props> = ({ status, onPress, buttonLoading }) => {

//State variables

//Async functions

//Component functions
const isSuccess = status === "SUCCESS";
const isError = status === "ERROR";
const isCancelled = status === "CANCELLED";

const successBackground = "#EBFFF4";
const errorBackground = "#FFF0B6";
const failureBackground = "#FFF5F5";

const success = "#0BC675";
const error = "#BA9300";
const failure = "#B33A3A";

const PAYMENT_SUCCESS = "Payment Successful";
const PAYMENT_SUCCESS_MESSAGE = "The receipt has been sent to ";

const PAYMENT_FAILED = "Payment Failed";
const PAYMENT_FAILED_MESSAGE = "Your payment could not be processed.";

const PAYMENT_PENDING = "We are working with the payment gateway to verify your payment status!";
const PAYMENT_CANCELLED = "Payment Cancelled";
const PAYMENT_CANCELLED_MESSAGE = "The ongoing payment transaction has been cancelled";
const PROCEED = "PROCEED";
const GO_BACK = "GO BACK";
const CANCEL = "CANCEL";
const user = useSelector((state: AppState) => state.rootStore.user);

return <Modal visible={true} onRequestClose={onPress} transparent>
<View style={styles.container}>
  <View style={styles.subContainer}>
    <View style={[styles.top, {backgroundColor: isSuccess ? successBackground : isError || isCancelled ? errorBackground : failureBackground }]}>
        <Icon 
            name={ isSuccess ? "checkmark-circle" : isError||isCancelled ? "warning" : "close"} 
            type='ionicon' 
            size={100} 
            color={ isSuccess ? success : isError||isCancelled ? error: failure } />
    </View>
    <View style={styles.header}>
        {
            isError ? null 
            : <Text20 
                text={ isSuccess ? PAYMENT_SUCCESS : isCancelled ? PAYMENT_CANCELLED : PAYMENT_FAILED } 
                textColor={Colors.TEXTDARK}  
                textStyle={FONTS.SEMIBOLD} 
            />
        }
    </View>
    <View style={styles.description}>
        <Text16Normal 
            text={isSuccess? PAYMENT_SUCCESS_MESSAGE : isError ? PAYMENT_PENDING : isCancelled ? PAYMENT_CANCELLED_MESSAGE : PAYMENT_FAILED_MESSAGE}
            textColor={Colors.TEXTDARK}  
            textStyle={[{ textAlign : 'center' },FONTS.REGULAR]} 
        />

        { isSuccess ?  <Text16Normal text={user['email']} textColor={Colors.TEXTDARK}  textStyle={FONTS.SEMIBOLD} /> : null }
    </View>
    <View style={styles.buttonContainer}>
      <StyledButton 
        loading = {buttonLoading}
        text={ isSuccess ? PROCEED : GO_BACK } 
        onPress={onPress} 
        buttonStyle={{ borderRadius: 50, backgroundColor: isSuccess ? success : isError || isCancelled ? error : failure }} 
        textStyle={FONTS.SEMIBOLD}
    />
    </View>
  </View>
</View>
</Modal>
}

export default PaymentPopUp;


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#000000aa',
      justifyContent: 'center',
    },
    subContainer: {
      backgroundColor: Colors.TEXT,
      marginHorizontal: 20,
      borderRadius: 30,
    },
    top: {
        backgroundColor: "#EBFFF4",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 20,
    },
    header:{ 
        alignItems: 'center',
        paddingTop: 20,
    },
    description: {
        alignItems: 'center',
        paddingVertical: 20,
        paddingHorizontal: 20,
    },
    buttonContainer: {
      marginTop: 10,
      marginBottom: 20,
      paddingHorizontal: 100,
    }
  });
  