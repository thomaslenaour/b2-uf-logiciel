const express = require('express')
const { check } = require('express-validator')

const checkAuth = require('../middlewares/check-auth')
const usersController = require('../controllers/users')

const router = express.Router()

// /api/users
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
    check('contributionPct').isNumeric()
  ],
  usersController.signup
)
router.post('/login', usersController.login)

router.use(checkAuth)

router.get('/:userId', usersController.getUser)
router.patch(
  '/:userId',
  [
    check('name').not().isEmpty(),
    check('email').normalizeEmail().isEmail(),
    check('contributionPct').isNumeric()
  ],
  usersController.updateUser
)
router.delete('/:userId', usersController.deleteUser)

module.exports = router
