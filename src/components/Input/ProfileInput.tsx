import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View} from 'react-native';

import { Colors } from '../../utils/colors';
import { Countries } from '../../utils/countries';
import {Icon} from 'react-native-elements';
import { ProfileInputFieldTypes } from '../../utils/constants/constants';
import globalStyles from '../../styles/Global/styles';
import moment from 'moment';

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
  flexValue?: number;
}

const ProfileInput: React.FC<Props> = ({iconName, textField, isEmailVerified, type, isAddressFilled, iconType, editToggle, onInfoPressed, isPhone, isDOBFilled, isUsername, flexValue = 8}) => {

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
    }else if (type == ProfileInputFieldTypes.INSTITUTION) {
      return (
        <Text style={{fontSize: 20}}>🏛️</Text>
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
      <View style={{flex: flexValue}}>
        <TextInput 
            style={{                  
                color: Colors.WHITE,
                padding: 0,
                paddingLeft: 5,                
                borderBottomWidth: editToggle? 1 : 0,  
                fontFamily: 'Quicksand-SemiBold',       
                width: '90%',
            }} 
            placeholder={ type === ProfileInputFieldTypes.DOB ? textField.charAt(10) !== 'T' ? textField : moment(new Date(textField)).format("DD/MM/YYYY") 
            : textField}            
            placeholderTextColor={Colors.BLACK2}
            editable={false} 
            selectTextOnFocus={false}
            multiline={true}
            numberOfLines={ type === ProfileInputFieldTypes.ADDRESS ? textField.length > 75 ? 5 : 3 : 
              type === ProfileInputFieldTypes.INSTITUTION ? textField.length > 40 ? 3 : 1 : 1 }
        />
      </View>
      <TouchableOpacity activeOpacity={ ProfileInputFieldTypes.EMAIL === type ? 0.5 : 1} onPress={ProfileInputFieldTypes.EMAIL === type ?
                  () => onInfoPressed() : ProfileInputFieldTypes.ADDRESS === type ?
                  () => { ToastAndroid.show("Please enter your address here!", ToastAndroid.SHORT); } :
                  () => { ToastAndroid.show("Please update your date of birth!", ToastAndroid.CENTER); } }>
      <View style={[globalStyles.flexRowJustifyCenter, globalStyles.flex,]}>
        { [ProfileInputFieldTypes.EMAIL, ProfileInputFieldTypes.PHONE, ProfileInputFieldTypes.ADDRESS , ProfileInputFieldTypes.DOB ].includes(type) ? 
            <Icon 
              name={getIcon(type, isEmailVerified, isAddressFilled, isDOBFilled)}
              type={ "material-icons"}
              color={getIconColor(type, isEmailVerified, isAddressFilled, isDOBFilled)}
              size={25} tvParallaxProperties={undefined} activeOpacity={1} /> : null }        
      </View>
      </TouchableOpacity>
    </View>
  );
};
export default ProfileInput;

const styles = StyleSheet.create({
  menuItem: {
    flexDirection: 'row',
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  menuItemText: {
    color: '#777777',
    marginLeft: 10,
    fontWeight: '600',
    fontSize: 16,
  },
});
