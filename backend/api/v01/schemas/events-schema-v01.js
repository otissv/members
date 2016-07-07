import isSchema from 'is-schema-valid';
import { addressSchema } from './address-schema-v01';
import objectID from 'bson-objectid';

var Promise = require('bluebird');
var mongoskin = require('mongoskin');
Object.keys(mongoskin).forEach(function (key) {
  var value = mongoskin[key];
  if (typeof value === 'function') {
    Promise.promisifyAll(value);
    Promise.promisifyAll(value.prototype);
  }
});
Promise.promisifyAll(mongoskin);


export const eventSchema = {
  allDay     : 'boolean',
  address    : { type: addressSchema },
  banner     : 'string',
  category   : {
    ref:  'categories',
    type: 'string',
    match: /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i
  },
  created    : 'string',
  createdBy  : {
    type: 'string',
    match: /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i
  },
  description: 'string',
  end        : {
    type : 'string',
    required: true
  },
  invited : [{
    client: {
      ref:  'users',
      type: 'string',
      match: /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i
    },
    attended : 'boolean'
  }],
  level    : 'string',
  start    : {
    type: 'string',
    required: true
  },
  title    : {
    type: 'string',
    required: true
  },
  updated  : 'string',
  updatedBy: {
    type: 'string',
    match: /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i
  }
};

/*eslint no-extend-native: ["error", { "exceptions": ["Promise"] }]*/

Promise.prototype.populate = function (args) {
  const collections = args.split(' ');
  let polulatedData;

  const getStringDotNotaionValue = (obj, notaion) => {
    const reducer = (prev, curr) => {
      if (prev === notaion[0]) {
        return obj[notaion[0]];
      } else {
        if (Array.isArray(prev)) {

          return prev[0][curr];
        } else {
          return prev[curr];
        }
      }
    };

    return notaion.reduce(reducer, notaion[0]);
  };

  const getRefs = (schema) => {
    if (typeof args === 'string') {
      const obj = {};

      return this.map(item => {

        return collections.map(collection => {

          const notaion = collection.split('.');
console.log(notaion);
          // get refs
          const ref = getStringDotNotaionValue(schema, notaion).ref;

          // get _id of ref
          const _id = getStringDotNotaionValue(item, notaion);


          return db.collection(ref).findAsync({_id: _id})
            .then(resolve => {
              return resolve.toArray().then(data => {
                if (!notaion[1]) {
                  item[notaion] = data[0];
                  return item;
                } else {
                  item[notaion[0]][notaion[1]] = data[0];
                  return item;
                }

              });
            });
        })[1];
      });
    }
  };

  // console.log(this);
  // console.log(this);
  return getRefs(eventSchema);
};


function find (query = {}, options = {}) {
  return collection.findAsync(query, options);
}


function findById (_id, options = {}) {
  return collection.findAsync({ _id: objectID(_id) }, options)
    .then(resolve => {
      return resolve.toArray().then(data => {
        return data;
      });
    });
}

function insert (data, cb) {
  isValid(data) ? collection.insert(data, cb) : false;
}

export function isValid (data) {
  return isSchema(eventSchema)(data);
}


const db = mongoskin.db('mongodb://127.0.0.1:27017/test', {native_parser:true});
const collection = db.collection('events');


export default {
  find,
  findById,
  insert
};
