const express = require('express')
const { check } = require('express-validator')

const checkAuth = require('../middlewares/check-auth')
const customersController = require('../controllers/customers')

const router = express.Router()

// /api/customers
router.use(checkAuth)

router.get('/', customersController.getCustomers)
router.get('/:customerId', customersController.getCustomer)
router.patch(
  '/:customerId',
  [
    check('name').not().isEmpty(),
    check('address').not().isEmpty(),
    check('postalCode').not().isEmpty(),
    check('city').not().isEmpty(),
    check('country').not().isEmpty(),
    check('phone').not().isEmpty()
  ],
  customersController.updateCustomer
)
router.delete('/:customerId', customersController.deleteCustomer)
router.post(
  '/',
  [
    check('name').not().isEmpty(),
    check('address').not().isEmpty(),
    check('postalCode').not().isEmpty(),
    check('city').not().isEmpty(),
    check('country').not().isEmpty(),
    check('phone').not().isEmpty()
  ],
  customersController.createCustomer
)

module.exports = router
