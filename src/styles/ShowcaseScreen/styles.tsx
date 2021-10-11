import {StyleSheet} from 'react-native';
import { Colors } from '../../utils/colors';

const ShowcaseStyles= StyleSheet.create({
paddingSpace:{
	padding: 10,
},
paddingSpace2:{
	padding: 5,
},

/*User Image an Name Card Styles*/
viewCard1: {
	alignItems: 'center',                    
  marginHorizontal: 20,
},
viewCard2: {
	alignItems: 'center',
  width: '100%',
  paddingTop: 15,
},
userImage: {
	height: 130, 
	width:130, 
	borderRadius:100
},

/*Overall Stats Card Styles*/
overall1: {
	flex: 1,
	marginHorizontal: 20,
	backgroundColor: Colors.TEXT,
	borderRadius: 10,
	elevation: 2,
	paddingBottom: 5,
},

overall2: {
	flex: 1,
	paddingTop: 10,
	flexDirection: 'row',
	marginHorizontal: 20,
},

overallRow: {
	flex: 1,
	paddingTop: 5,
	flexDirection: 'row',
	marginHorizontal: 10,
},

stats1: {
	flex: 1,
	borderRadius: 10,
	margin: 5,
},

iconStyle: {
	paddingHorizontal:10, 
	justifyContent:'center',
},

textStyle: {
	padding:10, 
	alignItems:'flex-start'
},

/*Top Activity Card */
activityImage: {
	height: 80, 
	width: 80, 
	borderRadius:100
},
activityText: {
	paddingHorizontal:20,
	paddingTop:5, 
	maxWidth:220,
},
activityRow: {
	flex: 1,
	flexDirection: 'row',
	marginHorizontal: 20,
},
}) 

export default ShowcaseStyles;