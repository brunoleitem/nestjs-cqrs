import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { UserService } from '../../service/user-service';
import { CreateUserDTO } from '../dto/create-user-dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(200)
  async createUser(@Body() createUserDTO: CreateUserDTO) {
    return await this.userService.createUser(createUserDTO);
  }

  @Get()
  @HttpCode(200)
  async getUser() {
    return 'OK';
  }
}
