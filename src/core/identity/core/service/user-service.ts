import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from 'src/infra/persistence/repository/user-repository';
import { CreateUserDTO } from '../../http/dto/create-user-dto';
import { UserModel } from '../model/user-model';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(userDTO: CreateUserDTO) {
    const exists = await this.userRepository.findByEmail(userDTO.email);
    if (exists) {
      throw new BadRequestException('User already exists');
    }
    const user = UserModel.create(userDTO);
    return await this.userRepository.createUser(user);
  }
}
