/*
* Seed data
*/

'use strict';

import schema from './schema-seed.js';


/*
* Seed Data
*/
let seed = {
  create (collection, count) {
    let documents = [];

    for (var i = 0; i < count; i++) {
      documents.push(schema()[collection]);
    }

    return documents;
  }
};


export default seed;
