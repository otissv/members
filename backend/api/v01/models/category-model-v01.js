'use strict';

import mongoose, { Schema} from 'mongoose';
import { userRef } from './user-model-v01';


export function categoryRef () {
  return {
    type:  mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  };
}

export const colors = {
  red       : '#f44336',
  pink      : '#E91E63',
  purple    : '#9C27B0',
  deepPurple: '#673AB7',
  indigo    : '#3F51B5',
  blue      : '#2196F3',
  lightBlue : '#03A9F4',
  cyan      : '#00BCD4',
  teal      : '#009688',
  green     : '#4CAF50',
  lightGreen: '#8BC34A',
  lime      : '#CDDC39',
  yellow    : '#FFEB3B',
  amber     : '#FFC107',
  orange    : '#FF9800',
  deepOrange: '#FF5722',
  brown     : '#795548',
  grey      : '#9E9E9E',
  blueGray  : '#607D8B'
};

const categorySchema = new Schema({
  color: {
    type: String,
    enum: Object.keys(colors).map(i => i),
    default: 'blue'
  },
  created: Date,
  status : {
    type: [{
      type: String,
      enum: [ 'deactivated', 'active' ]
    }],
    default: [ 'active' ]
  },
  students: [ userRef() ],
  title: {
    type    : String,
    required: 'Please enter a category title.'
  },
  updated: {
    type   : Date,
    default: Date.now
  },
  updatedBy: userRef()
});


export default mongoose.model('Category', categorySchema);
