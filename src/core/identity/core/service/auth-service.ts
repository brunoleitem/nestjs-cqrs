import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignInDTO } from '../../http/dto/signin-dto';
import { UserRepository } from 'src/infra/persistence/repository/user-repository';
import { JwtService } from 'src/infra/auth/jwt-service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signin(userData: SignInDTO) {
    const user = await this.userRepository.findByEmail(userData.email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    //no password check for now
    const passwordMatch = user.password === userData.password;
    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.jwtService.generateToken(user.id);
  }
}
