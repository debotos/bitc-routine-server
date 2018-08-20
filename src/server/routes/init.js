const auth = require('../middleware/auth');
const bcrypt = require('bcryptjs');
const _ = require('lodash');
const { User, validate } = require('../models/user');
const Teacher = require('../models/teacher');
const Semester = require('../models/semester');
const Subject = require('../models/subject');
const router = require('express').Router();
const async = require('async');

const validateLoginInput = require('../validation/login');
const validateSignUpInput = require('../validation/register');

// @route   GET init/
// @desc    Return current user
// @access  Private
router.get('/', auth, (req, res) => {
  async.parallel(
    {
      myProfile: function(callback) {
        const errors = {};
        User.findById(req.user.id)
          .select('-password')
          .then(profile => {
            if (!profile) {
              errors.noprofile = 'There are no profile';
              callback(null, errors);
            }
            callback(null, profile);
          })
          .catch(err => callback(null, { profile: 'There are no profile' }));
      },
      allProfiles: function(callback) {
        const errors = {};
        User.find()
          .select('-password')
          .then(profiles => {
            if (!profiles) {
              errors.noprofile = 'There are no profiles';
              callback(null, errors);
            }
            callback(null, profiles);
          })
          .catch(err => callback(null, { profiles: 'There are no profiles' }));
      },
      subjects: function(callback) {
        const errors = {};
        Subject.find()
          .then(subjects => {
            if (!subjects) {
              errors.noSubjects = 'There are no subjects';
              callback(null, errors);
            }
            callback(null, subjects);
          })
          .catch(err =>
            callback(null, { noSubjects: 'There are no subjects' })
          );
      },
      teachers: function(callback) {
        const errors = {};
        Teacher.find()
          .then(teachers => {
            if (!teachers) {
              errors.noTeachers = 'There are no teachers';
              callback(null, errors);
            }
            callback(null, teachers);
          })
          .catch(err =>
            callback(null, { noTeachers: 'There are no teachers' })
          );
      },
      semesters: function(callback) {
        const errors = {};
        Semester.find()
          .then(semesters => {
            if (!semesters) {
              errors.noSemesters = 'There are no semesters';
              callback(null, errors);
            }
            callback(null, semesters);
          })
          .catch(err =>
            callback(null, { noSemesters: 'There are no semesters' })
          );
      }
    },
    function(err, results) {
      // console.log(results);
      return res.json(results);
    }
  );
});

module.exports = router;
