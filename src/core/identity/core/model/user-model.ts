import { UserDocument } from '../../persistence/user-mongo';

type WithOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export class UserModel {
  id?: string;
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
    data: WithOptional<UserModel, 'createdAt' | 'updatedAt'>,
  ): UserModel {
    return new UserModel({
      ...data,
      createdAt: data.createdAt ? data.createdAt : new Date(),
      updatedAt: data.updatedAt ? data.updatedAt : new Date(),
    });
  }

  static createFrom(data: UserDocument): UserModel {
    const dataObject = data.toObject({
      getters: true,
      virtuals: false,
      transform: (doc, ret) => {
        delete ret._id;
        return ret;
      },
    });
    return new UserModel({ id: String(data._id), ...dataObject });
  }
}
