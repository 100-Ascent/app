import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {Colors} from '../../../utils/colors';
import Text16Normal from '../../Text/Text16Normal';
import Text24 from '../../Text/Text24';
import KlicksTooltip from '../../Tooltip/KlicksTooltip';

const DistanceTimeCard = ({
  defaultOption,
  selectedItem,
  toggleHandler,
  getData,
  value,
  setValue,
  klicks,
  setKlicks,
}) => {
  const option = ['Distance', 'Time'];

  var toggle = () => {
    toggleHandler();
    setKlicks(0);
    setValue(0);
  };

  const optionView = option.map((val, idx) => {
    return (
      <View
        key={idx}
        style={{
          flex: 1,
          borderWidth: 0,
          borderRadius: 10,
          marginHorizontal: 10,
          marginVertical: 10,
        }}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={toggle}
          disabled={!selectedItem.is_distance || defaultOption === idx}
          style={{
            width: '100%',
            borderRadius: 10,
            backgroundColor:
              defaultOption === idx ? Colors.CARDS_COLOR1 : Colors.TRANSPARENT,
            elevation: defaultOption === idx ? 10 : 0,
          }}>
          <View
            style={{
              alignItems: 'center',
              paddingHorizontal: 10,
              paddingTop: 5,
              paddingBottom: 8,
            }}>
            <Text16Normal
              text={val}
              textColor={
                defaultOption === idx
                  ? Colors.WHITE
                  : !selectedItem.is_distance
                  ? Colors.BLACK4
                  : Colors.TEXTDARK
              }
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  });

  return (
    <View
      style={{
        marginHorizontal: 20,
        backgroundColor: Colors.TEXT,
        borderRadius: 10,
        elevation: 3,
      }}>
      <View style={{flexDirection: 'row'}}>{optionView}</View>
      <View style={{flexDirection: 'row'}}>
        <View
          style={{
            flex: 4,
            flexDirection: 'row',
            margin: 10,
          }}>
          <View
            style={{
              flex: 3,
              backgroundColor: Colors.TEXT,
              borderRadius: 5,
              elevation: 3,
            }}>
            <TextInput
              value={value.toString()}
              keyboardType="numeric"
              maxLength={5}
              onChangeText={text => {
                const text_float = parseFloat(text);
                if (text.length === 0) {
                  setKlicks(0);
                } else {
                  setKlicks(
                    defaultOption === 0
                      ? parseFloat(selectedItem.ratio_d) * text_float
                      : parseFloat(selectedItem.ratio_t) * text_float,
                  );
                }
                setValue(text);
                getData(text);
              }}
              style={{
                paddingVertical: 5,
                paddingLeft: 15,
                color: Colors.TEXTDARK,
              }}
            />
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              elevation: 3,
              borderRadius: 5,
              backgroundColor: Colors.TEXT,
              marginLeft: 2,
            }}>
            <Text16Normal
              text={defaultOption === 0 ? 'km' : 'min'}
              textColor={Colors.TEXTDARK}
            />
          </View>
        </View>
        <View style={{flex: 0, justifyContent: 'center', marginRight: 10}}>
          <Text16Normal text="=" textColor={Colors.TEXTDARK} />
        </View>
        <View style={{flex: 3, justifyContent: 'center'}}>
          <View style={{flexDirection: 'row'}}>
            <Text24
              text={klicks.toFixed(2).toString()}
              textColor={Colors.YELLOW}
            />
            <View style={{justifyContent: 'flex-end', marginBottom: 3}}>
              <Text16Normal text=" Klicks" textColor={Colors.POPUP_RED} />
            </View>
            <View
              style={{
                justifyContent: 'center',
                marginTop: 10,
                marginLeft: 5,
              }}>
              <KlicksTooltip color={Colors.TEXTDARK} />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default DistanceTimeCard;
