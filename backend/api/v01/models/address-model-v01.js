'use strict';

import { Schema } from 'mongoose';


const address = new Schema({
  address1: String,
  address2: String,
  city    : String,
  state   : String,
  postCode: String
});

export default address;
