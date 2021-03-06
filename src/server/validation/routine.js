const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRoutineInput({ serial, period, time }) {
  // console.log('Validating->', period, time);
  let errors = {};

  if (serial && period && time) {
    if (!serial || serial.toString().length < 1 || typeof serial !== 'number') {
      errors.serial = 'Invalid serial !';
    }

    period = !isEmpty(period) ? period : '';

    if (!Validator.isLength(period, { min: 2, max: 255 })) {
      errors.period =
        'Readable time period must be between 2 and 255 characters';
    }

    if (Validator.isEmpty(period)) {
      errors.period = 'Readable time period field is required';
    }

    if (Validator.isEmpty(time.start)) {
      errors.start =
        "Start Time field is required e.g. time:{start:'', end:''}";
    }

    if (Validator.isEmpty(time.end)) {
      errors.end = "End Time field is required e.g. time:{start:'', end:''}";
    }
  } else {
    errors.error =
      "Something missing ! e.g. {period:'', serial: 1, time:{start:'', end:''}}";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
