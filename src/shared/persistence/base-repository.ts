import { HydratedDocument, Model } from 'mongoose';

export abstract class BaseRepository<T, K> {
  private model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  async create(item: T | K): Promise<T> {
    return this.model.create(item);
  }

  async findById(id: string): Promise<T | K | null> {
    return this.model.findById(id).exec();
  }

  async findByField(field: string, value: string): Promise<HydratedDocument<T> | null> {
    return this.model.findOne({
      [field]: value
    } as Record<string, any>).exec();
  }

  async findAll(): Promise<T[]> {
    return this.model.find().exec();
  }

  async update(id: string, item: Partial<T>): Promise<T | null> {
    return this.model.findByIdAndUpdate(id, item, { new: true }).exec();
  }

  async delete(id: string): Promise<void> {
    await this.model.findByIdAndDelete(id).exec();
    return;
  }
}
