import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserModel } from 'src/core/identity/core/model/user-model';
import { User } from 'src/core/identity/persistence/user-mongo';
import { BaseRepository } from 'src/shared/persistence/base-repository';

@Injectable()
export class UserRepository extends BaseRepository<User, UserModel> {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {
    super(userModel);
  }

  async findByEmail(email: string): Promise<UserModel | null> {
    const userDocument = await this.userModel.findOne({ email });
    if (!userDocument) return null;
    return UserModel.createFrom(userDocument);
  }
}
