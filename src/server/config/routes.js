// const blog = require('../routes/blog');
const error = require('../middleware/error');
const users = require('../routes/users');
const teachers = require('../routes/teachers');
const subjects = require('../routes/subjects');
const semester = require('../routes/semester');
const routine = require('../routes/routine');
const exam = require('../routes/exam');
const client = require('../routes/client');
const init = require('../routes/init');

module.exports = function(app) {
  // app.use('/api/blog', blog);
  app.use('/api/users', users);
  app.use('/api/teachers', teachers);
  app.use('/api/subjects', subjects);
  app.use('/api/semester', semester);
  app.use('/api/routine', routine);
  app.use('/api/exams', exam);
  app.use('/api/client', client);
  app.use('/init', init);
  app.use(error);
};
