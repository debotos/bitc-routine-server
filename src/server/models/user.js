const jwt = require('jsonwebtoken');
const Joi = require('joi');
const mongoose = require('mongoose');
const jwtPrivateKey = require('../config/credential/keys').jwtPrivateKey;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  },
  img: {
    type: String
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024
  }
  // , isAdmin: Boolean // Manage User Permission
});

userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign(
    {
      id: this._id,
      email: this.email
      // isAdmin: this.isAdmin
    },
    jwtPrivateKey,
    { expiresIn: '365d' }
  );
  return token;
};

const User = mongoose.model('users', userSchema);

function validateUser(user) {
  const schema = {
    name: Joi.string()
      .min(5)
      .max(50)
      .required(),
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email(),
    password: Joi.string()
      .min(5)
      .max(255)
      .required()
  };

  return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;
