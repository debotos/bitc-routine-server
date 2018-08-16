const cloudinary = require('cloudinary');
const cloudinaryConfig = require('./credential/keys').cloudinaryConfig;

cloudinary.config(cloudinaryConfig);

module.exports = cloudinary;
