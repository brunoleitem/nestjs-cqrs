import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import type { User } from '@src/modules/identity/persistence/user.schema'
import { BaseRepository } from '@src/shared/core/persistence/base.repository'
import type { Model } from 'mongoose'

@Injectable()
export class UserRepository extends BaseRepository<User> {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {
    super(userModel)
  }
}
