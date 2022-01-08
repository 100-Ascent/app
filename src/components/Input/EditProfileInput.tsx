import React, {useState} from 'react';
import moment from 'moment';
import {Platform, Text, TextInput, TouchableOpacity, View} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Colors} from '../../utils/colors';
import Text14 from '../Text/Text14';
import HelpTooltip from '../Tooltip/HelpTooltip';
import Icon from 'react-native-elements/dist/icons/Icon';

interface Props {
  label: string;
  value: string;
  isEmail?: boolean;
  isPhone?: boolean;
  isName?: boolean;
  isUsername?: boolean;
  isNumeric?: boolean;
  keyName: any;
  onChangeText?: (name, value) => void;
  handleDateOfBirth?: (dob)=> void;
  handleUserNameBlurEvent?: ()=> void
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
  keyName,
  handleDateOfBirth,
  handleUserNameBlurEvent
}) => {

    let day, month, year;
    if(keyName==="dob"){
        const dateValue = moment(new Date(value), 'DD/MM/YYYY');
        month = parseInt(dateValue.format('M'));
        year = parseInt(dateValue.format('Y'));
        day = parseInt(dateValue.format('D'));
    }

  //State variables
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date(year,month-1,day));
  //Async functions
  
  //Component functions
  const onChange = (event, selectedDateValue) => {
    const currentDate = selectedDateValue;
    setShow(Platform.OS === 'ios');
    if (currentDate !== undefined) {
      setDate(currentDate);
      handleDateOfBirth(currentDate);
    }
  };

  return (
    <View style={{marginTop: 20, marginHorizontal: 10}}>
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
              width: '98%',
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
          <TextInput
            keyboardType={isNumeric ? 'number-pad' : 'default'}
            style={{
              width: '90%',
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
            selectTextOnFocus={!(isName || isEmail || isPhone)}
          />
        )}

         
         { keyName !== 'dob' ? <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor:
                isName || isEmail || isPhone ? Colors.BLACK3 : Colors.TEXTDARK,
            }}>
            {isName || isEmail || isPhone ? (
              <HelpTooltip color={Colors.INFO_GREY} />
            ) : (
              <View style={{padding: 10}} />
            )}
          </View> :  <View style={{padding: 10}} /> }
        

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
