import React from 'react';
import {View} from 'react-native';
import {Tooltip} from 'react-native-elements';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import {Colors} from '../../utils/colors';
import Text14 from '../Text/Text14';

const HelpTooltip = ({color}) => {
  return (
    <View>
      <Tooltip
        popover={
          <Text14
            text={
              'To change your name, e-mail id or phone number, please contact us at support@100ascent.com'
            }
            textColor={Colors.TEXTDARK}
          />
        }
        width={250}
        height={80}
        backgroundColor={"#DFDFDF"}
        pointerColor={"#DFDFDF"}
        containerStyle={{elevation: 5, padding:0}}
        overlayColor={Colors.TRANSPARENT}
        ModalComponent={undefined}
        toggleOnPress={undefined}
        toggleAction={undefined}
        onOpen={undefined}
        withPointer={true}
        onClose={undefined}
        withOverlay={undefined}
        highlightColor={undefined}
        skipAndroidStatusBar={true}
        closeOnlyOnBackdropPress={undefined}>
        <Icon
          name="help-circle-outline"
          type="ionicon"
          size={18}
          color={color}
        />
      </Tooltip>
    </View>
  );
};

export default HelpTooltip;
