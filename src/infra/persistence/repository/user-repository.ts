import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserModel } from 'src/core/identity/model/user-model';
import { User } from 'src/core/identity/persistence/user-mongo';
import { IUserRepository } from 'src/core/identity/persistence/user-repository';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async createUser(user: UserModel) {
    await this.userModel.create(user);
  }
}
