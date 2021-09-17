import React from 'react';
import {View} from 'react-native';
import {Tooltip} from 'react-native-elements';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Colors} from '../../utils/colors';
import Text14 from '../Text/Text14';

const KlicksTooltip = ({color}) => {
  return (
    <View>
      <Tooltip
        popover={
          <Text14
            text={'1 Klick is equivalent to 1 km of walk'}
            textColor={Colors.TEXTDARK}
          />
        }
        width={200}
        height={50}
        backgroundColor={Colors.BLACK5}
        pointerColor={Colors.BLACK5}
        containerStyle={{elevation: 5, paddingVertical: 0}}
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

export default KlicksTooltip;
