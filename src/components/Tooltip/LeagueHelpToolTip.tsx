import React from 'react';
import {View} from 'react-native';
import {Tooltip} from 'react-native-elements';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import {Colors} from '../../utils/colors';
import Text14 from '../Text/Text14';

const LeagueHelpToolTip = ({color}) => {
  return (
    <View>
      <Tooltip
        popover={
          <Text14
            text={
              'Top 10 advance to the next league'
            }
            textColor={Colors.TEXTDARK}
          />
        }
        width={200}
        height={60}
        backgroundColor={Colors.TEXT}
        pointerColor={Colors.TEXT}
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
          name="information-circle-outline"
          type="ionicon"
          size={18}
          color={color}
        />
      </Tooltip>
    </View>
  );
};

export default LeagueHelpToolTip;
