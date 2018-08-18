const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubjectSchema = new Schema({
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
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Subject = mongoose.model('subject', SubjectSchema);
