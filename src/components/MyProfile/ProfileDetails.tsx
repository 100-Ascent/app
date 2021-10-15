import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Icon} from 'react-native-elements';

interface Props {
  iconName: string;
  textField: string;
}

const ProfileDetails: React.FC<Props> = ({iconName, textField}) => {
  return (
    <View style={styles.menuItem}>
      <Icon name={iconName} type="material-icons" color="black" size={25} />
      <Text style={styles.menuItemText}>{textField}</Text>
    </View>
  );
};
export default ProfileDetails;

const styles = StyleSheet.create({
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  menuItemText: {
    color: '#777777',
    marginLeft: 10,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 26,
  },
});
