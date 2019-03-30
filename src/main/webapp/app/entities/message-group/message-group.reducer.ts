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

import { IMessageGroup, defaultValue } from 'app/shared/model/message-group.model';

export const ACTION_TYPES = {
  FETCH_MESSAGEGROUP_LIST: 'messageGroup/FETCH_MESSAGEGROUP_LIST',
  FETCH_MESSAGEGROUP: 'messageGroup/FETCH_MESSAGEGROUP',
  CREATE_MESSAGEGROUP: 'messageGroup/CREATE_MESSAGEGROUP',
  UPDATE_MESSAGEGROUP: 'messageGroup/UPDATE_MESSAGEGROUP',
  DELETE_MESSAGEGROUP: 'messageGroup/DELETE_MESSAGEGROUP',
  RESET: 'messageGroup/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IMessageGroup>,
  entity: defaultValue,
  links: { next: 0 },
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type MessageGroupState = Readonly<typeof initialState>;

// Reducer

export default (state: MessageGroupState = initialState, action): MessageGroupState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_MESSAGEGROUP_LIST):
    case REQUEST(ACTION_TYPES.FETCH_MESSAGEGROUP):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_MESSAGEGROUP):
    case REQUEST(ACTION_TYPES.UPDATE_MESSAGEGROUP):
    case REQUEST(ACTION_TYPES.DELETE_MESSAGEGROUP):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_MESSAGEGROUP_LIST):
    case FAILURE(ACTION_TYPES.FETCH_MESSAGEGROUP):
    case FAILURE(ACTION_TYPES.CREATE_MESSAGEGROUP):
    case FAILURE(ACTION_TYPES.UPDATE_MESSAGEGROUP):
    case FAILURE(ACTION_TYPES.DELETE_MESSAGEGROUP):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_MESSAGEGROUP_LIST):
      const links = parseHeaderForLinks(action.payload.headers.link);
      return {
        ...state,
        links,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: loadMoreDataWhenScrolled(state.entities, action.payload.data, links)
      };
    case SUCCESS(ACTION_TYPES.FETCH_MESSAGEGROUP):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_MESSAGEGROUP):
    case SUCCESS(ACTION_TYPES.UPDATE_MESSAGEGROUP):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_MESSAGEGROUP):
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

const apiUrl = 'api/message-groups';

// Actions

export const getEntities: ICrudGetAllAction<IMessageGroup> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_MESSAGEGROUP_LIST,
    payload: axios.get<IMessageGroup>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IMessageGroup> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_MESSAGEGROUP,
    payload: axios.get<IMessageGroup>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IMessageGroup> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_MESSAGEGROUP,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const updateEntity: ICrudPutAction<IMessageGroup> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_MESSAGEGROUP,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IMessageGroup> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_MESSAGEGROUP,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
