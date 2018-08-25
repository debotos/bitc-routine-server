const auth = require('../middleware/auth');
const _ = require('lodash');
const Exam = require('../models/exam');
const router = require('express').Router();

const validateExamInput = require('../validation/exam');

/* CREATE */
// @route   POST api/exams/add
// @desc    Add a new exam
// @access  Private
router.post('/add', auth, (req, res) => {
  // console.log('Req body -> ', req.body);
  const { errors, isValid } = validateExamInput(req.body);
  // Check Validation
  if (!isValid) return res.status(400).json(errors);
  exam = new Exam(_.pick(req.body, ['firstmid', 'finalmid', 'semesters']));
  exam.save(function(err, newExam) {
    if (err) {
      return res.status(404).json({ error: 'Filed to save exam' });
    } else {
      return res.json(newExam);
    }
  });
});

/* READ */
// @route   GET api/exams/
// @desc    get all exams info list
// @access  Public
router.get('/', (req, res) => {
  Exam.find()
    .then(exams => {
      if (!exams) {
        return res.status(404).json({ noExams: 'There are no exams' });
      }
      return res.json(exams);
    })
    .catch(err => res.status(404).json({ noExams: 'There are no exams' }));
});

/* DELETE */
// @route   DELETE api/exams/:id
// @desc    Remove an exam
// @access  Private
router.delete('/:id', auth, (req, res) => {
  Exam.findOneAndRemove({ _id: req.params.id }).then(removedExam => {
    return res.json({ success: true, removedExam });
  });
});

/* UPDATE */
// @route   POST api/exams/:id
// @desc    Update a exam info
// @access  Private
router.post('/:id', auth, (req, res) => {
  const { errors, isValid } = validateExamInput(req.body);
  // Check Validation
  if (!isValid) return res.status(400).json({ id: req.params.id, ...errors });

  const examFields = _.pick(req.body, ['firstmid', 'finalmid', 'semesters']);
  // console.log('Exam Update data => ', examFields);
  Exam.findOneAndUpdate(
    { _id: req.params.id },
    { $set: examFields },
    { new: true }
  ).then(exam => res.json(exam));
});

module.exports = router;
