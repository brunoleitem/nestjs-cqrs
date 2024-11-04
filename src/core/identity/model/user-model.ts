import { randomUUID } from 'crypto';

type WithOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export class UserModel {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;

  private constructor(data: UserModel) {
    Object.assign(this, data);
  }

  static create(
    data: WithOptional<UserModel, 'id' | 'createdAt' | 'updatedAt'>,
  ): UserModel {
    return new UserModel({
      ...data,
      id: data.id ? data.id : randomUUID(),
      createdAt: data.createdAt ? data.createdAt : new Date(),
      updatedAt: data.updatedAt ? data.updatedAt : new Date(),
    });
  }

  static createFrom(data: UserModel): UserModel {
    return new UserModel(data);
  }
}
