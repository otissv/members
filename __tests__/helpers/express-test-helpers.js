'use strict';
import express from 'express';
import main from './../../backend/main.js';

export function expressStart () {
  const app = express();
  main(app, express);
  return app;
}

export function expressExit () {
  process.exit();
}
