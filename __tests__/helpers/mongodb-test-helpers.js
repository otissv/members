/*
* Drop database collections helpers
*/

'use strict';

import createSeed from './seed-helpers.js';
import mongo from 'mongoskin';


let db;


function print (msg) {
  console.log(msg);
}


/*
* Drop database collections
*/
function dropCollections ({ db, drop }) {
  if (Array.isArray(drop)) {
    drop.forEach(collection => {
      db.collection(collection).drop();
    });

  } else {
    console.log('err');
    db.collection(drop).drop();
  }
};


/*
* Insert database collections
*/
function insertDocuments ({ db, collectionName, data }) {
  db.collection(collectionName).insert(data, (err) => {
    if (err) {
      console.log('err');
      print(err);
    }
  });
};


/*
* Reset database collections
*/
export function reset ({ db, duration = 100, drop, seed, insert }) {

  // Drop collections
  if (typeof drop !== 'undefined') {
    dropCollections({ db, drop });
  }


  // Insert manual documents into data
  if (typeof insert !== 'undefined') {
    insert.forEach(item => {
      insertDocuments({
        db,
        collectionName: item.collection,
        data: item.data
      });
    });
  }


  // Insert seed documents into data
  if (typeof seed !== 'undefined') {
    Object.keys(seed).forEach(key => {
      const collectionName = key;
      const count = seed[key];

      insertDocuments({
        db,
        collectionName,
        data: createSeed(collectionName, count)
      });
    });
  }

  setTimeout(() => db.close(), duration);
};


export function getDb () {
  return db;
}

export function connect (uri) {
  db = mongo.db(uri, {native_parser:true});
  return db;
};

export function close () {
  setTimeout(() => db.close(), 5000);
};

export default {
  close,
  connect,
  reset
};
