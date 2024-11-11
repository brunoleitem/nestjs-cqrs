import { Test, TestingModule } from "@nestjs/testing";
import { AuthService } from "../auth.service"
import { closeInMongodConnection, rootMongooseTestModule } from "@test/util/mongoose-memory-test.module";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "../../../persistence/user.schema";
import mongoose from "mongoose";
import { UserService } from "../user.service";
import { UserRepository } from "../../../persistence/user.repository";
import { JwtModule } from "@src/shared/module/auth/jwt-module";

describe('Auth service', () => {
    let authService: AuthService;
    let userService: UserService;
    let module: TestingModule;
    const userDTO = {
        email: 'test@test.com',
        password: 'password',
        firstName: 'Test',
        lastName: 'User'
    }

    beforeAll(async () => {
        module = await Test.createTestingModule({
            providers: [
                AuthService,
                UserService,
                UserRepository,
            ],
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
        }).compile();
        authService = module.get<AuthService>(AuthService);
        userService = module.get<UserService>(UserService);
    })


    it('Service should be defined', () => {
        expect(authService).toBeDefined();
    })

    it('Should authenticate and return token', async () => {
        await userService.createUser(userDTO);
        const token = await authService.signin({ email: userDTO.email, password: userDTO.password });
        expect(token).toBeDefined();
    })

    it('Should throw UnauthorizedException if user does not exist', async () => {
        try {
            await authService.signin({
                email: '', password: 'password'
            });
        } catch (error) {
            expect(error.message).toBe('Invalid credentials');
            expect(error.status).toBe(401);
        }
    })

    it('Should throw UnauthorizedException if password is incorrect', async () => {
        try {
            await authService.signin({
                email: userDTO.email, password: 'wrongpassword'
            });
        } catch (error) {
            expect(error.message).toBe('Invalid credentials');
            expect(error.status).toBe(401);
        }
    })

    afterAll(async () => {
        await mongoose.connection.close();
        await closeInMongodConnection();
        module.close();
    })
})