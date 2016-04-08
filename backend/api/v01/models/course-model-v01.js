'use strict';

import mongoose, { Schema} from 'mongoose';
import { userRef } from './user-model-v01';


const courseSchema = new Schema({
  created   : Date,
  title: {
    type: String,
    required: ' Please enter a course title.'
  },
  status: {
    type: [{
      type: String,
      enum: [ 'deactivated', 'active' ]
    }],
    default: [ 'deactivated' ]
  },
  students  : [ userRef() ],
  updated   : {
    type: Date,
    default: Date.now
  },
  updatedBy: userRef()
});


export default mongoose.model('Course', courseSchema);
