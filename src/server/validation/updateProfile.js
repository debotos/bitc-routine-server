const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateUpdateInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';
  data.cpassword = !isEmpty(data.cpassword) ? data.cpassword : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.password2 = !isEmpty(data.password2) ? data.password2 : '';

  if (!Validator.isLength(data.name, { min: 3, max: 30 })) {
    errors.name = 'Name must be between 3 and 30 characters';
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Name field is required';
  }

  if (!Validator.isEmpty(data.cpassword)) {
    if (!Validator.isLength(data.password, { min: 8, max: 30 })) {
      errors.password = 'Password must be at least 8 characters';
    }

    if (Validator.isEmpty(data.password)) {
      errors.password = 'Password field is required';
    }

    if (Validator.isEmpty(data.password2)) {
      errors.password2 = 'Confirm Password field is required';
    }

    if (!Validator.equals(data.password, data.password2)) {
      errors.password2 = 'Passwords must match';
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
