import { Moment } from 'moment';
import { IUser } from 'app/shared/model/user.model';

export interface IRecipe {
  id?: number;
  name?: string;
  created?: Moment;
  description?: string;
  actived?: boolean;
  creator?: IUser;
}

export const defaultValue: Readonly<IRecipe> = {
  actived: false
};
