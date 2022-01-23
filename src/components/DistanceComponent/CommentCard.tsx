import React from 'react';
import {View} from 'react-native';
import {Colors} from '../../utils/colors';
import Text14 from '../Text/Text14';
import MessageIcon from '../../../assets/icons/message.svg';
import GalleryIcon from '../../../assets/icons/gallery.svg';

const CommentCard = ({comment}) => {
  return (
    <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
      <View style={{flex: 1}}>
        <MessageIcon />
      </View>
      <View style={{flex: 6, justifyContent: 'center'}}>
        <Text14
          text={comment.length > 0 ? comment : '---'}
          textColor={Colors.TEXTDARK}
        />
      </View>
      <View style={{flex: 1, alignItems: 'flex-end'}}>
        {/* <GalleryIcon /> */}
      </View>
    </View>
  );
};

export default CommentCard;
