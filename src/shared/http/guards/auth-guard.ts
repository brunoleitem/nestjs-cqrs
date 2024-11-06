import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from 'src/shared/http/auth/jwt-service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  async canActivate(ctx: ExecutionContext) {
    try {
      await this.jwtService.verify(ctx);
    } catch (e) {
      Logger.error(e.message);
      throw new UnauthorizedException('Unauthorized');
    }
    return true;
  }
}
