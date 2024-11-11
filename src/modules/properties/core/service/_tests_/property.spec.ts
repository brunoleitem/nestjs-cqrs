import { getModelToken, MongooseModule } from "@nestjs/mongoose";
import { Test, TestingModule } from "@nestjs/testing";
import { PropertySchema } from "@src/modules/properties/persistence/property.schema";
import { closeInMongodConnection, rootMongooseTestModule } from "@test/util/mongoose-memory-test.module";
import mongoose, { Model } from "mongoose";
import { PropertyService } from "../property.service";
import { PropertyRepository } from "@src/modules/properties/persistence/property.repository";
import { User, UserSchema } from "@src/modules/identity/persistence/user.schema";
import { userFactory } from "@test/factory/user-test.factory";
import { propertyFactory } from "@test/factory/property-test.factory";

describe('PropertyService', () => {
    let module: TestingModule;
    let service: PropertyService;
    let userModel: Model<User>

    const property = propertyFactory.build();
    const user = userFactory.build();
    const mockUserModel = {
        createUser: jest.fn(),
        findOne: jest.fn()
    }

    beforeAll(async () => {
        module = await Test.createTestingModule({
            providers: [
                PropertyService,
                PropertyRepository,
                {
                    provide: getModelToken('User'),
                    useValue: mockUserModel
                }
            ],
            imports: [
                rootMongooseTestModule(),
                MongooseModule.forFeature([
                    {
                        name: 'Property',
                        schema: PropertySchema
                    }
                ]),
                MongooseModule.forFeature([
                    {
                        name: 'User',
                        schema: UserSchema
                    }
                ])
            ]
        }).compile();

        service = module.get<PropertyService>(PropertyService);
        userModel = module.get<Model<User>>(getModelToken('User'));
    })

    it('Service should be defined', () => {
        expect(service).toBeDefined();
    })

    it('Should create a property', async () => {
        const createdUser = await userModel.create(user);
        expect(createdUser).toBeDefined();
        const createdProperty = await service.createProperty(property, createdUser._id.toString());
        expect(createdProperty).toBeDefined();
        expect(createdProperty.address).toBe(property.address);
        expect(createdProperty.location).toBe(property.location);
        expect(createdProperty.price).toBe(property.price);
        expect(createdProperty.createdBy).toStrictEqual(createdUser._id);
    })

    it('Should find properties by user', async () => {
        const createdUser = await userModel.create(user);
        expect(createdUser).toBeDefined();
        const createdProperty = await service.createProperty(property, createdUser._id.toString());
        expect(createdProperty).toBeDefined();
        const properties = await service.findByUser(createdUser._id.toString());
        expect(properties).toBeDefined();
        expect(properties).toHaveLength(1);
        expect(properties[0].address).toBe(property.address);
        expect(properties[0].location).toBe(property.location);
        expect(properties[0].price).toBe(property.price);
        expect(properties[0].createdBy).toStrictEqual(createdUser._id);
    })

    afterEach(async () => {
        await userModel.deleteMany({});
    })

    afterAll(async () => {
        await mongoose.connection.close();
        await closeInMongodConnection();
        await module.close();
    });
})