import React from 'react';
import {View} from 'react-native';
import {Tooltip} from 'react-native-elements';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import {Colors} from '../../utils/colors';
import Text14 from '../Text/Text14';

const ActivitiesToolTip = ({color, iconSize}) => {
  return (
    <View>
      <Tooltip
        popover={
          <Text14
            text={
              'Please note that activity from Google fit will only be added if no. of steps are more than 1400 (~ 1km)'
            }
            textColor={Colors.TEXTDARK}
          />
        }
        width={300}
        height={90}
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
          size={iconSize}
          color={color}
        />
      </Tooltip>
    </View>
  );
};

export default ActivitiesToolTip;
