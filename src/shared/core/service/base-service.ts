import { BaseRepository } from "src/shared/persistence/base-repository";

export abstract class BaseService<T, K> {
    constructor(private readonly repository: BaseRepository<T, K>) {
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

    async findById(id: string): Promise<T | K> {
        return this.repository.findById(id);
    }

    async findAll(): Promise<T[]> {
        return this.repository.findAll();
    }

}