import { HydratedDocument, Model } from 'mongoose';

export abstract class BaseRepository<T> {
  constructor(private readonly model: Model<T>) {
  }

  async create(item: T): Promise<HydratedDocument<T>> {
    return this.model.create(item);
  }

  async findById(id: string, populate?: string[]): Promise<HydratedDocument<T> | null> {
    return this.model.findById(id).populate(populate)
  }

  async findByField(field: string, value: string, populate?: string[]): Promise<HydratedDocument<T> | null> {
    return this.model.findOne({
      [field]: value
    } as Record<string, any>).populate(populate);
  }

  async findMany(conditions: { field?: string, value?: string }[], populate?: string[]): Promise<HydratedDocument<T>[]> {
    const query = conditions.reduce((acc, condition) => {
      if (condition.field && condition.value) {
        acc[condition.field] = condition.value;
      }
      return acc;
    }, {} as Record<string, any>);

    return this.model.find(query).populate(populate);
  }

  async findAll(populate?: string[]): Promise<HydratedDocument<T>[]> {
    return this.model.find().populate(populate);
  }

  async update(id: string, item: Partial<T>): Promise<HydratedDocument<T> | null> {
    return this.model.findByIdAndUpdate(id, item, { new: true });
  }

  async delete(id: string): Promise<void> {
    return await this.model.findByIdAndDelete(id);
  }

  async clear(): Promise<void> {
    await this.model.deleteMany({});
  }
}
