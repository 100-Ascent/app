import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

export type RootStackParamList = {
  AuthenticateScreen: undefined;

  HomeStack: undefined;
  BottomTabStack: undefined;

  AllChallengesScreen: undefined;
  ChallengeDescriptionScreen: {data: Object};

  CommunityScreen: undefined;
  PostDataScreen: undefined;
  MyChallengeScreen: {data: Object; challengeId: Object};
  UserProfileScreen: undefined;

  CheckpointMilestoneScreen: {
    data: Object;
    current_distance: any;
    total_distance: any;
  };

  ShowcaseScreen: {
    data: Object;
  };
  MediaScreen: {data: any};
  RewardsScreen: {data: any; name: any; icon: any};
  MapViewFullScreen: {data: any};
};

export type RootNavRouteProps<T extends keyof RootStackParamList> = {
  navigation: StackNavigationProp<RootStackParamList, T>;
  route: RouteProp<RootStackParamList, T>;
  params: any;
};

export type RootNavProp<T extends keyof RootStackParamList = any> =
  StackNavigationProp<RootStackParamList, T>;
