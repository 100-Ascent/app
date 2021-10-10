import React, {useRef, useState} from 'react';
import {Dimensions, TouchableOpacity, View} from 'react-native';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import {Colors} from '../../utils/colors';
import Text28 from '../Text/Text28';
import MapSliderChanger from './MapSliderChanger';
import MapViewComponent from './MapView';
import {useNavigation} from '@react-navigation/native';
import {Region} from 'react-native-maps';

const MapViewSlider = ({
  tracks,
  trackCoordinates,
  getCurrentIndex,
  userLocation,
}) => {
  const navigation = useNavigation();
  const mapRef = useRef(null);
  let trackNames = [];
  let trackCentralLatLong = [];

  const data = tracks.map((val, idx) => {
    const obj = {
      latitude: parseFloat(val.centerLat),
      longitude: parseFloat(val.centerLong),
      latitudeDelta: 0.0922,
      longitudeDelta:
        0.0922 *
        (Dimensions.get('window').width / Dimensions.get('window').height),
    };
    trackNames.push(val.name);
    trackCentralLatLong.push(obj);
  });

  const trackCheckpointMap = new Map();
  for (let i = 0; i < tracks.length; i++) {
    trackCheckpointMap.set(tracks[i].order, tracks[i].checkpoints);
  }

  const trackCoordinatesMap = new Map();

  const getRefactoredCoordinates = coords => {
    let coordinatesArray = coords.map((point, index) => {
      return {
        latitude: point.lat,
        longitude: point.long,
      };
    });
    return coordinatesArray;
  };

  for (let i = 0; i < trackCoordinates.length; i++) {
    trackCoordinatesMap.set(
      i,
      getRefactoredCoordinates(trackCoordinates[i]['co-ordinates']),
    );
  }

  const [currentMapIndex, setMapIndex] = useState(0);
  const [initialRegion, setinitialRegion] = useState<Region>(
    trackCentralLatLong[0],
  );

  // Changing the region
  const [region, setRegion] = useState(trackCentralLatLong[0]);
  const onRegionChangeComplete = region => {
    setRegion(region);
  };

  // Left button
  const onLeftPressed = () => {
    const index = currentMapIndex;
    setinitialRegion(trackCentralLatLong[index - 1]);
    setRegion(trackCentralLatLong[index - 1]);
    getCurrentIndex(index - 1);
    setMapIndex(currentMapIndex - 1);
  };

  // Right button
  const onRightPressed = () => {
    const index = currentMapIndex;
    setinitialRegion(trackCentralLatLong[index + 1]);
    setRegion(trackCentralLatLong[index + 1]);
    getCurrentIndex(index + 1);
    setMapIndex(currentMapIndex + 1);
  };

  // Initial Region Button
  const handleInitialRegionButtonPressed = () => {
    mapRef.current.animateToRegion(initialRegion, 1000);
  };

  // Zoom In
  const handleZoomIn = () => {
    const newRegion = {
      latitude: region.latitude,
      longitude: region.longitude,
      latitudeDelta: region.latitudeDelta / 2,
      longitudeDelta: region.longitudeDelta / 2,
    };
    setRegion(newRegion);
    mapRef.current.animateToRegion(newRegion, 1000);
  };

  // Zoom Out
  const handleZoomOut = () => {
    const newRegion = {
      latitude: region.latitude,
      longitude: region.longitude,
      latitudeDelta: region.latitudeDelta * 2,
      longitudeDelta: region.longitudeDelta * 2,
    };
    setRegion(newRegion);
    mapRef.current.animateToRegion(newRegion, 1000);
  };

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1, flexDirection: 'row'}}>
        {currentMapIndex !== 0 ? (
          <View
            style={{
              position: 'absolute',
              left: 0,
              bottom: 0,
              height: '15%',
              justifyContent: 'center',
            }}>
            <MapSliderChanger
              sliderDirection={'left'}
              onPressed={onLeftPressed}
            />
          </View>
        ) : null}
        <MapViewComponent
          initialRegion={initialRegion}
          region={region}
          currentMapIndex={currentMapIndex}
          tracks={trackCheckpointMap.get(currentMapIndex)}
          trackCoordinates={trackCoordinatesMap.get(currentMapIndex)}
          userLocation={userLocation}
          handleInitialRegionButtonPressed={handleInitialRegionButtonPressed}
          mapRef={mapRef}
          zoomIn={handleZoomIn}
          zoomOut={handleZoomOut}
          onRegionChangeCompleteHandler={onRegionChangeComplete}
        />
        {currentMapIndex !== data.length - 1 ? (
          <View
            style={{
              position: 'absolute',
              right: 0,
              bottom: 0,
              height: '15%',
              justifyContent: 'center',
            }}>
            <MapSliderChanger
              sliderDirection={'right'}
              onPressed={onRightPressed}
            />
          </View>
        ) : null}

        <View
          style={{
            position: 'absolute',
            bottom: 0,
            height: '15%',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.3)',
            zIndex: -1,
          }}>
          <Text28
            text={
              currentMapIndex === 0
                ? trackNames[0]
                : trackNames[currentMapIndex]
            }
            textColor={Colors.TEXT}
          />
        </View>
        <View
          style={{
            position: 'absolute',
            right: 10,
            top: 10,
            backgroundColor: 'rgba(255,255,255,0.6)',
            borderRadius: 10,
          }}>
          <TouchableOpacity>
            <Icon
              name="fullscreen"
              type="materialicons"
              color={Colors.TEXTDARK}
              size={30}
              onPress={() =>
                navigation.navigate('MapViewFullScreen', {
                  data: {
                    initialRegion: trackCentralLatLong[currentMapIndex],
                    tracks: trackCheckpointMap.get(currentMapIndex),
                    trackCoordinates: trackCoordinatesMap.get(currentMapIndex),
                  },
                })
              }
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default MapViewSlider;
