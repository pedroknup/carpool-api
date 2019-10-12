import { IUser } from './user';
import { IPoint } from './point';

export interface IRoute {
  name: string;
  user?: IUser;
  origin: IPoint;
  destination: IPoint;
  route: IPoint[];
  id: number;
}


