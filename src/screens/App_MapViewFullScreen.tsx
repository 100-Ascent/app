import React, {useRef, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';

import MapView, {
  Marker,
  PROVIDER_GOOGLE,
  Polyline as Poly,
  MapTypes,
} from 'react-native-maps';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-elements/dist/icons/Icon';

import DefaultLocationButton from '../components/Button/DefaultLocationButton';

import {Colors} from '../utils/colors';
import {HEIGHT} from '../utils/constants';
import {RootNavProp, RootNavRouteProps} from '../routes/RootStackParamList';

interface Props {
  navigation: RootNavProp<'MapViewFullScreen'>;
  route: RootNavRouteProps<'MapViewFullScreen'>;
}

const MapViewFullScreen: React.FC<Props> = ({navigation, route}) => {
  const mapRef = useRef(null);
  const data = route.params.data;
  const [mapTypeToggle, setMapToggle] = useState<boolean>(true);
  const mapTypeData: MapTypes[] = ['hybrid', 'standard'];

  const polylines = [];
  for (let i = 0; i < data.trackCoordinates.length; i++) {
    polylines.push({
      latitude: parseFloat(data.trackCoordinates[i].latitude),
      longitude: parseFloat(data.trackCoordinates[i].longitude),
    });
  }

  const handleInitialRegionButtonPressed = () => {
    mapRef.current.animateToRegion(data.initialRegion, 1000);
  };

  const MapButtonView = ({children}) => {
    return (
      <View
        style={{
          backgroundColor: mapTypeToggle
            ? 'rgba(255,255,255,0.6)'
            : 'rgba(255,255,255,0.9)',
          borderRadius: 50,
          marginTop: 5,
          height: 35,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {children}
      </View>
    );
  };

  return (
    <View style={{height: HEIGHT}}>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={data.initialRegion}
        region={data.initialRegion}
        paddingAdjustmentBehavior="automatic"
        mapType={mapTypeToggle ? mapTypeData[0] : mapTypeData[1]}
        zoomEnabled
        scrollEnabled
        showsScale={true}
        loadingEnabled={true}>
        {data.tracks.map((marker, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: parseFloat(marker.lat),
              longitude: parseFloat(marker.long),
            }}
            title={marker.name}
            description={marker.description}>
            <FastImage
              source={require('../../assets/icons/Flag.png')}
              style={{width: 40, height: 40}}
            />
          </Marker>
        ))}

        <Poly
          coordinates={polylines}
          strokeColor={'#A86C95'}
          fillColor="rgba(255,255,0,0.5)"
          strokeWidth={3}
        />
      </MapView>
      <View
        style={{
          borderRadius: 5,
          height: '80%',
          position: 'absolute',
          width: 35,
          left: 15,
          top: 10,
          flexDirection: 'column-reverse',
        }}>
        <MapButtonView>
          <DefaultLocationButton
            handleSetInitialRegion={handleInitialRegionButtonPressed}
          />
        </MapButtonView>
        <MapButtonView>
          <TouchableOpacity onPress={() => setMapToggle(!mapTypeToggle)}>
            <Icon
              name="terrain"
              type="materialicons"
              color={Colors.TEXTDARK}
              size={25}
            />
          </TouchableOpacity>
        </MapButtonView>
      </View>
    </View>
  );
};

export default MapViewFullScreen;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -10,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
