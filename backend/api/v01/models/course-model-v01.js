'use strict';

import mongoose, { Schema} from 'mongoose';
import { userRef } from './users-model';


const courseSchema = new Schema({
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
  students  : [userRef],
  updated   : {
    type: Date,
    default: Date.now
  },
  updatedBy: userRef
});


export default mongoose.model('Course', courseSchema);
