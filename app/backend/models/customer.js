const mongoose = require('mongoose')

const { Schema } = mongoose

const customerSchema = Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  postal_code: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  phone: { type: String },
  created_at: { type: Number, required: true },
  updated_at: { type: Number },
  creator: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
  invoices: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Invoice' }]
})

module.exports = mongoose.model('Customer', customerSchema)
