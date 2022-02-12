import {StyleSheet} from 'react-native';

export default StyleSheet.create({
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
});

export const styles = StyleSheet.create({
  shadowElevation3 : {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  shadowElevation1: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.00,
  }
})
