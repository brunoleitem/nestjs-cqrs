import { faker } from '@faker-js/faker'
import type { CreatePropertyDTO } from '@src/modules/properties/http/dto/create-property.dto'
import * as Factory from 'factory.ts'

export const propertyFactory = Factory.Sync.makeFactory<CreatePropertyDTO>({
  address: faker.location.streetAddress(),
  location: faker.location.city(),
  price: Number(faker.finance.amount())
})
