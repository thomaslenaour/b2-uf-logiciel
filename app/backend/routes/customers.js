const express = require('express')

const customersController = require('../controllers/customers')

const router = express.Router()

// /api/customers
router.get('/user/:userId', customersController.getCustomers)
router.get('/:customerId', customersController.getCustomer)
router.patch('/:customerId', customersController.updateCustomer)
router.delete('/:customerId', customersController.deleteCustomer)
router.post('/', customersController.createCustomer)

module.exports = router
