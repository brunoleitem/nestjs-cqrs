import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './persistence/user-mongo';
import { UserRepository } from 'src/infra/persistence/repository/user-repository';
import { UserService } from './core/service/user-service';
import { UserController } from './http/rest/user-controller';
import { AuthService } from './core/service/auth-service';
import { JwtModule } from 'src/infra/auth/jwt-module';

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
