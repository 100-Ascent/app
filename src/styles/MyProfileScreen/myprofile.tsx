import {StyleSheet} from 'react-native';
const myProfileStyles = StyleSheet.create({
  container: {
    flex: 1,
  },

  menuWrapper: {
    marginTop: 10,
  },
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
  profileWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  circularImage: {
    borderWidth: 1,
    borderRadius: 100,
    padding: 3,
  },
  profilePhoto: {
    height: 100,
    width: 100,
  },
});
export default myProfileStyles;
