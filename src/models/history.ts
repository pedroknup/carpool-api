import { IRoute } from "./route";
import { IUser } from "./user";
import { IConfirmedUserHistory } from "./confirmed-user";
import { IMessage } from "./message";

export interface IHistory  {
  time: Date;
  type: string;
  route: IRoute;
  spots: number;
  user: IUser;
  confirmedUsers: IConfirmedUserHistory[];
  chat: IMessage[];
  id: number;
}


