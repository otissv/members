/*
* Course controller
*/

'use strict';

import Course from '../models/course-model-v01';


const courseClened = (course) => {
  return Object.assign({}, {
    title: course.title,
    status: course.status,
    students: course.students,
    _id: course.id
  });
};

function findAllCourses (req, res) {
  // check header or url parameters or post parameters for token
  Course.find({}, (err, course) => {
    if (err) {
      return res.status(400).json({
        message: 'Error retriving course'
      });
    }

    if (course != null) {
      const courseList = course.map(course => courseClened(course));

      return res.json({
        success: true,
        message: 'Courses found',
        result: courseList
      });

    } else {
      return res.status(404).json({
        sucess: false,
        message: 'No course were found'
      });
    }
  });
}

function findOneCourse (req, res) {
  const courseId = req.query.course;
  
  Course.findById(courseId, (err, course) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: 'Error retriving course'
      });
    }

    if (course != null) {
      return res.json({
        success: true,
        message: 'Course found',
        result: courseClened(course)
      });

    } else {
      return res.status(404).json({
        success: false,
        message: 'Course cannot be found'
      });
    }
  });
}


export default {
  create (req, res) {
    const { title, status, students } = req.body;

    // check to see if course already exists
    Course.findOne({ title }, (err, course) => {
      if (err) {
        return res.json({
          success: false,
          message: err
        });
      }

      if (course) {
        // Exit method if course already exists
        return res.status(400).send({
          success: false,
          message: 'Course already exists'
        });

      } else {
        // create a new course
        const newCourse = new Course({
          title,
          status,
          students
        });

        // save new course
        newCourse.save(function (err) {
          if (err) {
            return res.json({
              success: false,
              message: err.errors.title.message
            });
          }

          return res.json({
            success: true,
            message: 'Courses saved',
            result: courseClened(newCourse)
          });
        });
      }
    });
  },


  find (req, res) {
    if (!req.query.course) {
      findAllCourses(req, res);
    } else {
      findOneCourse(req, res);
    }
  },


  update (req, res) {
    const data = req.body;
    const id = req.body.id;

    Course.update(id, data, (err, result) => {
      if (err) {
        return res.status(400).json({
          success: false,
          message: 'Error updating course'
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
    var id = req.params.course;

    Course.remove(id, (err, result) => {
      if (err) {
        return res.status(400).json({
          success: false,
          message: 'Error removing course'
        });
      }

      if (result.result.n === 1) {
        return res.status(404).json({
          success: false,
          message: 'Course was not removed'
        });
      } else {
        return res.json({
          success: true,
          message: 'Course removed'
        });
      }

    });
  }

};
