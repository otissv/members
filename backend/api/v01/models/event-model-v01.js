'use strict';

import mongoose, { Schema } from 'mongoose';
import { userRef } from './user-model-v01';
import address from './address-model-v01.js';


const eventSchema = new Schema({
  allDay     : Boolean,
  address    : address,
  attended   : [ userRef() ],
  created    : Date,
  createdBy  : userRef(),
  description: String,
  duration   : Number,
  end: {
    type    : Date,
    required: 'Please enter an end date.'
  },
  enrolled   : [ userRef() ],
  room       : String,
  start: {
    type    : Date,
    default : Date.now,
    required: 'Please enter a start date.'
  },
  status: {
    type: [{
      type: String,
      enum: [ 'not started', 'started', 'ended' ]
    }],
    default: [ 'not started' ]
  },
  title : {
    type    : String,
    required: ' Please enter a class name.'
  },
  updated: {
    type   : Date,
    default: Date.now
  },
  updatedBy: userRef()
});


export default mongoose.model('Event', eventSchema);
