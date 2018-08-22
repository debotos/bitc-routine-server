const auth = require('../middleware/auth');
const _ = require('lodash');
const Routine = require('../models/routine');
const router = require('express').Router();

const validateRoutineInput = require('../validation/routine');
/*----------------------------------------------------------------*/
/*           Direct routine means period in this context         */
/*----------------------------------------------------------------*/
/* CREATE */
// @route   POST api/routine/add
// @desc    Add a new Period in routine
// @access  Private
router.post('/add', auth, (req, res) => {
  // console.log('Req body -> ', req.body);
  const { errors, isValid } = validateRoutineInput(req.body);
  // Check Validation
  if (!isValid) return res.status(400).json(errors);

  Routine.findOne({ period: req.body.period }).then(periodExist => {
    // console.log('routine period already or not ', periodExist);
    if (periodExist) {
      return res
        .status(400)
        .send({ routinePeriod: `Sorry ! Routine Period already exist !` });
    } else {
      routine = new Routine(_.pick(req.body, ['period', 'time']));
      routine.save(function(err, newRoutine) {
        if (err) {
          return res
            .status(404)
            .json({ routinePeriod: 'Filed to add routine period' });
        } else {
          return res.json(newRoutine);
        }
      });
    }
  });
});

/* READ */
// @route   GET api/routine/:id
// @desc    get a period info in routine
// @access  Public
router.get('/:id', (req, res) => {
  Routine.findOne({ _id: req.params.id })
    .then(singleRoutine => {
      if (singleRoutine) {
        return res.json(singleRoutine);
      } else {
        return res.status(404).json({
          success: false,
          message: `no period found in routine with this id ${req.params.id}`
        });
      }
    })
    .catch(err =>
      res.status(404).json({
        notFound: `no period found in routine with this ${req.params.id}`
      })
    );
});

// @route   GET api/routine/
// @desc    get all periods from routine
// @access  Public
router.get('/', (req, res) => {
  Routine.find()
    .then(routine => {
      if (!routine) {
        return res
          .status(404)
          .json({ noRoutine: 'There are no period in routine' });
      }
      return res.json(routine);
    })
    .catch(err =>
      res.status(404).json({ noRoutine: 'There are no period in routine' })
    );
});

/* DELETE */
// @route   DELETE api/routine/:id
// @desc    Remove a routine
// @access  Private
router.delete('/:id', auth, (req, res) => {
  Routine.findOneAndRemove({ _id: req.params.id })
    .then(removedRoutine => {
      return res.json({ success: true, removedRoutine });
    })
    .catch(err => res.status(404).json(err));
});

/* UPDATE */
// @route   POST api/routine/:id
// @desc    Update a period in routine
// @access  Private
router.post('/:id', auth, (req, res) => {
  const { errors, isValid } = validateRoutineInput(req.body);
  // Check Validation
  if (!isValid) return res.status(400).json({ id: req.params.id, ...errors });

  Routine.findOne({ period: req.body.period }).then(periodExist => {
    // console.log('routine period already or not ', periodExist);
    if (periodExist) {
      // it returns null if no result found
      if (periodExist._id.toString() === req.params.id.toString()) {
        const routineFields = _.pick(req.body, ['period', 'time']);
        // console.log('Routine Update data => ', routineFields);
        Routine.findOneAndUpdate(
          { _id: req.params.id },
          { $set: routineFields },
          { new: true }
        ).then(routine => res.json(routine));
      } else {
        return res
          .status(400)
          .send({ routinePeriod: `Sorry! Routine Period already exist !` });
      }
    } else {
      const routineFields = _.pick(req.body, ['period', 'time']);
      // console.log('Routine Update data => ', routineFields);
      Routine.findOneAndUpdate(
        { _id: req.params.id },
        { $set: routineFields },
        { new: true }
      ).then(routine => res.json(routine));
    }
  });
});

module.exports = router;
