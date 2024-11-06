import { HydratedDocument } from 'mongoose';

export abstract class BaseModel<T extends BaseModel<T>> {
  readonly id?: string;
  createdAt?: Date;
  updatedAt?: Date;

  protected constructor(data?: Partial<T>) {
    if (data) {
      Object.assign(this, data);
    }
  }

  public static create<T extends BaseModel<T>>(
    this: new (data?: Partial<T>) => T,
    data: WithOptional<T, 'createdAt' | 'updatedAt'>,
  ): T {
    return new this({
      ...(data as Partial<T>),
      createdAt: data.createdAt ? data.createdAt : new Date(),
      updatedAt: data.updatedAt ? data.updatedAt : new Date(),
    });
  }

  public static createFrom<T extends BaseModel<T>>(
    this: new (data?: Partial<T>) => T,
    data: HydratedDocument<T>,
  ): T {
    const dataObject = data.toObject({
      getters: true,
      virtuals: false,
      transform: (doc, ret) => {
        delete ret._id;
        return ret;
      },
    });
    return new this({
      id: String(data._id),
      ...dataObject,
    });
  }
}

export type WithOptional<T, K extends keyof T> = Omit<T, K> &
  Partial<Pick<T, K>>;
