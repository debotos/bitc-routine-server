const _ = require('lodash');
const Routine = require('../models/routine');
const Semester = require('../models/semester');
const Exam = require('../models/exam');
const Teacher = require('../models/teacher');
const router = require('express').Router();
const path = require('path');
const pdfMakePrinter = require('pdfmake/src/printer');

const GENERATE_PDF = require('../utility/pdf');

// @route   GET api/client/pdf
// @desc    get pdf of routine
// @access  Public

router.get('/pdf', function(req, res) {
  eval(req.body.content);
  Routine.find().then(routineDB => {
    Exam.find().then(examDB => {
      Teacher.find().then(teachersDB => {
        createPdfBinary(
          GENERATE_PDF(routineDB, examDB, teachersDB), // returning docDefinition
          function(binary) {
            // console.log(binary);
            res.contentType('application/pdf');
            res.send(binary);
          },
          function(error) {
            res.send('ERROR:' + error);
          }
        );
      });
    });
  });
});

function createPdfBinary(pdfDoc, callback) {
  let fontDescriptors = {
    Roboto: {
      normal: path.join(__dirname, '..', 'assets', '/fonts/Roboto-Regular.ttf'),
      bold: path.join(__dirname, '..', 'assets', '/fonts/Roboto-Medium.ttf'),
      italics: path.join(__dirname, '..', 'assets', '/fonts/Roboto-Italic.ttf'),
      bolditalics: path.join(
        __dirname,
        '..',
        'assets',
        '/fonts/Roboto-MediumItalic.ttf'
      )
    }
  };

  let printer = new pdfMakePrinter(fontDescriptors);

  let doc = printer.createPdfKitDocument(pdfDoc);

  let chunks = [];
  let result;

  doc.on('data', function(chunk) {
    chunks.push(chunk);
  });
  doc.on('end', function() {
    result = Buffer.concat(chunks);
    // 'data:application/pdf;base64,' + result.toString('base64') It's not needed
    callback(result);
  });
  doc.end();
}

/* Android Application */

// @route   GET api/client/
// @desc    get all routine data from routine as a semester:class key value pair
// @access  Public
router.get('/', (req, res) => {
  Routine.find()
    .then(routine => {
      if (!routine) {
        return res
          .status(404)
          .json({ success: false, msg: 'No routine available' });
      }
      // Here i have all the routine data
      // Now find all semester name
      Semester.find()
        .then(semesters => {
          if (!semesters) {
            return res
              .status(404)
              .json({ success: false, msg: 'Routine under maintenance' });
          }
          let data = generateResData(semesters, routine);
          Exam.find()
            .then(exams => {
              return res.json({ routine: data, exams });
            })
            .catch(err =>
              res.status(404).json({
                routine: data,
                success: false,
                msg: 'You have routine data but failed to get exam data'
              })
            );
        })
        .catch(err =>
          res
            .status(404)
            .json({ success: false, msg: 'Routine under maintenance' })
        );
    })
    .catch(err =>
      res.status(404).json({ success: false, msg: 'Failed to get routine' })
    );
});

generateResData = (semesters, routine) => {
  semesters = generateSemesterNameList(semesters);
  days = generateEachDayDataObj(routine);
  let response = {};

  for (let i = 0; i < semesters.length; i++) {
    response[semesters[i]] = {}; // creating a key value pair of semester name and empty array
    let resKey = response[semesters[i]]; // just putting inside a var
    for (let key in days) {
      resKey[key] = []; // assign empty array to each day e.g. sat: [], sun: [], ...
      days[key].forEach(singleDay => {
        singleDay.classes.forEach(singleClass => {
          if (singleClass.semester.toString() === semesters[i].toString()) {
            // checking same semester
            resKey[key].push({
              ..._.pick(singleClass, ['subject', 'teacher', '_id', 'semester']), // It's important
              period: singleDay.period,
              break: singleDay.break,
              day: key
            });
          }
        });
      });
    }
  }

  return response;
};

generateSemesterNameList = semesters => {
  return semesters.map(singleSemester => singleSemester.name);
};
generateEachDayDataObj = routine => {
  let sat = [],
    sun = [],
    mon = [],
    tues = [],
    wed = [],
    thu = [];

  if (routine) {
    routine.forEach(singlePeriod => {
      sat.push({
        id: singlePeriod._id,
        period: singlePeriod.period,
        break: singlePeriod.break,
        ...singlePeriod.days.sat
      });
      sun.push({
        id: singlePeriod._id,
        period: singlePeriod.period,
        break: singlePeriod.break,
        ...singlePeriod.days.sun
      });
      mon.push({
        id: singlePeriod._id,
        period: singlePeriod.period,
        break: singlePeriod.break,
        ...singlePeriod.days.mon
      });
      tues.push({
        id: singlePeriod._id,
        period: singlePeriod.period,
        break: singlePeriod.break,
        ...singlePeriod.days.tues
      });
      wed.push({
        id: singlePeriod._id,
        period: singlePeriod.period,
        break: singlePeriod.break,
        ...singlePeriod.days.wed
      });
      thu.push({
        id: singlePeriod._id,
        period: singlePeriod.period,
        break: singlePeriod.break,
        ...singlePeriod.days.thu
      });
    });
  }

  return {
    sat,
    sun,
    mon,
    tues,
    wed,
    thu
  };
};

module.exports = router;
