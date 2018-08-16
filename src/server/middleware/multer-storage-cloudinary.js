const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');
const cloudinary = require('../config/cloudinary');

module.exports = path => {
  const storage = cloudinaryStorage({
    cloudinary: cloudinary,
    folder: function(req, file, cb) {
      cb(null, `portfolio/${req.user.email}/${path}`);
    },
    allowedFormats: ['jpg', 'png', 'svg', 'jpeg', 'gif'],
    filename: function(req, file, cb) {
      cb(null, new Date().toISOString() + file.originalname);
    }
  });

  const parser = multer({ storage: storage });
  return parser;
};
