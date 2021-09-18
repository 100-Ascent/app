import {
  ContextIdType,
  NotificationType,
  SetContextIdActionTypes,
  SetNotifyTokenActionTypes,
  SetUserActionTypes,
  SET_CONTEXTID,
  SET_NOTIFYTOKEN,
  SET_USER,
  UserType,
} from './types';

export const setData = (payload: UserType | null): SetUserActionTypes => ({
  type: SET_USER,
  payload,
});

export const setNotifyToken = (
  payload: NotificationType | null,
): SetNotifyTokenActionTypes => ({
  type: SET_NOTIFYTOKEN,
  payload,
});

export const setContextId = (
  payload: ContextIdType | null,
): SetContextIdActionTypes => ({
  type: SET_CONTEXTID,
  payload,
});
