import { Moment } from 'moment';
import { IUser } from 'app/shared/model/user.model';

export interface IMessageUser {
  id?: number;
  createdDate?: Moment;
  message?: string;
  from?: IUser;
  to?: IUser;
}

export const defaultValue: Readonly<IMessageUser> = {};
