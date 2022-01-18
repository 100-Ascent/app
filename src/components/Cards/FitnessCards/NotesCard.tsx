import React from 'react';
import {View} from 'react-native';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import {Colors} from '../../../utils/colors';
import { applyBoldToRules } from '../../../utils/services/text-utils';
import Text14 from '../../Text/Text14';
import Text16Bold from '../../Text/Text16Bold';

interface Props {
  notes: any;
  showHeader?: any;
  hasNumericBullets?: boolean;
}

const NotesCard: React.FC<Props> = ({notes, showHeader=true, hasNumericBullets=false}) => {
  //State variables
  // notes = ["“X” being xxxx4cccc Manual Klicks for Air League, xxxx8cccc Manual Klicks for Water League, xxxx12cccc Manual Klicks for Earth League, xxxx16cccc Manual Klicks for Ether League, & xxxx20cccc Manual Klicks for Fire League."]
  //Async functions
  const formatText = (str: string) => {
    let finalString = "";   
    var regex = /x{4}/g, result, startIdx = [], endIdx = [];
    while ( (result = regex.exec(str)) ) 
      startIdx.push(result.index); 
    
    regex = /c{4}/g;
    while ( (result = regex.exec(str)) )
      endIdx.push(result.index);

    let value, valueArray = [];
    let start = 0;
    for(let i=0;i<startIdx.length; i++){
      value = str.substr( startIdx[i] + 4, endIdx[i] - startIdx[i] - 4 );
      valueArray.push(value);
      finalString += str.substr(start, startIdx[i]-start);  
      finalString += "{" + i + "}";     
      start = endIdx[i] + 4;
    }
    finalString += str.substr(start, str.length-start);
    const info = {
      sentence: finalString,
      boldText: valueArray
    };
    return applyBoldToRules(info);
  }

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
              {formatText(val)}
            </View>            
          </View>
        );
      })}
    </View>
  );
};

export default NotesCard;
