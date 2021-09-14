// import React, { useEffect } from 'react';
// import { View, SafeAreaView, StyleSheet } from 'react-native';
// import Background from '../components/Background/StyledBackground';
// import Animated, {
//   useSharedValue,
//   useAnimatedStyle,
//   withSpring,
//   withRepeat,
//   useAnimatedGestureHandler,
// } from 'react-native-reanimated';

// const SIZE = 100.0;

// const UserProfileScreen = () => {
//   const progress = useSharedValue(1);
//   const scale = useSharedValue(2);

//   const reanimatedStyle = useAnimatedStyle(() => {
//     return {
//       // opacity: progress.value,
//       // borderRadius: (progress.value * SIZE) / 2,
//       transform: [{ scale: scale.value }],
//     };
//   }, []);

//   useEffect(() => {
//     // progress.value = withRepeat(withSpring(0.5), -1, true);
//     scale.value = withRepeat(withSpring(1), -1, true);
//   }, []);

//   return (
//     <SafeAreaView style={{ flex: 1 }}>
//       <Background>
//         <View style={{ flex: 1, padding: 16 }}>
//           <View style={styles.container}>
//             <Animated.View
//               style={[
//                 { height: SIZE, width: SIZE, backgroundColor: 'blue' },
//                 reanimatedStyle,
//               ]}
//             />
//           </View>
//         </View>
//       </Background>
//     </SafeAreaView>
//   );
// };

// export default UserProfileScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'white',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });


import React from 'react';
import { Dimensions } from 'react-native';
import { StyleSheet, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
const styles = StyleSheet.create({
 container: {
   ...StyleSheet.absoluteFillObject,
   height: Dimensions.get('window').height,
   width: 400,
   justifyContent: 'flex-end',
   alignItems: 'center',
 },
 map: {
   ...StyleSheet.absoluteFillObject,
 },
});

const UserProfileScreen=() => {
   return <View style={styles.container}>
     <MapView
       provider={PROVIDER_GOOGLE} // remove if not using Google Maps
       style={styles.map}
       region={{
         latitude: 37.78825,
         longitude: -122.4324,
         latitudeDelta: 0.015,
         longitudeDelta: 0.0121,
       }}
     >
     </MapView>
   </View>
};

export default UserProfileScreen