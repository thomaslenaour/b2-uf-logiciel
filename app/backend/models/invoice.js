const mongoose = require('mongoose')

const { Schema } = mongoose

const invoiceSchema = new Schema({
  category: { type: String, required: true },
  reference: { type: String, required: true },
  amount: { type: String, required: true },
  invoice_pdf: { type: String, required: true },
  is_paid: { type: Boolean, required: true },
  created_at: { type: Number, required: true },
  updated_at: { type: Number },
  customer: { type: mongoose.Types.ObjectId, required: true, ref: 'Customer' },
  creator: { type: mongoose.Types.ObjectId, required: true, ref: 'User' }
})

module.exports = mongoose.model('Invoice', invoiceSchema)
