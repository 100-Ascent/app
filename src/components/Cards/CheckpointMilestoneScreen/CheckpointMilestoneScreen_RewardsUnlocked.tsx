import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-elements/dist/icons/Icon';
import { Colors } from '../../../utils/colors';
import RewardsCarousal from '../../Carousals/RewardsCarousal';
import Text16Normal from '../../Text/Text16Normal';

interface Props {
  onPress: (item: Object) => void;
  rewards: any;
}

const RewardsUnlockedCard: React.FC<Props> = ({ rewards, onPress }) => {
  return (
    <View
      style={{
        flex: 1,
        marginHorizontal: 15,
        backgroundColor: Colors.CARDS_COLOR2,
        borderRadius: 10,
        padding: 10,
      }}>
      <TouchableOpacity activeOpacity={0.8}>
        <View style={{ flex: 1 }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              borderColor: Colors.BLACK1,
              paddingVertical: 10,
            }}>
            <View style={{ flex: 1 }}>
              <Icon
                name="trophy"
                type="ionicon"
                size={25}
                color={Colors.WHITE}
              />
            </View>
            <View style={{ flex: 6, justifyContent: 'center' }}>
              <Text16Normal text="Rewards Unlocked" textColor={Colors.WHITE} />
            </View>
          </View>
        </View>
      </TouchableOpacity>
      <View style={{ flex: 1 }}>
        <RewardsCarousal data={rewards} onPress={onPress} />
      </View>
    </View>
  );
};

export default RewardsUnlockedCard;
