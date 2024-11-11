import { Injectable } from "@nestjs/common";
import { BaseRepository } from "@src/shared/core/persistence/base.repository";
import { Property } from "./property.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class PropertyRepository extends BaseRepository<Property> {
    constructor(@InjectModel('Property') private readonly propertyModel: Model<Property>) {
        super(propertyModel);
    }
}