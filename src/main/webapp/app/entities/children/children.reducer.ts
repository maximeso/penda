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

import { IChildren, defaultValue } from 'app/shared/model/children.model';

export const ACTION_TYPES = {
  FETCH_CHILDREN_LIST: 'children/FETCH_CHILDREN_LIST',
  FETCH_CHILDREN: 'children/FETCH_CHILDREN',
  CREATE_CHILDREN: 'children/CREATE_CHILDREN',
  UPDATE_CHILDREN: 'children/UPDATE_CHILDREN',
  DELETE_CHILDREN: 'children/DELETE_CHILDREN',
  RESET: 'children/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IChildren>,
  entity: defaultValue,
  links: { next: 0 },
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type ChildrenState = Readonly<typeof initialState>;

// Reducer

export default (state: ChildrenState = initialState, action): ChildrenState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_CHILDREN_LIST):
    case REQUEST(ACTION_TYPES.FETCH_CHILDREN):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_CHILDREN):
    case REQUEST(ACTION_TYPES.UPDATE_CHILDREN):
    case REQUEST(ACTION_TYPES.DELETE_CHILDREN):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_CHILDREN_LIST):
    case FAILURE(ACTION_TYPES.FETCH_CHILDREN):
    case FAILURE(ACTION_TYPES.CREATE_CHILDREN):
    case FAILURE(ACTION_TYPES.UPDATE_CHILDREN):
    case FAILURE(ACTION_TYPES.DELETE_CHILDREN):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_CHILDREN_LIST):
      const links = parseHeaderForLinks(action.payload.headers.link);
      return {
        ...state,
        links,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: loadMoreDataWhenScrolled(state.entities, action.payload.data, links)
      };
    case SUCCESS(ACTION_TYPES.FETCH_CHILDREN):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_CHILDREN):
    case SUCCESS(ACTION_TYPES.UPDATE_CHILDREN):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_CHILDREN):
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

const apiUrl = 'api/children';

// Actions

export const getEntities: ICrudGetAllAction<IChildren> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_CHILDREN_LIST,
    payload: axios.get<IChildren>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IChildren> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_CHILDREN,
    payload: axios.get<IChildren>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IChildren> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_CHILDREN,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const updateEntity: ICrudPutAction<IChildren> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_CHILDREN,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IChildren> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_CHILDREN,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
