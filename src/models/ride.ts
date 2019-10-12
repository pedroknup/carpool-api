import { IRoute } from './route';
import { IUser } from './user';
import { IPendentUser } from './pendent-user';
import { IConfirmedUser } from './confirmed-user';
import { IMessage } from './message';

export interface IRide {
  time: Date;
  type: string;
  route: IRoute;
  spots: number;
  outgoing?: boolean;
  user: IUser;
  pendentUsers: IPendentUser[];
  confirmedUsers: IConfirmedUser[];
  chat: IMessage[];
  isPendent?: boolean;
  isActive?: boolean;
  id: number;
}
