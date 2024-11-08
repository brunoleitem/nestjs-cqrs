import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/shared/core/service/base-service';
import { Property } from '../../persistence/property-mongo';
import { PropertyModel } from '../model/property-model';

@Injectable()
export class PropertyService extends BaseService<Property, PropertyModel> { }
