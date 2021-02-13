const auth = require('../middleware/auth')
const bcrypt = require('bcryptjs')
const _ = require('lodash')
const { User, validate } = require('../models/user')
const router = require('express').Router()

const validateLoginInput = require('../validation/login')
const validateSignUpInput = require('../validation/register')
const validateUpdateInput = require('../validation/updateProfile')

// @route   GET api/users/me
// @desc    Return current user
// @access  Private
// set Header key: x-auth-token, value: token
router.get('/me', auth, async (req, res) => {
	const user = await User.findById(req.user.id).select('-password')
	if (user) {
		return res.send(user)
	} else {
		return res.status(400).send('Not logged in!')
	}
})

// @route   DELETE api/users/me
// @desc    Delete current admin account [Whole Data]
// @access  Private
router.delete('/me', auth, (req, res) => {
	User.findOneAndRemove({ _id: req.user.id }).then(() => {
		res.json({ success: true })
	})
})

// @route   POST api/users/remove
// @desc    Delete an admin account [Whole Data]
// @access  Private
router.post('/remove', auth, async (req, res) => {
	const { errors, isValid } = validateLoginInput(req.body)
	// Check Validation
	if (!isValid) {
		return res.status(400).json(errors)
	}

	let user = await User.findOne({ email: req.body.email })
	// Check for user
	if (!user) {
		errors.email = 'User not found!'
		return res.status(404).json(errors)
	}

	const validPassword = await bcrypt.compare(req.body.password, user.password)
	if (!validPassword) {
		errors.password = 'Password incorrect!'
		return res.status(404).json(errors)
	} else {
		const userRemoved = await User.findOneAndRemove({
			email: req.body.email,
		}).select('-password')

		return res.json({ success: true, userRemoved })
	}
})

// @route   GET api/users/all
// @desc    Get all admin profiles
// @access  Private
router.get('/all', auth, (req, res) => {
	const errors = {}

	User.find()
		.select('-password')
		.then((profiles) => {
			if (!profiles) {
				errors.noprofile = 'There are no profiles'
				return res.status(404).json(errors)
			}

			res.json(profiles)
		})
		.catch((err) => res.status(404).json({ profiles: 'There are no profiles' }))
})

// @route   POST api/users/register
// @desc    Register user
// @access  Public
router.post('/register', async (req, res) => {
	if (process.env.NODE_ENV === 'production' && process.env.REGISTER_OPEN !== 'true') {
		return res.status(401).json({ message: 'Registration is only accessible by ADMIN.' })
	}
	const { errors, isValid } = validateSignUpInput(req.body)
	// Check Validation
	if (!isValid) return res.status(400).json(errors)

	let user = await User.findOne({ email: req.body.email })
	if (user) return res.status(400).send({ email: 'Email already exists!' })

	user = new User(_.pick(req.body, ['name', 'img', 'email', 'password']))
	const salt = await bcrypt.genSalt(10)
	user.password = await bcrypt.hash(user.password, salt)
	await user.save()
	const userData = await User.findOne({ email: req.body.email }).select('-password')
	res.json({
		success: true,
		successMsg: '👨‍ Successfully registered a new admin account ✔ ',
		userData,
	})
})

// @route   GET api/users/login
// @desc    Login User / Returning JWT Token
// @access  Public
router.post('/login', async (req, res) => {
	// validation example using joi
	// const { error } = validateLocally(req.body);
	const { errors, isValid } = validateLoginInput(req.body)
	// Check Validation
	if (!isValid) {
		return res.status(400).json(errors)
	}

	let user = await User.findOne({ email: req.body.email })
	// Check for user
	if (!user) {
		errors.email = 'User not found!'
		return res.status(404).json(errors)
	}

	const validPassword = await bcrypt.compare(req.body.password, user.password)
	if (!validPassword) {
		errors.password = 'Password incorrect!'
		return res.status(404).json(errors)
	}

	const token = user.generateAuthToken()
	res.json({
		success: true,
		token: token,
	})
})

// @route   POST api/users/me/edit
// @desc    Update user info
// @access  Private
router.post('/me/edit', auth, async (req, res) => {
	const { errors, isValid } = validateUpdateInput(req.body)
	// Check Validation
	if (!isValid) {
		return res.status(400).json(errors)
	}
	if (req.body.cpassword) {
		let user = await User.findOne({ email: req.body.email })
		// Check for user
		if (!user) {
			return res.status(404).json({ error: 'User not found!' })
		}
		const validPassword = await bcrypt.compare(req.body.cpassword, user.password)

		if (!validPassword) {
			errors.cpassword = 'Current Password incorrect!'
			return res.status(404).json(errors)
		} else {
			// User can't change email but [name, password, img]
			let userUpdate = _.pick(req.body, ['name', 'img', 'password'])
			const salt = await bcrypt.genSalt(10)
			userUpdate.password = await bcrypt.hash(userUpdate.password, salt)

			const profileUpdated = await User.findOneAndUpdate({ email: req.body.email }, { $set: userUpdate }, { new: true })

			return res.json(profileUpdated)
		}
	} else {
		let user = _.pick(req.body, ['name', 'img'])
		const profileUpdated = await User.findOneAndUpdate({ email: req.body.email }, { $set: user }, { new: true })
		return res.json(profileUpdated)
	}
})

module.exports = router
