import test from 'tape';
import env from '../../backend/env/development-env';
import fetch from '../helpers/fetch-test-helper';
import mongo from '../helpers/database-test-helpers';
import { expressStart } from '../helpers/express-test-helpers';


const {
  baseURL,
  mongodb
} = env;

// Base url
const ROOT_URL = baseURL;
const MONGO_URI = mongodb.uri;
const API = `${ROOT_URL}api/v01/`;


test('auth controller', nested => {
  const user = {
    username: 'ania',
    password: 'xyz'
  };

  mongo.collection({
    uri   : MONGO_URI,
    drop  : ['users'],
    seed  : {
      users: 3
    },
    insert:[
      {
        collection: 'users',
        data: user
      }
    ]
  });

  nested.test('Root route', assert => {
    fetch({
      method: 'get',
      url:   ROOT_URL,
      assert: (response) => {
        assert.deepEquals(response.status, 403,
          'Root is forbidden.');
      }
    });
    assert.end();
  });


  nested.test('Register user: ', assert => {
    fetch({
      method: 'post',
      url:   `${API}register`,
      assert (response) {
        assert.notOk(
          response.data.success, false,
          'Cannot register user with incorrect detils.');
      }
    });


    fetch({
      method: 'post',
      url:   `${API}register`,
      data: user,
      assert (response) {
        assert.ok(
          response.data.success, true,
          'User can be registered.');
      }
    });

    assert.end();
  });

  nested.test('Authenticate user: ', assert => {
    fetch({
      method: 'post',
      url:   `${API}authenticate`,
      data: user,
      assert (response) {
        assert.ok(
          response.data.success, true,
          'Authenticate user.');
      }
    });

    assert.end();
  });

  nested.test('unauthenticate user: ', assert => {
    fetch({
      method: 'post',
      url:   `${API}unauthenticate`,
      data: user,
      assert (response) {
        assert.ok(
          response.data.success, true,
          'Authenticate user.');
      }
    });

    assert.end();
  });

});
