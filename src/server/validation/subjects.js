const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateSubjectInput(data) {
  // console.log('Validating->', data);

  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : '';
  data.code = !isEmpty(data.code) ? data.code : '';

  if (!Validator.isLength(data.title, { min: 2, max: 100 })) {
    errors.title = 'Course Title must be between 2 and 100 characters';
  }

  if (Validator.isEmpty(data.title)) {
    errors.title = 'Course Title field is required !';
  }

  if (Validator.isEmpty(data.code)) {
    errors.code = 'Course Code field is required !';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
