import axios from 'axios';
import {
  parseHeaderForLinks,
  loadMoreDataWhenScrolled,
  ICrudGetAction,
  ICrudGetAllAction,
  ICrudPutAction,
  ICrudDeleteAction
} from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IMessageUser, defaultValue } from 'app/shared/model/message-user.model';

export const ACTION_TYPES = {
  FETCH_MESSAGEUSER_LIST: 'messageUser/FETCH_MESSAGEUSER_LIST',
  FETCH_MESSAGEUSER: 'messageUser/FETCH_MESSAGEUSER',
  CREATE_MESSAGEUSER: 'messageUser/CREATE_MESSAGEUSER',
  UPDATE_MESSAGEUSER: 'messageUser/UPDATE_MESSAGEUSER',
  DELETE_MESSAGEUSER: 'messageUser/DELETE_MESSAGEUSER',
  RESET: 'messageUser/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IMessageUser>,
  entity: defaultValue,
  links: { next: 0 },
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type MessageUserState = Readonly<typeof initialState>;

// Reducer

export default (state: MessageUserState = initialState, action): MessageUserState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_MESSAGEUSER_LIST):
    case REQUEST(ACTION_TYPES.FETCH_MESSAGEUSER):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_MESSAGEUSER):
    case REQUEST(ACTION_TYPES.UPDATE_MESSAGEUSER):
    case REQUEST(ACTION_TYPES.DELETE_MESSAGEUSER):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_MESSAGEUSER_LIST):
    case FAILURE(ACTION_TYPES.FETCH_MESSAGEUSER):
    case FAILURE(ACTION_TYPES.CREATE_MESSAGEUSER):
    case FAILURE(ACTION_TYPES.UPDATE_MESSAGEUSER):
    case FAILURE(ACTION_TYPES.DELETE_MESSAGEUSER):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_MESSAGEUSER_LIST):
      const links = parseHeaderForLinks(action.payload.headers.link);
      return {
        ...state,
        links,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: loadMoreDataWhenScrolled(state.entities, action.payload.data, links)
      };
    case SUCCESS(ACTION_TYPES.FETCH_MESSAGEUSER):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_MESSAGEUSER):
    case SUCCESS(ACTION_TYPES.UPDATE_MESSAGEUSER):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_MESSAGEUSER):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/message-users';

// Actions

export const getEntities: ICrudGetAllAction<IMessageUser> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_MESSAGEUSER_LIST,
    payload: axios.get<IMessageUser>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IMessageUser> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_MESSAGEUSER,
    payload: axios.get<IMessageUser>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IMessageUser> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_MESSAGEUSER,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const updateEntity: ICrudPutAction<IMessageUser> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_MESSAGEUSER,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IMessageUser> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_MESSAGEUSER,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
