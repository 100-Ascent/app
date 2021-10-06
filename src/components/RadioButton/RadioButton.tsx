import React, {Component} from 'react';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import {Platform, StyleSheet, Text, View, ToastAndroid} from 'react-native';
import Text14 from '../Text/Text14';
import {Colors} from '../../utils/colors';

const radio_props = [
  {label: 'Male', value: 'Male'},
  {label: 'Female', value: 'Feale'},
  {label: 'Rather not Say', value: 'Rather not say'},
];
export default class MyProfileRadioComponent extends Component {
  render() {
    return (
      <View>
        <View style={{marginBottom: 20}}>
          <Text14 text="Gender" textColor={Colors.TEXTDARK} />
        </View>

        <RadioForm
          radio_props={radio_props}
          labelStyle={{marginRight: 10}}
          initial={1}
          buttonColor={'#6C6C6C'}
          formHorizontal={true}
          buttonWrapStyle={{marginRight: 10}}
          buttonSize={15}
          selectedButtonColor={'#6C6C6C'}
          onPress={value => {
            this.setState({value: value});
          }}
        />
      </View>
    );
  }
}
