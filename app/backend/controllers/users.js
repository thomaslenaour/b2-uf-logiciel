const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')

const User = require('../models/user')
const HttpError = require('../models/http-error')

const getUser = async (req, res, next) => {}

const updateUser = async (req, res, next) => {}

const deleteUser = async (req, res, next) => {}

const signup = async (req, res, next) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return next(new HttpError('Les données saisies sont invalides', 422))
  }

  const { name, email, password, contributionPct } = req.body

  let hashedPassword
  try {
    hashedPassword = await bcrypt.hash(password, 12)
  } catch (err) {
    return next(
      new HttpError(
        "Impossible de créer l'utilisateur, veuillez réessayer plus tard",
        500
      )
    )
  }

  const createdUser = new User({
    name,
    email,
    password: hashedPassword,
    contribution_pct: contributionPct,
    created_at: new Date().getTime(),
    customers: []
  })

  try {
    await createdUser.save()
  } catch (err) {
    return next(
      new HttpError(
        "Impossible de créer l'utilisateur, veuillez réessayer plus tard",
        500
      )
    )
  }

  res.status(201).json({ userId: createdUser.id, email: createdUser.email })
}

const login = async (req, res, next) => {
  const { email, password } = req.body

  let user
  try {
    user = await User.findOne({ email })
  } catch (err) {
    return next(
      new HttpError(
        'Impossile de se connecter pour le moment, veuillez vérifier vos identifiants',
        500
      )
    )
  }

  if (!user) {
    return next(new HttpError('Les identifiants sont invalides', 403))
  }

  let isValidPassword = false
  try {
    isValidPassword = await bcrypt.compare(password, user.password)
  } catch (err) {
    return next(
      new HttpError(
        'Impossile de se connecter pour le moment, veuillez vérifier vos identifiants',
        500
      )
    )
  }

  if (!isValidPassword) {
    return next(new HttpError('Le mot de passe est invalide', 403))
  }

  res.json({ userId: user.id, email: user.email })
}

exports.getUser = getUser
exports.updateUser = updateUser
exports.deleteUser = deleteUser
exports.signup = signup
exports.login = login
