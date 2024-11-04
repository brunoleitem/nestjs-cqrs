import { UserModel } from '../model/user-model';

export interface IUserRepository {
  createUser: (user: UserModel) => Promise<void>;
}
