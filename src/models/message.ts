import { IUser } from './user';

export interface IMessage {
  user: IUser;
  text: string;
  isLoading?: boolean;
  isFailed?: boolean;
  createdAt: Date;
  isDriver?: boolean;
  isAuthor?: boolean;
  viewedByDriver?: boolean;
  id: number;
}
