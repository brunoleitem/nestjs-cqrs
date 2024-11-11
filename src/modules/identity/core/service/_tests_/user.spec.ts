import { MongooseModule } from '@nestjs/mongoose'
import { Test, TestingModule } from '@nestjs/testing'
import { closeInMongodConnection, rootMongooseTestModule } from '../../../../../../test/util/mongoose-memory-test.module'
import { UserSchema } from '../../../persistence/user.schema'
import { UserService } from '../user.service'
import { UserRepository } from '../../../persistence/user.repository'
import mongoose from 'mongoose'
import { userFactory } from '@test/factory/user-test.factory'

describe('User service', () => {
    let service: UserService;
    let module: TestingModule;
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
        const user = userFactory.build();
        const result = await service.createUser(user)
        expect(result).toBeDefined()
        expect(result.email).toBe(user.email)
        expect(result.firstName).toBe(user.firstName)
        expect(result.lastName).toBe(user.lastName)
    })

    it('Should not create a user if already exists', async () => {
        try {
            const user = userFactory.build();
            await service.createUser(user)
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