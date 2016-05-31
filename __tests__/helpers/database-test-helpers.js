/*
* Drop database collections helpers
*/

'use strict';

import seed from './seed-helpers.js';
import objectID from 'bson-objectid';
import mongodb from 'mongodb';

const MongoClient = mongodb.MongoClient;

function print (msg) {
  console.log(msg);
}

function closeIdleDb ({ db, uri }) {
  setTimeout(function () {
    print(`Mongodb, connection closed at ${uri}`);
    db.close();
  }, 100);
};


function dropCollection ({ db, dropCols }) {
  print('Dropping collections');

  if (Array.isArray(dropCols)) {
    dropCols.forEach(collection => {
      db.collection(collection).drop();
    });
  } else {
    db.collection(dropCols).drop();
  }
};


/*
* Insert database collections
*/
function insertDocuments (db, collection, data) {
  print('Inserting test documents');
  db.collection(collection).insert(data, (err) => {
    if (err) {
      print(err);
    }
  });
};


/*
* Reset Database collections
*/
let dbCollection = (opts) => {

  const uri = opts.uri;
  const dropCols = opts.drop;
  const insertSeed = opts.seed;
  const docs = opts.insert;
  const documents = {};

  // Add docs to to documents to be inserted
  MongoClient.connect(uri, (err, db) => {
    if (err) {
      print(err);
      return;
    }

    print(`Starting seed MongoBD t ${uri}`);


    // Drop collections
    if (typeof dropCols !== 'undefined') {
      dropCollection({ db, dropCols });
    }


    // Insert seed documents into data
    if (typeof insertSeed !== 'undefined') {
      Object.keys(insertSeed).forEach(key => {
        let collection = key;
        let count = insertSeed[key];
        insertDocuments(db, collection, seed.create(collection, count));
      });
    }


    // Insert manual documents into data
    if (typeof docs !== 'undefined') {
      if (Array.isArray(docs)) {
        docs.forEach(docItem => {
          let tmp = typeof documents[docItem.collection] === 'undefined' ? documents[docItem.collection] = [] : documents[docItem.collection];

          tmp.push(docItem.data);

        }, documents);

        Object.keys(documents).forEach(key => {
          insertDocuments(db, key, documents[key]);
        });
      } else {
        if (typeof docs.data._id !== 'undefined') {
          docs.data._id = objectID();
        }

        documents[docs.name] = docs.data;

        insertDocuments({ db, collection: docs.name, data: docs.data });
      }
    }

    closeIdleDb({ db, uri });
  });
};


/*
* Insert one document in to the database
*/
let insertOne = (opts) => {

  const uri = opts.uri;
  const collection = opts.collection;
  const document = opts.data;

  document._id = objectID();

  let MongoClient = require('mongodb').MongoClient;

  MongoClient.connect(uri, (err, db) => {
    if (err) {
      print(err);
      return;
    }

    dropCollection({ db, collection });

    insertDocuments({ db, collection, data:document });

    closeIdleDb({ db, uri });
  });


  return document;
};


let dbHelper = {
  collection: dbCollection,
  insertOne
};


export default dbHelper;
