const auth = require('../middleware/auth');
const _ = require('lodash');
const Teacher = require('../models/teacher');
const router = require('express').Router();

const validateTeacherInput = require('../validation/teachers');

// @route   POST api/teachers/add
// @desc    Add a new teacher
// @access  Private
router.post('/add', auth, (req, res) => {
  // console.log('Req body -> ', req.body);
  const { errors, isValid } = validateTeacherInput(req.body);
  // Check Validation
  if (!isValid) return res.status(400).json(errors);

  Teacher.findOne({ code: req.body.code }).then(codeExist => {
    // console.log('subject code already or not ', codeExist);
    if (codeExist) {
      return res
        .status(400)
        .send({ code: `Code already used with "${codeExist.name}"` });
    } else {
      teacher = new Teacher(_.pick(req.body, ['name', 'code', 'guest']));
      teacher.save(function(err, newTeacher) {
        if (err) {
          return res.status(404).json({ error: 'Filed to save teacher' });
        } else {
          return res.json(newTeacher);
        }
      });
    }
  });
});

// @route   GET api/teachers/:id
// @desc    get a teacher info
// @access  Public
router.get('/:id', (req, res) => {
  Teacher.findOne({ _id: req.params.id })
    .then(singleTeacher => {
      return res.json(singleTeacher);
    })
    .catch(err =>
      res
        .status(404)
        .json({ notFound: `no teacher found with this ${req.params.id}` })
    );
});

// @route   GET api/teachers
// @desc    get all teachers info list
// @access  Public
router.get('/', (req, res) => {
  Teacher.find()
    .then(teachers => {
      if (!teachers) {
        return res.status(404).json({ noTeachers: 'There are no teachers' });
      }
      return res.json(teachers);
    })
    .catch(err =>
      res.status(404).json({ noTeachers: 'There are no teachers' })
    );
});

// @route   DELETE api/teachers/:id
// @desc    Remove a teacher
// @access  Private
router.delete('/:id', auth, (req, res) => {
  Teacher.findOneAndRemove({ _id: req.params.id }).then(removedTeacher => {
    return res.json({ success: true, removedTeacher });
  });
});

// @route   POST api/teachers/:id
// @desc    Update a teacher info
// @access  Private
router.post('/:id', auth, (req, res) => {
  // console.log('Req body -> ', req.body);
  const { errors, isValid } = validateTeacherInput(req.body);
  // Check Validation
  if (!isValid) return res.status(400).json({ id: req.params.id, ...errors });

  Teacher.findOne({ code: req.body.code }).then(codeExist => {
    // console.log('subject code already or not ', codeExist);
    if (codeExist) {
      // if code already have
      if (codeExist._id.toString() === req.params.id.toString()) {
        // if the code is yours
        const teacherFields = _.pick(req.body, ['name', 'code', 'guest']);
        // console.log('Teacher Update data => ', teacherFields);
        Teacher.findOneAndUpdate(
          { _id: req.params.id },
          { $set: teacherFields },
          { new: true }
        ).then(teacher => res.json(teacher));
      } else {
        return res.status(400).send({
          id: req.params.id,
          code: `Code already used with "${codeExist.name}"`
        });
      }
    } else {
      // if the code yet not register
      const teacherFields = _.pick(req.body, ['name', 'code', 'guest']);
      // console.log('Teacher Update data => ', teacherFields);
      Teacher.findOneAndUpdate(
        { _id: req.params.id },
        { $set: teacherFields },
        { new: true }
      ).then(teacher => res.json(teacher));
    }
  });
});

module.exports = router;
