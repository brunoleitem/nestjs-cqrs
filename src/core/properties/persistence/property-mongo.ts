import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { PropertyModel } from '../core/model/property-model';
import { UserModel } from 'src/core/identity/core/model/user-model';

export type PropertyDocument = HydratedDocument<Property>;

@Schema({ timestamps: true })
export class Property implements PropertyModel {
  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  location: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  createdBy: UserModel;

}

export const PropertySchema = SchemaFactory.createForClass(Property);
