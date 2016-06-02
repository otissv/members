'use strict';

import faker from 'faker';
import objectID from 'bson-objectid';
import { generateHash } from '../../backend/helpers/bycrypt-helper';
import { colors } from '../../backend/api/v01/models/category-model-v01';
import { getDates, randNumber } from '../helpers/seed-helpers';


function address () {
  return {
    address1: faker.address.streetAddress(),
    address2: faker.address.secondaryAddress(),
    city    : faker.address.city(),
    state   : faker.address.state(),
    country : faker.address.country(),
    postCode: faker.address.zipCode(),
    room    : `${randNumber(1, 300)}`
  };
};


function students (count) {
  let stu = [];

  for (var i = 0; i < count; i++) {
    stu.push({
      attendee : objectID(),
      attended: faker.random.boolean()
    });
  }

  return stu;
}


function category () {
  return {
    _id: objectID(),
    color: [colors[randNumber(0, 18)]],
    status: faker.random.boolean() ? 'active' : 'deactivated',
    title: faker.random.words()
  };
}


export default function schema () {
  return {
    users: {
      address   : address(),
      email     : faker.internet.email(),
      firstName : faker.name.firstName(),
      lastName  : faker.name.lastName(),
      lastLogin : faker.date.past(),
      updated   : new Date(),
      password  : generateHash(faker.internet.password()),
      roles     : ['user'],
      telephone : faker.phone.phoneNumber(),
      username  : faker.internet.userName()
    },
    events: {
      allDay     : faker.random.boolean(),
      address    : address(),
      attendees  : students(3),
      category   : category(),
      created    : faker.date.past(),
      description: faker.lorem.sentence(),
      end        : faker.date.past(),
      start      : getDates().startDate,
      title      : faker.random.words(),
      updated    : new Date()
    },
    categories: {
      ...category(),
      students: students(3)
    }
  };
}
