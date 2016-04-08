/*
*
 User model
*/
'use strict';

import mongoose, { Schema } from 'mongoose';

const USER = {
  type: Schema.Types.ObjectId,
  ref: 'User'
};
module.exports = USER;

const userSchema = new Schema({
  created  : { type: Date },
  displayName: String,
  email: {
    type: String
    // unique:true,
    // required: 'Please fill in your email'
    // match: [/.+\@.+\..+/, 'Please fill a valid email address']
  },
  firstName  : String,
  lastLogin: { type: Date },
  lastName   : String,
  password: {
    type    : String,
    required: 'Please fill in password.'
  },
  roles: {
    type: [{
      type: String,
      enum: ['student', 'admin', 'teacher']
    }],
    default: ['student']
  },
  telephones: Number,
  updated  : {
    type: Date,
    default: Date.now
  },
  updatedBy: USER,
  username: {
    type    : String,
    unique  : true,
    required: 'Please fill in username.',
    trim: true
  }
});


export default mongoose.model('User', userSchema);
