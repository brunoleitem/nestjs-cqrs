import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { type HydratedDocument } from 'mongoose'

export type UserDocument = HydratedDocument<User>

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  firstName: string

  @Prop({ required: true })
  lastName: string

  @Prop({ required: true, unique: true })
  email: string

  @Prop({ required: true })
  password: string

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Property' }] })
  favorites?: mongoose.Types.ObjectId[]
}

export const UserSchema = SchemaFactory.createForClass(User)
