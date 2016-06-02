'use strict';

import faker from 'faker';
import { generateHash } from '../../backend/helpers/bycrypt-helper';
import objectID from 'bson-objectid';
import { colors } from '../../backend/api/v01/models/category-model-v01';

function randNumber (min, max, interval) {
  if (typeof interval === 'undefined') interval = 1;
  var r = Math.floor(Math.random() * (max - min + interval) / interval);
  return r * interval + min;
}

function randomDate (start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

const start = randomDate(new Date(2016, 0, 1), new Date(2016, 11, 31));
console.log('start', start.getDate() + 5);
console.log('end', new Date(2016, 11, start.getDate() + 5));

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


function attendees (count) {
  let students = [];

  for (var i = 0; i < count; i++) {
    students.push({
      attendee : objectID(),
      attended: faker.random.boolean()
    });
  }

  return students;
}


function category () {
  return {
    _id: objectID(),
    color: colors[randNumber(0, 18)],
    status: faker.random.boolean(),
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
      attendees  : attendees(3),
      category   : category(),
      created    : faker.date.past(),
      description: faker.lorem.sentence(),
      end        : faker.date.past(),
      start      : faker.date.past(),
      title      : faker.random.words(),
      updated    : new Date()
    }
  };
}
