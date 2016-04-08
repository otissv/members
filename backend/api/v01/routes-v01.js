'use strcit';

import auth from './controllers/auth-controller-v01';
import user from './controllers/user-controller-v01';
import course from './controllers/course-controller-v01';
import event from './controllers/event-controller-v01';


/*
*  The order of routes is important!
*
*  1. auth.authenticate must be the first route
*  2. auth.authorise must be the sendon route so all onther routes are authenticated
*  3. All onther routes
*/

export default function routesV01 (app) {
  /*
  * Authentication routes
  */
  // unregister token
  app.route('/api/v01/unauthenticate')
    .post(auth.unauthenticate);

  // register user
  app.route('/api/v01/register')
   .post(auth.register);

  // authenticate user
  app.route('/api/v01/authenticate')
   .post(auth.authenticate);


  // Check have authorisation to access.
  app.use(auth.authorised);


  /*
  * All roures below here
  * ===========================
  */

  // Users routes
  app.route('/api/v01/users/')
  .get(user.findAll);

  app.route('/api/v01/users/:user')
    .get(user.find)
    .put(user.update)
    .delete(user.remove);


  // Course routes
  app.route('/api/v01/courses/')
    .post(course.create)
    .get(course.find)
    .put(course.update)
    .delete(course.remove);

  // Event routes
  app.route('/api/v01/events/')
    .post(event.create)
    .get(event.find)
    .put(event.update)
    .delete(event.remove);

};
