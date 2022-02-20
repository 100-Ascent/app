import React, {useEffect} from 'react';
import {useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Colors} from '../../utils/colors';
import {RINGCOLORS} from '../../utils/constants/constants';
import { FONTS } from '../../utils/constants/fonts';
import FunFactCard from '../Cards/Challenges/MyChallenges/FunFactCard';
import KlicksToGoCard from '../Cards/Challenges/MyChallenges/KlicksToGoCard';
import DistanceComponent from '../DistanceComponent/DistanceComponent';
import JourneySliderComponent from '../JourneySlider/JourneySlider';
import Text14 from '../Text/Text14';

const TabView = ({children, onPress, isActive}) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          marginVertical: 10,
          paddingHorizontal: 0,
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: isActive
              ? Colors.CARDS_COLOR1
              : Colors.TRANSPARENT,
            borderRadius: 10,
            elevation: isActive ? 15 : 0,
          }}>
          {children}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const ThreeTabNavigator = ({
  tracks,
  tracksCoordinates,
  journeyData,
  handleMyJourneyMilestonePressed,
  distanceData,
  funfact,
  distance,
  userLocation,
  userJourneyIndex,
}) => {
  const [active, setActive] = useState(0);
  const [index, setIndex] = useState(0);

  const arr = journeyData.map((val, idx) => {
    return RINGCOLORS[0];
  });

  const handlePress = (i: number) => setActive(i);
  const getCurrentIndex = idx => {
    setIndex(idx);
  };

  const getComponent = () => {
    switch (active) {
      case 0:
        return (
          <JourneySliderComponent
            onPress={handleMyJourneyMilestonePressed}
            colorArray={arr}
            data={journeyData}
            journeyIndex={userJourneyIndex}
            funfact={funfact}
            fun_fact_start_color={tracks[index].fun_fact_start_color}
            fun_fact_end_color={tracks[index].fun_fact_end_color}
          />
        );
      case 1:
        return <></>;
      case 2:
        return (
          <>
            <DistanceComponent distanceData={distanceData} />
            <KlicksToGoCard distance={distance} />
            <View style={{padding: 10}} />
            <FunFactCard
              fact={funfact}
              startColor={tracks[index].fun_fact_start_color}
              endColor={tracks[index].fun_fact_end_color}
            />
          </>
        );
      default:
        return <View></View>;
    }
  };

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          marginHorizontal: 20,
        }}>
        
        <TabView isActive={active === 0} onPress={() => handlePress(0)}>
          <View style={{paddingVertical: 10}}>
            <Text14
              text="My Journey"
              textColor={active === 0 ? Colors.WHITE : Colors.TEXTDARK}
              textStyle={FONTS.REGULAR}
            />
          </View>
        </TabView>

        {/* <TabView isActive={active === 1} onPress={() => handlePress(1)}>
          <View style={{paddingVertical: 10}}>
            <Text14
              text="Tracks"
              textColor={active === 1 ? Colors.WHITE : Colors.TEXTDARK}
            />
          </View>
        </TabView> */}
        
        <TabView isActive={active === 2} onPress={() => handlePress(2)}>
          <View style={{paddingVertical: 10}}>
            <Text14
              text="My Distances"
              textColor={active === 2 ? Colors.WHITE : Colors.TEXTDARK}
              textStyle={FONTS.REGULAR}
            />
          </View>
        </TabView>

      </View>
      <View>{getComponent()}</View>
    </View>
  );
};

export default ThreeTabNavigator;
