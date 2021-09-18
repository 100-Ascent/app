import {
  SET_USER,
  ReduxState,
  AppActionsType,
  SET_NOTIFYTOKEN,
  SET_CONTEXTID,
} from './types';

const initialState: ReduxState = {
  user: null,
  notifyToken: null,
  contextId: null,
};

export default (state = initialState, action: AppActionsType): ReduxState => {
  switch (action.type) {
    case SET_USER:
      return {...state, user: action.payload};

    case SET_NOTIFYTOKEN:
      return {...state, notifyToken: action.payload};

    case SET_CONTEXTID:
      return {...state, contextId: action.payload};

    default:
      return state;
  }
};
