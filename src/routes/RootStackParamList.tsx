import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

export type RootStackParamList = {
  AuthenticateScreen: undefined;
  MyProfileScreen: {data: any};
  EditMyProfileScreen: {data: any}
  AddActivityScreen: any;
  EditActivityScreen: {data: any};
  DataInListViewScreen: {data: any};
  FitnessIntegrationScreen : undefined;
  FitnessConnectionScreen: { data: any };
  LeaderboardScreen: undefined;


  HomeStack: undefined;
  FitnessStack: undefined;
  SettingsStack: undefined;
  LeaderboardStack: undefined;

  SettingScreen: undefined;
  ToggleSettingScreen: { data:any };
  
  BottomTabStack: undefined;


  DataLoaderScreen: undefined;
  AllChallengesScreen: undefined;
  ChallengeDescriptionScreen: {data: Object};
  OnboardingScreen: undefined;
  CommunityScreen: undefined;
  
  // EditActivityDataScreen: {data?: any; cd_id: any};
  // MyChallengeScreen: {data: Object; challengeId: Object};
  // UserProfileScreen: undefined;

  // CheckpointMilestoneScreen: {
  //   data: Object;
  //   current_distance: any;
  //   total_distance: any;
  // };

  // ShowcaseScreen: {
  //   data: Object;
  // };
  // MediaScreen: {data: any};
  // RewardsScreen: {data: any; name: any; icon: any};
  // MapViewFullScreen: {data: any};
};

export type RootNavRouteProps<T extends keyof RootStackParamList> = {
  navigation: StackNavigationProp<RootStackParamList, T>;
  route: RouteProp<RootStackParamList, T>;
  params: any;
};

export type RootNavProp<T extends keyof RootStackParamList = any> =
  StackNavigationProp<RootStackParamList, T>;
