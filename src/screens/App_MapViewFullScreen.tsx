import React, {useEffect, useRef, useState} from 'react';
import {RootNavProp, RootNavRouteProps} from '../routes/RootStackParamList';
import MapView, {
  Marker,
  PROVIDER_GOOGLE,
  Polyline as Poly,
  MapTypes,
} from 'react-native-maps';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Polyline from '@mapbox/polyline';

import FastImage from 'react-native-fast-image';
import DefaultLocationButton from '../components/Button/DefaultLocationButton';
import {HEIGHT} from '../utils/constants';
import Icon from 'react-native-elements/dist/icons/Icon';
import {Colors} from '../utils/colors';

interface Props {
  navigation: RootNavProp<'MapViewFullScreen'>;
  route: RootNavRouteProps<'MapViewFullScreen'>;
}

const MapViewFullScreen: React.FC<Props> = ({navigation, route}) => {
  const mapRef = useRef(null);
  const data = route.params.data;
  const [coords, setCoords] = useState([]);
  const [mapTypeToggle, setMapToggle] = useState<boolean>(true);
  const mapTypeData: MapTypes[] = ['hybrid', 'standard'];

  const handleInitialRegionButtonPressed = () => {
    mapRef.current.animateToRegion(data.initialRegion, 1000);
  };

  const getDirections = async () => {
    try {
      let points = Polyline.decode(
        '_i}}AutcaMq@uFc@{FIwAKuC`@OjCqANOlCyAnEeCfBgA`Aq@fAk@rBcAz@a@hA[fAWxAa@pDo@tBg@xGuBd@QREr@IL?VMrBa@hAMfAMxCClB?v@@|@Fd@?v@IbEQ`CQt@Gn@@rDGp@Bv@Pj@N\\@l@CROBOCm@EcADINMVO@I?US}CKgBh@Ah@Gp@Gt@QzBgAn@c@hAu@BK@Yr@Ir@BjBRzAEnC?rBAVGpA@hB?lEM`CG`BOfDOb@IRMj@YdAQv@K~@OzAc@lAUx@Kd@KrBU`BUvBo@fCe@zAYzAk@dDs@~Ac@f@OpC_@lEa@rEWrESBfB@THVJZB^@fABfCL|AFn@Hj@LxAJNALCBE@BZFh@Ft@Bf@Cg@O_BC[GGCAAK@_@KgA@WGq@G{@IoBEiDU{@CK?w@C{@fAITCdAOfASf@QZKxAm@|@Yf@KXAnBFb@@d@AhAMlA]`ASvDc@jBIdBUd@EfESzAO~Ck@|B_@jGwAxDu@xC_@nCg@lB]hCo@d@Mz@WrA]ZE~AE`IA|EAr@?~@Gr@ONMJKDE?[@k@PoAf@wCz@oF@m@QwA]aC]uBCa@S{@cAuFCo@Fw@pAgERy@Xc@~AaCn@oAJ]HQf@cBJKRIl@KZOTe@DSFc@@e@Cg@@a@F[HKx@]fAa@ZCrDGd@DPDFDFP?T[xBM~@?h@JpA@VInDCfE@nACp@MfAi@rBIn@DzC@vAJ`@xA~BlBrDj@vA^nAf@xA',
      );
      let coords = points.map((point, index) => {
        return {
          latitude: point[0],
          longitude: point[1],
        };
      });
      setCoords(coords);
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    getDirections();
  }, []);

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
          coordinates={coords}
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
