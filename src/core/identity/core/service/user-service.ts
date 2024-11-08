import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDTO } from '../../http/dto/create-user-dto';
import { UserModel } from '../model/user-model';
import { UserRepository } from '../../persistence/user-repository';
import { BaseService } from 'src/shared/core/service/base-service';
import { User } from '../../persistence/user-mongo';

@Injectable()
export class UserService extends BaseService<User, UserModel> {
  constructor(private readonly userRepository: UserRepository) {
    super(userRepository);
  }

  async createUser(userDTO: CreateUserDTO) {
    const exists = await this.userRepository.findByField('email', userDTO.email);
    if (exists) {
      throw new BadRequestException('User already exists');
    }
    const user = UserModel.create(userDTO);
    return await this.userRepository.create(user);
  }

}
