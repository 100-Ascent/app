import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements';

import globalStyles from '../../styles/Global/styles';
import { Colors } from '../../utils/colors';
import { Countries } from '../../utils/countries';
import { ProfileInputFieldTypes } from '../../utils/constants/constants';

interface Props {
  iconName: string;
  textField: string;
  isEmailVerified?: boolean;
  isAddressFilled?: boolean;
  type: any; 
  iconType?: any;
  editToggle?: boolean;
  onInfoPressed?: any;
  isPhone?: boolean;
  isDOBFilled?: boolean;
  isUsername?: boolean;
}

const ProfileInput: React.FC<Props> = ({iconName, textField, isEmailVerified, type, isAddressFilled, iconType, editToggle, onInfoPressed, isPhone, isDOBFilled, isUsername}) => {

  const getIconColor = (type: any, isEmailVerified: boolean,isAddressFilled : boolean, isDOBFilled: boolean) => {
    switch(type){
      case ProfileInputFieldTypes.EMAIL: return isEmailVerified ? Colors.INFO_GREEN : Colors.INFO_YELLOW; 
      case ProfileInputFieldTypes.PHONE: return Colors.INFO_GREEN; 
      case ProfileInputFieldTypes.ADDRESS: return isAddressFilled?  Colors.INFO_GREEN : Colors.INFO_YELLOW;
      case ProfileInputFieldTypes.DOB: return isDOBFilled ?  Colors.INFO_GREEN : Colors.INFO_YELLOW;        
    }
  }

  const getIcon = (type: any, isEmailVerified: boolean, isAddressFilled: boolean, isDOBFilled: boolean) => {
    switch(type){
      case ProfileInputFieldTypes.EMAIL: return isEmailVerified ? "check-circle-outline" : "info-outline"; 
      case ProfileInputFieldTypes.PHONE: return "check-circle-outline"; 
      case ProfileInputFieldTypes.ADDRESS: return isAddressFilled ? "check-circle-outline" : "info-outline";    
      case ProfileInputFieldTypes.DOB: return isDOBFilled? "check-circle-outline" : "info-outline";        
    
    }
  }
  var countryFlag;
  try {
    countryFlag = Countries.find(country => country.name.toLowerCase() == textField.toLowerCase()).unicodeFlag;
  } catch(e) {
    countryFlag = '🌏';
  }

  const renderIcon = () => {
    if (type == ProfileInputFieldTypes.COUNTRY) {
      return (
        <Text style={{fontSize: 20}}>{countryFlag}</Text>
      )
    } else if (type == ProfileInputFieldTypes.PHONE) {
      return (
        <Text style={{fontSize: 20}}>☎️</Text>
      )
    } else if (type == ProfileInputFieldTypes.EMAIL) {
      return (
        <Text style={{fontSize: 20}}>📨</Text>
      )
    } else if (type == ProfileInputFieldTypes.GENDER) {
      return (
        <Text style={{fontSize: 20}}>⚤</Text>
      )
    } else if (type == ProfileInputFieldTypes.DOB) {
      return (
        <Text style={{fontSize: 20}}>🍰</Text>
      )
    } else if (type == ProfileInputFieldTypes.ADDRESS) {
      return (
        <Text style={{fontSize: 20}}>🏡</Text>
      )
    } else if (type == ProfileInputFieldTypes.USERNAME) {
      return (
        <Text style={{fontSize: 20}}>🧑</Text>
      )
    } else {
      return (
        <Text style={{fontSize: 20}}>🪴</Text>
      )
    }
  }

  return (
    <View style={styles.menuItem}>
      <View style={[globalStyles.flex, globalStyles.flexRowAlignCenter]}>
        {renderIcon()}
      </View>
      <View style={{flex: 8}}>
        <TextInput 
            style={{                  
                color: Colors.WHITE,
                padding: 0,
                paddingLeft: 5,                
                borderBottomWidth: editToggle? 1 : 0,  
                fontFamily: 'Quicksand-SemiBold',       
                width: '90%'
            }} 
            placeholder={ type === ProfileInputFieldTypes.DOB ? textField.charAt(10) !== 'T' ? textField : moment(new Date(textField)).format("DD/MM/YYYY") : textField}            
            placeholderTextColor={Colors.BLACK2}
            editable={false} 
            selectTextOnFocus={false}
            multiline={true}
        />
      </View>
      <TouchableOpacity activeOpacity={0.5}>
      <View style={[globalStyles.flexRowJustifyCenter, globalStyles.flex]}>
        { [ProfileInputFieldTypes.EMAIL, ProfileInputFieldTypes.PHONE, ProfileInputFieldTypes.ADDRESS , ProfileInputFieldTypes.DOB ].includes(type) ? 
            <Icon 
              disabled={isEmailVerified || isAddressFilled || isPhone || isDOBFilled}
              name={getIcon(type, isEmailVerified, isAddressFilled, isDOBFilled)}
              type={"material-icons"}
              color={getIconColor(type, isEmailVerified, isAddressFilled, isDOBFilled)}
              onPress={ProfileInputFieldTypes.EMAIL === type ?
                () => onInfoPressed() : ProfileInputFieldTypes.ADDRESS === type ?
                  () => { ToastAndroid.show("Please enter your address here!", ToastAndroid.SHORT); } :
                  () => { ToastAndroid.show("Please update your date of birth!", ToastAndroid.CENTER); } }
              size={25} tvParallaxProperties={undefined}              /> : null }        
      </View>
      </TouchableOpacity>
    </View>
  );
};
export default ProfileInput;

const styles = StyleSheet.create({
  menuItem: {
    flex: 1, 
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  menuItemText: {
    color: '#777777',
    marginLeft: 10,
    fontWeight: '600',
    fontSize: 16,
  },
});
