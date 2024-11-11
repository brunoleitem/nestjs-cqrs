import { Injectable } from '@nestjs/common';
import { BaseService } from '@src/shared/core/service/base.service';
import { Property } from '../../persistence/property.schema';
import { CreatePropertyDTO } from '../../http/dto/create-property.dto';
import { PropertyRepository } from '../../persistence/property.repository';
import mongoose from 'mongoose';

@Injectable()
export class PropertyService extends BaseService<Property> {
    constructor(private readonly propertyRepository: PropertyRepository) {
        super(propertyRepository);
    }
    async createProperty(createPropertyDTO: CreatePropertyDTO, userId: string) {
        const userObjId = new mongoose.Types.ObjectId(userId);
        return await this.propertyRepository.create({ ...createPropertyDTO, createdBy: userObjId });
    }

    async findByUser(userId: string) {
        return await this.propertyRepository.findMany([{ field: 'createdBy', value: userId }]);
    }
}
