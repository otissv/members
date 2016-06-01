/*
* Seed helper
*/

'use strict';

import fakeSeed from './../seed/fake-seed.js';


export default function createSeed (collection, count) {
  let documents = [];

  for (var i = 0; i < count; i++) {
    documents.push(fakeSeed()[collection]);
  }

  return documents;
};
