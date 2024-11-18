import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { type HydratedDocument } from 'mongoose'

export type PropertyDocument = HydratedDocument<Property>

@Schema({ timestamps: true })
export class Property {
  @Prop({ required: true })
  address: string

  @Prop({ required: true })
  price: number

  @Prop({ required: true })
  location: string

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  createdBy: mongoose.Types.ObjectId
}

export const PropertySchema = SchemaFactory.createForClass(Property)
