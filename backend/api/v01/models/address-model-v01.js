'use strict';

import { Schema } from 'mongoose';


const address = new Schema({
  address1: String,
  address2: String,
  city    : String,
  state   : String,
  country : String,
  postCode: String
});

export default address;
