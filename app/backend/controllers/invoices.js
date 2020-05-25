const { validationResult } = require('express-validator')
const mongoose = require('mongoose')

const Invoice = require('../models/invoice')
const Customer = require('../models/customer')
const User = require('../models/user')
const HttpError = require('../models/http-error')

const getInvoices = async (req, res, next) => {
  let user
  try {
    user = await User.findById(req.userData.userId).populate('invoices')
  } catch (err) {
    return next(
      new HttpError(
        "Impossible d'obtenir les factures associés à cet ID, un problème est survenu",
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
    invoices: user.invoices.map(invoice => invoice.toObject({ getters: true }))
  })
}

const getInvoice = async (req, res, next) => {
  const { invoiceId } = req.params

  let invoice
  try {
    invoice = await Invoice.findById(invoiceId)
  } catch (err) {
    return next(new HttpError('Aucune facture associée à cet identifiant', 500))
  }

  if (!invoice) {
    return next(new HttpError('Aucune facture associée à cet identifiant', 404))
  }

  if (invoice.creator.toString() !== req.userData.userId) {
    return next(
      new HttpError("Vous n'êtes pas autorisé à réaliser cet action", 401)
    )
  }

  res.json({ invoice: invoice.toObject({ getters: true }) })
}

const createInvoice = async (req, res, next) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return next(new HttpError('Les données saisies sont invalides', 422))
  }

  const { category, amount, isPaid, invoicePdf, customerId } = req.body

  const createdInvoice = new Invoice({
    category,
    reference: new Date().getTime(),
    amount,
    invoice_pdf: invoicePdf,
    is_paid: isPaid,
    customer: customerId,
    creator: req.userData.userId,
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

  let user
  try {
    user = await User.findById(req.userData.userId)
  } catch (err) {
    return next(
      new HttpError(
        "La création d'une facture a échouée, merci de réessayer",
        500
      )
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
    await createdInvoice.save({ session })
    user.invoices.push(createdInvoice)
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

  res.status(201).json({ invoice: createdInvoice })
}

const updateInvoice = async (req, res, next) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return next(
      new HttpError(
        'Les données saisies sont invalides, veuillez réessayer',
        422
      )
    )
  }

  const { invoiceId } = req.params
  const { category, amount, isPaid, invoicePdf, customerId } = req.body

  let invoice
  try {
    invoice = await Invoice.findById(invoiceId)
  } catch (err) {
    return next(new HttpError('Aucune facture associée à cet identifiant', 500))
  }

  if (!invoice) {
    return next(new HttpError('Aucune facture associée à cet identifiant', 404))
  }

  if (invoice.creator.toString() !== req.userData.userId) {
    return next(
      new HttpError("Vous n'êtes pas autorisé à réaliser cet action", 401)
    )
  }

  invoice.category = category
  invoice.amount = amount
  invoice.isPaid = isPaid
  invoice.invoicePdf = invoicePdf
  invoice.customerId = customerId
  invoice.updated_at = new Date().getTime()

  try {
    await invoice.save()
  } catch (err) {
    return next(
      new HttpError("Quelque chose s'est mal passé, veuillez réessayer", 500)
    )
  }

  res.status(200).json({ invoice: invoice.toObject({ getters: true }) })
}

const deleteInvoice = async (req, res, next) => {}

exports.getInvoices = getInvoices
exports.getInvoice = getInvoice
exports.createInvoice = createInvoice
exports.updateInvoice = updateInvoice
exports.deleteInvoice = deleteInvoice
