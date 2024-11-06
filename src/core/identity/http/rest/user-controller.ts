import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '../../core/service/user-service';
import { CreateUserDTO } from '../dto/create-user-dto';
import { AuthService } from '../../core/service/auth-service';
import { SignInDTO } from '../dto/signin-dto';
import { AuthGuard } from 'src/infra/http/guards/auth-guard';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() createUserDTO: CreateUserDTO) {
    return await this.userService.createUser(createUserDTO);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() signInDTO: SignInDTO) {
    return await this.authService.signin(signInDTO);
  }

  @Get()
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  async getUser(@Req() req) {
    return await this.userService.getUser(req.userId);
  }
}
