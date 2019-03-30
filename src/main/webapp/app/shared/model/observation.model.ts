import { Moment } from 'moment';
import { IUser } from 'app/shared/model/user.model';
import { IChildren } from 'app/shared/model/children.model';

export interface IObservation {
  id?: number;
  createdDate?: Moment;
  description?: string;
  creator?: IUser;
  children?: IChildren;
}

export const defaultValue: Readonly<IObservation> = {};
