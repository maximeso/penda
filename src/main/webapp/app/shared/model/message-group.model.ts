import { Moment } from 'moment';
import { IUser } from 'app/shared/model/user.model';
import { IChildrenGroup } from 'app/shared/model/children-group.model';

export interface IMessageGroup {
  id?: number;
  createdDate?: Moment;
  message?: string;
  creator?: IUser;
  childrenGroup?: IChildrenGroup;
}

export const defaultValue: Readonly<IMessageGroup> = {};
