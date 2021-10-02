import {StyleSheet} from 'react-native';

const globalStyles = StyleSheet.create({
    flex: {
      flex: 1,
    },
    flexWithBorder: {
      flex: 1,
      borderWidth: 1,
    },
    flexWithBorderAndRadius10: {
      flex: 1,
      borderRadius: 10,
    },
    flexColumnJustifyCenter: {
      flexDirection: 'column',
      justifyContent: 'center',
    },
    flexColumnAlignCenter: {
      flexDirection: 'column',
      alignItems: 'center',
    },
    flexRowJustifyCenter: {
      flexDirection: 'row',
      justifyContent: 'center',
    },
    flexRowAlignCenter: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    flexAllCenter: {
      justifyContent: 'center',
      alignItems: 'center',
    },
  })
export default globalStyles;
