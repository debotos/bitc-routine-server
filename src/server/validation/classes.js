const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateClassesInput(data) {
  // console.log('Validating->', data);
  let { semester, subject, teacher } = data;

  let errors = {
    semester: '',
    teacher: {},
    subject: {}
  };

  if (semester && subject && teacher) {
    if (typeof subject === 'object' && typeof teacher === 'object') {
      semester = !isEmpty(semester) ? semester : '';
      if (!Validator.isLength(semester, { min: 2, max: 100 })) {
        errors.semester = 'Semester must be between 2 and 100 characters';
      }

      if (Validator.isEmpty(semester)) {
        errors.semester = 'Semester field is required !';
      }

      teacher.name = !isEmpty(teacher.name) ? teacher.name : '';
      teacher.code = !isEmpty(teacher.code) ? teacher.code : '';

      if (!Validator.isLength(teacher.name, { min: 3, max: 50 })) {
        errors['teacher'].name =
          'Teacher Name must be between 3 and 50 characters';
      }

      if (Validator.isEmpty(teacher.name)) {
        errors['teacher'].name = 'Teacher Name field is required !';
      }

      if (Validator.isEmpty(teacher.code)) {
        errors['teacher'].code = "Teacher's Code Name field is required !";
      }

      subject.title = !isEmpty(subject.title) ? subject.title : '';
      subject.code = !isEmpty(subject.code) ? subject.code : '';

      if (!Validator.isLength(subject.title, { min: 2, max: 100 })) {
        errors['subject'].title =
          'Course Title must be between 2 and 100 characters';
      }

      if (Validator.isEmpty(subject.title)) {
        errors['subject'].title = 'Course Title field is required !';
      }

      if (Validator.isEmpty(subject.code)) {
        errors['subject'].code = 'Course Code field is required !';
      }
    } else {
      delete errors.semester;
      errors.teacher =
        'Details of both Teacher & subject have to be {object} type';
      errors.subject =
        'Details of both Teacher & subject have to be {object} type';
    }
  } else {
    errors.semester =
      'Semester Name, Teacher & subject all details is required';
    errors.teacher = 'Semester Name, Teacher & subject all details is required';
    errors.subject = 'Semester Name, Teacher & subject all details is required';
  }

  return {
    errors,
    isValid:
      isEmpty(errors.teacher) &&
      isEmpty(errors.subject) &&
      isEmpty(errors.semester)
  };
};
