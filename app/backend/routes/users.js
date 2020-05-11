const express = require('express')

const usersController = require('../controllers/users')

const router = express.Router()

// /api/users
router.get('/:userId', usersController.getUser)
router.patch('/:userId', usersController.updateUser)
router.delete('/:userId', usersController.deleteUser)
router.post('/signup', usersController.signup)
router.post('/login', usersController.login)

module.exports = router
