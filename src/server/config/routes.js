// const blog = require('../routes/blog');
const error = require('../middleware/error');
const users = require('../routes/users');

module.exports = function(app) {
  // app.use('/api/blog', blog);
  app.use('/api/users', users);
  app.use(error);
};
