import {StyleSheet} from 'react-native';
const myProfileStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  menuWrapper: {
    marginTop: 20
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
    marginTop: 20,
  },
  circularImage: {
    borderWidth: 1,
    borderRadius: 100,
    padding: 5,
  },
  profilePhoto: {
    height: 120,
    width: 120,
  },
});
export default myProfileStyles;
