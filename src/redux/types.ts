import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {AppState} from '.';

export const SET_USER = 'SET_USER';
export const SET_NOTIFYTOKEN = 'SET_NOTIFYTOKEN';
export const SET_CONTEXTID = 'SET_CONTEXTID';
export const SET_CURRENT_VALUES = 'SET_CURRENT_VALUES';
export const SET_JOURNEY_INDEX = 'SET_JOURNEY_INDEX';
export const SET_ACTIVITIES = 'SET_ACTIVITIES';
export const SET_EMAIL_VERIFIED = "SET_EMAIL_VERIFIED";
export const SET_HEART_BEAT_CONFIG = "SET_HEART_BEAT_CONFIG";

export interface UserType {
  user: any;
}

export interface NotificationType {
  notifyToken: string;
}

export interface ContextIdType {
  contextId: string;
}

export interface CurrentValueType {
  distance: any;
  index: any;
}

export interface JourneyIndexType {
  index: any;
}

export interface ActivitiesDataType {
  data: any;
}

export interface EmailVerifiedType {
  isEmailVerified: any;
}

export interface HeartBeatConfigType {
  heart_beat_timeout: number;
  heart_beat_toggle: boolean;
}

export interface ReduxState {
  user: UserType | null;
  notifyToken: NotificationType | null;
  contextId: ContextIdType | null;
  currentValue: CurrentValueType;
  journeyIndex: JourneyIndexType;
  activityData: ActivitiesDataType;
  email: EmailVerifiedType;
  heartBeatConfig : HeartBeatConfigType; 
}

export interface SetUserActionTypes {
  type: typeof SET_USER;
  payload: UserType | null;
}

export interface SetNotifyTokenActionTypes {
  type: typeof SET_NOTIFYTOKEN;
  payload: NotificationType | null;
}

export interface SetContextIdActionTypes {
  type: typeof SET_CONTEXTID;
  payload: ContextIdType | null;
}

export interface SetCurrentValueActionTypes {
  type: typeof SET_CURRENT_VALUES;
  payload: CurrentValueType | null;
}

export interface SetJourneyIndexActionTypes {
  type: typeof SET_JOURNEY_INDEX;
  payload: JourneyIndexType | null;
}

export interface SetActivitDataActionTypes {
  type: typeof SET_ACTIVITIES;
  payload: ActivitiesDataType | null;
}


export interface SetEmailVerifiedActionTypes {
  type: typeof SET_EMAIL_VERIFIED;
  payload: EmailVerifiedType | null;
}

export interface SetHeartBeatConfigTypes {
  type: typeof SET_HEART_BEAT_CONFIG;
  payload : HeartBeatConfigType | null
}

export type AppActionsType =
  | SetUserActionTypes
  | SetNotifyTokenActionTypes
  | SetContextIdActionTypes
  | SetCurrentValueActionTypes
  | SetJourneyIndexActionTypes
  | SetActivitDataActionTypes
  | SetEmailVerifiedActionTypes
  | SetHeartBeatConfigTypes;

export type MyThunkAction<R, T = any> = ThunkAction<
  R,
  AppState,
  T,
  AppActionsType
>;
export type MyThunkDispatch<T = any> = ThunkDispatch<
  AppState,
  T,
  AppActionsType
>;
