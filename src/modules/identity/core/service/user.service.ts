import { BadRequestException, Injectable } from '@nestjs/common'
import { BaseService } from '@src/shared/core/service/base.service'
import mongoose, { HydratedDocument } from 'mongoose'
import { CreateUserDTO } from '../../http/dto/create-user.dto'
import { UserRepository } from '../../persistence/user.repository'
import { User } from '../../persistence/user.schema'

@Injectable()
export class UserService extends BaseService<User> {
  constructor(private readonly userRepository: UserRepository) {
    super(userRepository)
  }

  async createUser(userDTO: CreateUserDTO): Promise<HydratedDocument<User>> {
    const exists = await this.userRepository.findByField('email', userDTO.email)
    if (exists) {
      throw new BadRequestException('User already exists')
    }
    return await this.userRepository.create({
      email: userDTO.email,
      password: userDTO.password,
      firstName: userDTO.firstName,
      lastName: userDTO.lastName
    })
  }

  async addToFavorites(userId: string, propertyId: string) {
    const user = await this.userRepository.findById(userId)
    if (!user) {
      throw new BadRequestException('User not found')
    }
    if (user.favorites.includes(new mongoose.Types.ObjectId(propertyId))) {
      throw new BadRequestException('Property already in favorites')
    }
    user.favorites.push(new mongoose.Types.ObjectId(propertyId))
    return await this.userRepository.update(userId, user)
  }
}
