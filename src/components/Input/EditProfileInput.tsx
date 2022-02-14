import {Platform, Text, TextInput, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';

import {Colors} from '../../utils/colors';
import DateTimePicker from '@react-native-community/datetimepicker';
import HelpTooltip from '../Tooltip/HelpTooltip';
import Icon from 'react-native-elements/dist/icons/Icon';
import Text14 from '../Text/Text14';
import moment from 'moment';
import { isIOS } from 'react-native-elements/dist/helpers';

interface Props {
  label: string;
  value: string;
  isEmail?: boolean;
  isPhone?: boolean;
  isName?: boolean;
  isUsername?: boolean;
  isNumeric?: boolean;
  keyName: any;
  isInstitution?: boolean;
  onChangeText?: (name, value) => void;
  handleDateOfBirth?: (dob)=> void;
  handleUserNameBlurEvent?: ()=> void;
  handleInstitutionSelection?: ()=> void;
  handleInstitutionRemovePress?: () => void;
}

const EditProfileInput: React.FC<Props> = ({
  label,
  value,
  onChangeText,
  isEmail,
  isPhone,
  isName,
  isUsername,
  isNumeric,
  isInstitution,
  keyName,
  handleDateOfBirth,
  handleUserNameBlurEvent,
  handleInstitutionSelection,
  handleInstitutionRemovePress
}) => {

    let day, month, year;
    if(keyName==="dob"){
        const dateValue = moment(new Date(value), 'DD/MM/YYYY');
        month = parseInt(dateValue.format('M'));
        year = parseInt(dateValue.format('Y'));
        day = parseInt(dateValue.format('D'));
    }

  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date(year,month-1,day));
  
  const onChange = (event, selectedDateValue) => {
    const currentDate = selectedDateValue;
    setShow(Platform.OS === 'ios');
    if (currentDate !== undefined) {
      setDate(currentDate);
      handleDateOfBirth(currentDate);
    }
  };

  return (
    <View style={{marginTop: 15, marginHorizontal: 10, }}>
      <View>
        <Text14 text={label} textColor={Colors.BLACK3} />
      </View>
      
      <View style={{flexDirection: 'row'}}>
        {keyName === 'dob' ? (
          <TouchableOpacity
            onPress={() => setShow(true)}
            activeOpacity={1}
            style={{
              backgroundColor: Colors.TRANSPARENT,
              flexDirection: 'row',
              width: '100%',
              borderBottomWidth: 1,
              paddingVertical: 5,
            }}>
            <View
              style={{
                marginTop: 0,
                borderColor: Colors.TRANSPARENT,
                width: '100%',
                backgroundColor: Colors.TRANSPARENT,
                flexDirection: 'row',
              }}>
              <View style={{flex: 5}}>
                <Text style={{color: Colors.TEXTDARK}}>
                  {date === null
                    ? 'Select Date'
                    : moment(new Date(value)).format('DD-MM-YYYY')}
                </Text>
              </View>
              <View style={{flex: 1, alignItems: 'flex-end'}}/>
              <View style={{flex: 1, alignItems: 'center'}}>
                <Icon name="calendar-today" type="MaterialIcons" size={20} tvParallaxProperties={undefined} />
              </View>
            </View>
          </TouchableOpacity>
        ) : (
          !isInstitution ? 
          
          <TextInput
            keyboardType={isNumeric ? 'number-pad' : 'default'}
            style={{
              width: isPhone ? '95%' :  '100%',
              color:
                isName || isEmail || isPhone ? Colors.BLACK3 : Colors.TEXTDARK,
              padding: 0,
              borderBottomWidth: 1,
              fontSize: 14,
              borderBottomColor:
                isName || isEmail || isPhone ? Colors.BLACK3 : Colors.TEXTDARK,
            }}
            value={value}
            onChangeText={val => onChangeText(keyName, val)}
            onBlur={ isUsername? handleUserNameBlurEvent: ()=> { }}
            defaultValue={value}
            editable={!(isName || isEmail || isPhone)}
            // selectTextOnFocus={!(isName || isEmail || isPhone)}
          /> : 
          <TouchableOpacity
            onPress={handleInstitutionSelection}
            activeOpacity={1}
            style={{
              backgroundColor: Colors.TRANSPARENT,
              flexDirection: 'row',
              width: '100%',
              borderBottomWidth: 0,
              paddingVertical: isIOS ? 3 : 0,
            }}>
            <View
              style={{
                borderColor: Colors.TRANSPARENT,
                width: '100%',
                backgroundColor: Colors.TRANSPARENT,
                flexDirection: 'row',              
              }}>
              <View style={{ width: value !== "Select your Institution" ? '80%' : "90%", borderBottomWidth: 1, borderBottomColor: Colors.TEXTDARK, }}>
                <Text style={{color: Colors.TEXTDARK}}>
                  {value?.length > 55 ? value.substring(0,45) + "..." : value } 
                </Text>
              </View>
              <View style={{ width: '10%', alignItems: 'flex-end', borderBottomWidth: 1, borderBottomColor: Colors.TEXTDARK,}}>
                
                  <Icon name="chevron-right" type="MaterialIcons" size={25} tvParallaxProperties={undefined} />                
              </View>
              { value !== "Select your Institution" ? <View style={{ width: '10%', alignItems: 'flex-end'}}>
                <TouchableOpacity activeOpacity={0.1} onPress={handleInstitutionRemovePress}> 
                  <Icon name="cross" type="entypo" size={25} tvParallaxProperties={undefined} />
                </TouchableOpacity>
              </View> : null}
            </View>
          </TouchableOpacity>
        )}

        { isPhone ? <View style={{ borderBottomWidth: 1, borderBottomColor: Colors.BLACK3 }}>
            <HelpTooltip color={Colors.INFO_GREY} />
            </View> : null
        }
        
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={'date'}
            is24Hour={true}
            display="calendar"
            onChange={onChange}
          />
        )}
        
      </View>
    </View>
  );
};

export default EditProfileInput;
