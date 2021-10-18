import React, {useRef} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import MapView, {
  Marker,
  PROVIDER_GOOGLE,
  Polyline as Poly,
  MapTypes,
  Callout,
} from 'react-native-maps';
import {useState} from 'react';
import {Colors} from '../../utils/colors';
import Icon from 'react-native-elements/dist/icons/Icon';
import ZoomInButton from '../Button/ZoomInButton';
import ZoomOutButton from '../Button/ZoomOutButtom';
import DefaultLocationButton from '../Button/DefaultLocationButton';
import {useNavigation} from '@react-navigation/core';
import Text14 from '../Text/Text14';
import {useSelector} from 'react-redux';
import {AppState} from '../../redux';

const mapTypeData: MapTypes[] = ['hybrid', 'standard'];

const MapViewComponent = ({
  region,
  initialRegion,
  tracks,
  currentMapIndex,
  trackCoordinates,
  handleInitialRegionButtonPressed,
  mapRef,
  zoomIn,
  zoomOut,
  onRegionChangeCompleteHandler,
  userLocation,
}) => {
  const navigation = useNavigation();
  const [mapTypeToggle, setMapToggle] = useState<boolean>(true);
  const markerRef = useRef(null);
  const currentTrackIndex = useSelector(
    (state: AppState) => state.rootStore.currentValue.index,
  );

  const onMapPress = e => {
    console.log(e.nativeEvent.coordinate);
  };

  const polylines = [];
  for (let i = 0; i < trackCoordinates.length; i++) {
    polylines.push({
      latitude: parseFloat(trackCoordinates[i].latitude),
      longitude: parseFloat(trackCoordinates[i].longitude),
    });
  }

  const polylinesCompleted = [];
  if (currentTrackIndex === currentMapIndex) {
    for (let i = 0; i < trackCoordinates.length - 1; i++) {
      const latitude = trackCoordinates[i].latitude;
      const longitude = trackCoordinates[i].longitude;
      if (
        latitude === userLocation.latitude &&
        longitude === userLocation.longitude
      ) {
        polylinesCompleted.push({
          latitude: parseFloat(latitude),
          longitude: parseFloat(longitude),
        });
        break;
      }

      polylinesCompleted.push({
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
      });
    }
  }

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
    <View style={styles.container}>
      <View style={styles.container}>
        <MapView
          followsUserLocation
          initialRegion={initialRegion}
          loadingEnabled
          mapType={mapTypeToggle ? mapTypeData[0] : mapTypeData[1]}
          onPress={e => onMapPress(e)}
          onRegionChangeComplete={x => onRegionChangeCompleteHandler(x)}
          paddingAdjustmentBehavior="automatic"
          provider={PROVIDER_GOOGLE}
          ref={mapRef}
          region={region}
          scrollEnabled
          showsScale
          showsUserLocation
          style={styles.map}
          zoomEnabled={false}>
          {tracks.map((marker, index) => {
            return (
              <Marker
                coordinate={{
                  latitude: parseFloat(marker.lat),
                  longitude: parseFloat(marker.long),
                }}
                ref={markerRef}
                icon={{
                  uri: 'https://static-data.100ascent.com/maps/flag-marker.png',
                }}
                key={index}
                title={marker.name}
                description={marker.description}
                onPress={() => {}}>
                <Callout
                  tooltip
                  onPress={() =>
                    navigation.navigate('CheckpointMilestoneScreen', {
                      data: marker,
                      current_distance: 0,
                      total_distance: 1,
                    })
                  }
                  style={styles.callout}>
                  <View style={{flexDirection: 'row'}}>
                    <View
                      style={{
                        flex: 3,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text14 text={marker.name} textColor={Colors.TEXTDARK} />
                    </View>
                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Icon name="chevron-right" />
                    </View>
                  </View>
                </Callout>
              </Marker>
            );
          })}
          <Poly
            coordinates={polylines}
            strokeColor={Colors.WHITE}
            fillColor={Colors.WHITE}
            strokeWidth={2}
          />
          <Poly
            coordinates={polylinesCompleted}
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
            left: 10,
            top: 10,
            flexDirection: 'column-reverse',
          }}>
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
          <MapButtonView>
            <ZoomOutButton zoomOut={zoomOut} />
          </MapButtonView>
          <MapButtonView>
            <ZoomInButton zoomIn={zoomIn} />
          </MapButtonView>
          <MapButtonView>
            <DefaultLocationButton
              handleSetInitialRegion={handleInitialRegionButtonPressed}
            />
          </MapButtonView>
        </View>
      </View>
    </View>
  );
};

export default MapViewComponent;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 450,
    zIndex: -10,
  },
  lockContainer: {
    ...StyleSheet.absoluteFillObject,
    height: 450,
    zIndex: -14,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  callout: {
    backgroundColor: Colors.TEXT,
    width: 150,
    borderRadius: 10,
  },
});
