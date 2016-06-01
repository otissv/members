'use strict';

import faker from 'faker';
import { generateHash } from '../../backend/helpers/bycrypt-helper';


export default function schema () {
  return {
    users: {
      address: {
        address1: faker.address.streetAddress(),
        address2: faker.address.secondaryAddress(),
        city    : faker.address.city(),
        state   : faker.address.state(),
        country : faker.address.country(),
        postCode: faker.address.zipCode()
      },
      email: faker.internet.email(),
      firstName : faker.name.firstName(),
      lastName  : faker.name.lastName(),
      lastLogin: faker.date.past(),
      updated:  new Date(),
      password: generateHash(faker.internet.password()),
      roles: ['user'],
      telephone: faker.phone.phoneNumber(),
      username: faker.internet.userName()
    }
  };
}
