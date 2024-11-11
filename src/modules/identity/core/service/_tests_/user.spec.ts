import { getModelToken, MongooseModule } from '@nestjs/mongoose'
import { Test, TestingModule } from '@nestjs/testing'
import { closeInMongodConnection, rootMongooseTestModule } from '../../../../../../test/util/mongoose-memory-test.module'
import { UserSchema } from '../../../persistence/user.schema'
import { UserService } from '../user.service'
import { UserRepository } from '../../../persistence/user.repository'
import mongoose, { Model } from 'mongoose'
import { userFactory } from '@test/factory/user-test.factory'
import { Property, PropertySchema } from '@src/modules/properties/persistence/property.schema'
import { propertyFactory } from '@test/factory/property-test.factory'
import { create } from 'domain'

describe('User service', () => {
    let service: UserService;
    let module: TestingModule;
    let propertyModel: Model<Property>

    const property = propertyFactory.build()
    const mockPropertyModel = {
        create: jest.fn(),
        findOne: jest.fn()
    }

    beforeAll(async () => {
        module = await Test.createTestingModule({
            providers: [
                UserService,
                UserRepository,
                {
                    provide: getModelToken('Property'),
                    useValue: mockPropertyModel
                }
            ],
            imports: [
                rootMongooseTestModule(),
                MongooseModule.forFeature([
                    {
                        name: 'User',
                        schema: UserSchema,
                    },
                ]),
                MongooseModule.forFeature([
                    {
                        name: 'Property',
                        schema: PropertySchema,
                    },
                ]),
            ]

        }).compile();
        service = module.get<UserService>(UserService);
        propertyModel = module.get<Model<Property>>(getModelToken('Property'))
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

    it('Should add property to favorites', async () => {
        const user = userFactory.build();
        const createdUser = await service.createUser(user)

        const createdProperty = await propertyModel.create({ ...property, createdBy: createdUser.id })
        await service.addToFavorites(createdUser.id, createdProperty.id)
        const result = await service.findById(createdUser.id, ['favorites'])
        expect(result).toBeDefined()
        expect(result.favorites[0].id).toStrictEqual(createdProperty.id)
    })

    it('Should not add property to favorites if already exists', async () => {
        try {
            const user = userFactory.build();
            const createdUser = await service.createUser(user)
            const createdProperty = await propertyModel.create({ ...property, createdBy: createdUser.id })
            await service.addToFavorites(createdUser.id, createdProperty.id)
            await service.addToFavorites(createdUser.id, createdProperty.id)
        } catch (error) {
            expect(error.message).toBe('Property already in favorites')
            expect(error.status).toBe(400)
        }
    })

    it('Should not add property to favorites if user not found', async () => {
        try {
            const user = userFactory.build();
            const createdUser = await service.createUser(user)
            const createdProperty = await propertyModel.create({ ...property, createdBy: createdUser.id })
            await service.addToFavorites(new mongoose.Types.ObjectId().toHexString(), createdProperty.id)
        } catch (error) {
            expect(error.message).toBe('User not found')
            expect(error.status).toBe(400)
        }
    })

    afterEach(async () => {
        await service.clear();
        await propertyModel.deleteMany({})
    });

    afterAll(async () => {
        await mongoose.connection.close();
        await closeInMongodConnection();
        module.close();
    })

})
