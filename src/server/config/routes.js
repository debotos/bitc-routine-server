// const blog = require('../routes/blog');
const error = require('../middleware/error');
const users = require('../routes/users');
const teachers = require('../routes/teachers');
const subjects = require('../routes/subjects');
const init = require('../routes/init');

module.exports = function(app) {
  // app.use('/api/blog', blog);
  app.use('/api/users', users);
  app.use('/api/teachers', teachers);
  app.use('/api/subjects', subjects);
  app.use('/init', init);
  app.use(error);
};
