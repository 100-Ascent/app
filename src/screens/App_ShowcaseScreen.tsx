import React from 'react'
import {  Dimensions,
    SafeAreaView,
    ScrollView,
    TouchableWithoutFeedback,View} from 'react-native';
import {RootNavProp, RootNavRouteProps} from '../routes/RootStackParamList';

import BackgroundVector from '../components/Background/BackgroundVector';
import Background from '../components/Background/StyledBackground';
import BadgesEarnedCard from '../components/Cards/ShowcaseScreen/BadgesEarnedCard';
import LongestStreakCard from '../components/Cards/ShowcaseScreen/LongestStreakCard';
import OverallStats from '../components/Cards/ShowcaseScreen/OverallStatsCard';
import SubscribedChallengesCard from '../components/Cards/ShowcaseScreen/SubscribedChallengesCard';
import TopActivityCard from '../components/Cards/ShowcaseScreen/TopActivityCard';
import UserImageandName from '../components/Cards/ShowcaseScreen/UserImageandName';

import globalStyles from '../styles/global/styles';
import ShowcaseStyles from '../styles/ShowcaseScreen/styles';
import { Colors } from '../utils/colors';

interface Props {
    navigation: RootNavProp<'ShowcaseScreen'>;
    route: RootNavRouteProps<'ShowcaseScreen'>;
  }

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height * 0.25;

const ShowcaseScreen: React.FC<Props> = ({navigation, route})=>{

    return(
    <SafeAreaView style={globalStyles.flex}>
        <Background startColor={Colors.TEXT} endColor={Colors.TEXT}>
            <ScrollView style={{flexGrow: 1}}>
                <BackgroundVector/>
                <View style={globalStyles.flex}>
                <View style={globalStyles.flex}>
                    <View style={ShowcaseStyles.paddingSpace} />
                    <UserImageandName 
                    name="User Name"
                    image='https://unsplash.it/400/400?image=1'
                    date="Jan 2021"/>
                    <View style={ShowcaseStyles.paddingSpace} />
                    <OverallStats/>
                    <View style={ShowcaseStyles.paddingSpace} />
                    <LongestStreakCard />
                    <View style={ShowcaseStyles.paddingSpace} />
                    <SubscribedChallengesCard/>
                    <View style={ShowcaseStyles.paddingSpace} />
                    <BadgesEarnedCard/>
                    <View style={ShowcaseStyles.paddingSpace} />
                    <TopActivityCard/>
                </View>
                </View>
                <View style={{padding:50}}/>
            </ScrollView>
        </Background>
    </SafeAreaView>

    )
}

export default ShowcaseScreen;