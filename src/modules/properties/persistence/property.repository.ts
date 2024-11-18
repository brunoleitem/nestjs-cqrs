import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { BaseRepository } from '@src/shared/core/persistence/base.repository'
import type { Model } from 'mongoose'
import type { Property } from './property.schema'

@Injectable()
export class PropertyRepository extends BaseRepository<Property> {
  constructor(
    @InjectModel('Property') private readonly propertyModel: Model<Property>
  ) {
    super(propertyModel)
  }
}
