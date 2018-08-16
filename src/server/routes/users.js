const auth = require('../middleware/auth');
const bcrypt = require('bcryptjs');
const _ = require('lodash');
const { User, validate } = require('../models/user');
const router = require('express').Router();

const validateLoginInput = require('../validation/login');
const validateSignUpInput = require('../validation/register');

// @route   GET api/users/me
// @desc    Return current user
// @access  Private
// set Header key: x-auth-token, value: token
router.get('/me', auth, async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  if (user) {
    return res.send(user);
  } else {
    return res.status(400).send('Not logged in!');
  }
});

// @route   POST api/users/register
// @desc    Register user
// @access  Public
router.post('/register', async (req, res) => {
  const { errors, isValid } = validateSignUpInput(req.body);
  // Check Validation
  if (!isValid) return res.status(400).json(errors);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send({ email: 'Email already exists!' });

  user = new User(_.pick(req.body, ['name', 'img', 'email', 'password']));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  res.json({
    success: true,
    msg: '👨‍ Successfully registered a new admin account ✔ '
  });
});

// @route   GET api/users/login
// @desc    Login User / Returning JWT Token
// @access  Public
router.post('/login', async (req, res) => {
  // validation example using joi
  // const { error } = validateLocally(req.body);
  const { errors, isValid } = validateLoginInput(req.body);
  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  let user = await User.findOne({ email: req.body.email });
  // Check for user
  if (!user) {
    errors.email = 'User not found!';
    return res.status(404).json(errors);
  }

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    errors.password = 'Password incorrect!';
    return res.status(404).json(errors);
  }

  const token = user.generateAuthToken();
  res.json({
    success: true,
    token: token
  });
});

// @route   POST api/users/me/edit
// @desc    Update user info
// @access  Private
router.post('/me/edit', auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  // User can't change email but [name, password, img]
  user = _.pick(req.body, ['name', 'img', 'password']);
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await User.findOneAndUpdate(
    { email: req.body.email },
    { $set: user },
    { new: true }
  ).then(profile => res.json(profile));
});

module.exports = router;
