const express = require('express')
const { check } = require('express-validator')

const usersController = require('../controllers/users')

const router = express.Router()

// /api/users
router.get('/:userId', usersController.getUser)
router.patch('/:userId', usersController.updateUser)
router.delete('/:userId', usersController.deleteUser)
router.post(
  '/signup',
  [
    check('name').not().isEmpty(),
    check('email').normalizeEmail().isEmail(),
    check('password').isLength({ min: 6 }),
    check('passwordConfirmation').custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Les mots de passes ne correspondent pas')
      }

      return true
    }),
    check('contributionPct').isNumeric().in
  ],
  usersController.signup
)
router.post('/login', usersController.login)

module.exports = router
