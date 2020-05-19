const { validationResult } = require('express-validator')

const Invoice = require('../models/invoice')
const HttpError = require('../models/http-error')

const getInvoices = async (req, res, next) => {}

const getInvoice = async (req, res, next) => {}

const createInvoice = async (req, res, next) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return next(new HttpError('Les données saisies sont invalides', 422))
  }

  const { category, amount, isPaid } = req.body

  // const createdInvoice = new Invoice({
  //   category,
  //   reference: `${req.userData.userId}-${new Date().getTime()}`,
  //   amount,
  //   invoice_pdf: invoicePdf,
  //   is_paid: isPaid,
  //   customer:
  //   created_at: new Date().getTime()
  // })
  // res.json({ message: 'process creation' })
}

const updateInvoice = async (req, res, next) => {}

const deleteInvoice = async (req, res, next) => {}

exports.getInvoices = getInvoices
exports.getInvoice = getInvoice
exports.createInvoice = createInvoice
exports.updateInvoice = updateInvoice
exports.deleteInvoice = deleteInvoice
