import React, {useState} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';

import {Colors} from '../../../utils/colors';
import { FONTS } from '../../../utils/constants/fonts';
import StyledButton from '../../Button/StyledButton';
import Text14 from '../../Text/Text14';
import Text16Normal from '../../Text/Text16Normal';

const CouponCodeCard = () => {

  const [coupon, setCoupon] = useState('');
  const [isCouponApplied, setCouponApplied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(false);

  const submitHandler = () => {
    if(coupon.length===0){
      setErr(true);
    }else{
      setErr(false);
      setCouponApplied(!isCouponApplied)
      // Api call to check validity of coupon code
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'column'}}>
          <Text16Normal
            textColor={Colors.TEXTDARK}
            text={'Enter Coupon Code'}
            containerStyle={styles.header}
            textStyle={FONTS.SEMIBOLD}
          />

          <View style={{ flexDirection: 'row', marginBottom: 5, paddingHorizontal: 20 }}>
            <View style={styles.input}>
              <TextInput
                autoCapitalize = {"characters"}
                value={coupon}
                editable={!isCouponApplied}
                placeholder=""
                placeholderTextColor={Colors.BLACK3}
                onChangeText={text =>{ setCoupon(text); setErr(text.length===0); }}
                style={[styles.textInput, {color: isCouponApplied ? Colors.BLACK3 : Colors.TEXTDARK} ]}
              />
            </View>
            <View style={styles.buttonContainer}>
              <StyledButton disabled={err} loading={loading} text={isCouponApplied ? "Edit" : "Submit"} onPress={submitHandler} buttonStyle={[{ 
                elevation: 2, backgroundColor: err? Colors.INFO_GREY : isCouponApplied ? Colors.POPUP_RED : Colors.INFO_GREEN}, styles.buttonStyle]} textStyle={FONTS.SEMIBOLD} />
            </View>
          </View>
          { isCouponApplied ? <View style={[styles.message, {  backgroundColor: "#EBFFF4" }]}>
              <Text14 text={"You saved ₹200 using " + coupon + "!" } textColor={Colors.TEXTDARK} textStyle={FONTS.SEMIBOLD} />
          </View> : null }
          <View style={{ paddingBottom: isCouponApplied? 15 : 5 }}/>
      </View>
    </View>
  );
};

export default CouponCodeCard;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    elevation: 3,
    borderRadius: 10,
    backgroundColor: '#FFF',
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  input: {
    width: '70%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  textInput: {
    elevation: 1,
    width: '100%',
    backgroundColor: "#EFF0F3",
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    paddingHorizontal: 8,
    paddingVertical: 5,
    paddingLeft: 15,
    fontSize: 16,
  },
  buttonContainer: {
    width: '30%',
    justifyContent: 'center',
  },
  buttonStyle: {
      paddingVertical: 8, 
      borderRadius: 0, 
      borderTopRightRadius: 15,
      borderBottomRightRadius: 15,
  },
  message: { 
    borderRadius: 5,
    justifyContent: 'center',
    marginHorizontal: 20,
    paddingHorizontal: 10,
    paddingVertical: 5
  }
})