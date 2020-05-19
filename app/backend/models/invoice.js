const mongoose = require('mongoose')

const { Schema } = mongoose

const invoiceSchema = new Schema({
  category: { type: String, required: true },
  reference: { type: String, required: true },
  amount: { type: Number, required: true },
  invoice_pdf: { type: String, required: true },
  is_paid: { type: Boolean, required: true },
  created_at: { type: Number, required: true },
  updated_at: { type: Number },
  customer: { type: mongoose.Types.ObjectId, required: true, ref: 'Customer' }
})

module.exports = mongoose.model('Invoice', invoiceSchema)
