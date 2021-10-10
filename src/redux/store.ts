import {
  SET_USER,
  ReduxState,
  AppActionsType,
  SET_NOTIFYTOKEN,
  SET_CONTEXTID,
  SET_CURRENT_VALUES,
  SET_ACTIVITIES,
} from './types';

const initialState: ReduxState = {
  user: null,
  notifyToken: null,
  contextId: null,
  currentValue: {distance: 0, index: 0},
  journeyIndex: {index: '0-0'},
  activityData: {data: null},
};

export default (state = initialState, action: AppActionsType): ReduxState => {
  switch (action.type) {
    case SET_USER:
      return {...state, user: action.payload};

    case SET_NOTIFYTOKEN:
      return {...state, notifyToken: action.payload};

    case SET_CONTEXTID:
      return {...state, contextId: action.payload};

    case SET_CURRENT_VALUES:
      return {...state, currentValue: action.payload};

    case SET_CURRENT_VALUES:
      return {...state, currentValue: action.payload};

    case SET_ACTIVITIES:
      return {...state, activityData: action.payload};

    default:
      return state;
  }
};
