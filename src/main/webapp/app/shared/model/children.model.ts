import { IObservation } from 'app/shared/model/observation.model';
import { IUser } from 'app/shared/model/user.model';
import { IChildrenGroup } from 'app/shared/model/children-group.model';

export interface IChildren {
  id?: number;
  name?: string;
  observations?: IObservation[];
  tutors?: IUser[];
  childrenGroups?: IChildrenGroup[];
}

export const defaultValue: Readonly<IChildren> = {};
