import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {AppState} from '.';

export const SET_USER = 'SET_USER';
export const SET_NOTIFYTOKEN = 'SET_NOTIFYTOKEN';
export const SET_CONTEXTID = 'SET_CONTEXTID';
export const SET_CURRENT_VALUES = 'SET_CURRENT_VALUES';

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

export interface ReduxState {
  user: UserType | null;
  notifyToken: NotificationType | null;
  contextId: ContextIdType | null;
  currentValue: CurrentValueType;
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

export type AppActionsType =
  | SetUserActionTypes
  | SetNotifyTokenActionTypes
  | SetContextIdActionTypes
  | SetCurrentValueActionTypes;

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
