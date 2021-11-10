import {StyleSheet} from 'react-native';
import { Colors } from '../../utils/colors';
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
    borderWidth: 2,
    borderRadius: 110,
    padding: 5,
    borderColor: Colors.RED
  },
  profilePhoto: {
    height: 120,
    width: 120,
    borderRadius: 100
  },
});
export default myProfileStyles;
