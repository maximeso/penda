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

import { IChildrenGroup, defaultValue } from 'app/shared/model/children-group.model';

export const ACTION_TYPES = {
  FETCH_CHILDRENGROUP_LIST: 'childrenGroup/FETCH_CHILDRENGROUP_LIST',
  FETCH_CHILDRENGROUP: 'childrenGroup/FETCH_CHILDRENGROUP',
  CREATE_CHILDRENGROUP: 'childrenGroup/CREATE_CHILDRENGROUP',
  UPDATE_CHILDRENGROUP: 'childrenGroup/UPDATE_CHILDRENGROUP',
  DELETE_CHILDRENGROUP: 'childrenGroup/DELETE_CHILDRENGROUP',
  RESET: 'childrenGroup/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IChildrenGroup>,
  entity: defaultValue,
  links: { next: 0 },
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type ChildrenGroupState = Readonly<typeof initialState>;

// Reducer

export default (state: ChildrenGroupState = initialState, action): ChildrenGroupState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_CHILDRENGROUP_LIST):
    case REQUEST(ACTION_TYPES.FETCH_CHILDRENGROUP):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_CHILDRENGROUP):
    case REQUEST(ACTION_TYPES.UPDATE_CHILDRENGROUP):
    case REQUEST(ACTION_TYPES.DELETE_CHILDRENGROUP):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_CHILDRENGROUP_LIST):
    case FAILURE(ACTION_TYPES.FETCH_CHILDRENGROUP):
    case FAILURE(ACTION_TYPES.CREATE_CHILDRENGROUP):
    case FAILURE(ACTION_TYPES.UPDATE_CHILDRENGROUP):
    case FAILURE(ACTION_TYPES.DELETE_CHILDRENGROUP):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_CHILDRENGROUP_LIST):
      const links = parseHeaderForLinks(action.payload.headers.link);
      return {
        ...state,
        links,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: loadMoreDataWhenScrolled(state.entities, action.payload.data, links)
      };
    case SUCCESS(ACTION_TYPES.FETCH_CHILDRENGROUP):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_CHILDRENGROUP):
    case SUCCESS(ACTION_TYPES.UPDATE_CHILDRENGROUP):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_CHILDRENGROUP):
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

const apiUrl = 'api/children-groups';

// Actions

export const getEntities: ICrudGetAllAction<IChildrenGroup> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_CHILDRENGROUP_LIST,
    payload: axios.get<IChildrenGroup>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IChildrenGroup> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_CHILDRENGROUP,
    payload: axios.get<IChildrenGroup>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IChildrenGroup> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_CHILDRENGROUP,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const updateEntity: ICrudPutAction<IChildrenGroup> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_CHILDRENGROUP,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IChildrenGroup> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_CHILDRENGROUP,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
