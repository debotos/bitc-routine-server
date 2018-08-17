const auth = require('../middleware/auth');
const bcrypt = require('bcryptjs');
const _ = require('lodash');
const { User, validate } = require('../models/user');
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
      }
    },
    function(err, results) {
      // console.log(results);
      return res.json(results);
    }
  );
});

module.exports = router;
