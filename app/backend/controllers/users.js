const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/user')
const Invoice = require('../models/invoice')
const Customer = require('../models/customer')
const HttpError = require('../models/http-error')

const getUser = async (req, res, next) => {
  const { userId } = req.params

  let user
  try {
    user = await User.findById(userId, '-password')
  } catch (err) {
    return next(
      new HttpError(
        'Impossible de trouver un utilisateur associé à cet identifiant',
        500
      )
    )
  }

  if (!user) {
    return next(
      new HttpError(
        'Impossible de trouver un utilisateur associé à cet identifiant',
        404
      )
    )
  }

  if (user.id !== req.userData.userId) {
    return next(
      new HttpError("Vous n'êtes pas autorisé à réaliser cet action.", 401)
    )
  }

  res.json({ user: user.toObject({ getters: true }) })
}

const updateUser = async (req, res, next) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return next(new HttpError('Les données saisies sont invalides', 422))
  }

  const { name, email, contributionPct } = req.body
  const { userId } = req.params

  let user
  try {
    user = await User.findById(userId, '-password')
  } catch (err) {
    return next(
      new HttpError(
        'Impossible de trouver un utilisateur associé à cet identifiant',
        500
      )
    )
  }

  if (!user) {
    return next(
      new HttpError(
        'Impossible de trouver un utilisateur associé à cet identifiant',
        404
      )
    )
  }

  if (user.id !== req.userData.userId) {
    return next(
      new HttpError("Vous n'êtes pas autorisé à réaliser cet action.", 401)
    )
  }

  user.name = name
  user.email = email
  user.contribution_pct = contributionPct
  user.updated_at = new Date().getTime()

  try {
    await user.save()
  } catch (err) {
    return next(
      new HttpError(
        "Quelque chose s'est mal passé, impossible de modifier l'utilisateur",
        500
      )
    )
  }

  res.status(200).json({ user: user.toObject({ getters: true }) })
}

const deleteUser = async (req, res, next) => {
  let user
  try {
    user = await User.findById(req.userData.userId)
  } catch (error) {
    return next(new HttpError('Impossible de supprimer cet utilisateur', 500))
  }

  if (!user) {
    return next(
      new HttpError(
        "Impossible de supprimer l'utilisateur associé à cet ID",
        404
      )
    )
  }

  if (user.id !== req.userData.userId) {
    return next(
      new HttpError("Vous n'êtes pas autorisé à réaliser cet action.", 401)
    )
  }

  try {
    await Invoice.deleteMany({ creator: req.userData.userId })
    await Customer.deleteMany({ creator: req.userData.userId })
    await user.remove()
  } catch (err) {
    return next(new HttpError('Impossible de supprimer cet utilisateur', 500))
  }

  res.status(200).json({ message: "L'utilisateur a bien été supprimé" })
}

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

  res.status(201).json({ message: "L'utilisateur a bien été créé" })
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

  let token
  try {
    token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_KEY,
      {}
    )
  } catch (err) {
    return next(
      new HttpError('Impossible de se connecter, veuillez réessayer', 500)
    )
  }

  res.json({
    userId: user.id,
    email: user.email,
    cotisationPct: user.contribution_pct,
    token
  })
}

exports.getUser = getUser
exports.updateUser = updateUser
exports.deleteUser = deleteUser
exports.signup = signup
exports.login = login
