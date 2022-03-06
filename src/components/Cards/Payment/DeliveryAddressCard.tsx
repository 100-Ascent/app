import React, { useState } from 'react'
import { StyleSheet, ToastAndroid, TouchableOpacity, View } from 'react-native';

import { AppState } from '../../../redux';
import { Colors } from '../../../utils/colors';
import EditProfileInput from '../../Input/EditProfileInput';
import { FONTS } from '../../../utils/constants/fonts';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import Text14 from '../../Text/Text14';
import Text16Normal from '../../Text/Text16Normal';
import { useSelector } from 'react-redux';

interface Props{
    handleAddress: (data:any) => void;
    onConfirmAddress: () => void;
    isAddressConfirmed: boolean;
    handleAddressConfirmed: () => void;
}

const DeliveryAddressCard: React.FC<Props> = ({ handleAddress, onConfirmAddress,isAddressConfirmed, handleAddressConfirmed }) => {

    const [isEditing, setEditing] = useState(false);
    const user = useSelector((state: AppState) => state.rootStore.user);
    const [data, setData] = useState({
        "address": user['address'],
        "city": user['city'],
        "country": user["country"],
        "state": user["state"],
        "pincode": user["pincode"],
    });

    const handleInput = (name, value) => {
        setData(prevState => ({...prevState, [name]: value}));
    };

  const handlePress = () => {
    if(isAddressComplete){
        if(isEditing){
            handleAddress(data);
            setEditing(!isEditing)
        }else{
            onConfirmAddress();
        }
    }else{
        ToastAndroid.show("Enter a valid delivery address", ToastAndroid.SHORT) 
    }
  }
  
  const isAddressComplete = data['address'].length > 0 || data['city'].length > 0 ||
  data['state'].length > 0 || data['country'].length > 0 || data['pincode'].length > 0;

  const addressString = data['address'].length === 0 ? 'No address found' : 
    data['address'] + 
    ( data['city'].length>0 ? ', ' : "" ) + data['city'] + 
    ( data['state'].length>0 ? ', ' : "" ) + data['state'] +
    ( data['country'].length>0 ? ', ' : "" ) + data['country'] + 
    ( data['pincode'].length>0 ? ' - ' : "" ) + data['pincode']

return <View style={styles.container}>
    <View style={styles.header}>
        <Text16Normal
            textColor={Colors.TEXTDARK}
            text={'Delivery Address'}
            containerStyle={styles.header}
            textStyle={FONTS.SEMIBOLD}
        />
        <View style={{ justifyContent: 'center' }}>
            { !isEditing? <Icon name={ "edit" } type={ "ionicons" } onPress={()=>{ handleAddressConfirmed(); setEditing(!isEditing)}}/> : 
            <Icon name={ "cross" } type={ "entypo" } onPress={()=>{ handleAddressConfirmed(); setEditing(!isEditing)}} /> }
        </View>
    </View>
    { isEditing? 
        <View style={styles.addressLine}>
            <EditProfileInput
                label={'Address Line 1'}
                keyName={'address'}
                value={data['address']}
                onChangeText={handleInput}
            /> 
            <EditProfileInput
                label={'City'}
                keyName={'city'}
                value={data['city']}
                onChangeText={handleInput}
            />  
            <EditProfileInput
                label={'State'}
                keyName={'state'}
                value={data['state']}
                onChangeText={handleInput}
            />
            <EditProfileInput
                label={'Country'}
                keyName={'country'}
                value={data['country']}
                onChangeText={handleInput}
            />                           
            <EditProfileInput
                label={'PIN Code/ ZIP Code'}
                keyName={'pincode'}
                value={data['pincode']}
                isNumeric={true}
                onChangeText={handleInput}
            />
        </View> : <View style={styles.showAddress}>
            <Text14 
                text={addressString} 
                textColor={Colors.TEXTDARK} 
                textStyle={FONTS.REGULAR} 
            />
        </View>
    }

    <TouchableOpacity activeOpacity={0.9} onPress={ handlePress }>
        <View style={[styles.button, {  backgroundColor: isAddressComplete ? "#0BC675" : Colors.INFO_GREY }]}>
            <Text16Normal text={ isAddressConfirmed ? "Address Confirmed" : isEditing? "Save Address" : "Confirm Address"} textColor={Colors.TEXT} textStyle={FONTS.SEMIBOLD}/>
        </View>
    </TouchableOpacity>
</View>;
}

export default DeliveryAddressCard;

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        elevation: 3,
        borderRadius: 10,
        backgroundColor: 'rgb(247,253,250)',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingVertical: 5
    },
    addressLine: {
        marginHorizontal: 15,
        paddingBottom: 25
    },
    showAddress: {
        marginHorizontal: 20,
        paddingBottom: 20
    },
    button: {        
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    }
})