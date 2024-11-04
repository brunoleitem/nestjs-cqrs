import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/infra/persistence/repository/user-repository';
import { CreateUserDTO } from '../http/dto/create-user-dto';
import { UserModel } from '../model/user-model';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(userDTO: CreateUserDTO) {
    const user = UserModel.create(userDTO);
    return await this.userRepository.createUser(user);
  }
}
