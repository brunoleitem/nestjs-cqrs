import { HydratedDocument, Model } from 'mongoose';

export abstract class BaseRepository<T> {
  constructor(private readonly model: Model<T>) {
  }

  async create(item: T): Promise<T> {
    return this.model.create(item);
  }

  async findById(id: string): Promise<T | null> {
    return this.model.findById(id);
  }

  async findByField(field: string, value: string): Promise<HydratedDocument<T> | null> {
    return this.model.findOne({
      [field]: value
    } as Record<string, any>);
  }

  async findAll(): Promise<T[]> {
    return this.model.find();
  }

  async update(id: string, item: Partial<T>): Promise<T | null> {
    return this.model.findByIdAndUpdate(id, item, { new: true });
  }

  async delete(id: string): Promise<void> {
    return await this.model.findByIdAndDelete(id);
  }
}
