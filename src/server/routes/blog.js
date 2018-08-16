const express = require('express');
const router = express.Router();
const winston = require('winston');
const auth = require('../middleware/auth');
const multerStorageCloudinary = require('../middleware/multer-storage-cloudinary');
// cloudinary
const cloudinary = require('../config/cloudinary');
// Load Validation
const { validateBlogInput } = require('../validation/blog');
// Load Blog Model
const Blog = require('../models/blog');

/*...................Below Blog.....................*/

// @route   GET api/blog/user/:email
// @desc    Get blog by user email
// @access  Public

router.get('/user/:email', (req, res) => {
  const errors = {};
  Blog.findOne({ email: req.params.email })
    .populate('user', ['name'])
    .then(blog => {
      if (!blog) {
        errors.noblog = 'There is no blog of this user';
        return res.status(404).json(errors);
      }

      res.json(blog);
    })
    .catch(err =>
      res.status(404).json({ blog: 'There is no blog for this user' })
    );
});

// @route   GET api/blog
// @desc    Get current users blog
// @access  Private
router.get('/', auth, (req, res) => {
  const errors = {};
  Blog.findOne({ user: req.user.id })
    .populate('user', ['name'])
    .then(blog => {
      if (!blog) {
        errors.noBlog = 'There is no blog for this user';
        return res.status(404).json(errors);
      }
      res.json(blog);
    })
    .catch(err => res.status(404).json(err));
});

// @route   DELETE api/blog
// @desc    Delete blog [Whole Data]
// @access  Private
router.delete('/', auth, (req, res) => {
  Blog.findOneAndRemove({ user: req.user.id }).then(() => {
    res.json({ success: true });
  });
});

// @route   POST api/blog
// @desc    Create user blog
// @access  Private
router.post('/', auth, (req, res) => {
  const { errors, isValid } = validateBlogInput(req.body);
  // Check Validation
  if (!isValid) {
    // Return any errors with 400 status
    return res.status(400).json(errors);
  }

  // Get fields
  const newBlogItem = {
    title: req.body.title,
    author: req.body.author,
    body: req.body.body,
    date: req.body.date,
    tag: req.body.tag,
    img: req.body.img,
    public_id: req.body.public_id,
    category: req.body.category
  };
  Blog.findOne({ user: req.user.id }).then(mainBlog => {
    if (mainBlog) {
      // Update the array
      mainBlog.blog.unshift(newBlogItem);
      mainBlog.save().then(blog => res.json(blog));
    } else {
      // Create
      // then add to the array
      new Blog({ user: req.user.id, email: req.user.email, blog: [] })
        .save()
        .then(blogAccount => {
          Blog.findOne({ user: req.user.id }).then(blogData => {
            // Add to blog array
            blogData.blog.unshift(newBlogItem);
            blogData.save().then(blog => res.json(blog));
          });
        });
    }
  });
});

// @route   DELETE api/blog/:blog_id
// @desc    Delete blog from profile
// @access  Private
router.delete('/:blog_id', auth, (req, res) => {
  Blog.findOne({ user: req.user.id })
    .then(blogData => {
      // Get remove index
      const removeIndex = blogData.blog
        .map(item => {
          // console.log('Item ID => ', item.id);
          return item.id;
        })
        .indexOf(req.params.blog_id);
      // Grab the public_id
      let public_id = blogData.blog[removeIndex].public_id;
      // console.log('public_id to delete => ', public_id);
      // Splice out of array
      blogData.blog.splice(removeIndex, 1);
      // Secondly delete image
      cloudinary.v2.api.delete_resources([public_id], function(error, result) {
        if (error) {
          winston.error(
            `Failed to delete blog image from ${req.user.email}. blog_id: ${
              req.params.blog_id
            }and image_id: ${public_id}`
          );
        }
        winston.info('blog images deleted ! ' + JSON.stringify(result));
      });
      // Save
      blogData.save().then(newBlog => res.json(newBlog));
    })
    .catch(err => res.status(404).json(err));
});

// @route   POST api/blog/:blog_id
// @desc    Update blog from profile
// @access  Private
router.post('/:blog_id', auth, (req, res) => {
  const { errors, isValid } = validateBlogInput(req.body);
  // Check Validation
  if (!isValid) {
    // Return any errors with 400 status
    return res.status(400).json(errors);
  }
  Blog.findOne({ user: req.user.id })
    .then(blogData => {
      // Get Update index
      const updateIndex = blogData.blog
        .map(item => {
          // console.log('Item ID => ', item.id);
          return item.id;
        })
        .indexOf(req.params.blog_id);

      // update value
      let currentBlog = blogData.blog[updateIndex];
      currentBlog.title = req.body.title;
      currentBlog.author = req.body.author;
      currentBlog.body = req.body.body;
      currentBlog.date = req.body.date;
      currentBlog.tag = req.body.tag;
      currentBlog.img = req.body.img;
      currentBlog.public_id = req.body.public_id;
      currentBlog.category = req.body.category;
      // Save
      blogData.save().then(newBlog => res.json(newBlog));
    })
    .catch(err => res.status(404).json(err));
});

/*
@route   POST api/blog/img/upload
@desc    Upload Blog Image
@access  Private
*/
router.post(
  '/img/upload',
  auth,
  multerStorageCloudinary('blog').single('file'),
  // This middleware takes the folder_name and parse single file provided as a key-> file
  (req, res) => {
    // console.log(req.file);
    return res.status(200).json({
      success: true,
      filesInfo: req.file
    });
  }
);

module.exports = router;
