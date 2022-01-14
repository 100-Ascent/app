import React from 'react';
import {View} from 'react-native';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import {Colors} from '../../../utils/colors';
import Text14 from '../../Text/Text14';
import Text16Bold from '../../Text/Text16Bold';

interface Props {
  notes: any;
  showHeader?: any;
  hasNumericBullets?: boolean;
}

const NotesCard: React.FC<Props> = ({notes, showHeader=true, hasNumericBullets=false}) => {
  //State variables

  //Async functions

  //Component functions
  
  return (
    <View>
      <View style={{marginBottom: 0}}>
        <Text16Bold text={showHeader ? 'Notes : ': ""} textColor={Colors.TEXTDARK} />
      </View>
      {notes.map((val,idx) => {
        return (
          <View style={{ flexDirection:"row", marginTop: showHeader ? 10: 0, paddingTop: showHeader ? 0 : 10 }}>
            <View style={{ flex: 1, alignItems: 'center' }}>
                { hasNumericBullets ? 
                  <Text14 text={ (idx+1) + "."} textColor={Colors.TEXTDARK}/> : <Icon name="dot-single" type="entypo" color={Colors.INFO_YELLOW}  /> }
            </View>
            <View style={{ flex: 8, paddingRight: 15, borderColor: Colors.TEXTDARK }}>
              <Text14 
                text={val} 
                textColor={Colors.TEXTDARK} textStyle={{ textAlign: 'justify', fontFamily: 'Quicksand-Regular'}} />
            </View>            
          </View>
        );
      })}
    </View>
  );
};

export default NotesCard;
