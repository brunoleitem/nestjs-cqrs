import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignInDTO } from '../../http/dto/signin-dto';
import { JwtService } from 'src/shared/http/auth/jwt-service';
import { UserRepository } from '../../persistence/user-repository';
import { UserModel } from '../model/user-model';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) { }

  async signin(userData: SignInDTO) {
    const user = await this.userRepository.findByField('email', userData.email);
    const userModel = UserModel.createFrom(user);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    //no password check for now
    const passwordMatch = user.password === userData.password;
    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.jwtService.generateToken(userModel.id);
  }
}
