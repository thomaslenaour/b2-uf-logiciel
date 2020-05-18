const { validationResult } = require('express-validator')
const mongoose = require('mongoose')

const HttpError = require('../models/http-error')
const User = require('../models/user')
const Customer = require('../models/customer')

const getCustomers = async (req, res, next) => {}

const getCustomer = async (req, res, next) => {}

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
