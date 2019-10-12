import { IUser } from "./user";
import { IPoint } from "./point";

export interface IConfirmedUser {
  user: IUser;
  point: IPoint;
  quantity?: number;
  time: Date;
  createdAt: Date;
  updatedAt: Date;
  id: number;
}

export interface IConfirmedUserHistory extends IConfirmedUser {
  rating?: number;
}
