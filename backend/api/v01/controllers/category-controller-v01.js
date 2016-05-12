/*
* Course controller
*/

'use strict';

import Course, { colors } from '../models/category-model-v01';


const categoryClened = (category) => {
  return Object.assign({}, {
    color: category.color,
    title: category.title,
    status: category.status,
    students: category.students,
    _id: category.id
  });
};


export default {
  colors (req, res) {
    return res.json({
      success: true,
      message: 'Category colors',
      result: colors
    });
  },

  create (req, res) {
    const {
      color,
      title,
      status,
      students
    } = req.body;

    // check to see if category already exists
    Course.findOne({ title }, (err, category) => {
      if (err) {
        return res.json({
          success: false,
          message: err
        });
      }

      if (category) {
        // Exit method if category already exists
        return res.status(400).send({
          success: false,
          message: 'Course already exists'
        });

      } else {
        // create a new category
        const newCourse = new Course({
          color,
          title,
          status,
          students
        });

        // save new category
        newCourse.save(function (err) {
          if (err) {
            return res.json({
              success: false,
              message: err.errors.title.message
            });
          }

          return res.json({
            success: true,
            message: 'Categories saved',
            result: categoryClened(newCourse)
          });
        });
      }
    });
  },


  findAll (req, res) {
    // check header or url parameters or post parameters for token
    Course.find({}, (err, category) => {
      if (err) {
        return res.status(400).json({
          message: 'Error retriving category'
        });
      }

      if (category != null) {
        const categoryList = category.map(category => categoryClened(category));

        return res.json({
          success: true,
          message: 'Categories found',
          result: categoryList
        });

      } else {
        return res.status(404).json({
          sucess: false,
          message: 'No category were found'
        });
      }
    });
  },

  find (req, res) {
    const categoryId = req.params.category;

    Course.findById(categoryId, (err, category) => {
      if (err) {
        return res.status(400).json({
          success: false,
          message: 'Error retriving category'
        });
      }

      if (category != null) {
        return res.json({
          success: true,
          message: 'Course found',
          result: categoryClened(category)
        });

      } else {
        return res.status(404).json({
          success: false,
          message: 'Course cannot be found'
        });
      }
    });
  },

  update (req, res) {
    const data = req.body;
    const _id = req.params.category;
console.log(data);
    Course.update({ _id: _id }, data, (err, result) => {
      if (err) {
        return res.status(400).json({
          success: false,
          message: err
        });
      }

      if (result.nModified === 1) {
        return res.json({
          success: true,
          message: 'Course updated'
        });
      } else {
        return res.status(404).json({
          success: false,
          message: 'Course was not updatied'
        });
      }
    });
  },


  remove (req, res) {
    var category = req.params.category;

    console.log(req.params.category);
    Course.remove({ _id: category }, (err, result) => {
      if (err) {
        return res.status(400).json({
          success: false,
          message: 'Error removing category'
        });
      }

      if (result.result.n === 1) {
        return res.json({
          success: true,
          message: 'Course removed'
        });
      } else {
        return res.status(404).json({
          success: false,
          message: 'Course was not removed'
        });
      }

    });
  }

};
