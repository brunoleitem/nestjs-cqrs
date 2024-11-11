import * as Factory from 'factory.ts';
import { faker } from '@faker-js/faker';
import { CreatePropertyDTO } from '@src/modules/properties/http/dto/create-property.dto';

export const propertyFactory = Factory.Sync.makeFactory<CreatePropertyDTO>({
    address: faker.location.streetAddress(),
    location: faker.location.city(),
    price: Number(faker.finance.amount()),
}
);