import { UserModel } from '../core/model/user-model';

export interface IUserRepository {
  createUser: (user: UserModel) => Promise<void>;
  findByEmail: (email: string) => Promise<UserModel | null>;
}
