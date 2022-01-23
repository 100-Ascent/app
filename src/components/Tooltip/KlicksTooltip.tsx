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
            text={'1 Klick is equivalent to 1 km of walking in terms of calories burnt. e.g. 1 km of cycling burns same number of calories as 0.35 km (klicks) of walking.'}
            textColor={Colors.TEXTDARK}
          />
        }
        width={280}
        height={100}
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
