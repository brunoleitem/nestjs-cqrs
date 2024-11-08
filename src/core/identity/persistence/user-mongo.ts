import mongoose, { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UserModel } from '../core/model/user-model';
import { PropertyModel } from 'src/core/properties/core/model/property-model';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User implements UserModel {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Property' }] })
  favorites: PropertyModel[];
}

export const UserSchema = SchemaFactory.createForClass(User);
