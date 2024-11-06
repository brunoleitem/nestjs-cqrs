import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './persistence/user-mongo';
import { UserService } from './core/service/user-service';
import { UserController } from './http/rest/user-controller';
import { AuthService } from './core/service/auth-service';
import { JwtModule } from 'src/shared/http/auth/jwt-module';
import { UserRepository } from './persistence/user-repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'User',
        schema: UserSchema,
      },
    ]),
    JwtModule.forRoot(),
  ],
  providers: [UserRepository, UserService, AuthService],
  controllers: [UserController],
})
export class IdentityModule {}
