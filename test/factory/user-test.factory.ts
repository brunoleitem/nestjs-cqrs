import { faker } from '@faker-js/faker'
import type { User } from '@src/modules/identity/persistence/user.schema'
import * as Factory from 'factory.ts'

export const userFactory = Factory.Sync.makeFactory<User>({
  email: faker.internet.email(),
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  password: faker.internet.password()
})
