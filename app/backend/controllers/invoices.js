const { validationResult } = require('express-validator')

const Customer = require('../models/customer')
const HttpError = require('../models/http-error')

const getInvoices = async (req, res, next) => {}

const getInvoice = async (req, res, next) => {}

const createInvoice = async (req, res, next) => {}

const updateInvoice = async (req, res, next) => {}

const deleteInvoice = async (req, res, next) => {}

exports.getInvoices = getInvoices
exports.getInvoice = getInvoice
exports.createInvoice = createInvoice
exports.updateInvoice = updateInvoice
exports.deleteInvoice = deleteInvoice
