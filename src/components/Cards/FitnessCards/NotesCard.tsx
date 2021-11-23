import React from 'react';
import {View} from 'react-native';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import {Colors} from '../../../utils/colors';
import Text14 from '../../Text/Text14';
import Text16Bold from '../../Text/Text16Bold';
import Text16Normal from '../../Text/Text16Normal';

interface Props {}

const NotesCard: React.FC<Props> = ({}) => {
  //State variables
  const notes = [
      'Your Google Fit data will accumulate throughout the day and automatically post once per day, or when you manually post them from the Add an Acitivity page.', 
      'The connection with Google Fit is new and we are continuing to work on improving it',
      'Your Google Fit data will accumulate throughout the day and automatically post once per day, or when you manually post them from the Add an Acitivity page.', 
      'The connection with Google Fit is new and we are continuing to work on improving it',
     ];
  //Async functions

  //Component functions

  return (
    <View>
      <View style={{marginBottom: 0}}>
        <Text16Bold text={'Notes : '} textColor={Colors.TEXTDARK} />
      </View>
      {notes.map(val => {
        return (
          <View style={{ flexDirection:"row", marginTop: 10 }}>
            <View style={{ flex:1 }}>
                <Icon name="dot-single" type="entypo" color={Colors.INFO_YELLOW}  />
            </View>
            <View style={{ flex: 8, borderWidth: 1, borderColor: Colors.TRANSPARENT }}>
              <Text14 text={val} textColor={Colors.TEXTDARK} textStyle={{ textAlign: 'justify', fontFamily: 'Quicksand-Regular'}} />
            </View>            
          </View>
        );
      })}
    </View>
  );
};

export default NotesCard;
