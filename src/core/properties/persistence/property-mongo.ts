import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PropertyDocument = HydratedDocument<Property>;

@Schema({ timestamps: true })
export class Property {
  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  likes: number;
}

export const PropertySchema = SchemaFactory.createForClass(Property);
