const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')

const User = require('../models/user')
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
  const { userId } = req.params

  let user
  try {
    user = await User.findById(userId).populate('customers')
  } catch (err) {
    return next(new HttpError("Impossible de supprimer l'utilisateur", 500))
  }

  if (!user) {
    return next(
      new HttpError("L'identifiant ne correspond à aucun utilisateur", 404)
    )
  }

  try {
    const session = await mongoose.startSession()

    session.startTransaction()
    await user.remove({ session })
    user.customers.pull()
    await user.customers.save({ session })
    await session.commitTransaction()
  } catch (err) {
    return next(new HttpError(err.message, 500))
  }

  res.status(200).json({ message: 'Utilisateur supprimé' })
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
