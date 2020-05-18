const { validationResult } = require('express-validator')
const mongoose = require('mongoose')

const HttpError = require('../models/http-error')
const User = require('../models/user')
const Customer = require('../models/customer')

const getCustomers = async (req, res, next) => {
  const { customerId } = req.params

  let user
  try {
    user = await User.findById(req.userData.userId).populate('customers')
  } catch (err) {
    return next(
      new HttpError(
        "Impossible d'obtenir les clients, un problème est survenu",
        500
      )
    )
  }

  if (!user) {
    return next(
      new HttpError(
        'Impossible de trouver un utilisateur associé à cet ID',
        404
      )
    )
  }

  if (user.id !== req.userData.userId) {
    return next(
      new HttpError("Vous n'êtes pas autorisé à réaliser cet action", 401)
    )
  }

  res.json({
    customers: user.customers.map(customer =>
      customer.toObject({ getters: true })
    )
  })
}

const getCustomer = async (req, res, next) => {
  const { customerId } = req.params

  let customer
  try {
    customer = await Customer.findOne({
      creator: req.userData.userId,
      _id: customerId
    })
  } catch (err) {
    return next(
      new HttpError(
        "Impossible d'obtenir le client, un problème est survenu",
        500
      )
    )
  }

  if (!customer) {
    return next(
      new HttpError(
        "Impossible d'obtenir le client, un problème est survenu",
        500
      )
    )
  }

  res.json({ customer: customer.toObject({ getters: true }) })
}

const createCustomer = async (req, res, next) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return next(new HttpError('Les données saisies sont invalides', 422))
  }

  const { name, address, postalCode, city, country, phone } = req.body

  const createdCustomer = new Customer({
    name,
    address,
    postal_code: postalCode,
    city,
    country,
    phone,
    creator: req.userData.userId,
    created_at: new Date().getTime(),
    invoices: []
  })

  let user
  try {
    user = await User.findById(req.userData.userId)
  } catch (error) {
    return next(
      new HttpError("La création d'un client a échoué, merci de réessayer", 500)
    )
  }

  if (!user) {
    return next(
      new HttpError("Impossible de trouver l'utilisateur associé à cet ID", 404)
    )
  }

  try {
    const session = await mongoose.startSession()

    session.startTransaction()
    await createdCustomer.save({ session })
    user.customers.push(createdCustomer)
    await user.save({ session })
    await session.commitTransaction()
  } catch (err) {
    return next(
      new HttpError(
        'Impossible de créer un client pour le moment, merci de réessayer',
        500
      )
    )
  }

  res.status(201).json({ customer: createdCustomer })
}

const updateCustomer = async (req, res, next) => {}

const deleteCustomer = async (req, res, next) => {}

exports.getCustomers = getCustomers
exports.getCustomer = getCustomer
exports.createCustomer = createCustomer
exports.updateCustomer = updateCustomer
exports.deleteCustomer = deleteCustomer
