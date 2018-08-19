const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateSemesterInput(data) {
  // console.log('Validating->', data);

  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';

  if (!Validator.isLength(data.name, { min: 2, max: 100 })) {
    errors.name = 'Semester name must be between 2 and 100 characters';
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Semester name field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
