'use strict';

import mongoose, { Schema } from 'mongoose';
import { userRef } from './user-model-v01';
import address from './address-model-v01.js';


const eventSchema = new Schema({
  address: address,
  attended: [ userRef() ],
  created   : Date,
  createdBy   : userRef(),
  duration: Number,
  enrolled: [ userRef() ],

  title: {
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
      enum: [ 'not started', 'stared', 'ended' ]
    }],
    default: [ 'not started' ]
  },
  updated : {
    type: Date,
    default: Date.now
  },
  updatedBy: userRef()
});


export default mongoose.model('Event', eventSchema);
