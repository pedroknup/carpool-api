import { IUser } from './user';
import { IPoint } from './point';

export interface IPendentUser {
  user: IUser;
  quantity: number;
  point: IPoint;
  message?: string;
  createdAt: Date;
  id: number;
}


