import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDTO } from '../../http/dto/create-user.dto';
import { UserRepository } from '../../persistence/user.repository';
import { BaseService } from '@src/shared/core/service/base.service';
import { User, UserSchema } from '../../persistence/user.schema';

@Injectable()
export class UserService extends BaseService<User> {
  constructor(private readonly userRepository: UserRepository) {
    super(userRepository);
  }

  async createUser(userDTO: CreateUserDTO) {
    const exists = await this.userRepository.findByField('email', userDTO.email);
    if (exists) {
      throw new BadRequestException('User already exists');
    }
    return await this.userRepository.create({
      email: userDTO.email,
      password: userDTO.password,
      firstName: userDTO.firstName,
      lastName: userDTO.lastName,
    });
  }
}
