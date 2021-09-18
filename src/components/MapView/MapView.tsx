import React, { useRef } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MapView, {
  Marker,
  PROVIDER_GOOGLE,
  Polyline as Poly,
  MapTypes,
  Callout,
} from 'react-native-maps';
import { useEffect } from 'react';
import Polyline from '@mapbox/polyline';
import { useState } from 'react';
import { Colors } from '../../utils/colors';
import Icon from 'react-native-elements/dist/icons/Icon';
import ZoomInButton from '../Button/ZoomInButton';
import ZoomOutButton from '../Button/ZoomOutButtom';
import DefaultLocationButton from '../Button/DefaultLocationButton';
import { useNavigation } from '@react-navigation/core';
import Text14 from '../Text/Text14';

const mapTypeData: MapTypes[] = ['hybrid', 'standard'];

const MapViewComponent = ({
  region,
  initialRegion,
  tracks,
  handleInitialRegionButtonPressed,
  mapRef,
  zoomIn,
  zoomOut,
  onRegionChangeCompleteHandler,
}) => {
  const navigation = useNavigation();

  const [mapTypeToggle, setMapToggle] = useState<boolean>(true);
  const [coords, setCoords] = useState([]);
  const markerRef = useRef(null);

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

  const onMapPress = e => {
    console.log(e.nativeEvent.coordinate);
  };

  const polylines = [];
  for (let i = 0; i < tracks.length; i++) {
    polylines.push({
      latitude: parseFloat(tracks[i].lat),
      longitude: parseFloat(tracks[i].long),
    });
  }
  const polylinesCompleted = [];
  // for (let i = 0; i < tracks.length - 1; i++) {
  //   polylinesCompleted.push({
  //     latitude: parseFloat(tracks[i].lat),
  //     longitude: parseFloat(tracks[i].long),
  //   });
  // }

  const data = [
    { latitude: '15.55616', longitude: '73.75195' },
    { latitude: '15.55641', longitude: '73.75318' },
    { latitude: '15.55659', longitude: '73.75444' },
    { latitude: '15.55664', longitude: '73.75488' },
    { latitude: '15.5567', longitude: '73.75563' },
    { latitude: '15.55653', longitude: '73.75571' },
    { latitude: '15.55583', longitude: '73.75612' },
    { latitude: '15.55575', longitude: '73.7562' },
    { latitude: '15.55504', longitude: '73.75665' },
    { latitude: '15.554', longitude: '73.75732' },
    { latitude: '15.55348', longitude: '73.75768' },
    { latitude: '15.55315', longitude: '73.75793' },
    { latitude: '15.55279', longitude: '73.75815' },
    { latitude: '15.55221', longitude: '73.75849' },
    { latitude: '15.55191', longitude: '73.75866' },
    { latitude: '15.55154', longitude: '73.7588' },
    { latitude: '15.55118', longitude: '73.75892' },
    { latitude: '15.55073', longitude: '73.75909' },
    { latitude: '15.54984', longitude: '73.75933' },
    { latitude: '15.54925', longitude: '73.75953' },
    { latitude: '15.54784', longitude: '73.76012' },
    { latitude: '15.54765', longitude: '73.76021' },
    { latitude: '15.54755', longitude: '73.76024' },
    { latitude: '15.54729', longitude: '73.76029' },
    { latitude: '15.54722', longitude: '73.76029' },
    { latitude: '15.5471', longitude: '73.76036' },
    { latitude: '15.54652', longitude: '73.76053' },
    { latitude: '15.54615', longitude: '73.7606' },
    { latitude: '15.54579', longitude: '73.76067' },
    { latitude: '15.54502', longitude: '73.76069' },
    { latitude: '15.54447', longitude: '73.76069' },
    { latitude: '15.54419', longitude: '73.76068' },
    { latitude: '15.54388', longitude: '73.76064' },
    { latitude: '15.54369', longitude: '73.76064' },
    { latitude: '15.54341', longitude: '73.76069' },
    { latitude: '15.54243', longitude: '73.76078' },
    { latitude: '15.54178', longitude: '73.76087' },
    { latitude: '15.54151', longitude: '73.76091' },
    { latitude: '15.54127', longitude: '73.7609' },
    { latitude: '15.54037', longitude: '73.76094' },
    { latitude: '15.54012', longitude: '73.76092' },
    { latitude: '15.53984', longitude: '73.76083' },
    { latitude: '15.53962', longitude: '73.76075' },
    { latitude: '15.53947', longitude: '73.76074' },
    { latitude: '15.53924', longitude: '73.76076' },
    { latitude: '15.53914', longitude: '73.76084' },
    { latitude: '15.53912', longitude: '73.76092' },
    { latitude: '15.53914', longitude: '73.76115' },
    { latitude: '15.53917', longitude: '73.76149' },
    { latitude: '15.53914', longitude: '73.76154' },
    { latitude: '15.53906', longitude: '73.76161' },
    { latitude: '15.53894', longitude: '73.76169' },
    { latitude: '15.53893', longitude: '73.76174' },
    { latitude: '15.53893', longitude: '73.76185' },
    { latitude: '15.53903', longitude: '73.76264' },
    { latitude: '15.53909', longitude: '73.76316' },
    { latitude: '15.53888', longitude: '73.76317' },
    { latitude: '15.53867', longitude: '73.76321' },
    { latitude: '15.53842', longitude: '73.76325' },
    { latitude: '15.53815', longitude: '73.76334' },
    { latitude: '15.53753', longitude: '73.7637' },
    { latitude: '15.53729', longitude: '73.76388' },
    { latitude: '15.53692', longitude: '73.76415' },
    { latitude: '15.5369', longitude: '73.76421' },
    { latitude: '15.53689', longitude: '73.76434' },
    { latitude: '15.53663', longitude: '73.76439' },
    { latitude: '15.53637', longitude: '73.76437' },
    { latitude: '15.53583', longitude: '73.76427' },
    { latitude: '15.53537', longitude: '73.7643' },
    { latitude: '15.53465', longitude: '73.7643' },
    { latitude: '15.53407', longitude: '73.76431' },
    { latitude: '15.53395', longitude: '73.76435' },
    { latitude: '15.53354', longitude: '73.76434' },
    { latitude: '15.53301', longitude: '73.76434' },
    { latitude: '15.53198', longitude: '73.76441' },
    { latitude: '15.53133', longitude: '73.76445' },
    { latitude: '15.53084', longitude: '73.76453' },
    { latitude: '15.53', longitude: '73.76461' },
    { latitude: '15.52982', longitude: '73.76466' },
    { latitude: '15.52972', longitude: '73.76473' },
    { latitude: '15.5295', longitude: '73.76486' },
    { latitude: '15.52915', longitude: '73.76495' },
    { latitude: '15.52887', longitude: '73.76501' },
    { latitude: '15.52855', longitude: '73.76509' },
    { latitude: '15.52809', longitude: '73.76527' },
    { latitude: '15.5277', longitude: '73.76538' },
    { latitude: '15.52741', longitude: '73.76544' },
    { latitude: '15.52722', longitude: '73.7655' },
    { latitude: '15.52664', longitude: '73.76561' },
    { latitude: '15.52615', longitude: '73.76572' },
    { latitude: '15.52555', longitude: '73.76596' },
    { latitude: '15.52487', longitude: '73.76615' },
    { latitude: '15.52441', longitude: '73.76628' },
    { latitude: '15.52395', longitude: '73.7665' },
    { latitude: '15.52312', longitude: '73.76676' },
    { latitude: '15.52264', longitude: '73.76694' },
    { latitude: '15.52244', longitude: '73.76702' },
    { latitude: '15.52171', longitude: '73.76718' },
    { latitude: '15.52068', longitude: '73.76735' },
    { latitude: '15.51962', longitude: '73.76747' },
    { latitude: '15.51856', longitude: '73.76757' },
    { latitude: '15.51854', longitude: '73.76705' },
    { latitude: '15.51853', longitude: '73.76694' },
    { latitude: '15.51848', longitude: '73.76682' },
    { latitude: '15.51842', longitude: '73.76668' },
    { latitude: '15.5184', longitude: '73.76652' },
    { latitude: '15.51839', longitude: '73.76616' },
    { latitude: '15.51837', longitude: '73.76548' },
    { latitude: '15.5183', longitude: '73.76501' },
    { latitude: '15.51826', longitude: '73.76477' },
    { latitude: '15.51821', longitude: '73.76455' },
    { latitude: '15.51814', longitude: '73.7641' },
    { latitude: '15.51808', longitude: '73.76402' },
    { latitude: '15.51809', longitude: '73.76395' },
    { latitude: '15.51811', longitude: '73.76393' },
    { latitude: '15.51814', longitude: '73.76392' },
    { latitude: '15.51812', longitude: '73.76378' },
    { latitude: '15.51808', longitude: '73.76357' },
    { latitude: '15.51804', longitude: '73.7633' },
    { latitude: '15.51802', longitude: '73.7631' },
    { latitude: '15.51804', longitude: '73.7633' },
    { latitude: '15.51812', longitude: '73.76378' },
    { latitude: '15.51814', longitude: '73.76392' },
    { latitude: '15.51818', longitude: '73.76396' },
    { latitude: '15.5182', longitude: '73.76397' },
    { latitude: '15.51821', longitude: '73.76403' },
    { latitude: '15.5182', longitude: '73.76419' },
    { latitude: '15.51826', longitude: '73.76455' },
    { latitude: '15.51825', longitude: '73.76467' },
    { latitude: '15.51829', longitude: '73.76492' },
    { latitude: '15.51833', longitude: '73.76522' },
    { latitude: '15.51838', longitude: '73.76578' },
    { latitude: '15.51841', longitude: '73.76663' },
    { latitude: '15.51852', longitude: '73.76693' },
    { latitude: '15.51854', longitude: '73.76699' },
    { latitude: '15.51854', longitude: '73.76727' },
    { latitude: '15.51856', longitude: '73.76757' },
    { latitude: '15.5182', longitude: '73.76762' },
    { latitude: '15.51809', longitude: '73.76764' },
    { latitude: '15.51774', longitude: '73.76772' },
    { latitude: '15.51738', longitude: '73.76782' },
    { latitude: '15.51718', longitude: '73.76791' },
    { latitude: '15.51704', longitude: '73.76797' },
    { latitude: '15.51659', longitude: '73.7682' },
    { latitude: '15.51628', longitude: '73.76833' },
    { latitude: '15.51608', longitude: '73.76839' },
    { latitude: '15.51595', longitude: '73.7684' },
    { latitude: '15.51539', longitude: '73.76836' },
    { latitude: '15.51521', longitude: '73.76835' },
    { latitude: '15.51502', longitude: '73.76836' },
    { latitude: '15.51465', longitude: '73.76843' },
    { latitude: '15.51426', longitude: '73.76858' },
    { latitude: '15.51393', longitude: '73.76868' },
    { latitude: '15.51301', longitude: '73.76886' },
    { latitude: '15.51247', longitude: '73.76891' },
    { latitude: '15.51196', longitude: '73.76902' },
    { latitude: '15.51177', longitude: '73.76905' },
    { latitude: '15.51077', longitude: '73.76915' },
    { latitude: '15.51031', longitude: '73.76923' },
    { latitude: '15.50951', longitude: '73.76945' },
    { latitude: '15.50888', longitude: '73.76961' },
    { latitude: '15.50754', longitude: '73.77005' },
    { latitude: '15.50661', longitude: '73.77032' },
    { latitude: '15.50584', longitude: '73.77048' },
    { latitude: '15.50512', longitude: '73.77068' },
    { latitude: '15.50457', longitude: '73.77083' },
    { latitude: '15.50388', longitude: '73.77107' },
    { latitude: '15.50369', longitude: '73.77114' },
    { latitude: '15.50339', longitude: '73.77126' },
    { latitude: '15.50297', longitude: '73.77141' },
    { latitude: '15.50283', longitude: '73.77144' },
    { latitude: '15.50235', longitude: '73.77147' },
    { latitude: '15.50074', longitude: '73.77148' },
    { latitude: '15.49963', longitude: '73.77149' },
    { latitude: '15.49937', longitude: '73.77149' },
    { latitude: '15.49905', longitude: '73.77153' },
    { latitude: '15.49879', longitude: '73.77161' },
    { latitude: '15.49871', longitude: '73.77168' },
    { latitude: '15.49865', longitude: '73.77174' },
    { latitude: '15.49862', longitude: '73.77177' },
    { latitude: '15.49862', longitude: '73.77191' },
    { latitude: '15.49861', longitude: '73.77213' },
    { latitude: '15.49852', longitude: '73.77253' },
    { latitude: '15.49832', longitude: '73.77329' },
    { latitude: '15.49802', longitude: '73.77449' },
    { latitude: '15.49801', longitude: '73.77472' },
    { latitude: '15.4981', longitude: '73.77516' },
    { latitude: '15.49825', longitude: '73.77581' },
    { latitude: '15.4984', longitude: '73.7764' },
    { latitude: '15.49842', longitude: '73.77657' },
    { latitude: '15.49852', longitude: '73.77687' },
    { latitude: '15.49886', longitude: '73.7781' },
    { latitude: '15.49888', longitude: '73.77834' },
    { latitude: '15.49884', longitude: '73.77862' },
    { latitude: '15.49843', longitude: '73.77962' },
    { latitude: '15.49833', longitude: '73.77991' },
    { latitude: '15.4982', longitude: '73.78009' },
    { latitude: '15.49772', longitude: '73.78074' },
    { latitude: '15.49748', longitude: '73.78114' },
    { latitude: '15.49742', longitude: '73.78129' },
    { latitude: '15.49737', longitude: '73.78138' },
    { latitude: '15.49717', longitude: '73.78188' },
    { latitude: '15.49711', longitude: '73.78194' },
    { latitude: '15.49701', longitude: '73.78199' },
    { latitude: '15.49678', longitude: '73.78205' },
    { latitude: '15.49664', longitude: '73.78213' },
    { latitude: '15.49653', longitude: '73.78232' },
    { latitude: '15.4965', longitude: '73.78242' },
    { latitude: '15.49646', longitude: '73.7826' },
    { latitude: '15.49645', longitude: '73.78279' },
    { latitude: '15.49647', longitude: '73.78299' },
    { latitude: '15.49646', longitude: '73.78316' },
    { latitude: '15.49642', longitude: '73.7833' },
    { latitude: '15.49637', longitude: '73.78336' },
    { latitude: '15.49608', longitude: '73.78351' },
    { latitude: '15.49572', longitude: '73.78368' },
    { latitude: '15.49558', longitude: '73.7837' },
    { latitude: '15.49468', longitude: '73.78374' },
    { latitude: '15.49449', longitude: '73.78371' },
    { latitude: '15.4944', longitude: '73.78368' },
    { latitude: '15.49436', longitude: '73.78365' },
    { latitude: '15.49432', longitude: '73.78356' },
    { latitude: '15.49432', longitude: '73.78345' },
    { latitude: '15.49446', longitude: '73.78284' },
    { latitude: '15.49453', longitude: '73.78252' },
    { latitude: '15.49453', longitude: '73.78231' },
    { latitude: '15.49447', longitude: '73.7819' },
    { latitude: '15.49446', longitude: '73.78178' },
    { latitude: '15.49451', longitude: '73.7809' },
    { latitude: '15.49453', longitude: '73.7799' },
    { latitude: '15.49452', longitude: '73.7795' },
    { latitude: '15.49454', longitude: '73.77925' },
    { latitude: '15.49461', longitude: '73.77889' },
    { latitude: '15.49482', longitude: '73.77831' },
    { latitude: '15.49487', longitude: '73.77807' },
    { latitude: '15.49484', longitude: '73.77729' },
    { latitude: '15.49483', longitude: '73.77685' },
    { latitude: '15.49477', longitude: '73.77668' },
    { latitude: '15.49432', longitude: '73.77604' },
    { latitude: '15.49377', longitude: '73.77514' },
    { latitude: '15.49355', longitude: '73.7747' },
    { latitude: '15.49339', longitude: '73.7743' },
    { latitude: '15.49319', longitude: '73.77385' },
  ];

  for (let i = 0; i < data.length - 1; i++) {
    polylinesCompleted.push({
      latitude: parseFloat(data[i].latitude),
      longitude: parseFloat(data[i].longitude),
    });
  }

  const MapButtonView = ({ children }) => {
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
  console.log(tracks[0]);
  return (
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
        {tracks.map((marker, index) => (
          <Marker
            ref={markerRef}
            key={index}
            coordinate={{
              latitude: parseFloat(marker.lat),
              longitude: parseFloat(marker.long),
            }}
            title={marker.name}
            description={marker.description}
            onPress={() => { }}>
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
              <View style={{ flexDirection: 'row' }}>
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
          left: 5,
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
  );
};

export default MapViewComponent;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 450,
    zIndex: -10,
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
