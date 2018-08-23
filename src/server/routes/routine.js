const auth = require('../middleware/auth');
const _ = require('lodash');
const Routine = require('../models/routine');
const router = require('express').Router();

const validateRoutineInput = require('../validation/routine');
const validateClassesInput = require('../validation/classes');
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
      Routine.findOne({ serial: req.body.serial }).then(serialExist => {
        if (!serialExist) {
          routine = new Routine(
            _.pick(req.body, ['period', 'time', 'serial', 'break'])
          );
          routine.save(function(err, newRoutine) {
            if (err) {
              return res
                .status(404)
                .json({ routinePeriod: 'Filed to add routine period' });
            } else {
              return res.json(newRoutine);
            }
          });
        } else {
          return res
            .status(400)
            .send({ routineSerial: `Sorry ! Routine Serial already exist !` });
        }
      });
    }
  });
});

// @route   POST api/routine/:id/classes/:day/add
// @desc    Add new classes to a routine's period
// @access  Private
// @return  res contains doc {} of Period belongs to this :id
router.post('/:id/classes/:day/add', auth, (req, res) => {
  // console.log('Req body -> ', req.body);
  const { errors, isValid } = validateClassesInput(req.body);
  // Check Validation
  if (!isValid) return res.status(400).json(errors);

  Routine.findOne({ _id: req.params.id })
    .then(routine => {
      // req.body contains an obj of { routine: '', subject: {title, code}, teacher: {name, code, guest} }
      routine.days[req.params.day].classes.unshift(req.body);
      routine.save().then(doc => res.json(doc));
    })
    .catch(err => res.status(404).json(err));
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
// @desc    Remove a period from routine
// @access  Private
router.delete('/:id', auth, (req, res) => {
  Routine.findOneAndRemove({ _id: req.params.id })
    .then(removedRoutine => {
      return res.json({ success: true, removedRoutine });
    })
    .catch(err => res.status(404).json(err));
});

// @route   DELETE api/routine/:id/classes/:day/delete/:classes_id
// @desc    Delete a single class from a particular routine's period
// @access  Private
// @return  res contains doc {} of period belongs to this :id
router.delete('/:id/classes/:day/delete/:classes_id', auth, (req, res) => {
  Routine.findOne({ _id: req.params.id })
    .then(routine => {
      // Get Delete Item index
      const deleteIndex = routine.days[req.params.day].classes
        .map(item => {
          // console.log('[id works without _id] Item ID => ', item.id);
          return item.id;
        })
        .indexOf(req.params.classes_id);
      // console.log('deleteIndex of this ID', deleteIndex);
      if (deleteIndex === -1) {
        return res
          .status(404)
          .json({ error: "No data found of this class in routine's period" });
      }
      // update value
      // let currentData = routine.days[req.params.day].classes[deleteIndex];
      // console.log('Course Data is going to delete', currentData);

      // Splice out of array
      routine.days[req.params.day].classes.splice(deleteIndex, 1);

      // save update & return
      routine.save().then(doc => res.json(doc));
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
        const routineFields = _.pick(req.body, [
          'period',
          'time',
          'serial',
          'break'
        ]);
        // console.log('Routine Update data => ', routineFields);
        Routine.findOne({ serial: req.body.serial }).then(serialExist => {
          if (!serialExist) {
            Routine.findOneAndUpdate(
              { _id: req.params.id },
              { $set: routineFields },
              { new: true }
            ).then(routine => res.json(routine));
          } else {
            if (serialExist._id.toString() === req.params.id.toString()) {
              Routine.findOneAndUpdate(
                { _id: req.params.id },
                { $set: routineFields },
                { new: true }
              ).then(routine => res.json(routine));
            } else {
              return res.status(400).send({
                routineSerial: `Sorry! Routine Serial already exist !`
              });
            }
          }
        });
      } else {
        return res
          .status(400)
          .send({ routinePeriod: `Sorry! Routine Period already exist !` });
      }
    } else {
      const routineFields = _.pick(req.body, [
        'period',
        'time',
        'serial',
        'break'
      ]);
      // console.log('Routine Update data => ', routineFields);
      Routine.findOne({ serial: req.body.serial }).then(serialExist => {
        if (!serialExist) {
          Routine.findOneAndUpdate(
            { _id: req.params.id },
            { $set: routineFields },
            { new: true }
          ).then(routine => res.json(routine));
        } else {
          if (serialExist._id.toString() === req.params.id.toString()) {
            Routine.findOneAndUpdate(
              { _id: req.params.id },
              { $set: routineFields },
              { new: true }
            ).then(routine => res.json(routine));
          } else {
            return res.status(400).send({
              routineSerial: `Sorry! Routine Serial already exist !`
            });
          }
        }
      });
    }
  });
});

// @route   POST api/routine/:id/classes/:day/edit/:classes_id
// @desc    Edit a single class from a particular routine's period
// @access  Private
// @return  res contains doc {} of period belongs to this :id
router.post('/:id/classes/:day/edit/:classes_id', auth, (req, res) => {
  // console.log('Req body -> ', req.body);
  const { errors, isValid } = validateClassesInput(req.body);
  // Because of this validation check all fields is required
  // If you don't want it just comment out the validation code and
  // at the update time check if it's available or not in the req.body
  // like, if (req.body.subject.title) { currentData.subject.title = req.body.subject.title }
  // Check Validation
  if (!isValid) return res.status(400).json(errors);

  Routine.findOne({ _id: req.params.id })
    .then(routine => {
      // req.body contains an obj of { routine: '', subject: {title, code}, teacher: {name, code, guest} }
      // Get Update index
      const updateIndex = routine.days[req.params.day].classes
        .map(item => {
          // console.log('[id works without _id] Item ID => ', item.id);
          return item.id;
        })
        .indexOf(req.params.classes_id);
      // console.log('updateIndex of this ID', updateIndex);
      if (updateIndex === -1) {
        return res
          .status(404)
          .json({ error: "No data found of this class in routine's period" });
      }
      // update value
      let currentData = routine.days[req.params.day].classes[updateIndex];
      // console.log('Data of this ID', currentData);
      currentData.semester = req.body.semester;
      currentData.subject.title = req.body.subject.title;
      currentData.subject.code = req.body.subject.code;
      currentData.teacher.name = req.body.teacher.name;
      currentData.teacher.code = req.body.teacher.code;
      currentData.teacher.guest = req.body.teacher.guest;
      // save update & return
      routine.save().then(doc => res.json(doc));
    })
    .catch(err => res.status(404).json(err));
});

module.exports = router;
