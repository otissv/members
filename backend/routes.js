/*
* Application routes
*/

'use strict';


import routesV01 from './api/v01/routes-v01';


export default function routes (app) {
  app.route('/').get((req, res) => {
    return res.status(403).send('403 Forbidden');
  });

  routesV01(app);
}
