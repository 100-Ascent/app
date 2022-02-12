import React from 'react';
import {Platform, TextInput, View} from 'react-native';
import {Colors} from '../../../utils/colors';
import Text16Normal from '../../Text/Text16Normal';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import Text14 from '../../Text/Text14';
const AddCommentImageCard = ({comment, onCommentChange}) => {
  return (
    <View
      style={{
        marginHorizontal: 20,
        backgroundColor: Colors.TEXT,
        borderRadius: 10,
        elevation: 2,
      }}>
      <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
        <View style={{paddingTop: 5, paddingRight: 15}}>
          <Text14 text={'*optional'} textColor={Colors.BLACK4} />
        </View>
      </View>
      <View style={{flex: 1, paddingHorizontal: 20}}>
        <Text16Normal
          text="What do you have to say?"
          textColor={Colors.TEXTDARK}
        />
      </View>
      <View
        style={{
          flex: 1,
          marginHorizontal: 20,
          paddingVertical: 20,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          
        }}>
        <TextInput
          value={comment}
          onChangeText={text => onCommentChange(text)}
          placeholder={'Add a comment...'}
          placeholderTextColor={'#A3A3A3'}
          style={{
            backgroundColor: Colors.BLACK5,
            paddingLeft: 10,
            paddingVertical: 10,
            color: Colors.TEXTDARK,
            flex: 1,
            borderRadius: 10,
            marginRight:10
          }}
        />
        <Icon
          name="clear"
          type="MaterialIcons"
          onPress={() => onCommentChange('')}
        />
      </View>
    </View>
  );
};

export default AddCommentImageCard;
