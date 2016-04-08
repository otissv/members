'use strict';

import mongoose, { Schema } from 'mongoose';
import USER from './users-model';


const Address = new Schema({
  address1: String,
  address2: String,
  city    : String,
  state   : String,
  postCode: String
});

const eventSchema = new Schema({
  address: [Address],
  attended: [ USER ],
  created   : Date,
  createdBy   : USER,
  duration: Number,
  enrolled: [USER],
  name: {
    type: String,
    required: ' Please enter a class name.'
  },
  room: String,
  start: {
    type: Date,
    default: Date.now
  },
  status: {
    type: [{
      type: String,
      enum: ['not started', 'stared', 'ended']
    }],
    default: ['not started']
  },
  updated : {
    type: Date,
    default: Date.now
  },
  updatedBy: USER
});


export default mongoose.model('Event', eventSchema);
