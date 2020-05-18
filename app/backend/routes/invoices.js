const express = require('express')
const { check } = require('express-validator')

const invoicesController = require('../controllers/invoices')

const router = express.Router()

// /api/invoices
router.get('/user/:userId', invoicesController.getInvoices)
router.get('/:invoiceId', invoicesController.getInvoice)
router.patch('/:invoiceId', invoicesController.updateInvoice)
router.delete('/:invoiceId', invoicesController.deleteInvoice)
router.post('/', invoicesController.createInvoice)

module.exports = router
