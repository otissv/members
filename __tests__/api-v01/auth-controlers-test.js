import test from 'tape';

import fetch from '../helpers/fetch-test-helper';


// Base url
const ROOT_URL = 'http://localhost:3000/';
const API = `${ROOT_URL}api/v01/`;


test('auth controller', nested => {
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

    const user = {
      username: 'jimmy',
      password: 'jimbob'
    };

    fetch({
      method: 'post',
      url:   `${API}register`,
      data: user,
      assert (response) {
        assert.ok(
          response.data.success, true,
          'Registered user.');
      }
    });


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
