import mongo from './helpers/mongodb-test-helpers';
import redis from './helpers/redis-test-helpers';
import env from '../backend/env/development-env';
import { users } from './seed/insert-seed';


export const DURATION = 600;

export function pretest () {
  const MONGO_URI = env.mongodb.uri;

  redis.reset();

  mongo.reset({
    duration: DURATION,
    db: mongo.connect(MONGO_URI),
    drop  : ['users', 'events'],
    seed  : {
      users : 3,
      events: 3
    },
    insert:[
      {
        collection: 'users',
        data: users
      }
    ]
  });
};