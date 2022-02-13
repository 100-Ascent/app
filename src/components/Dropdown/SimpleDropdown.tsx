import React, { useState } from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import { styles } from '../../styles/Global/styles';
import {Colors} from '../../utils/colors';
import Text16Normal from '../Text/Text16Normal';

interface Props {
  data: any;
  selected: any;
  handleSelect?: (id: any) => void
}

const SimpleDropdown: React.FC<Props> = ({data, selected, handleSelect}) => {

  //State variables
  const [isExpanded, setIsExpanded] = useState(false);
  //Async functions
  const handlePress = () => {
    setIsExpanded(!isExpanded);
  }
  //Component functions

  return (
    <View
      style={[{
        marginHorizontal: 30,
        paddingVertical: 5,
        borderRadius: 10,
        elevation: 4,
        backgroundColor: Colors.TEXT,
      }, styles.shadowElevation3]}>
      <TouchableOpacity activeOpacity={0.5} onPress={handlePress}>
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', }}>
          <View style={{flex: 7, paddingLeft: 10}}>
            <Text16Normal text={selected.name} textColor={Colors.TEXTDARK} />
          </View>
          <View style={{flex: 1}}>
            <Icon name={ isExpanded ? "chevron-up" : "chevron-forward-outline"} type="ionicon" />
          </View>
        </View>
      </TouchableOpacity>
      {isExpanded ? <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', marginTop: 10, maxHeight: 100 }}>
        <ScrollView>
          {data.map(( val, id )=>{
            return <TouchableOpacity onPress={()=>{
              setIsExpanded(!isExpanded)
              handleSelect(val);
            }}>
              <View style={{flex: 1, paddingLeft: 10, paddingVertical: 5}}>
                <Text16Normal text={val.name} textColor={Colors.TEXTDARK} />
            </View>
            </TouchableOpacity>
          })}
          </ScrollView>
        </View> : null }
    </View>
  );
};

export default SimpleDropdown;
