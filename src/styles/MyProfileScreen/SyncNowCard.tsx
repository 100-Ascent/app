import {StyleSheet} from 'react-native';
import { Colors } from '../../utils/colors';

const syncNowStyles = StyleSheet.create({
  
    logoView: {
        position: 'absolute',
        padding: 10,
        borderRadius: 80,
        width: 80,
        height: 80,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        elevation: 20,
        left: 0,
        top: 10,
        
    },
  
    cardContainer: {
        flexDirection: 'row',
        position: 'relative',
        borderRadius: 10,
        width: '88%'
    },
    
    contentView: {
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        width: '90%',
        paddingLeft: 25
    }
});
export default syncNowStyles;
