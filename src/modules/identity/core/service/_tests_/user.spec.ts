import { MongooseModule } from '@nestjs/mongoose'
import { Test, TestingModule } from '@nestjs/testing'
import { closeInMongodConnection, rootMongooseTestModule } from '../../../../../../test/util/mongoose-memory-test.module'
import { UserSchema } from '../../../persistence/user.schema'
import { UserService } from '../user.service'
import { UserRepository } from '../../../persistence/user.repository'
import mongoose from 'mongoose'

describe('User service', () => {
    let service: UserService;
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
                UserService,
                UserRepository
            ],
            imports: [
                rootMongooseTestModule(),
                MongooseModule.forFeature([
                    {
                        name: 'User',
                        schema: UserSchema,
                    },
                ]),
            ]

        }).compile();
        service = module.get<UserService>(UserService);
    })

    it('Service should be defined', () => {
        expect(service).toBeDefined();
    })

    it('Should create a user', async () => {

        const result = await service.createUser(userDTO)
        expect(result).toBeDefined()
        expect(result.email).toBe(userDTO.email)
        expect(result.firstName).toBe(userDTO.firstName)
        expect(result.lastName).toBe(userDTO.lastName)
    })

    it('Should not create a user if already exists', async () => {
        try {
            await service.createUser(userDTO)
        } catch (error) {
            expect(error.message).toBe('User already exists')
            expect(error.status).toBe(400)
        }
    })
    afterAll(async () => {
        await mongoose.connection.close();
        await closeInMongodConnection();
        module.close();
    })

})