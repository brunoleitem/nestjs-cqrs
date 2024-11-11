import { BaseRepository } from "@src/shared/core/persistence/base.repository";
import { HydratedDocument } from "mongoose";

export abstract class BaseService<T> {
    constructor(private readonly repository: BaseRepository<T>) {
    }

    async create(data: T): Promise<T> {
        return this.repository.create(data);
    }

    async update(id: string, data: T): Promise<T> {
        return this.repository.update(id, data);
    }

    async delete(id: string): Promise<void> {
        return this.repository.delete(id);
    }

    async findById(id: string, populate?: string[]): Promise<HydratedDocument<T>> {
        return this.repository.findById(id, populate);
    }

    async findByField(field: string, value: string, populate?: string[]): Promise<T> {
        return this.repository.findByField(field, value, populate);
    }

    async findAll(populate?: string[]): Promise<T[]> {
        return this.repository.findAll(populate);
    }

    async clear(): Promise<void> {
        return this.repository.clear();
    }

}