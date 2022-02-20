import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Colors} from '../../utils/colors';
import Text16Normal from '../Text/Text16Normal';

const CustomSwitch = ({currentTab, onPress}) => {
  const data = ["Description", "Rewards"];
  return (
    <View style={styles.container}>
       { 
        data.map((val,idx)=>{
          return <View style={{ flex: 1, marginLeft: idx === 0 ? 20 : 0, marginRight: idx === 1 ? 20 : 0 }} key={idx} >
            <TouchableOpacity onPress={onPress}>
                <Text16Normal
                  text={val}
                  textColor={currentTab === idx ? Colors.TEXT : Colors.TEXTDARK}
                  containerStyle={[ styles.tab, {
                    backgroundColor: currentTab === idx ? 
                      Colors.CARDS_COLOR1 : Colors.TRANSPARENT 
                    }]
                  }
                />
            </TouchableOpacity>
          </View>
      })}
    </View>
  );
};

export default CustomSwitch;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    flexDirection: 'row', 
    marginTop: 20
  },
  tab: {
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  }
})
