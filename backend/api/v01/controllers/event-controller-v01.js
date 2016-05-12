/*
* Event controller
*/

'use strict';

import Event from '../models/event-model-v01';


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
    const {
      allDay,
      address,
      attended,
      category,
      description,
      end,
      invited,
      room,
      start,
      title
    } = req.body;

    // create a new event
    const newEvent = new Event({
      allDay,
      address,
      attended,
      category,
      description,
      end,
      invited,
      room,
      start,
      title
    });

    // save new event
    newEvent.save(function (err) {
      if (err) {
        return res.status(400).json({
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
    const _id = req.params.event;

    Event.update({ _id: _id }, data, (err, result) => {
      if (err) {
        return res.status(400).json({
          success: false,
          message: err
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
