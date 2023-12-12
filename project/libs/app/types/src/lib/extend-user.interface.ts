import {User} from './user.interface';

export interface ExtendUser extends User {
  dateOfRegister: Date;
  foloverCount: number;
  postCount: number;
}
