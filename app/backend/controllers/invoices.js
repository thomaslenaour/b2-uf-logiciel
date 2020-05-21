const { validationResult } = require('express-validator')
const mongoose = require('mongoose')

const Invoice = require('../models/invoice')
const Customer = require('../models/customer')
const HttpError = require('../models/http-error')

const getInvoices = async (req, res, next) => {}

const getInvoice = async (req, res, next) => {}

const createInvoice = async (req, res, next) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return next(new HttpError('Les données saisies sont invalides', 422))
  }

  const { category, amount, isPaid, invoicePdf, customerId } = req.body

  const createdInvoice = new Invoice({
    category,
    reference: `${req.userData.userId}-${new Date().getTime()}`,
    amount,
    invoice_pdf: invoicePdf,
    is_paid: isPaid,
    customer: customerId,
    created_at: new Date().getTime()
  })

  let customer
  try {
    customer = await Customer.findById(customerId)
  } catch (err) {
    return next(
      new HttpError(
        "La création d'une facture a échouée, merci de réessayer",
        500
      )
    )
  }

  if (!customer) {
    return next(
      new HttpError('Impossible de trouver le client associé à cet ID', 404)
    )
  }

  try {
    const session = await mongoose.startSession()

    session.startTransaction()
    await createdInvoice.save({ session })
    customer.invoices.push(createdInvoice)
    await customer.save({ session })
    await session.commitTransaction()
  } catch (err) {
    return next(
      new HttpError(
        'Impossible de créer un client pour le moment, merci de réessayer',
        500
      )
    )
  }

  res.status(201).json({ invoice: createdInvoice })
}

const updateInvoice = async (req, res, next) => {}

const deleteInvoice = async (req, res, next) => {}

exports.getInvoices = getInvoices
exports.getInvoice = getInvoice
exports.createInvoice = createInvoice
exports.updateInvoice = updateInvoice
exports.deleteInvoice = deleteInvoice
