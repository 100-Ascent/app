import {
  ActivitiesDataType,
  ContextIdType,
  CurrentValueType,
  JourneyIndexType,
  NotificationType,
  SetActivitDataActionTypes,
  SetContextIdActionTypes,
  SetCurrentValueActionTypes,
  SetJourneyIndexActionTypes,
  SetNotifyTokenActionTypes,
  SetUserActionTypes,
  SET_ACTIVITIES,
  SET_CONTEXTID,
  SET_CURRENT_VALUES,
  SET_JOURNEY_INDEX,
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

export const setCurrentValues = (
  payload: CurrentValueType | null,
): SetCurrentValueActionTypes => ({
  type: SET_CURRENT_VALUES,
  payload,
});

export const setJourneyIndex = (
  payload: JourneyIndexType | null,
): SetJourneyIndexActionTypes => ({
  type: SET_JOURNEY_INDEX,
  payload,
});

export const SetActivitData = (
  payload: ActivitiesDataType | null,
): SetActivitDataActionTypes => ({
  type: SET_ACTIVITIES,
  payload,
});
