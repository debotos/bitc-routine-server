const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SemesterSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 255
  },
  courses: [
    {
      subject: {
        title: {
          type: String,
          required: true,
          trim: true,
          minlength: 2,
          maxlength: 255
        },
        code: {
          type: String,
          required: true,
          trim: true,
          minlength: 1,
          maxlength: 25
        }
      },
      teacher: {
        name: {
          type: String,
          required: true,
          trim: true,
          minlength: 2,
          maxlength: 255
        },
        code: {
          type: String,
          required: true,
          trim: true,
          minlength: 1,
          maxlength: 20
        },
        guest: {
          type: Boolean,
          default: false
        }
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Semester = mongoose.model('semester', SemesterSchema);
