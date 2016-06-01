import test from 'tape';
import env from '../../backend/env/development-env';
import fetch from '../helpers/fetch-test-helper';
import {
  auth,
  userUpdateId,
  userDeleteId
} from '../seed/insert-seed';

const COLLECTION = 'users';
const AUTH = `?token=${auth.token}&_id=${auth._id}`;
const API_URL = `${env.baseURL}/api/v01/`;

test('Users controller:', assert => {
  fetch({
    method: 'get',
    url   : `${API_URL}${COLLECTION}/${AUTH}`,
    assert: (response) => {
      assert.ok(response.data.success,
        'Find all users');
    }
  });

  fetch({
    method: 'get',
    url   : `${API_URL}${COLLECTION}/${auth._id}${AUTH}`,
    assert: (response) => {
      assert.deepEquals(response.data.result.username, 'a',
        'Finds one user');
    }
  });

  fetch({
    method: 'put',
    url   : `${API_URL}${COLLECTION}/${userUpdateId}${AUTH}`,
    data: { firstName: 'Spencer' },
    assert: (response) => {
      assert.deepEquals(response.data.result.username, 'Spencer',
        'Updates a user');
    }
  });

  fetch({
    method: 'delete',
    url   : `${API_URL}${COLLECTION}/${userDeleteId}${AUTH}`,
    assert: (response) => {
      assert.ok(response.data.success,
        'Delete a user');
    }
  });


  assert.end();

});
