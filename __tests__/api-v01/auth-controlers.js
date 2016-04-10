import test from 'tape';

import request from 'supertest';
import config  from '../../backend/env/development-env';
import { expressStart, expressExit } from '../helpers/express-test-helpers';

// Base url
const ROOT_URL = `/api/v01/`;


test('auth controller', nested => {
  nested.test('Root route', assert => {
    const app = expressStart();
    const agent = request(app);

    agent
      .get('/')
      .end((err, res) => {
        const actual = err || res.status;
        const expected = 403;

        assert.equals(actual, expected,
         'No access to root');
      });

    assert.end();
    // expressExit();
  });


  nested.test('register user', assert => {
    const app = expressStart();
    const agent = request(app);

    const user = {
      username: 'jimmy',
      password: 'jombo'
    };

    // register with incorect form
    agent
      .post('/api/v01/register')
      .end((err, res) => {
        const noUserDetails = err || res.body.success;
        const expectedNoUserDetails = false;

        assert.notOk(noUserDetails, expectedNoUserDetails,
         'No details provided for to register user');


        // expressExit();
      });

    // register user
    agent
      .post('/api/v01/register', user)
      .end((err, res) => {
        const registerUser = err || res.body.success;
        const expectedRegisterUser = true;

        assert.ok(registerUser, expectedRegisterUser,
          'User was registed');
      });

    assert.end();
      expressExit();
  });

});
