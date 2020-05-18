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
    customer = await Customer.findById(customerId)
  } catch (err) {
    return next(new HttpError('Aucun client associé à cet identifiant', 500))
  }

  if (!customer) {
    return next(new HttpError('Aucun client associé à cet identifiant', 404))
  }

  if (customer.creator.toString() !== req.userData.userId) {
    return next(
      new HttpError("Vous n'êtes pas autorisé à réaliser cet action", 401)
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
  } catch (err) {
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

const updateCustomer = async (req, res, next) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return next(
      new HttpError(
        'Les données saisies sont invalides, veuillez réessayer',
        422
      )
    )
  }

  const { customerId } = req.params
  const { name, address, postalCode, city, country, phone } = req.body

  let customer
  try {
    customer = await Customer.findById(customerId)
  } catch (err) {
    return next(new HttpError('Aucun client associé à cet identifiant', 500))
  }

  if (!customer) {
    return next(new HttpError('Aucun client associé à cet identifiant', 404))
  }

  if (customer.creator.toString() !== req.userData.userId) {
    return next(
      new HttpError("Vous n'êtes pas autorisé à réaliser cet action", 401)
    )
  }

  customer.name = name
  customer.address = address
  customer.postal_code = postalCode
  customer.city = city
  customer.country = country
  customer.phone = phone
  customer.updated_at = new Date().getTime()

  try {
    await customer.save()
  } catch (err) {
    return next(
      new HttpError("Quelque chose s'est mal passé, veuillez réessayer", 500)
    )
  }

  res.status(200).json({ customer: customer.toObject({ getters: true }) })
}

const deleteCustomer = async (req, res, next) => {}

exports.getCustomers = getCustomers
exports.getCustomer = getCustomer
exports.createCustomer = createCustomer
exports.updateCustomer = updateCustomer
exports.deleteCustomer = deleteCustomer
