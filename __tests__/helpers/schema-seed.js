/*
* Seed models
*/

'use strict';

import faker from 'faker';

function schema () {
  return {
    users: {
      username: faker.internet.userName(),
      password: faker.internet.password()
    }
  };
}


export default schema;
