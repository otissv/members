/*
*
 User model
*/
'use strict';

import mongoose, { Schema } from 'mongoose';
import address from './address-model-v01.js';
import { commentRef } from './comments-model-v01';

export function userRef () {
  return {
    type:  mongoose.Schema.Types.ObjectId,
    ref: 'User'
  };
}


const userSchema = new Schema({
  address: address,
  created   : { type: Date },
  createdBy : String,
  comments  : [commentRef()],
  DateOfBirth: { type: Date },
  email: {
    type: String
    // unique:true,
    // required: 'Please fill in your email'
    // match: [/.+\@.+\..+/, 'Please fill a valid email address']
  },
  firstName : String,
  lastName  : String,
  lastLogin : { type: Date },
  password  : {
    type    : String,
    required: 'Please fill in password'
  },
  roles: {
    type: [{
      type: String,
      enum: [
        'admin',
        'manager',
        'client',
        'instructor',
        'receptionist'
      ]
    }],
    default: 'receptionist'
  },
  telephone: Number,
  updated : { type: Date, default: Date.now },
  updatedBy : String,
  username: {
    type    : String,
    unique  : true,
    required: 'Please fill in username',
    trim: true
  }
});


export default mongoose.model('User', userSchema);
