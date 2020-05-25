const express = require('express')
const { check } = require('express-validator')

const checkAuth = require('../middlewares/check-auth')
const invoicesController = require('../controllers/invoices')

const router = express.Router()

// /api/invoices
router.use(checkAuth)

router.get('/', invoicesController.getInvoices)
router.get('/:invoiceId', invoicesController.getInvoice)
router.patch('/:invoiceId', invoicesController.updateInvoice)
router.delete('/:invoiceId', invoicesController.deleteInvoice)
router.post(
  '/:customerId',
  [
    check('category').not().isEmpty(),
    check('amount').isNumeric(),
    check('isPaid').isBoolean()
  ],
  invoicesController.createInvoice
)

module.exports = router
