import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './persistence/user-mongo';
import { UserRepository } from 'src/infra/persistence/repository/user-repository';
import { UserService } from './service/user-service';
import { UserController } from './http/rest/user-controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'User',
        schema: UserSchema,
      },
    ]),
  ],
  providers: [UserRepository, UserService],
  controllers: [UserController],
})
export class IdentityModule {}
