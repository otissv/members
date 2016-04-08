'use strict';

import mongoose from 'mongoose';
import USER from './users-model';


const courseSchema = new mongoose.Schema({
  created   : Date,
  name: {
    type: String,
    required: ' Please enter a group name.'
  },
  status: {
    type: [{
      type: String,
      enum: ['deactivated', 'active']
    }],
    default: ['deactivated']
  },
  students  : [USER],
  updated   : {
    type: Date,
    default: Date.now
  },
  updatedBy: USER
});


export default mongoose.model('Course', courseSchema);
