const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TeacherSchema = new Schema({
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
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Teacher = mongoose.model('teacher', TeacherSchema);
