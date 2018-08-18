const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateTeacherInput(data) {
  // console.log('Validating->', data);

  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';
  data.code = !isEmpty(data.code) ? data.code : '';

  if (!Validator.isLength(data.name, { min: 3, max: 50 })) {
    errors.name = 'Name must be between 3 and 50 characters';
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Name field is required !';
  }

  if (Validator.isEmpty(data.code)) {
    errors.code = 'Code Name field is required !';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
