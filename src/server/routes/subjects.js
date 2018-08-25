const auth = require('../middleware/auth');
const _ = require('lodash');
const Subject = require('../models/subject');
const router = require('express').Router();

const validateSubjectInput = require('../validation/subjects');
/* CREATE */
// @route   POST api/subjects/add
// @desc    Add a new subject
// @access  Private
router.post('/add', auth, (req, res) => {
  // console.log('Req body -> ', req.body);
  const { errors, isValid } = validateSubjectInput(req.body);
  // Check Validation
  if (!isValid) return res.status(400).json(errors);

  Subject.findOne({ code: req.body.code }).then(codeExist => {
    // console.log('subject code already or not ', codeExist);
    if (codeExist) {
      return res
        .status(400)
        .send({ code: `Code already used for "${codeExist.title}"` });
    } else {
      subject = new Subject(_.pick(req.body, ['title', 'code']));
      subject.save(function(err, newSubject) {
        if (err) {
          return res.status(404).json({ error: 'Filed to save subject' });
        } else {
          return res.json(newSubject);
        }
      });
    }
  });
});
/* READ */
// @route   GET api/subjects/:id
// @desc    get a subject info
// @access  Public
router.get('/:id', (req, res) => {
  Subject.findOne({ _id: req.params.id })
    .then(singleSubject => {
      return res.json(singleSubject);
    })
    .catch(err =>
      res
        .status(404)
        .json({ notFound: `no subject found with this ${req.params.id}` })
    );
});

// @route   GET api/subjects/
// @desc    get all subjects info list
// @access  Public
router.get('/', (req, res) => {
  Subject.find()
    .then(subjects => {
      if (!subjects) {
        return res.status(404).json({ noSubjects: 'There are no subjects' });
      }
      return res.json(subjects);
    })
    .catch(err =>
      res.status(404).json({ noSubjects: 'There are no subjects' })
    );
});
/* DELETE */
// @route   DELETE api/subjects/:id
// @desc    Remove a subject
// @access  Private
router.delete('/:id', auth, (req, res) => {
  Subject.findOneAndRemove({ _id: req.params.id }).then(removedSubject => {
    return res.json({ success: true, removedSubject });
  });
});

/* UPDATE */
// @route   POST api/subjects/:id
// @desc    Update a subject info
// @access  Private
router.post('/:id', auth, (req, res) => {
  const { errors, isValid } = validateSubjectInput(req.body);
  // Check Validation
  if (!isValid) return res.status(400).json({ id: req.params.id, ...errors });

  Subject.findOne({ code: req.body.code }).then(codeExist => {
    // console.log('subject code already exist ? ', codeExist);
    if (codeExist) {
      // it returns null if no result found
      if (codeExist._id.toString() === req.params.id.toString()) {
        const subjectFields = _.pick(req.body, ['title', 'code']);
        // console.log('Subject Update data => ', subjectFields);
        Subject.findOneAndUpdate(
          { _id: req.params.id },
          { $set: subjectFields },
          { new: true }
        ).then(subject => res.json(subject));
      } else {
        return res.status(400).send({
          id: req.params.id,
          code: `Code already used with "${codeExist.title}"`
        });
      }
    } else {
      const subjectFields = _.pick(req.body, ['title', 'code']);
      console.log('Subject Update data => ', subjectFields);
      Subject.findOneAndUpdate(
        { _id: req.params.id },
        { $set: subjectFields },
        { new: true }
      ).then(subject => res.json(subject));
    }
  });
});

module.exports = router;
