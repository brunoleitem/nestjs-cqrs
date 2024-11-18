import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { JwtModule } from 'src/shared/module/auth/jwt-module'
import { AuthService } from './core/service/auth.service'
import { UserService } from './core/service/user.service'
import { UserController } from './http/rest/user-controller'
import { UserRepository } from './persistence/user.repository'
import { UserSchema } from './persistence/user.schema'

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'User',
        schema: UserSchema
      }
    ]),
    JwtModule.forRoot()
  ],
  providers: [UserRepository, UserService, AuthService],
  controllers: [UserController]
})
export class IdentityModule {}
