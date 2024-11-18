import { MongooseModule } from '@nestjs/mongoose'
import { Test, type TestingModule } from '@nestjs/testing'
import { JwtModule } from '@src/shared/module/auth/jwt-module'
import { userFactory } from '@test/factory/user-test.factory'
import {
  closeInMongodConnection,
  rootMongooseTestModule
} from '@test/util/mongoose-memory-test.module'
import mongoose from 'mongoose'
import { UserRepository } from '../../../persistence/user.repository'
import { UserSchema } from '../../../persistence/user.schema'
import { AuthService } from '../auth.service'
import { UserService } from '../user.service'

describe('Auth service', () => {
  let authService: AuthService
  let userService: UserService
  let module: TestingModule
  const user = userFactory.build()
  beforeAll(async () => {
    module = await Test.createTestingModule({
      providers: [AuthService, UserService, UserRepository],
      imports: [
        JwtModule.forRoot(),
        rootMongooseTestModule(),
        MongooseModule.forFeature([
          {
            name: 'User',
            schema: UserSchema
          }
        ])
      ]
    }).compile()
    authService = module.get<AuthService>(AuthService)
    userService = module.get<UserService>(UserService)
    await userService.createUser(user)
  })

  it('Service should be defined', () => {
    expect(authService).toBeDefined()
  })

  it('Should authenticate and return token', async () => {
    const token = await authService.signin({
      email: user.email,
      password: user.password
    })
    expect(token).toBeDefined()
  })

  it('Should throw UnauthorizedException if user does not exist', async () => {
    try {
      await authService.signin({
        email: '',
        password: 'password'
      })
    } catch (error) {
      expect(error.message).toBe('Invalid credentials')
      expect(error.status).toBe(401)
    }
  })

  it('Should throw UnauthorizedException if password is incorrect', async () => {
    try {
      await authService.signin({
        email: user.email,
        password: 'wrongpassword'
      })
    } catch (error) {
      expect(error.message).toBe('Invalid credentials')
      expect(error.status).toBe(401)
    }
  })

  afterAll(async () => {
    await mongoose.connection.close()
    await closeInMongodConnection()
    module.close()
  })
})
