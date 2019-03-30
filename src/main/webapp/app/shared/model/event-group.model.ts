import { Moment } from 'moment';
import { IChildrenGroup } from 'app/shared/model/children-group.model';

export interface IEventGroup {
  id?: number;
  createdDate?: Moment;
  name?: string;
  childrenGroup?: IChildrenGroup;
}

export const defaultValue: Readonly<IEventGroup> = {};
