'use strict';

import mongoose, { Schema} from 'mongoose';
import { userRef } from './user-model-v01';

export function commentRef () {
  return {
    type:  Schema.ObjectId,
    ref: 'Commennt'
  };
}

const commentSchema = new Schema({
  comment  : String,
  commenter: String,
  flag     : Boolean,
  user     : userRef()
});

export default mongoose.model('Comment', commentSchema);
