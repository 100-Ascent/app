import React, {useState} from 'react';
import {
  Platform,
  TextInput,
  View,
  Text,
  FlatList,
  TouchableHighlight,
  TouchableNativeFeedback,
} from 'react-native';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {Colors} from '../../utils/colors';

interface Props {
  placeholder?: any;
  emptyMessage?: any;
  defaultValue?: any;
  disabled?: boolean;
  data?: any;
  onSelect?: any;
  inputStyles?: any;
  containerStyles?: any;
  emptyMessageStyles?: any;
  listStyles?: any;
  itemStyles?: any;
}

const RNSearchablePicker: React.FC<Props> = ({
  placeholder,
  emptyMessage,
  defaultValue = '',
  disabled,
  data,
  onSelect,
  inputStyles,
  containerStyles,
  emptyMessageStyles,
  listStyles,
  itemStyles,
}) => {
  const [inputValue, setInputValue] = useState(defaultValue);
  const [listVisibility, setListVisibility] = useState(false);
  const [filteredData, setFilteredData] = useState(data);

  const onChange = val => {
    setListVisibility(true);
    setInputValue(val);

    if (val.trim()) {
      const filtered = data.filter(item => item.name.includes(val));

      if (filtered.length) setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
  };

  return (
    <View style={{...containerStyles}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          borderBottomWidth: 1,
          backgroundColor: Colors.TEXT,
          borderRadius: 10,
          borderBottomColor: '#ccc',
        }}>
        <TextInput
          value={inputValue}
          editable={!disabled}
          onChangeText={onChange}
          placeholder={placeholder}
          style={{flex: 1, color: Colors.TEXTDARK, ...inputStyles}}
          onFocus={() => setListVisibility(true)}
          onPressOut={() => setListVisibility(false)}
        />
        {  disabled ? <></> : Platform.OS === 'android' ? (
          <TouchableNativeFeedback
            background={TouchableNativeFeedback.Ripple(null, true)}
            onPress={() => setListVisibility(!listVisibility)}>
            {listVisibility ? (
              <View
                style={{
                  paddingVertical: 5,
                  paddingHorizontal: 20,
                }}>
                <Icon name="chevron-down" type="ionicon" />
              </View>
            ) : (
              <View
                style={{
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  // flex: 1,
                  flexDirection: 'row',
                  paddingHorizontal: 15,
                  paddingVertical: 5,
                }}>
                <Icon
                  name="clear"
                  type="MaterialIcons"
                  size={18}
                  color={Colors.INFO_GREY} 
                  onPress={() => setInputValue('')}
                />
                <Icon name="search" size={18} color={Colors.INFO_GREY} type="ionicon" />
              </View>
            )}
          </TouchableNativeFeedback>
        ) : (
          <TouchableHighlight
            onPress={() => setListVisibility(!listVisibility)}>
            {listVisibility ? (
              <View style={{padding: 10}}>
                <Icon name="chevron-down" type="ionicon" />
              </View>
            ) : (
              <View style={{padding: 10}}>
                <Icon name="chevron-up" type="ionicon" />
              </View>
            )}
          </TouchableHighlight>
        )}
      </View>
      {listVisibility ? (
        <View>
          {Array.isArray(data) && data.length ? (
            <FlatList
              horizontal={false}
              keyboardShouldPersistTaps="handled"
              nestedScrollEnabled={true}
              style={{
                maxHeight: 150,
                borderWidth: 0,
                backgroundColor: Colors.TEXT,
                marginTop: 10,
                borderRadius: 10,
                elevation: 2,
                ...listStyles,
              }}
              data={filteredData}
              keyExtractor={item => item.id}
              renderItem={({item}) =>
                Platform.OS === 'android' ? (
                  <TouchableWithoutFeedback
                    onPress={() => {
                      onSelect(item);
                      setInputValue(item.name);
                      setListVisibility(false);
                    }}>
                    <Text
                      style={{
                        paddingVertical: 10,
                        paddingHorizontal: 10,
                        color: Colors.TEXTDARK,
                        ...itemStyles,
                      }}>
                      {item.name}
                    </Text>
                  </TouchableWithoutFeedback>
                ) : (
                  <TouchableHighlight
                    onPress={() => {
                      onSelect(item);
                      setInputValue(item.name);
                      setListVisibility(false);
                    }}>
                    <Text
                      style={{
                        paddingVertical: 10,
                        paddingHorizontal: 5,
                        color: Colors.TEXTDARK,
                        ...itemStyles,
                      }}>
                      {item.name}
                    </Text>
                  </TouchableHighlight>
                )
              }
            />
          ) : (
            <Text
              style={{
                textAlign: 'center',
                marginVertical: 5,
                color: Colors.TEXTDARK,
                ...emptyMessageStyles,
              }}>
              {emptyMessage}
            </Text>
          )}
        </View>
      ) : null}
    </View>
  );
};

export default RNSearchablePicker;
