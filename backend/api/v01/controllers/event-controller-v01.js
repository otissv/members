/*
* Event controller
*/

'use strict';

import Event from '../models/event-model-v01';


const eventClened = (event) => {
  return Object.assign({}, {
    address: event.address,
    attended: event.attended,
    duration: event.duration,
    enrolled: event.enrolled,
    title: event.title,
    room: event.room,
    start: event.start,
    status: event.status,
    _id: event.id
  });
};


export default {
  create (req, res) {
    const {
      address,
      attended,
      duration,
      enrolled,
      title,
      room,
      start,
      status
    } = req.body;

    // check to see if event already exists
    Event.findOne({ title }, (err, event) => {
      if (err) {
        return res.json({
          success: false,
          message: err
        });
      }

      if (event) {
        // Exit method if event already exists
        return res.status(400).send({
          success: false,
          message: 'Event already exists'
        });

      } else {
        // create a new event
        const newEvent = new Event({
          address,
          attended,
          duration,
          enrolled,
          title,
          room,
          start,
          status
        });

        // save new event
        newEvent.save(function (err) {
          if (err) {
            return res.json({
              success: false,
              message: err.errors.title.message
            });
          }

          return res.json({
            success: true,
            message: 'Events saved',
            result: eventClened(newEvent)
          });
        });
      }
    });
  },


  findAll (req, res) {
    // check header or url parameters or post parameters for token
    Event.find({}, (err, event) => {
      if (err) {
        return res.status(400).json({
          message: 'Error retriving event'
        });
      }

      if (event != null) {
        const eventList = event.map(event => eventClened(event));

        return res.json({
          success: true,
          message: 'Events found',
          result: eventList
        });

      } else {
        return res.status(404).json({
          sucess: false,
          message: 'No event were found'
        });
      }
    });
  },

  find (req, res) {
    const eventId = req.params.event;

    Event.findById(eventId, (err, event) => {
      if (err) {
        return res.status(400).json({
          success: false,
          message: 'Error retriving event'
        });
      }

      if (event != null) {
        return res.json({
          success: true,
          message: 'Event found',
          result: eventClened(event)
        });

      } else {
        return res.status(404).json({
          success: false,
          message: 'Event cannot be found'
        });
      }
    });
  },


  update (req, res) {
    const data = req.body;
    const id = req.parmas.id;

    Event.update(id, data, (err, result) => {
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
    var id = req.params.event;

    Event.remove(id, (err, result) => {
      if (err) {
        return res.status(400).json({
          success: false,
          message: 'Error removing event'
        });
      }

      if (result.result.n === 1) {
        return res.status(404).json({
          success: false,
          message: 'Event was not removed'
        });
      } else {
        return res.json({
          success: true,
          message: 'Event removed'
        });
      }

    });
  }

};
