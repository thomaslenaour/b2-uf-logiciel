const mongoose = require('mongoose')
const uniqueValidator = require('express-validator')

const { Schema } = mongoose

const userSchema = Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  contribution_pct: { type: Number, required: true },
  created_at: { type: Date, required: true },
  updated_at: { type: Date, required: true },
  customers: [
    { type: mongoose.Types.ObjectId, required: true, ref: 'Customer' }
  ]
})

userSchema.plugin(uniqueValidator)

module.exports = mongoose.model('User', userSchema)
