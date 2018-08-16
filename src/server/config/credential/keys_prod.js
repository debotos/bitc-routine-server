module.exports = {
  mongoURI: process.env.MONGO_URI,
  jwtPrivateKey: process.env.JWT_PRIVATE_KEY,
  secretOrKey: process.env.SECRET_OR_KEY,
  cloudinaryConfig: {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  }
};
