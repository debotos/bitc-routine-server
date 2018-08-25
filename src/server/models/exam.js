const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExamSchema = new Schema({
  firstmid: {
    type: Date,
    required: true
  },
  finalmid: {
    type: Date,
    required: true
  },
  semesters: [String],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Exam = mongoose.model('exam', ExamSchema);
