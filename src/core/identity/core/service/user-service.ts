import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDTO } from '../../http/dto/create-user-dto';
import { UserModel } from '../model/user-model';
import { UserRepository } from '../../persistence/user-repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(userDTO: CreateUserDTO) {
    const exists = await this.userRepository.findByEmail(userDTO.email);
    if (exists) {
      throw new BadRequestException('User already exists');
    }
    const user = UserModel.create(userDTO);
    return await this.userRepository.create(user);
  }

  async getUser(id: string) {
    return await this.userRepository.findById(id);
  }
}
