import { IUser } from 'app/shared/model/user.model';
import { IMessageGroup } from 'app/shared/model/message-group.model';
import { IEventGroup } from 'app/shared/model/event-group.model';
import { IChildren } from 'app/shared/model/children.model';

export interface IChildrenGroup {
  id?: number;
  name?: string;
  responsable?: IUser;
  messageGroups?: IMessageGroup[];
  eventGroups?: IEventGroup[];
  childrens?: IChildren[];
}

export const defaultValue: Readonly<IChildrenGroup> = {};
