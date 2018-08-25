const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateExamInput(data) {
  // console.log('Validating->', data);

  let errors = {};

  data.firstmid = !isEmpty(data.firstmid) ? data.firstmid : '';

  if (Validator.isEmpty(data.firstmid)) {
    errors.firstmid = 'First Mid Date field is required !';
  }

  data.finalmid = !isEmpty(data.finalmid) ? data.finalmid : '';

  if (Validator.isEmpty(data.finalmid)) {
    errors.finalmid = 'Final Mid Date field is required !';
  }

  if (!data.semesters) {
    errors.semesters = 'Semesters field is required !';
  } else {
    if (data.semesters instanceof Array) {
      if (data.semesters.length < 1) {
        errors.semesters = 'Semesters field data is required !';
      }
    } else {
      errors.semesters = 'Semesters field have to be an array !';
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
