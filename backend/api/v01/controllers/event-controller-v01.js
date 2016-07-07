/*
* Event controller
*/

'use strict';

import Event from '../models/event-model-v01';
import EventS, { eventSchema } from '../schemas/events-schema-v01';
import {
  isCollectionEmpty,
  isObjectEmpty,
  cleanObject
} from '../../../helpers/object-helpers';

const eventClened = (event) => {

  return Object.assign({}, {
    allDay     : event.allDay,
    address    : event.address,
    attended   : event.attended,
    category   : event.category,
    description: event.description,
    end        : event.end,
    invited    : event.invited,
    start      : event.start,
    title      : event.title,
    _id        : event.id
  });
};


export default {
  create (req, res) {
    const newEvent = cleanObject({
      allDay     : req.body.allDay,
      address    : isObjectEmpty(req.body.address) ? undefined : req.body.address,
      category   : isObjectEmpty(req.body.category) ? undefined : req.body.category,
      description: req.body.description,
      end        : req.body.end,
      invited    : isCollectionEmpty(req.body.invited) ? undefined : req.body.invited,
      level      : req.body.level,
      start      : req.body.start,
      title      : req.body.title
    });

    EventS.insert(newEvent, (err, evenr) => {
      if (err) {
        console.log(err.errors);
        return res.status(400).json({
          success: false,
          message: 'Event did not save'
        });
      }

      return res.json({
        success: true,
        message: 'Events saved',
        result: eventClened(evenr)
      });
    });
  },


  findAll (req, res) {
    // check header or url parameters or post parameters for token
    EventS.find()
      .then(resolve => {
        resolve.toArray()
          .then(events => {
            return res.json({
              success: true,
              message: 'Events found',
              result: events
            });
          });
      });

    // check header or url parameters or post parameters for token
    // Event.find({}, (err, event) => {
    //   if (err) {
    //     return res.status(400).json({
    //       message: 'Error retriving event'
    //     });
    //   }
    //
    //   if (event != null) {
    //     const eventList = event.map(event => eventClened(event));
    //
    //     return res.json({
    //       success: true,
    //       message: 'Events found',
    //       result: eventList
    //     });
    //
    //   } else {
    //     return res.status(404).json({
    //       sucess: false,
    //       message: 'No event were found'
    //     });
    //   }
    // });
  },

  find (req, res) {
    const eventId = req.params.event;


    EventS.findById(eventId)
      // .populate('invited.client category')
      // .then(event => {
      //   console.log(event[0]);
      //   return res.json({
      //     success: true,
      //     message: 'Events found',
      //     result: event[0]
      //   });
      // });

    Event.findById(eventId)
      .deepPopulate('category, invited.client')
      .then(event => {
        if (event != null) {
          return res.json({
            success: true,
            message: 'Event found',
            result: event
          });

        } else {
          return res.status(404).json({
            success: false,
            message: 'Event cannot be found'
          });
        }
      })
      .catch(() => {
        return res.status(400).json({
          success: false,
          message: 'Error retriving event'
        });
      });
  },


  update (req, res) {
    const data = req.body;
    const _id = req.params.event;

    Event.update({ _id: _id }, data, (err, result) => {
      if (err) {
        return res.status(400).json({
          success: false,
          message: 'Error updating event'
        });
      }

      if (result.nModified === 1) {
        return res.json({
          success: true,
          message: 'Event updated'
        });
      } else {
        return res.status(404).json({
          success: false,
          message: 'Event was not updatied'
        });
      }
    });
  },


  remove (req, res) {
    var event = req.params.event;

    console.log(req.params.event);
    Event.remove({ _id: event }, (err, result) => {
      if (err) {
        return res.status(400).json({
          success: false,
          message: 'Error removing event'
        });
      }

      if (result.result.n === 1) {
        return res.json({
          success: true,
          message: 'Event removed'
        });
      } else {
        return res.status(404).json({
          success: false,
          message: 'Event was not removed'
        });
      }

    });
  }

};
