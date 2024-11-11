import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '../../core/service/user.service';
import { CreateUserDTO } from '../dto/create-user.dto';
import { AuthService } from '../../core/service/auth.service';
import { SignInDTO } from '../dto/signin.dto';
import { AuthGuard } from 'src/shared/http/guards/auth-guard';
import { CurrentUser } from '@src/shared/http/guards/user-decorator';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) { }

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
  async getUser(@CurrentUser() req) {
    return await this.userService.findById(req.userId, ['favorites']);
  }

  @Post('addFavorite/:propertyId')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  async addToFavorites(@CurrentUser() req, @Param('propertyId') propertyId: string) {
    await this.userService.addToFavorites(req.userId, propertyId);
    return;
  }

}