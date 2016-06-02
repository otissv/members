'use strict';

import mongoose, { Schema } from 'mongoose';
import { userRef } from './user-model-v01';
import { categoryRef } from './category-model-v01';
import address from './address-model-v01.js';


const eventSchema = new Schema({
  allDay     : Boolean,
  address    : address,
  category   : categoryRef(),
  created    : Date,
  createdBy  : userRef(),
  description: String,
  end: {
    type    : Date,
    required: 'Please enter an end date.'
  },
  attendees : [{
    attendee : userRef(),
    attended : Boolean
  }],
  start: {
    type    : Date,
    default : Date.now,
    required: 'Please enter a start date.'
  },
  title : {
    type    : String,
    required: ' Please enter an event title.'
  },
  updated: {
    type   : Date,
    default: Date.now
  },
  updatedBy: userRef()
});


export default mongoose.model('Event', eventSchema);
