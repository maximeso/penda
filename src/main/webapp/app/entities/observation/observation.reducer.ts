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

import { IObservation, defaultValue } from 'app/shared/model/observation.model';

export const ACTION_TYPES = {
  FETCH_OBSERVATION_LIST: 'observation/FETCH_OBSERVATION_LIST',
  FETCH_OBSERVATION: 'observation/FETCH_OBSERVATION',
  CREATE_OBSERVATION: 'observation/CREATE_OBSERVATION',
  UPDATE_OBSERVATION: 'observation/UPDATE_OBSERVATION',
  DELETE_OBSERVATION: 'observation/DELETE_OBSERVATION',
  RESET: 'observation/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IObservation>,
  entity: defaultValue,
  links: { next: 0 },
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type ObservationState = Readonly<typeof initialState>;

// Reducer

export default (state: ObservationState = initialState, action): ObservationState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_OBSERVATION_LIST):
    case REQUEST(ACTION_TYPES.FETCH_OBSERVATION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_OBSERVATION):
    case REQUEST(ACTION_TYPES.UPDATE_OBSERVATION):
    case REQUEST(ACTION_TYPES.DELETE_OBSERVATION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_OBSERVATION_LIST):
    case FAILURE(ACTION_TYPES.FETCH_OBSERVATION):
    case FAILURE(ACTION_TYPES.CREATE_OBSERVATION):
    case FAILURE(ACTION_TYPES.UPDATE_OBSERVATION):
    case FAILURE(ACTION_TYPES.DELETE_OBSERVATION):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_OBSERVATION_LIST):
      const links = parseHeaderForLinks(action.payload.headers.link);
      return {
        ...state,
        links,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: loadMoreDataWhenScrolled(state.entities, action.payload.data, links)
      };
    case SUCCESS(ACTION_TYPES.FETCH_OBSERVATION):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_OBSERVATION):
    case SUCCESS(ACTION_TYPES.UPDATE_OBSERVATION):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_OBSERVATION):
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

const apiUrl = 'api/observations';

// Actions

export const getEntities: ICrudGetAllAction<IObservation> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_OBSERVATION_LIST,
    payload: axios.get<IObservation>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IObservation> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_OBSERVATION,
    payload: axios.get<IObservation>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IObservation> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_OBSERVATION,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const updateEntity: ICrudPutAction<IObservation> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_OBSERVATION,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IObservation> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_OBSERVATION,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
