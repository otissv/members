'use strict';

import mongoose, { Schema } from 'mongoose';
import { userRef } from './user-model-v01';
import { categoryRef } from './category-model-v01';
import address from './address-model-v01.js';
import { commentRef } from './comments-model-v01';

import mongooseDeepPopulate from 'mongoose-deep-populate';

const deepPopulate = mongooseDeepPopulate(mongoose);

const eventSchema = new Schema({
  allDay     : Boolean,
  address    : address,
  category   : categoryRef(),
  comments   : [commentRef()],
  created    : Date,
  createdBy  : userRef(),
  description: String,
  end: {
    type    : Date,
    required: 'Please enter an end date.'
  },
  instructors: [userRef()],
  invited : [{
    client : userRef(),
    attended : Boolean
  }],
  level: String,
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


eventSchema.plugin(deepPopulate, {
  populate: {
    category: {
      select: '_id title color'
    },
    'invited.client': {
      select: '_id firstName lastName'
    }
  }
});


export default mongoose.model('Event', eventSchema);
