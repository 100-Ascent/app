import React from 'react';
import {useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Colors} from '../../utils/colors';
import FunFactCard from '../Cards/MyChallengeScreen_FunFactCard';
import DistanceComponent from '../DistanceComponent/DistanceComponent';
import JourneySliderComponent from '../JourneySlider/JourneySlider';
import MapViewSlider from '../MapView/MapViewSlider';
import Text14 from '../Text/Text14';

const TabView = ({children, onPress, isActive}) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={{flex: 1}}>
      <View
        style={{
          flex: 1,
          paddingVertical: 8,
          paddingHorizontal: 5,
        }}>
        <View
          style={{
            flex: 1,
            paddingVertical: 8,
            paddingHorizontal: 10,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: isActive
              ? Colors.CARDS_COLOR1
              : Colors.TRANSPARENT,
            borderRadius: 10,
          }}>
          {children}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const ThreeTabNavigator = ({
  tracks,
  journeyData,
  handleMyJourneyMilestonePressed,
  distanceData,
  funfact,
}) => {
  const [active, setActive] = useState(0);
  const [index, setIndex] = useState(0);
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
            data={journeyData}
            funfact={funfact}
          />
        );
      case 1:
        return (
          <>
            <View style={{height: 450}}>
              <MapViewSlider
                tracks={tracks}
                getCurrentIndex={getCurrentIndex}
              />
            </View>
            <FunFactCard fact={tracks[index].fun_fact} />
          </>
        );
      case 2:
        return (
          <>
            <DistanceComponent distanceData={distanceData} />
            <View style={{padding: 10}} />
            <FunFactCard fact={funfact} />
          </>
        );
      default:
        return <View></View>;
    }
  };

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1, flexDirection: 'row', marginHorizontal: 15}}>
        <TabView isActive={active === 0} onPress={() => handlePress(0)}>
          <Text14
            text="My Journey"
            textColor={active === 0 ? Colors.WHITE : Colors.TEXTDARK}
          />
        </TabView>
        <TabView isActive={active === 1} onPress={() => handlePress(1)}>
          <Text14
            text="Tracks"
            textColor={active === 1 ? Colors.WHITE : Colors.TEXTDARK}
          />
        </TabView>
        <TabView isActive={active === 2} onPress={() => handlePress(2)}>
          <Text14
            text="My Distances"
            textColor={active === 2 ? Colors.WHITE : Colors.TEXTDARK}
          />
        </TabView>
      </View>
      <View>{getComponent()}</View>
    </View>
  );
};

export default ThreeTabNavigator;
