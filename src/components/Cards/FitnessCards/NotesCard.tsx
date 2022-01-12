import React from 'react';
import {View} from 'react-native';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import {Colors} from '../../../utils/colors';
import Text14 from '../../Text/Text14';
import Text16Bold from '../../Text/Text16Bold';
import Text16Normal from '../../Text/Text16Normal';

interface Props {
  notes: any;
  showHeader?: any;
}

const NotesCard: React.FC<Props> = ({notes, showHeader=true}) => {
  //State variables

  //Async functions

  //Component functions
  return (
    <View>
      <View style={{marginBottom: 0}}>
        <Text16Bold text={showHeader ? 'Notes : ': ""} textColor={Colors.TEXTDARK} />
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
