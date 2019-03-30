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

import { IEventGroup, defaultValue } from 'app/shared/model/event-group.model';

export const ACTION_TYPES = {
  FETCH_EVENTGROUP_LIST: 'eventGroup/FETCH_EVENTGROUP_LIST',
  FETCH_EVENTGROUP: 'eventGroup/FETCH_EVENTGROUP',
  CREATE_EVENTGROUP: 'eventGroup/CREATE_EVENTGROUP',
  UPDATE_EVENTGROUP: 'eventGroup/UPDATE_EVENTGROUP',
  DELETE_EVENTGROUP: 'eventGroup/DELETE_EVENTGROUP',
  RESET: 'eventGroup/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IEventGroup>,
  entity: defaultValue,
  links: { next: 0 },
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type EventGroupState = Readonly<typeof initialState>;

// Reducer

export default (state: EventGroupState = initialState, action): EventGroupState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_EVENTGROUP_LIST):
    case REQUEST(ACTION_TYPES.FETCH_EVENTGROUP):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_EVENTGROUP):
    case REQUEST(ACTION_TYPES.UPDATE_EVENTGROUP):
    case REQUEST(ACTION_TYPES.DELETE_EVENTGROUP):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_EVENTGROUP_LIST):
    case FAILURE(ACTION_TYPES.FETCH_EVENTGROUP):
    case FAILURE(ACTION_TYPES.CREATE_EVENTGROUP):
    case FAILURE(ACTION_TYPES.UPDATE_EVENTGROUP):
    case FAILURE(ACTION_TYPES.DELETE_EVENTGROUP):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_EVENTGROUP_LIST):
      const links = parseHeaderForLinks(action.payload.headers.link);
      return {
        ...state,
        links,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: loadMoreDataWhenScrolled(state.entities, action.payload.data, links)
      };
    case SUCCESS(ACTION_TYPES.FETCH_EVENTGROUP):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_EVENTGROUP):
    case SUCCESS(ACTION_TYPES.UPDATE_EVENTGROUP):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_EVENTGROUP):
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

const apiUrl = 'api/event-groups';

// Actions

export const getEntities: ICrudGetAllAction<IEventGroup> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_EVENTGROUP_LIST,
    payload: axios.get<IEventGroup>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IEventGroup> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_EVENTGROUP,
    payload: axios.get<IEventGroup>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IEventGroup> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_EVENTGROUP,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const updateEntity: ICrudPutAction<IEventGroup> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_EVENTGROUP,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IEventGroup> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_EVENTGROUP,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
