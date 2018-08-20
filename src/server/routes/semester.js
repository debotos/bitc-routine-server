const auth = require('../middleware/auth');
const _ = require('lodash');
const Semester = require('../models/semester');
const router = require('express').Router();

const validateSemesterInput = require('../validation/semester');
const validateCoursesInput = require('../validation/courses');
/* CREATE */
// @route   POST api/semester/add
// @desc    Add a new semester
// @access  Private
router.post('/add', auth, (req, res) => {
  // console.log('Req body -> ', req.body);
  const { errors, isValid } = validateSemesterInput(req.body);
  // Check Validation
  if (!isValid) return res.status(400).json(errors);

  Semester.findOne({ name: req.body.name }).then(nameExist => {
    // console.log('semester name already or not ', nameExist);
    if (nameExist) {
      return res
        .status(400)
        .send({ semesterName: `Sorry ! Semester Name already used !` });
    } else {
      semester = new Semester(_.pick(req.body, ['name']));
      semester.save(function(err, newSemester) {
        if (err) {
          return res
            .status(404)
            .json({ semesterName: 'Filed to add semester' });
        } else {
          return res.json(newSemester);
        }
      });
    }
  });
});

// @route   POST api/semester/:id/courses/add
// @desc    Add new courses to a semester
// @access  Private
// @return  res contains array[{},{},{}] of courses belongs to this :id
router.post('/:id/courses/add', auth, (req, res) => {
  // console.log('Req body -> ', req.body);
  const { errors, isValid } = validateCoursesInput(req.body);
  // Check Validation
  if (!isValid) return res.status(400).json(errors);

  Semester.findOne({ _id: req.params.id })
    .then(semester => {
      // req.body contains an obj of { subject: {title, code}, teacher: {name, code, guest} }
      semester.courses.unshift(req.body);
      semester.save().then(doc => res.json(doc.courses));
    })
    .catch(err => res.status(404).json(err));
});

/* READ */
// @route   GET api/semester/:id
// @desc    get a semester info
// @access  Public
router.get('/:id', (req, res) => {
  Semester.findOne({ _id: req.params.id })
    .then(singleSemester => {
      if (singleSemester) {
        return res.json(singleSemester);
      } else {
        return res.status(404).json({
          success: false,
          message: `no semester found with this id ${req.params.id}`
        });
      }
    })
    .catch(err =>
      res
        .status(404)
        .json({ notFound: `no semester found with this ${req.params.id}` })
    );
});

// @route   GET api/semester/
// @desc    get all semester info list
// @access  Public
router.get('/', (req, res) => {
  Semester.find()
    .then(semester => {
      if (!semester) {
        return res.status(404).json({ noSemester: 'There are no semester' });
      }
      return res.json(semester);
    })
    .catch(err =>
      res.status(404).json({ noSemester: 'There are no semester' })
    );
});
/* DELETE */
// @route   DELETE api/semester/:id
// @desc    Remove a semester
// @access  Private
router.delete('/:id', auth, (req, res) => {
  Semester.findOneAndRemove({ _id: req.params.id }).then(removedSemester => {
    return res.json({ success: true, removedSemester });
  });
});

// @route   DELETE api/semester/:id/courses/delete/:course_id
// @desc    Delete a single courses from a particular semester
// @access  Private
// @return  res contains array[{},{},{}] of current courses belongs to this :id
router.delete('/:id/courses/delete/:course_id', auth, (req, res) => {
  Semester.findOne({ _id: req.params.id })
    .then(semester => {
      // Get Delete Item index
      const deleteIndex = semester.courses
        .map(item => {
          // console.log('[id works without _id] Item ID => ', item.id);
          return item.id;
        })
        .indexOf(req.params.course_id);
      // console.log('deleteIndex of this ID', deleteIndex);
      if (deleteIndex === -1) {
        return res.status(404).json({ error: 'No data found of this course' });
      }
      // update value
      let currentData = semester.courses[deleteIndex];
      // console.log('Course Data is going to delete', currentData);

      // Splice out of array
      semester.courses.splice(deleteIndex, 1);

      // save update & return
      semester.save().then(doc => res.json(doc.courses));
    })
    .catch(err => res.status(404).json(err));
});

/* UPDATE */
// @route   POST api/semester/:id
// @desc    Update a semester name
// @access  Private
router.post('/:id', auth, (req, res) => {
  const { errors, isValid } = validateSemesterInput(req.body);
  // Check Validation
  if (!isValid) return res.status(400).json({ id: req.params.id, ...errors });

  Semester.findOne({ name: req.body.name }).then(nameExist => {
    // console.log('semester name already or not ', nameExist);
    if (nameExist) {
      // it returns null if no result found
      if (nameExist._id.toString() === req.params.id.toString()) {
        const semesterFields = _.pick(req.body, ['name']);
        // console.log('Semester Update data => ', semesterFields);
        Semester.findOneAndUpdate(
          { _id: req.params.id },
          { $set: semesterFields },
          { new: true }
        ).then(semester => res.json(semester));
      } else {
        return res
          .status(400)
          .send({ semesterName: `Sorry! Semester Name already used !` });
      }
    } else {
      const semesterFields = _.pick(req.body, ['name']);
      // console.log('Semester Update data => ', semesterFields);
      Semester.findOneAndUpdate(
        { _id: req.params.id },
        { $set: semesterFields },
        { new: true }
      ).then(semester => res.json(semester));
    }
  });
});

// @route   POST api/semester/:id/courses/edit/:course_id
// @desc    Edit a single courses of a particular semester
// @access  Private
// @return  res contains array[{},{},{}] of updated courses belongs to this :id
router.post('/:id/courses/edit/:course_id', auth, (req, res) => {
  // console.log('Req body -> ', req.body);
  const { errors, isValid } = validateCoursesInput(req.body);
  // Because of this validation check all fields is required
  // If you don't want it just comment out the validation code and
  // at the update time check if it's available or not in the req.body
  // like, if (req.body.subject.title) { currentData.subject.title = req.body.subject.title }
  // Check Validation
  if (!isValid) return res.status(400).json(errors);

  Semester.findOne({ _id: req.params.id })
    .then(semester => {
      // req.body contains an obj of { subject: {title, code}, teacher: {name, code, guest} }
      // Get Update index
      const updateIndex = semester.courses
        .map(item => {
          // console.log('[id works without _id] Item ID => ', item.id);
          return item.id;
        })
        .indexOf(req.params.course_id);
      // console.log('updateIndex of this ID', updateIndex);
      if (updateIndex === -1) {
        return res.status(404).json({ error: 'No data found of this course' });
      }
      // update value
      let currentData = semester.courses[updateIndex];
      // console.log('Data of this ID', currentData);
      currentData.subject.title = req.body.subject.title;
      currentData.subject.code = req.body.subject.code;
      currentData.teacher.name = req.body.teacher.name;
      currentData.teacher.code = req.body.teacher.code;
      currentData.teacher.guest = req.body.teacher.guest;
      // save update & return
      semester.save().then(doc => res.json(doc.courses));
    })
    .catch(err => res.status(404).json(err));
});

module.exports = router;
