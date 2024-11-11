import { MongooseModule } from "@nestjs/mongoose";
import { Test, TestingModule } from "@nestjs/testing";
import { PropertySchema } from "@src/modules/properties/persistence/property.schema";
import { closeInMongodConnection, rootMongooseTestModule } from "@test/util/mongoose-memory-test.module";
import mongoose from "mongoose";
import { PropertyService } from "../property.service";
import { PropertyRepository } from "@src/modules/properties/persistence/property.repository";

describe('PropertyService', () => {
    let module: TestingModule;
    let service: PropertyService;
    beforeAll(async () => {
        module = await Test.createTestingModule({
            providers: [
                PropertyService,
                PropertyRepository
            ],
            imports: [
                rootMongooseTestModule(),
                MongooseModule.forFeature([
                    {
                        name: 'Property',
                        schema: PropertySchema
                    }
                ])
            ]
        }).compile();

        service = module.get<PropertyService>(PropertyService);
    })

    it('Service should be defined', () => {
        expect(service).toBeDefined();
    })


    afterAll(async () => {
        await mongoose.connection.close();
        await closeInMongodConnection();
        await module.close();
    });
})