/*
* User contoller
*/


'use strict';

import jwt from 'jsonwebtoken';
import secret from '../../../../secret';
import User from '../models/user-model-v01';
import {
  generateHash,
  isValidateHash
} from '../../../helpers/bycrypt-helper';
import {
  deleteToken,
  generateToken,
  getToken,
  validateToken
} from '../../../helpers/token-helper';


function userSuccessResult (user, token) {
  return {
    username: user.username,
    _id     : user._id,
    roles   : user.roles,
    token   : token
  };
}

export default {
  authenticate (req, res) {

    User.findOne({
      username: req.body.username
    }, function (err, user) {
      if (err) throw err;


      function sendToken (token) {
        if (token) {
          // If user token has token return token
          return res.json({
            success: true,
            message: 'User has been authenticated!',
            result: userSuccessResult(user, token)
          });

        } else {
          // If user does not have a token, generate a new one.
          return res.json({
            success: true,
            message: 'User has been authenticated!',
            result: userSuccessResult(user, generateToken(user, secret))
          });
        }
      }

      if (!user) {
        return res.json({ success: false, message: 'Authentication failed. User not found.' });

      } else if (user) {

        // Check if password is correct
        if (!isValidateHash(req.body.password, user.password)) {
          console.log('body', req.body.password);
          console.log('user', user.password);
          return res.json({ success: false, message: 'Authentication failed. Either the username or password was incorrect.' });

        } else {
          // Send token
          getToken(user._id, sendToken);
        }
      }
    });
  },


  authorised (req, res, next) {
    // Check header or url parameters or post parameters for token
    const token = req.body.token || req.query.token || req.headers['x-access-token'];

    // Check header or url parameters or post parameters for _id
    const _id = req.body._id || req.query._id || req.headers['x-access-id'];

    function verifyToken (token) {
      // Verifies secret and checks exp
      jwt.verify(token, secret, function (err, decoded) {
        if (err) {
          return res.json({ success: false, message: 'Failed to authenticate token.' });

        } else {
          // If everything is good, save to request for use in other routes
          req.auth = {
            roles: decoded._doc.roles,
            _id: decoded._doc._id
          };
          
          next();
        }
      });
    }

    // Decode token
    if (token) {
      // Check if token is valid
      validateToken(_id, token, verifyToken);
    } else {

      // If there is no token return an error
      return res.status(403).send({
        success: false,
        message: '403 Forbidden.'
      });
    }
  },


  register (req, res) {
    const { username, password } = req.body;

    // check to see if user already exists
    User.findOne({ username }, (err, user) => {
      if (err) {
        return res.json({
          success: false,
          message: 'Error finding user'
        });
      }

      if (user) {
        // Exit method if user already exists
        return res.status(400).send({
          success: false,
          message: 'User already exists'
        });

      } else {
        // create a new user
        const newUser = new User({
          username: username,
          password: generateHash(password)
        });

        // save new user
        newUser.save(function (err) {
          if (err) {
            return res.json({
              success: false,
              message: {
                username: err.errors.username ? err.errors.username.message : 'OK'
              }
            });
          }

          // Generate json web token
          const token = generateToken(newUser, secret);

          return res.json({
            success: true,
            meassage: 'User saved',
            result: userSuccessResult(newUser, token)
          });
        });
      }
    });
  },

  unauthenticate (req, res) {
    // Check header or url parameters or post parameters for _id
    const _id = req.params._id;

    function cb (err, reply) {
      if (err) {
        res.status(500).json({
          success: false,
          message: 'There was an server error when loggoing out'
        });
      }

      if (reply === 0) {
        res.status(403).json({
          success: false,
          message: 'User not fond'
        });
      } else {
        res.json({
          success: true,
          message: 'User was logged out successfully'
        });
      }

    }

    deleteToken(_id, cb);
  }
};
